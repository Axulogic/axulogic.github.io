"use client";

import { useRef, useEffect } from 'react';
import { useTheme } from 'next-themes';

export function InteractiveGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let dots: any[] = [];
    let circuits: any[] = [];
    let ripples: any[] = [];
    const mouse = { x: -9999, y: -9999 };

    const GRID_SIZE = 30;
    const MOUSE_RADIUS = 150;
    const DOT_BASE_RADIUS = 1;
    const DOT_MAX_RADIUS = 3;
    const EASING_FACTOR = 0.08;

    let primaryColor = 'rgba(128, 255, 212, 1)'; 
    let backgroundColor = 'rgba(10, 10, 20, 1)';

    function getColors() {
        if (typeof window === 'undefined') return;
        const styles = getComputedStyle(document.documentElement);
        primaryColor = resolvedTheme === 'dark' ? `hsla(180, 95%, 60%, 1)` : `hsla(346.8, 77.2%, 49.8%, 1)`;
        backgroundColor = resolvedTheme === 'dark' ? `hsla(240, 10%, 3.9%, 1)`: `hsla(240, 10%, 99%, 1)`;
    }

    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas!.getBoundingClientRect();
        canvas!.width = rect.width * dpr;
        canvas!.height = rect.height * dpr;
        ctx!.scale(dpr, dpr);
        initDots();
    }

    function initDots() {
        dots = [];
        const cols = Math.floor(canvas!.offsetWidth / GRID_SIZE);
        const rows = Math.floor(canvas!.offsetHeight / GRID_SIZE);
        for (let i = 0; i <= cols; i++) {
            for (let j = 0; j <= rows; j++) {
                dots.push({ 
                    x: i * GRID_SIZE, 
                    y: j * GRID_SIZE,
                    radius: DOT_BASE_RADIUS,
                    opacity: 0.2
                });
            }
        }
    }

    function createCircuit() {
      if (circuits.length > 8) return;
      if (Math.random() > 0.03) return;

      const startDotIndex = Math.floor(Math.random() * dots.length);
      let endDotIndex = Math.floor(Math.random() * dots.length);

      while (startDotIndex === endDotIndex) {
          endDotIndex = Math.floor(Math.random() * dots.length);
      }
      
      const startDot = dots[startDotIndex];
      const endDot = dots[endDotIndex];

      if (!startDot || !endDot) return;


      const cornerDot = Math.random() > 0.5 
          ? { x: startDot.x, y: endDot.y }
          : { x: endDot.x, y: startDot.y };

      const path = [startDot, cornerDot, endDot];
      const totalLength = Math.abs(startDot.x - cornerDot.x) + Math.abs(startDot.y - cornerDot.y) +
                          Math.abs(cornerDot.x - endDot.x) + Math.abs(cornerDot.y - endDot.y);
      
      if (totalLength < GRID_SIZE * 2) return;

      circuits.push({
          path: path,
          progress: 0,
          speed: Math.random() * 0.008 + 0.005,
          lifespan: 1,
          fadeSpeed: 0.008,
      });
    }

    function handleMouseMove(e: MouseEvent) {
        const rect = canvas!.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    }

    function handleClick(e: MouseEvent) {
        const rect = canvas!.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const clickY = e.clientY - rect.top;
        
        for (let i = 0; i < 3; i++) {
            ripples.push({
                x: clickX,
                y: clickY,
                radius: 0,
                maxRadius: 200 + (i * 50),
                speed: 2 + (i * 0.5),
                opacity: 1 - (i * 0.2),
                fadeSpeed: 0.015 + (i * 0.005),
                delay: i * 5
            });
        }
    }

    function animate() {
      ctx!.clearRect(0, 0, canvas!.offsetWidth, canvas!.offsetHeight);
      
      dots.forEach(dot => {
          const dx = dot.x - mouse.x;
          const dy = dot.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          let targetRadius = DOT_BASE_RADIUS;
          let targetOpacity = 0.2;

          if (dist < MOUSE_RADIUS) {
              const proximity = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
              targetRadius = DOT_BASE_RADIUS + (DOT_MAX_RADIUS - DOT_BASE_RADIUS) * proximity;
              targetOpacity = 0.2 + 0.8 * proximity;
          }

          dot.radius += (targetRadius - dot.radius) * EASING_FACTOR;
          dot.opacity += (targetOpacity - dot.opacity) * EASING_FACTOR;
          
          ctx!.beginPath();
          ctx!.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
          ctx!.fillStyle = primaryColor.replace('1)', `${dot.opacity})`);
          ctx!.fill();
      });

      ripples.forEach(ripple => {
          if (ripple.delay > 0) {
              ripple.delay--;
              return;
          }
          
          ripple.radius += ripple.speed;
          ripple.opacity -= ripple.fadeSpeed;
          
          ctx!.beginPath();
          ctx!.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
          ctx!.strokeStyle = primaryColor.replace('1)', `${ripple.opacity * 0.6})`);
          ctx!.lineWidth = 2;
          ctx!.stroke();
          
          dots.forEach(dot => {
              const dx = dot.x - ripple.x;
              const dy = dot.y - ripple.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              
              if (dist >= ripple.radius - 30 && dist <= ripple.radius + 30) {
                  const rippleIntensity = ripple.opacity * 0.8;
                  const waveEffect = Math.sin((dist - ripple.radius) * 0.15) * rippleIntensity;
                  
                  dot.radius += waveEffect * 0.8;
                  dot.opacity += waveEffect * 0.4;
                  
                  dot.radius = Math.max(DOT_BASE_RADIUS, Math.min(DOT_MAX_RADIUS * 2.5, dot.radius));
                  dot.opacity = Math.max(0.1, Math.min(1, dot.opacity));
              }
          });
      });

      createCircuit();
      circuits = circuits.filter(circuit => circuit.lifespan > 0);
      
      ripples = ripples.filter(ripple => ripple.opacity > 0);

      circuits.forEach(circuit => {
          circuit.progress += circuit.speed;
          circuit.lifespan -= circuit.fadeSpeed;

          if(circuit.progress > 1) circuit.progress = 1;
          
          ctx!.beginPath();
          let currentX = circuit.path[0].x;
          let currentY = circuit.path[0].y;
          let remainingProgress = circuit.progress;
          
          let particleX = -1, particleY = -1;
          
          const pathStart = circuit.path[0];
          const pathCorner = circuit.path[1];
          const pathEnd = circuit.path[2];

          const firstSegmentLength = Math.abs(pathCorner.x - pathStart.x) + Math.abs(pathCorner.y - pathStart.y);
          const secondSegmentLength = Math.abs(pathEnd.x - pathCorner.x) + Math.abs(pathEnd.y - pathCorner.y);
          const totalLength = firstSegmentLength + secondSegmentLength;

          if (totalLength === 0) return;

          const progressInPixels = circuit.progress * totalLength;
          
          let pX = pathStart.x;
          let pY = pathStart.y;

          if (progressInPixels <= firstSegmentLength) {
              const segmentProgress = progressInPixels / firstSegmentLength;
              pX = pathStart.x + (pathCorner.x - pathStart.x) * segmentProgress;
              pY = pathStart.y + (pathCorner.y - pathStart.y) * segmentProgress;
              ctx!.moveTo(pathStart.x, pathStart.y);
              ctx!.lineTo(pX, pY);
          } else {
              ctx!.moveTo(pathStart.x, pathStart.y);
              ctx!.lineTo(pathCorner.x, pathCorner.y);
              const remainingPixels = progressInPixels - firstSegmentLength;
              const segmentProgress = remainingPixels / secondSegmentLength;
              pX = pathCorner.x + (pathEnd.x - pathCorner.x) * segmentProgress;
              pY = pathCorner.y + (pathEnd.y - pathCorner.y) * segmentProgress;
              ctx!.lineTo(pX, pY);
          }
          
          particleX = pX;
          particleY = pY;

          
          ctx!.strokeStyle = primaryColor.replace('1)', `${circuit.lifespan * 0.5})`);
          ctx!.lineWidth = 1;
          ctx!.stroke();

          if (particleX !== -1) {
            ctx!.beginPath();
            ctx!.arc(particleX, particleY, 2, 0, Math.PI * 2);
            ctx!.fillStyle = primaryColor.replace('1)', `${circuit.lifespan})`);
            ctx!.fill();
          }
      });

      animationFrameId = requestAnimationFrame(animate);
    }
    
    getColors();
    resizeCanvas();
    animate();

    window.addEventListener('resize', resizeCanvas);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('click', handleClick);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('click', handleClick);
    };
  }, [resolvedTheme]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full -z-10" />;
}