import { useEffect, useRef, useState } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  baseVx: number;
  baseVy: number;
}

const CryptoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const nodesRef = useRef<Node[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for performance optimization
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resizeCanvas = () => {
      // Use device pixel ratio for sharper rendering but limit on mobile
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(dpr, dpr);
      initNodes();
    };

    const initNodes = () => {
      // Fewer particles on mobile for better performance
      const baseCount = isMobile ? 40 : 120;
      const nodeCount = Math.min(baseCount, Math.floor((window.innerWidth * window.innerHeight) / (isMobile ? 15000 : 8000)));
      nodesRef.current = Array.from({ length: nodeCount }, () => {
        const vx = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4);
        const vy = (Math.random() - 0.5) * (isMobile ? 0.2 : 0.4);
        return {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          vx,
          vy,
          baseVx: vx,
          baseVy: vy,
          radius: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
          opacity: Math.random() * 0.4 + 0.15,
        };
      });
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking - desktop only for performance
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

    const connectionDistance = isMobile ? 80 : 120;
    const mouseInfluenceRadius = 200;
    const mouseRepelStrength = 0.8;

    let lastTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;

    const animate = (currentTime: number) => {
      // Frame rate limiting for mobile performance
      const deltaTime = currentTime - lastTime;
      if (deltaTime < frameInterval) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      lastTime = currentTime - (deltaTime % frameInterval);

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      const mouse = mouseRef.current;

      // Update and draw nodes
      nodesRef.current.forEach((node) => {
        // Mouse interaction - repel particles (desktop only)
        if (mouse.active && !isMobile) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluenceRadius && distance > 0) {
            const force = (1 - distance / mouseInfluenceRadius) * mouseRepelStrength;
            node.vx += (dx / distance) * force;
            node.vy += (dy / distance) * force;
          }
        }

        // Gradually return to base velocity
        node.vx += (node.baseVx - node.vx) * 0.02;
        node.vy += (node.baseVy - node.vy) * 0.02;

        // Update position
        node.x += node.vx;
        node.y += node.vy;

        // Wrap around edges
        if (node.x < 0) node.x = window.innerWidth;
        if (node.x > window.innerWidth) node.x = 0;
        if (node.y < 0) node.y = window.innerHeight;
        if (node.y > window.innerHeight) node.y = 0;

        // Draw node with glow effect
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, ${node.opacity})`;
        ctx.fill();
        
        // Subtle glow - skip on mobile for performance
        if (!isMobile) {
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(59, 130, 246, ${node.opacity * 0.3})`;
          ctx.fill();
        }
      });

      // Draw connections - fewer on mobile
      const maxConnections = isMobile ? nodesRef.current.length / 2 : nodesRef.current.length;
      for (let i = 0; i < maxConnections; i++) {
        for (let j = i + 1; j < maxConnections; j++) {
          const nodeA = nodesRef.current[i];
          const nodeB = nodesRef.current[j];
          if (!nodeA || !nodeB) continue;
          
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * (isMobile ? 0.08 : 0.12);
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw mouse connections to nearby nodes (desktop only)
      if (mouse.active && !isMobile) {
        nodesRef.current.forEach((node) => {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < mouseInfluenceRadius) {
            const opacity = (1 - distance / mouseInfluenceRadius) * 0.15;
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = 0.4;
            ctx.stroke();
          }
        });
      }

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
      
      {/* Canvas for animated nodes - optimized for mobile */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none will-change-transform"
        style={{ 
          opacity: isMobile ? 0.5 : 0.7,
          transform: 'translateZ(0)', // Force GPU acceleration
        }}
      />
      
      {/* Subtle radial gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.06)_0%,transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.04)_0%,transparent_40%)] pointer-events-none" />
      
      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-black/25 pointer-events-none" />
    </>
  );
};

export default CryptoBackground;
