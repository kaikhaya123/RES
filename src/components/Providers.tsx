'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

import { CartProvider } from '@/context/cart';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider 
      refetchInterval={60}
      refetchOnWindowFocus={true}
    >
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
