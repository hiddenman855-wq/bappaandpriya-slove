import React, { useEffect, useRef } from 'react';

interface PetalsCanvasProps {
  reducedMotion: boolean;
}

interface Petal {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  sway: number;
  swaySpeed: number;
  type: 'petal' | 'heart';
}

export const PetalsCanvas: React.FC<PetalsCanvasProps> = ({ reducedMotion }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Create 18 gentle petals and 6 floating hearts
    const particlesCount = 22;
    const particles: Petal[] = [];

    for (let i = 0; i < particlesCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 8 + 6,
        speedY: Math.random() * 0.6 + 0.3,
        speedX: (Math.random() - 0.5) * 0.4,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 0.02,
        opacity: Math.random() * 0.4 + 0.2,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.02 + 0.01,
        type: i % 4 === 0 ? 'heart' : 'petal',
      });
    }

    const drawHeart = (context: CanvasRenderingContext2D, x: number, y: number, size: number, opacity: number) => {
      context.save();
      context.translate(x, y);
      context.beginPath();
      context.globalAlpha = opacity;
      context.fillStyle = '#E8A3B5';
      const topCurveHeight = size * 0.3;
      context.moveTo(0, topCurveHeight);
      context.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      context.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, (size + topCurveHeight) / 1.5, 0, size);
      context.bezierCurveTo(0, (size + topCurveHeight) / 1.5, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      context.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      context.closePath();
      context.fill();
      context.restore();
    };

    const drawPetal = (context: CanvasRenderingContext2D, p: Petal) => {
      context.save();
      context.translate(p.x, p.y);
      context.rotate(p.rotation);
      context.globalAlpha = p.opacity;

      // Soft rose petal gradient
      const grad = context.createRadialGradient(0, 0, 1, 0, 0, p.size);
      grad.addColorStop(0, '#FCE7EF');
      grad.addColorStop(0.7, '#E8A3B5');
      grad.addColorStop(1, '#A61B3C');
      context.fillStyle = grad;

      context.beginPath();
      context.ellipse(0, 0, p.size * 0.6, p.size, Math.PI / 4, 0, Math.PI * 2);
      context.fill();
      context.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.sway += p.swaySpeed;
        p.x += Math.sin(p.sway) * 0.6 + p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;

        if (p.type === 'heart') {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity);
        } else {
          drawPetal(ctx, p);
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
};
