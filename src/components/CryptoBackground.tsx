import { useEffect, useRef, useState } from "react";

interface CryptoCoin {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  baseVx: number;
  baseVy: number;
  rotation: number;
  rotationSpeed: number;
  type: 'btc' | 'eth' | 'usdc' | 'usdt';
}

const CryptoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const coinsRef = useRef<CryptoCoin[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const imagesRef = useRef<{ [key: string]: HTMLImageElement }>({});
  const imagesLoadedRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Preload crypto coin images as SVG data URLs
    const coinSVGs: { [key: string]: string } = {
      btc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#F7931A"/><path fill="#FFF" d="M22.5 14.1c.3-2.1-1.3-3.2-3.4-4l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.9-.2-1.4-.4l.7-2.8-1.7-.4-.7 2.8c-.4-.1-.7-.2-1.1-.3l-2.4-.6-.5 1.8s1.3.3 1.2.3c.7.2.8.6.8 1l-.8 3.2c0 0 .1 0 .2.1l-.2 0-1.1 4.5c-.1.2-.3.5-.8.4 0 0-1.2-.3-1.2-.3l-.8 2 2.2.6c.4.1.8.2 1.2.3l-.7 2.9 1.7.4.7-2.8c.5.1 1 .2 1.4.3l-.7 2.8 1.7.4.7-2.9c3 .6 5.2.3 6.2-2.4.7-2.1 0-3.4-1.6-4.2 1.1-.3 2-1.1 2.2-2.7zm-4 5.5c-.5 2.1-4 1-5.2.7l.9-3.8c1.2.3 4.8.9 4.3 3.1zm.5-5.6c-.5 1.9-3.4.9-4.3.7l.8-3.4c1 .2 4 .7 3.5 2.7z"/></svg>`,
      eth: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#627EEA"/><path fill="#FFF" fill-opacity=".6" d="M16.5 4v8.9l7.5 3.3z"/><path fill="#FFF" d="M16.5 4L9 16.2l7.5-3.3z"/><path fill="#FFF" fill-opacity=".6" d="M16.5 21.9v6.1l7.5-10.4z"/><path fill="#FFF" d="M16.5 28v-6.1L9 17.6z"/><path fill="#FFF" fill-opacity=".2" d="M16.5 20.6l7.5-4.4-7.5-3.3z"/><path fill="#FFF" fill-opacity=".6" d="M9 16.2l7.5 4.4v-7.7z"/></svg>`,
      usdc: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#2775CA"/><path fill="#FFF" d="M20.5 18.2c0-2-1.2-2.7-3.7-3-.9-.2-1.9-.4-1.9-1.1 0-.7.6-1 1.6-1 .9 0 1.4.3 1.7.9.1.1.2.2.3.2h1.4c.2 0 .3-.1.3-.3-.2-1.2-1.1-2-2.4-2.3v-1.4c0-.2-.1-.3-.3-.3h-1.3c-.2 0-.3.1-.3.3v1.3c-1.7.3-2.8 1.4-2.8 2.8 0 2 1.2 2.6 3.7 3 .8.2 1.9.5 1.9 1.2 0 .8-.7 1.2-1.8 1.2-1.3 0-1.8-.5-2-1.2 0-.1-.2-.2-.3-.2h-1.5c-.2 0-.3.1-.3.3.3 1.4 1.3 2.3 3 2.6v1.4c0 .2.1.3.3.3h1.3c.2 0 .3-.1.3-.3v-1.4c1.7-.3 2.8-1.4 2.8-3zm-4.5 7.8c-5.5 0-10-4.5-10-10s4.5-10 10-10 10 4.5 10 10-4.5 10-10 10zm0-18.5c-4.7 0-8.5 3.8-8.5 8.5s3.8 8.5 8.5 8.5 8.5-3.8 8.5-8.5-3.8-8.5-8.5-8.5z"/></svg>`,
      usdt: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><circle cx="16" cy="16" r="16" fill="#26A17B"/><path fill="#FFF" d="M17.9 17.9v-.1c-.1 0-.8-.1-2 0-1 0-1.6.1-1.7.1v.1c-3.5-.2-6.1-.8-6.1-1.6 0-.8 2.6-1.4 6.1-1.6v2.5c.1 0 .8.1 1.8.1 1.1 0 1.8 0 1.9-.1v-2.5c3.5.2 6.1.8 6.1 1.6.1.7-2.5 1.3-6.1 1.5zm0-3.5v-2.2h5.4V9H8.8v3.2h5.4v2.2c-4 .2-7 1-7 2s3 1.8 7 2v7.1h3.8v-7.1c4-.2 6.9-1 6.9-2s-3-1.8-7-2z"/></svg>`
    };

    const loadImages = () => {
      const types = ['btc', 'eth', 'usdc', 'usdt'];
      let loaded = 0;
      
      types.forEach(type => {
        const img = new Image();
        const svgBlob = new Blob([coinSVGs[type]], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        img.onload = () => {
          loaded++;
          if (loaded === types.length) {
            imagesLoadedRef.current = true;
          }
        };
        img.src = url;
        imagesRef.current[type] = img;
      });
    };

    loadImages();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const coinTypes: CryptoCoin['type'][] = ['btc', 'eth', 'usdc', 'usdt'];

    const resizeCanvas = () => {
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initCoins();
    };

    const initCoins = () => {
      const baseCount = isMobile ? 15 : 35;
      const coinCount = Math.min(baseCount, Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 30000 : 20000)));
      coinsRef.current = Array.from({ length: coinCount }, () => {
        const vx = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5);
        const vy = (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5);
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          size: Math.random() * (isMobile ? 20 : 30) + (isMobile ? 15 : 20),
          opacity: Math.random() * 0.4 + 0.2,
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.02,
          type: coinTypes[Math.floor(Math.random() * coinTypes.length)],
        };
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
      }
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    if (!isMobile) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseleave", handleMouseLeave);
    }

    const mouseInfluenceRadius = 150;
    const mouseRepelStrength = 0.6;

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (!imagesLoadedRef.current) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }

      const mouse = mouseRef.current;

      coinsRef.current.forEach((coin) => {
        // Mouse interaction - repel coins (desktop only)
        if (mouse.active && !isMobile) {
          const dx = coin.x - mouse.x;
          const dy = coin.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluenceRadius && distance > 0) {
            const force = (1 - distance / mouseInfluenceRadius) * mouseRepelStrength;
            coin.vx += (dx / distance) * force;
            coin.vy += (dy / distance) * force;
          }
        }

        // Gradually return to base velocity
        coin.vx += (coin.baseVx - coin.vx) * 0.02;
        coin.vy += (coin.baseVy - coin.vy) * 0.02;

        // Update position
        coin.x += coin.vx;
        coin.y += coin.vy;

        // Update rotation
        coin.rotation += coin.rotationSpeed;

        // Wrap around edges
        if (coin.x < -coin.size) coin.x = window.innerWidth + coin.size;
        if (coin.x > window.innerWidth + coin.size) coin.x = -coin.size;
        if (coin.y < -coin.size) coin.y = window.innerHeight + coin.size;
        if (coin.y > window.innerHeight + coin.size) coin.y = -coin.size;

        // Draw coin with rotation and glow
        ctx.save();
        ctx.translate(coin.x, coin.y);
        ctx.rotate(coin.rotation);
        ctx.globalAlpha = coin.opacity;

        // Draw glow effect (desktop only)
        if (!isMobile) {
          ctx.shadowColor = coin.type === 'btc' ? '#F7931A' : 
                           coin.type === 'eth' ? '#627EEA' : 
                           coin.type === 'usdc' ? '#2775CA' : '#26A17B';
          ctx.shadowBlur = 15;
        }

        const img = imagesRef.current[coin.type];
        if (img) {
          ctx.drawImage(img, -coin.size / 2, -coin.size / 2, coin.size, coin.size);
        }

        ctx.restore();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (!isMobile) {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseleave", handleMouseLeave);
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isMobile]);

  return (
    <>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0a0f1a] to-[#0d1117]" />
      
      {/* Canvas for animated crypto coins */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ 
          opacity: isMobile ? 0.6 : 0.8,
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Subtle radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(247,147,26,0.04)_0%,transparent_40%)] pointer-events-none" />
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />
    </>
  );
};

export default CryptoBackground;
