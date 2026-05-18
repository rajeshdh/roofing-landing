'use client';

import dynamic from 'next/dynamic';

const ThreeHeroCanvas = dynamic(() => import('./ThreeHeroCanvas'), { ssr: false });

export default function ThreeHeroCanvasWrapper() {
  return <ThreeHeroCanvas />;
}
