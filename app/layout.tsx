import { Syne, Mulish, Bebas_Neue, DM_Mono } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import localFont from 'next/font/local';
import type { Viewport, Metadata } from 'next';

import './globals.css';

export const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
});

export const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '700', '800'],
  display: 'swap',
  variable: '--font-syne',
});

export const orbitronio = localFont({
  src: './fonts/Orbitronio.ttf',
  variable: '--font-orbitronio',
  display: 'swap',
});

export const infiniteBeyond = localFont({
  src: './fonts/Ethnocentric-Regular.otf',
  variable: '--font-infinite-beyond',
  display: 'swap',
});

export const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
export const dmMono = DM_Mono({ weight: '400', subsets: ['latin'], variable: '--font-dm-mono' });

export const metadata: Metadata = {
  title: "Nexathon v2.0",
  description: "Official platform for Nexathon v2.0",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{ cursor: 'none' }}
        className={`bg-black text-white ${bebas.variable} ${dmMono.variable} ${infiniteBeyond.variable} ${mulish.variable} ${syne.variable} ${orbitronio.variable} cursor-none`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}