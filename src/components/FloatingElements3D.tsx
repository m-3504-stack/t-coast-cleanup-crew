import { useEffect, useRef } from "react";

interface FloatingElement {
  x: number;
  y: number;
  z: number;
  size: number;
  speedX: number;
  speedY: number;
  rotationSpeed: number;
  rotation: number;
  shape: "circle" | "triangle" | "square" | "hexagon";
  opacity: number;
}

export function FloatingElements3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const elementsRef = useRef<FloatingElement[]>([]);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize floating elements
    const shapes: FloatingElement["shape"][] = ["circle", "triangle", "square", "hexagon"];
    elementsRef.current = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 100,
      size: 20 + Math.random() * 40,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.3,
      rotationSpeed: (Math.random() - 0.5) * 0.02,
      rotation: Math.random() * Math.PI * 2,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      opacity: 0.03 + Math.random() * 0.08,
    }));

    const drawShape = (el: FloatingElement) => {
      ctx.save();
      ctx.translate(el.x, el.y);
      ctx.rotate(el.rotation);
      
      // 3D depth effect
      const scale = 0.5 + (el.z / 100) * 0.5;
      ctx.scale(scale, scale);
      
      ctx.globalAlpha = el.opacity * (0.5 + (el.z / 100) * 0.5);
      ctx.strokeStyle = "hsl(var(--primary))";
      ctx.lineWidth = 1.5;
      ctx.fillStyle = "hsl(var(--primary) / 0.05)";

      switch (el.shape) {
        case "circle":
          ctx.beginPath();
          ctx.arc(0, 0, el.size / 2, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          break;
        case "triangle":
          ctx.beginPath();
          ctx.moveTo(0, -el.size / 2);
          ctx.lineTo(el.size / 2, el.size / 2);
          ctx.lineTo(-el.size / 2, el.size / 2);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
        case "square":
          ctx.beginPath();
          ctx.rect(-el.size / 2, -el.size / 2, el.size, el.size);
          ctx.fill();
          ctx.stroke();
          break;
        case "hexagon":
          ctx.beginPath();
          for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i - Math.PI / 2;
            const x = Math.cos(angle) * (el.size / 2);
            const y = Math.sin(angle) * (el.size / 2);
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
          break;
      }
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      elementsRef.current.forEach((el) => {
        // Update position
        el.x += el.speedX;
        el.y += el.speedY;
        el.rotation += el.rotationSpeed;
        el.z += (Math.random() - 0.5) * 0.5;
        el.z = Math.max(0, Math.min(100, el.z));

        // Wrap around screen
        if (el.x < -el.size) el.x = canvas.width + el.size;
        if (el.x > canvas.width + el.size) el.x = -el.size;
        if (el.y < -el.size) el.y = canvas.height + el.size;
        if (el.y > canvas.height + el.size) el.y = -el.size;

        drawShape(el);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.6 }}
    />
  );
}
