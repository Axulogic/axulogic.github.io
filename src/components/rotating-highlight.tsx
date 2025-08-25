"use client";

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface RotatingHighlightProps {
  words: string[];
  interval?: number;
  className?: string;
}

export function RotatingHighlight({ words, interval = 5000, className }: RotatingHighlightProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayText, setDisplayText] = useState(words[0]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      const hackEffect = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*';
        let iterations = 0;
        const maxIterations = 10;
        
        const hackInterval = setInterval(() => {
          const randomText = words[(currentIndex + 1) % words.length]
            .split('')
            .map((char, index) => {
              if (iterations < maxIterations - index) {
                return chars[Math.floor(Math.random() * chars.length)];
              }
              return char;
            })
            .join('');
          
          setDisplayText(randomText);
          iterations++;
          
          if (iterations >= maxIterations + words[(currentIndex + 1) % words.length].length) {
            clearInterval(hackInterval);
            setDisplayText(words[(currentIndex + 1) % words.length]);
            setCurrentIndex((prev) => (prev + 1) % words.length);
            setIsTransitioning(false);
          }
        }, 50);
      };
      
      setTimeout(hackEffect, 200);
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, interval, words]);

  return (
    <span 
      className={cn(
        "inline-block transition-all duration-300",
        isTransitioning && "glitch-effect",
        className
      )}
      style={{
        minWidth: `${Math.max(...words.map(w => w.length)) * 0.6}em`,
        display: 'inline-block'
      }}
    >
      {displayText}
    </span>
  );
}
