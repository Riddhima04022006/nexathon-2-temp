'use client';

import { usePathname } from 'next/navigation';
import NavigationWrapper from '@/components/NavigationWrapper';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = pathname === '/sponsor';

  return (
    <>
      {!hideNav && <NavigationWrapper />}
      {children}
    </>
  );
}