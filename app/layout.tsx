import type { Metadata, Viewport } from 'next';
import { bebas, dmMono, infiniteBeyond } from '@/lib/fonts';
import CustomCursor from '@/components/CustomCursor';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Nexathon V2 | The Premier Web3 & AI Hackathon',
    template: '%s | Nexathon V2',
  },
  description: 'Join Nexathon V2, the ultimate destination for innovators. Build, compete, and scale your ideas in the next generation of technology.',
  metadataBase: new URL('https://nexathonv2.in'),
  keywords: ['Nexathon V2', 'Nexathon', 'Hackathon', 'AI', 'Innovation', 'Coding Competition'],
  authors: [{ name: 'Nexathon Team' }],
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Nexathon V2',
    description: 'Join Nexathon V2, the ultimate destination for innovators. Build, compete, and scale your ideas in the next generation of technology.',
    url: 'https://nexathonv2.in',
    siteName: 'Nexathon V2',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nexathon V2',
    description: 'Join Nexathon V2, the ultimate destination for innovators. Build, compete, and scale your ideas in the next generation of technology.',
    creator: '@nexathon',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
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