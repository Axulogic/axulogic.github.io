"use client";
import { useRef, useEffect, type ReactNode, type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
interface AnimatedContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isVisible?: boolean;
  useObserver?: boolean;
}
export function AnimatedContent({ children, className, isVisible, useObserver = false, ...props }: AnimatedContentProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!useObserver || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );
    observer.observe(ref.current);
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [useObserver]);
  const combinedClassName = cn(
    'animated-content',
    { 'is-visible': isVisible },
    className
  );
  return (
    <div ref={ref} className={combinedClassName} {...props}>
      {children}
    </div>
  );
}
    