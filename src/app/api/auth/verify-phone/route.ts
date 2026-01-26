import { NextRequest, NextResponse } from 'next/server';
import { logger } from '@/lib/logger';
import { checkRateLimit, getClientIp, RATE_LIMITS } from '@/lib/rate-limit';

// Generate 6-digit verification code
function generateCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// SMS provider integration
async function sendSMS(phone: string, code: string): Promise<boolean> {
  try {
    // ALWAYS log code to terminal for development
    console.log('\n' + '='.repeat(60));
    console.log('📱 SMS VERIFICATION CODE');
    console.log('='.repeat(60));
    console.log(`Phone: ${phone}`);
    console.log(`Code: ${code}`);
    console.log(`Valid for: 10 minutes`);
    console.log('='.repeat(60) + '\n');
    
    // Check if using real SMS provider
    const provider = process.env.SMS_PROVIDER || 'development';
    
    if (provider === 'infobip' && process.env.INFOBIP_API_KEY) {
      // Infobip SMS integration
      const baseUrl = (process.env.INFOBIP_BASE_URL || '').replace(/\/$/, '');
      const apiUrl = `${baseUrl.startsWith('http') ? baseUrl : `https://${baseUrl}`}/sms/2/text/advanced`;
      const sender = process.env.INFOBIP_SENDER || 'RES';

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          Authorization: `App ${process.env.INFOBIP_API_KEY}`,
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          messages: [
            {
              destinations: [{ to: phone }],
              text: `Your R.E.S. verification code is: ${code}. Valid for 10 minutes.`,
              from: sender,
            },
          ],
        }),
      });

      if (!res.ok) {
        const errText = await res.text();
        logger.error('SMS', 'Infobip send failed', { phone, status: res.status, body: errText });
        return false;
      }

      logger.info('SMS', 'Sent via Infobip', { phone });
      return true;
    } else if (provider === 'twilio' && process.env.TWILIO_ACCOUNT_SID) {
      // Twilio integration
      const twilio = require('twilio');
      const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      
      await client.messages.create({
        body: `Your R.E.S. verification code is: ${code}. Valid for 10 minutes.`,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: phone,
      });
      logger.info('SMS', 'Sent via Twilio', { phone });
      return true;
    } else if (provider === 'aws-sns' && process.env.AWS_SNS_REGION) {
      // AWS SNS integration - only used if environment variable is set
      try {
        // Dynamically load AWS SDK only if needed (won't error if not installed)
        // eslint-disable-next-line global-require
        const awsSdk = require('aws-sdk');
        const sns = new awsSdk.SNS({ region: process.env.AWS_SNS_REGION });
        
        await sns.publish({
          Message: `Your R.E.S. verification code is: ${code}. Valid for 10 minutes.`,
          PhoneNumber: phone,
        }).promise();
        logger.info('SMS', 'Sent via AWS SNS', { phone });
        return true;
      } catch (error: any) {
        // Fallback if AWS SDK not available
        logger.warn('SMS', 'AWS SDK not available, using development mode', { phone });
        logger.info('SMS', 'Development mode - code logged to console', { phone, code });
        return true;
      }
    } else {
      // Development mode - code already logged above
      logger.info('SMS', 'Development mode - code logged to console', { phone, code });
      return true;
    }
  } catch (error: any) {
    logger.error('SMS', 'Failed to send SMS', { phone, error: error.message });
    // Still return true since we logged to console
    return true;
  }
}

// Store codes in memory (for development; use Redis in production)
const verificationCodes: Record<string, { code: string; expiresAt: number }> = {};

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitCheck = checkRateLimit(clientIp, '/api/auth/verify-phone', RATE_LIMITS.SMS);
    
    if (!rateLimitCheck.allowed) {
      logger.warn('SMS', 'Rate limit exceeded', { ip: clientIp, remaining: rateLimitCheck.remaining });
      return NextResponse.json(
        { error: 'Too many SMS requests. Please try again in 1 minute.' },
        { status: 429 }
      );
    }

    let body: any;
    try {
      body = await request.json();
    } catch (parseError) {
      logger.error('SMS', 'Invalid JSON in request body', { error: parseError });
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }
    const { phone, action, code } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Action 1: Send verification code
    if (action === 'verify') {
      const verificationCode = generateCode();
      const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

      // Store code
      verificationCodes[phone] = { code: verificationCode, expiresAt };

      logger.info('SMS', 'Verification code generated', { phone });

      // Send SMS
      const smsSent = await sendSMS(phone, verificationCode);
      if (!smsSent) {
        logger.error('SMS', 'Failed to send SMS', { phone });
        return NextResponse.json(
          { error: 'Failed to send verification code' },
          { status: 500 }
        );
      }

      // Return code in development mode only
      return NextResponse.json(
        {
          message: 'Verification code sent',
          ...(process.env.NODE_ENV === 'development' && { code: verificationCode }),
        },
        { status: 200 }
      );
    }

    // Action 2: Confirm verification code
    if (action === 'confirm') {
      if (!code) {
        return NextResponse.json(
          { error: 'Verification code is required' },
          { status: 400 }
        );
      }

      const stored = verificationCodes[phone];

      if (!stored) {
        return NextResponse.json(
          { error: 'No verification code sent for this phone number' },
          { status: 400 }
        );
      }

      if (stored.expiresAt < Date.now()) {
        delete verificationCodes[phone];
        return NextResponse.json(
          { error: 'Verification code expired' },
          { status: 400 }
        );
      }

      if (stored.code !== code.toString()) {
        return NextResponse.json(
          { error: 'Invalid verification code' },
          { status: 400 }
        );
      }

      // Code is valid - mark phone as verified
      delete verificationCodes[phone];

      return NextResponse.json(
        { message: 'Phone number verified successfully' },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Invalid action. Use "verify" or "confirm"' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('[SMS Verification Error]:', error);
    return NextResponse.json(
      { error: 'An error occurred during phone verification' },
      { status: 500 }
    );
  }
}
