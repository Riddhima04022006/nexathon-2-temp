import type { Metadata, Viewport } from 'next';
import { bebas, dmMono, infiniteBeyond } from '@/lib/fonts';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nexathon V2',
    template: '%s | Nexathon V2',
  },
  description: 'Official sit of Nexathon V2.',
  metadataBase: new URL('https://nexathonv2.in'),
  openGraph: {
    title: 'Nexathon V2',
    description: 'Official sit of Nexathon V2.',
    url: 'https://nexathonv2.in',
    siteName: 'Nexathon V2',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexathon V2',
    description: 'Official sit of Nexathon V2.',
  },
  robots: {
    index: true,
    follow: true,
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
        className={`bg-black text-white ${bebas.variable} ${dmMono.variable} ${infiniteBeyond.variable} cursor-none`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}