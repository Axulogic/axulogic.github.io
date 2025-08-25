
"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface HackerTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  text: string;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;':,./<>?";

let audioContext: AudioContext | null = null;
let audioInitialized = false;

const initAudioContext = () => {
    if (typeof window !== 'undefined' && !audioContext && !audioInitialized) {
        try {
            audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            audioInitialized = true;
        } catch(e) {
            console.error("Web Audio API is not supported in this browser");
            audioInitialized = true;
        }
    }
}

const playSound = () => {
    if (!audioContext) return;
    
    try {
        if (audioContext.state === 'suspended') {
            audioContext.resume().catch(() => {
            });
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + 0.05);

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
    } catch(e) {
    }
}

export function HackerText({ text, className, ...props }: HackerTextProps) {
  const [displayedText, setDisplayedText] = useState("");
  const requestRef = useRef<number>();
  const lastTimeRef = useRef<number>();
  const progressRef = useRef(0);

  useEffect(() => {
    const handleUserInteraction = () => {
      initAudioContext();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, []);

  const animate = useCallback((time: number) => {
    if (lastTimeRef.current === undefined) {
      lastTimeRef.current = time;
    }

    const deltaTime = time - lastTimeRef.current;
    
    progressRef.current += deltaTime * 0.05; 

    let newText = "";
    let soundPlayed = false;
    for (let i = 0; i < text.length; i++) {
      if (i < progressRef.current) {
        newText += text[i];
      } else {
        if (!soundPlayed) {
            playSound();
            soundPlayed = true;
        }
        newText += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    setDisplayedText(newText);

    if (progressRef.current < text.length) {
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      setDisplayedText(text);
    }
  }, [text]);

  useEffect(() => {
    progressRef.current = 0;
    lastTimeRef.current = undefined;
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }
    setDisplayedText("");
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [animate, text]);

  return (
    <p className={cn(className)} {...props}>
      {displayedText}
    </p>
  );
}
