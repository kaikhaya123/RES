import Stripe from 'stripe';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY environment variable');
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-12-18.acacia',
  typescript: true,
});

export const STRIPE_CONFIG = {
  currency: 'zar', // South African Rand
  votingPrices: {
    basic: 500, // 5.00 ZAR in cents
    premium: 1000, // 10.00 ZAR in cents 
    ultimate: 2500, // 25.00 ZAR in cents
  },
  votePackages: {
    basic: { votes: 10, price: 500 }, // 10 votes for 5 ZAR
    premium: { votes: 50, price: 2000 }, // 50 votes for 20 ZAR
    ultimate: { votes: 200, price: 7500 }, // 200 votes for 75 ZAR
  }
};

export function formatAmountForStripe(amount: number): number {
  return Math.round(amount);
}

export function formatAmountFromStripe(amount: number): number {
  return amount / 100;
}