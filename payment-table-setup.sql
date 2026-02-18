-- Add Payment table for Stripe transaction tracking
-- Run this in Supabase SQL Editor after the main schema

-- Create Payment Status ENUM
DO $$ BEGIN
  CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create Package Type ENUM  
DO $$ BEGIN
  CREATE TYPE "PackageType" AS ENUM ('BASIC', 'PREMIUM', 'ULTIMATE');
EXCEPTION
  WHEN duplicate_object THEN null;
END $$;

-- Create Payment table
CREATE TABLE IF NOT EXISTS "Payment" (
  "id" TEXT PRIMARY KEY,
  "userId" TEXT NOT NULL,
  "contestantId" TEXT NOT NULL,
  "stripePaymentIntentId" TEXT UNIQUE NOT NULL,
  "stripeSessionId" TEXT,
  "amount" DOUBLE PRECISION NOT NULL,
  "currency" TEXT DEFAULT 'zar' NOT NULL,
  "voteCount" INTEGER NOT NULL,
  "packageType" "PackageType" NOT NULL,
  "status" "PaymentStatus" DEFAULT 'PENDING' NOT NULL,
  "paidAt" TIMESTAMP,
  "failureReason" TEXT,
  "refundId" TEXT,
  "refundedAt" TIMESTAMP,
  "metadata" JSONB,
  "createdAt" TIMESTAMP DEFAULT NOW() NOT NULL,
  "updatedAt" TIMESTAMP NOT NULL,
  CONSTRAINT "Payment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT "Payment_contestantId_fkey" FOREIGN KEY ("contestantId") REFERENCES "Contestant"("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- Create indexes for Payment table
CREATE INDEX IF NOT EXISTS "Payment_userId_idx" ON "Payment"("userId");
CREATE INDEX IF NOT EXISTS "Payment_contestantId_idx" ON "Payment"("contestantId");
CREATE INDEX IF NOT EXISTS "Payment_stripePaymentIntentId_idx" ON "Payment"("stripePaymentIntentId");
CREATE INDEX IF NOT EXISTS "Payment_status_idx" ON "Payment"("status");
CREATE INDEX IF NOT EXISTS "Payment_createdAt_idx" ON "Payment"("createdAt");

-- Create trigger for Payment updatedAt
CREATE TRIGGER update_payment_updated_at BEFORE UPDATE ON "Payment"
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Success message
SELECT 'Payment table created successfully!' AS status;