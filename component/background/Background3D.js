"use client";
import { useEffect, useRef } from "react";

const CONFIG = {
  count: 280,
  maxDist: 180,
  speed: 0.4,
  particleColor: "255, 255, 255",
  lineOpacity: 0.65,
  particleOpacity: 1,
  particleSize: 2.5,
};

export default function Background3D() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let particles = [];
    let mouse = { x: null, y: null };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = null; mouse.y = null; };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);

    const init = () => {
      particles = Array.from({ length: CONFIG.count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * CONFIG.speed,
        vy: (Math.random() - 0.5) * CONFIG.speed,
        r: Math.random() * CONFIG.particleSize + 0.8,
      }));
    };
    init();

    const drawLine = (x1, y1, x2, y2, opacity) => {
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.strokeStyle = `rgba(${CONFIG.particleColor}, ${opacity})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Subtle dark overlay → tạo độ sâu, làm particle trắng nổi bật trên cyan
      ctx.fillStyle = "rgba(0, 30, 60, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.particleColor}, ${CONFIG.particleOpacity})`;
        ctx.fill();

        // particle–particle connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONFIG.maxDist) {
            drawLine(p.x, p.y, p2.x, p2.y, CONFIG.lineOpacity * (1 - dist / CONFIG.maxDist));
          }
        }

        // particle–mouse connections
        if (mouse.x !== null) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const mouseDist = CONFIG.maxDist * 1.6;
          if (dist < mouseDist) {
            drawLine(p.x, p.y, mouse.x, mouse.y, 0.5 * (1 - dist / mouseDist));
          }
        }
      }

      // mouse dot
      if (mouse.x !== null) {
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${CONFIG.particleColor}, 0.8)`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
