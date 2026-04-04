import { Syne } from 'next/font/google';
import { Mulish } from 'next/font/google';
import { Bebas_Neue, DM_Mono } from 'next/font/google';
import CustomCursor from '@/components/CustomCursor';
import NavigationWrapper from '@/components/NavigationWrapper';
import localFont from 'next/font/local'


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
});

export const orbitronio = localFont({
  src: './fonts/Orbitronio.ttf',
  variable: '--font-orbitronio', // This creates a CSS variable we can use in Tailwind
  display: 'swap',
});

export const infiniteBeyond = localFont({
  src: './fonts/Ethnocentric-Regular.otf',
  variable: '--font-infinite-beyond',
  display: 'swap',
});


export const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
export const dmMono = DM_Mono({ weight: '400', subsets: ['latin'], variable: '--font-dm-mono' });


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{cursor: "none"}} className={` bg-black text-white ${bebas.variable} ${dmMono.variable} ${infiniteBeyond.variable} cursor-none`}>
        <CustomCursor />
        <NavigationWrapper />
        {children}
      </body>
    </html>
  );
}