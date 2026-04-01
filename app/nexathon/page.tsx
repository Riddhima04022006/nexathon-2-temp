"use client";

import dynamic from 'next/dynamic';
import FixedNavbar from '../../components/FixedNavbar';

const SpaceShuttleScene = dynamic(() => import('../../components/SpaceShuttleScene'), {
  ssr: false,
});

export default function NexathonPage() {
  return (
    <main className="w-full h-screen bg-black overflow-hidden relative selection:bg-white/20">
      <SpaceShuttleScene />
      <FixedNavbar />
    </main>
  );
}
