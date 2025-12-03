import { useEffect, useRef } from "react";

export default function TriangleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    // Layered depth count
    const LAYERS = [
      { count: 10, speed: 4.0, size: [40, 80], opacity: 1 },  // Background
      { count: 10, speed: 4.5, size: [120, 220], opacity: 1 }, // Mid
      { count: 10, speed: 3.5, size: [150, 250], opacity: 1 },  // Foreground
    ];

    const COLORS = ["#5e60ce", "#4361ee", "#4cc9f0", "#4895ef"];

    const rand = (min, max) => Math.random() * (max - min) + min;

    class Triangle {
      constructor(layer) {
        const [minSize, maxSize] = layer.size;

        this.layer = layer;
        this.size = rand(minSize, maxSize);

        // Position
        this.x = rand(0, canvas.width);
        this.y = rand(0, canvas.height);

        // Movement
        this.vx = rand(-1, 1) * layer.speed;
        this.vy = rand(-1, 1) * layer.speed;
        this.angle = rand(0, Math.PI * 2);
        this.rotationSpeed = rand(-0.005, 0.005) * layer.speed;

        // Depth-level amplitude wave
        this.waveOffset = rand(0, 10);
        this.waveSpeed = rand(0.005, 0.015);

        // Color
        this.color = COLORS[Math.floor(rand(0, COLORS.length))];

        // Opacity pulsing effect
        this.opacityPulse = rand(0.3, 0.8);
        this.opacitySpeed = rand(0.001, 0.004);
      }

      update() {
        // Base movement
        this.x += this.vx;
        this.y += this.vy;

        // Gentle drifting (sin wave)
        this.y += Math.sin(this.waveOffset) * 0.3;
        this.waveOffset += this.waveSpeed;

        // Rotation
        this.angle += this.rotationSpeed;

        // Glowing pulse effect
        this.opacityPulse += this.opacitySpeed;
        if (this.opacityPulse > 1 || this.opacityPulse < 0.3) {
          this.opacitySpeed *= -1;
        }

        // Bounds wrap instead of bounce
        if (this.x < -200) this.x = canvas.width + 200;
        if (this.x > canvas.width + 200) this.x = -200;
        if (this.y < -200) this.y = canvas.height + 200;
        if (this.y > canvas.height + 200) this.y = -200;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        const opacity =
          (this.layer.opacity ?? 1) * this.opacityPulse * (this.layer.speed + 0.4);

        // Solid color for bright effect (no glow/gradient)
        ctx.fillStyle = this.color;

        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.closePath();

        ctx.globalAlpha = opacity > 1 ? 1 : opacity;
        ctx.fill();
        ctx.restore();
      }
    }

    // Build layered triangles
    const triangles = [];
    LAYERS.forEach((layer) => {
      for (let i = 0; i < layer.count; i++) {
        triangles.push(new Triangle(layer));
      }
    });

    let lastTime = 0;
    const FPS = 30;
    const interval = 1000 / FPS;
    let isVisible = true;

    // Visibility optimization
    const observer = new IntersectionObserver(
      ([entry]) => (isVisible = entry.isIntersecting),
      { threshold: 0.5 }
    );
    observer.observe(canvas);

    const animate = (t) => {
      if (isVisible && t - lastTime > interval) {
        ctx.fillStyle = "rgba(17,17,17,0.22)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        triangles.forEach((tri) => {
          tri.update();
          tri.draw();
        });

        lastTime = t;
      }

      requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);

    // Debounced resize
    let resizeTimeout;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resizeCanvas();
      }, 200);
    };

    window.addEventListener("resize", onResize);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="max-w-[1080px] h-[500px] blur-3xl">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
