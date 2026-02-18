import nodemailer from 'nodemailer';
import { randomBytes } from 'crypto';
import { redis } from './redis';

// Create transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_SERVER_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

// Token storage fallback (in-memory) for when Redis is not available
const tokenStore = new Map<string, { email: string; expiresAt: number }>();

// Clean up expired tokens every minute
setInterval(() => {
  const now = Date.now();
  for (const [token, data] of tokenStore.entries()) {
    if (data.expiresAt < now) {
      tokenStore.delete(token);
    }
  }
}, 60000);

// Generate verification token
export async function generateVerificationToken(email: string): Promise<string> {
  const token = randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
  
  try {
    if (redis) {
      // Store in Redis with TTL
      await redis.set(`email:token:${token}`, email, { ex: 24 * 60 * 60 }); // 24 hours TTL
    } else {
      // Fallback to in-memory storage
      tokenStore.set(token, { email, expiresAt });
    }
  } catch (error) {
    console.error('Error storing verification token:', error);
    // Fallback to in-memory storage
    tokenStore.set(token, { email, expiresAt });
  }
  
  return token;
}

// Verify token
export async function verifyEmailToken(token: string): Promise<string | null> {
  if (!token) {
    return null;
  }

  try {
    if (redis) {
      // Try Redis first
      const email = await redis.get(`email:token:${token}`);
      if (email) {
        // Delete token to prevent reuse
        await redis.del(`email:token:${token}`);
        return typeof email === 'string' ? email : null;
      }
    }
  } catch (error) {
    console.error('Error retrieving token from Redis:', error);
  }

  // Fallback to in-memory storage
  const data = tokenStore.get(token);
  
  if (!data) {
    return null;
  }

  // Check if token has expired
  if (data.expiresAt < Date.now()) {
    tokenStore.delete(token);
    return null;
  }

  // Token is valid, remove it so it can't be reused
  tokenStore.delete(token);
  return data.email;
}

// Send verification email
export async function sendVerificationEmail(email: string, name: string): Promise<void> {
  const token = await generateVerificationToken(email);
  const verificationUrl = `${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}`;

  const mailOptions = {
    from: `"R.E.S. Platform" <${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: 'Verify Your Email - R.E.S. Platform',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verify Your Email</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to R.E.S.!</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.8;">
              Thank you for registering with Roomza's Educated Secret platform. To complete your registration and start voting, taking quizzes, and engaging with our community, please verify your email address.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 50px; 
                        font-weight: bold; 
                        font-size: 16px;
                        display: inline-block;">
                Verify Email Address
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Or copy and paste this link into your browser:<br>
              <a href="${verificationUrl}" style="color: #667eea; word-break: break-all;">${verificationUrl}</a>
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              This link will expire in 24 hours. If you didn't create an account with R.E.S., you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Roomza's Educated Secret. All rights reserved.<br>
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </body>
      </html>
    `,
    text: `
      Welcome to R.E.S.!
      
      Hi ${name},
      
      Thank you for registering with Roomza's Educated Secret platform. To complete your registration, please verify your email address by clicking the link below:
      
      ${verificationUrl}
      
      This link will expire in 24 hours.
      
      If you didn't create an account with R.E.S., you can safely ignore this email.
      
      © ${new Date().getFullYear()} Roomza's Educated Secret. All rights reserved.
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send password reset email
export async function sendPasswordResetEmail(email: string, name: string): Promise<void> {
  const token = await generateVerificationToken(email);
  const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: `"R.E.S. Platform" <${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: 'Reset Your Password - R.E.S. Platform',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Reset Your Password</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Reset Your Password</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.8;">
              We received a request to reset your password. Click the button below to create a new password:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${resetUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 50px; 
                        font-weight: bold; 
                        font-size: 16px;
                        display: inline-block;">
                Reset Password
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px;">
              Or copy and paste this link into your browser:<br>
              <a href="${resetUrl}" style="color: #667eea; word-break: break-all;">${resetUrl}</a>
            </p>
            
            <p style="font-size: 14px; color: #666; margin-top: 20px;">
              This link will expire in 24 hours. If you didn't request a password reset, you can safely ignore this email.
            </p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Roomza's Educated Secret. All rights reserved.<br>
              This is an automated message, please do not reply to this email.
            </p>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Send welcome email after verification
export async function sendWelcomeEmail(email: string, name: string): Promise<void> {
  const mailOptions = {
    from: `"R.E.S. Platform" <${process.env.EMAIL_SERVER_USER}>`,
    to: email,
    subject: 'Welcome to R.E.S. - Let\'s Get Started!',
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Welcome to R.E.S.</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to R.E.S.! 🎉</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${name}!</h2>
            
            <p style="font-size: 16px; line-height: 1.8;">
              Your email has been verified successfully! You're now part of the R.E.S. community.
            </p>
            
            <h3 style="color: #667eea; margin-top: 30px;">What's Next?</h3>
            
            <ul style="font-size: 15px; line-height: 2;">
              <li>🗳️ <strong>Vote for Contestants:</strong> Cast up to 100 votes per day</li>
              <li>🧠 <strong>Take Daily Quizzes:</strong> Test your knowledge and climb the leaderboard</li>
              <li>👥 <strong>Nominate Students:</strong> Know someone talented? Nominate them!</li>
              <li>📺 <strong>Watch Live:</strong> 18 hours of daily streaming on TikTok, Facebook & YouTube</li>
              <li>🏆 <strong>Win Prizes:</strong> Compete for amazing rewards and achievements</li>
            </ul>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${process.env.NEXTAUTH_URL}/auth/login" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 40px; 
                        text-decoration: none; 
                        border-radius: 50px; 
                        font-weight: bold; 
                        font-size: 16px;
                        display: inline-block;">
                Log In Now
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              © ${new Date().getFullYear()} Roomza's Educated Secret. All rights reserved.<br>
              Need help? Contact us at support@res-platform.com
            </p>
          </div>
        </body>
      </html>
    `,
  };

  await transporter.sendMail(mailOptions);
}
