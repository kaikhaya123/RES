import type { Metadata } from "next";
import { Manrope, Inter, Poppins, Rubik } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { Providers } from "@/components/Providers";
import ErrorBoundary from "@/components/ErrorBoundary";
import SmoothScroll from '@/components/SmoothScroll';

// Optimize font loading with display: swap to prevent FOUT
const manrope = Manrope({
  subsets: ["latin"],
  variable: '--font-manrope',
  display: 'swap',
  preload: true,
});

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ["latin"],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

const rubik = Rubik({
  weight: ['300','400','500','600','700','900'],
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "R.E.S. - Roomza's Educated Secret | South Africa's Premier Student Reality Show",
  description: "Join South Africa's first large-scale student-focused reality show. Vote, compete, and win amazing prizes while supporting education and youth development.",
  keywords: "student competition, reality show, South Africa, education, voting, quiz, entertainment",
  authors: [{ name: "R.E.S. Team" }],
  openGraph: {
    title: "R.E.S. - Roomza's Educated Secret",
    description: "South Africa's Premier Student Reality Show",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${manrope.variable} ${inter.variable} ${poppins.variable} ${rubik.variable}`}>
      <head>
        {/* Preconnect to critical third-party domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body suppressHydrationWarning className="antialiased font-sans scroll-smooth">
        <ErrorBoundary>
          <Providers>
            {/* Site-wide smooth scrolling */}
            <SmoothScroll>
              {children}
            </SmoothScroll>

            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#22c55e',
                    secondary: '#fff',
                  },
                },
                error: {
                  iconTheme: {
                    primary: '#ef4444',
                    secondary: '#fff',
                  },
                },
              }}
            />
          </Providers>
        </ErrorBoundary>
      </body>
    </html>
  );
}
