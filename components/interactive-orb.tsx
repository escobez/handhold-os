"use client";

import { useEffect, useRef } from "react";

export function InteractiveOrb() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Particle Sphere generation
    interface Point3D {
      x: number;
      y: number;
      z: number;
      baseX: number;
      baseY: number;
      baseZ: number;
      color: string;
      size: number;
    }

    const points: Point3D[] = [];
    const radius = Math.min(width, height) * 0.36;
    const count = 420;

    // Golden spiral sphere distribution (Fibonacci Sphere)
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
      const r = Math.sqrt(1 - y * y); // radius at y
      const theta = phi * i; // golden angle increment

      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      // Color variation between indigo, violet, and pearl white
      const rand = Math.random();
      let color = "rgba(165, 180, 252, 0.75)"; // indigo-200
      let size = 1.6;

      if (rand > 0.8) {
        color = "rgba(192, 132, 252, 0.85)"; // purple-400
        size = 2.2;
      } else if (rand > 0.6) {
        color = "rgba(255, 255, 255, 0.9)"; // pearl
        size = 2.0;
      } else if (rand < 0.2) {
        color = "rgba(99, 102, 241, 0.6)"; // indigo-500
        size = 1.3;
      }

      points.push({
        x: x * radius,
        y: y * radius,
        z: z * radius,
        baseX: x * radius,
        baseY: y * radius,
        baseZ: z * radius,
        color,
        size,
      });
    }

    let rotX = 0;
    let rotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - width / 2;
      const mouseY = e.clientY - rect.top - height / 2;
      targetRotY = (mouseX / width) * 1.2;
      targetRotX = -(mouseY / height) * 1.2;
    };

    window.addEventListener("mousemove", handleMouseMove);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
    };

    window.addEventListener("resize", handleResize);

    let angleAuto = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth interpolation for mouse orientation
      rotX += (targetRotX - rotX) * 0.05;
      rotY += (targetRotY - rotY) * 0.05;
      angleAuto += 0.004;

      const cosY = Math.cos(rotY + angleAuto);
      const sinY = Math.sin(rotY + angleAuto);
      const cosX = Math.cos(rotX * 0.6);
      const sinX = Math.sin(rotX * 0.6);

      const centerX = width / 2;
      const centerY = height / 2;

      // Draw subtle glowing halo behind the core
      const glowGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        radius * 0.1,
        centerX,
        centerY,
        radius * 1.4
      );
      glowGrad.addColorStop(0, "rgba(99, 102, 241, 0.15)");
      glowGrad.addColorStop(0.5, "rgba(79, 70, 229, 0.06)");
      glowGrad.addColorStop(1, "rgba(8, 10, 15, 0)");

      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 1.4, 0, Math.PI * 2);
      ctx.fill();

      // Sort points from back to front for depth
      const projectedPoints = points.map((p) => {
        // Rotate around Y axis
        const x1 = p.baseX * cosY - p.baseZ * sinY;
        const z1 = p.baseZ * cosY + p.baseX * sinY;

        // Rotate around X axis
        const y2 = p.baseY * cosX - z1 * sinX;
        const z2 = z1 * cosX + p.baseY * sinX;

        // Perspective projection
        const fov = 480;
        const scale = fov / (fov + z2);
        const projX = centerX + x1 * scale;
        const projY = centerY + y2 * scale;
        const alpha = Math.max(0.12, (z2 + radius) / (2 * radius));

        return {
          projX,
          projY,
          z: z2,
          scale,
          alpha,
          color: p.color,
          size: p.size * scale,
        };
      });

      projectedPoints.sort((a, b) => a.z - b.z);

      // Connect closest points with faint neural links
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedPoints.length; i += 3) {
        for (let j = i + 1; j < Math.min(i + 8, projectedPoints.length); j++) {
          const dx = projectedPoints[i].projX - projectedPoints[j].projX;
          const dy = projectedPoints[i].projY - projectedPoints[j].projY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 42) {
            const linkAlpha = (1 - dist / 42) * 0.18 * projectedPoints[i].alpha;
            ctx.strokeStyle = `rgba(165, 180, 252, ${linkAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projectedPoints[i].projX, projectedPoints[i].projY);
            ctx.lineTo(projectedPoints[j].projX, projectedPoints[j].projY);
            ctx.stroke();
          }
        }
      }

      // Draw points
      for (const p of projectedPoints) {
        ctx.beginPath();
        ctx.arc(p.projX, p.projY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full max-w-[620px] max-h-[620px] object-contain drop-shadow-[0_0_50px_rgba(99,102,241,0.2)]"
      />
    </div>
  );
}
