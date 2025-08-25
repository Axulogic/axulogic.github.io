"use client";
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
interface AsciiArtProps {
  artContentWhite: string;
  artContentBlack: string;
  className?: string;
}
export function AsciiArt({ artContentWhite, artContentBlack, className }: AsciiArtProps) {
  const { resolvedTheme } = useTheme();
  const [currentArt, setCurrentArt] = useState(artContentBlack);
  useEffect(() => {
    setCurrentArt(resolvedTheme === 'dark' ? artContentBlack : artContentWhite);
  }, [resolvedTheme, artContentWhite, artContentBlack]);
  return (
    <div className={cn("w-full h-full", className)}>
        <pre className={cn("font-code text-[4px] leading-[4px] text-primary origin-top-center scale-[0.6] h-full w-full")}>
            {currentArt}
        </pre>
    </div>
  );
}
