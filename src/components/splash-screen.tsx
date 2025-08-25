"use client";

import { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { HackerText } from './hacker-text';

interface SplashScreenProps {
  isLoading: boolean;
  onLoadingFinished: () => void;
  dictionary?: {
    splash: {
      bootSequence: string[];
    };
  };
}

const defaultBootSequence = [
  "Axulogic OS v2.7.1 INITIALIZING...",
  "MEMORY CHECK: 256TB ECC RAM...",
  "CPU: Quantum Core x128 @ 8.2 THz...",
  "GPU: Photonic Co-processor Array...",
  "Connecting to global mesh network...",
  "Auth systems online...",
  "Welcome, Operator.",
];

export function SplashScreen({ isLoading, onLoadingFinished, dictionary }: SplashScreenProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  
  const bootSequence = dictionary?.splash?.bootSequence || defaultBootSequence;

  useEffect(() => {
    if (isLoading) {
      const totalDuration = 5000;
      const delayPerLine = totalDuration / bootSequence.length;

      const lineTimers = bootSequence.map((_, index) => 
        setTimeout(() => {
          setVisibleLines(prev => [...prev, index]);
        }, index * delayPerLine)
      );

      const fadeOutTimer = setTimeout(() => {
        onLoadingFinished();
      }, totalDuration + 500);

      return () => {
        lineTimers.forEach(clearTimeout);
        clearTimeout(fadeOutTimer);
      };
    }
  }, [isLoading, onLoadingFinished, bootSequence]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-500",
        !isLoading ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
    >
       <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
       <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50"></div>
       <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50"></div>
       <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>

      <div className="w-96 flex flex-col items-center gap-6 text-center">
        <div className="font-code text-xs text-left w-full h-48 overflow-hidden">
          {bootSequence.map((line, index) => (
            <div 
              key={line}
              className={cn(
                "flex justify-between transition-opacity duration-300",
                visibleLines.includes(index) ? "opacity-100" : "opacity-0"
              )}
            >
              {index < bootSequence.length - 1 ? (
                <HackerText text={line} />
              ) : (
                <p className="text-primary font-bold">{line}</p> 
              )}
              <span className={cn(
                  "text-green-400 transition-opacity duration-150 pl-2", 
                  visibleLines.includes(index) ? "opacity-100" : "opacity-0"
              )}>
                  {line !== "Welcome, Operator." ? "[OK]" : "[DONE]"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
