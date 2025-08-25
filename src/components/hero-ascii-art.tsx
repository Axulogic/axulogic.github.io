"use client";
import { cn } from '@/lib/utils';
import { AnimatedContent } from './animated-content';
interface HeroAsciiArtProps {
  artContent: string;
}
export function HeroAsciiArt({ artContent }: HeroAsciiArtProps) {
  return (
    <AnimatedContent 
        useObserver={true}
        className="absolute top-0 right-0 h-[120dvh] w-1/2 pointer-events-none z-0"
        style={{
            maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
        }}
    >
      <pre 
          className={cn(
              "font-code text-[8px] leading-[8px] text-primary h-full w-full",
              "transform-gpu scale-[0.3] lg:scale-[0.4] -translate-x-[25%] -translate-y-[25%]",
              "opacity-30 lg:opacity-100",
              "[--glow-color:hsl(var(--primary))]",
              "drop-shadow-[0_0_0.3px_var(--glow-color)]",
              "transition-all duration-500 ease-in-out"
            )}
      >
          {artContent}
      </pre>
    </AnimatedContent>
  );
}
