import { Syne, Mulish, Bebas_Neue, DM_Mono } from 'next/font/google';
import localFont from 'next/font/local';

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
  src: '../public/fonts/Orbitronio.ttf',
  variable: '--font-orbitronio',
  display: 'swap',
});

export const infiniteBeyond = localFont({
  src: '../public/fonts/Ethnocentric-Regular.otf',
  variable: '--font-infinite-beyond',
  display: 'swap',
});

export const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
export const dmMono = DM_Mono({ weight: '400', subsets: ['latin'], variable: '--font-dm-mono' });