import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				DEFAULT: '#008000',
  				foreground: '#ffffff'
  			},
  			background: '#000000',
  			foreground: '#ffffff',
  			accent: {
  				DEFAULT: '#00b050',
  				foreground: '#ffffff'
  			},
  			muted: {
  				DEFAULT: '#666666',
  				foreground: '#cccccc'
  			},
  			destructive: {
  				DEFAULT: '#ff0000',
  				foreground: '#ffffff'
  			},
  			border: '#444444',
  			input: '#333333',
  			ring: '#008000',
  			card: {
  				DEFAULT: '#ffffff',
  				foreground: '#000000'
  			},
  			popover: {
  				DEFAULT: '#ffffff',
  				foreground: '#000000'
  			}
  		},
  		borderRadius: {
  			lg: '12px',
  			md: '8px',
  			sm: '4px'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require('daisyui'),],
} satisfies Config;
