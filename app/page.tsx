import ParallaxScene from '@/components/ParallaxScene';
import CustomCursor from '@/components/CustomCursor';

export default function LandingPage() {
  return (
    // ADD cursor-none HERE to hide the default operating system mouse
    <main className="cursor-none">
      
      {/* Our new smooth dot */}
      <CustomCursor />

      {/* The rest of the page (Galaxy, Death Star, Text) */}
      <ParallaxScene />
      
    </main>
  );
}