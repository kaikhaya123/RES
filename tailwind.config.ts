import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			// Warm Stone Palette
  			'warm-stone': {
  				'base': '#F2EFEA',      // Base background
  				'secondary': '#E7E3DD', // Secondary surface
  				'border': '#D6D2CB'     // Border and subtle lines
  			},
  			// Dark Backgrounds
  			'dark-bg': {
  				'pure': '#000000',      // Pure Black - strongest glow effect
  				'soft': '#0A0A0A',      // Soft Black - smooth look with depth
  				'charcoal': '#111111',  // Deep Charcoal - good for sections
  				'warm': '#1A1A1A',      // Warm Charcoal - pairs well with gold
  				'matte': '#1F1F1F'      // Matte Graphite - useful for cards
  			},
  			// Yellow Accent
  			'brand-yellow': '#FBBF24', // Vibrant yellow for logo and accents
  			// Charcoal Blue
  			'charcoal-blue': {
  				'light': '#2C3E50',     // Light Charcoal Blue
  				'dark': '#1A2533'       // Dark Charcoal Blue for dramatic sections
  			},
  			primary: {
  				'50': '#fef2f2',
  				'100': '#fee2e2',
  				'200': '#fecaca',
  				'300': '#fca5a5',
  				'400': '#f87171',
  				'500': '#ef4444',
  				'600': '#dc2626',
  				'700': '#b91c1c',
  				'800': '#991b1b',
  				'900': '#7f1d1d',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#f0fdf4',
  				'100': '#dcfce7',
  				'200': '#bbf7d0',
  				'300': '#86efac',
  				'400': '#4ade80',
  				'500': '#22c55e',
  				'600': '#16a34a',
  				'700': '#15803d',
  				'800': '#166534',
  				'900': '#14532d',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				'50': '#fefce8',
  				'100': '#fef9c3',
  				'200': '#fef08a',
  				'300': '#fde047',
  				'400': '#facc15',
  				'500': '#eab308',
  				'600': '#ca8a04',
  				'700': '#a16207',
  				'800': '#854d0e',
  				'900': '#713f12',
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-manrope)',
  				'Manrope',
  				'system-ui',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'Inter',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-rubik)',
					'Rubik',
					'Poppins',
				// Work Sans for headings (fallbacks included)
				'"Work Sans"',
  				'system-ui',
  				'sans-serif'
  			],
  			rubik: [
				'var(--font-rubik)',
				'Rubik',
				'system-ui',
				'sans-serif'
			],
			mono: [
  			work: [
				'"Work Sans"',
				'var(--font-manrope)',
				'system-ui',
				'sans-serif'
			],
				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		fontSize: {
  			// Modern typography scale for web
  			'xs': ['12px', { lineHeight: '16px', letterSpacing: '0.5px' }],
  			'sm': ['14px', { lineHeight: '20px', letterSpacing: '0.25px' }],
  			'base': ['16px', { lineHeight: '24px', letterSpacing: '0px' }],
  			'lg': ['18px', { lineHeight: '28px', letterSpacing: '-0.25px' }],
  			'xl': ['20px', { lineHeight: '30px', letterSpacing: '-0.5px' }],
  			'2xl': ['24px', { lineHeight: '32px', letterSpacing: '-0.5px' }],
  			'3xl': ['30px', { lineHeight: '36px', letterSpacing: '-0.75px' }],
  			'4xl': ['36px', { lineHeight: '44px', letterSpacing: '-1px' }],
  			'5xl': ['42px', { lineHeight: '48px', letterSpacing: '-1.5px' }],
  			'6xl': ['48px', { lineHeight: '56px', letterSpacing: '-2px' }],
  			'7xl': ['56px', { lineHeight: '64px', letterSpacing: '-2.5px' }],
  			'8xl': ['64px', { lineHeight: '72px', letterSpacing: '-3px' }],
  			'9xl': ['72px', { lineHeight: '80px', letterSpacing: '-3px' }],
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  			'hero-pattern': "url('/images/hero-bg.svg')"
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.5s ease-in-out',
  			'slide-up': 'slideUp 0.5s ease-out',
  			'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
