'use client';

import { usePathname } from 'next/navigation';
import StaggeredMenu from './Navigation3';

export default function NavigationWrapper() {
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', ariaLabel: 'Home', link: '/nexathon' },
    { label: 'Structure', ariaLabel: 'Structure', link: '/structure' },
    { label: 'Sponsors', ariaLabel: 'Sponsors', link: '/sponsors' },
    { label: 'Flashback', ariaLabel: 'Flashback', link: '/flashback' }
  ];

  const socialItems = [
    { label: 'Twitter', link: '#' },
    { label: 'Discord', link: '#' },
    { label: 'GitHub', link: '#' }
  ];

  return <StaggeredMenu items={navItems} socialItems={socialItems} isFixed={true} logoUrl="" />;
}
