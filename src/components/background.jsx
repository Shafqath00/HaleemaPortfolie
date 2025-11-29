import { useEffect, useRef } from "react";

const TriangleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set canvas size to full container
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;
    const NUM_TRIANGLES = 20;

    const colors = ['#000000','#5e60ce', '#4361ee', '#000000', '#4cc9f0', '#4895ef', '#000000'];

    function random(min, max) {
      return Math.random() * (max - min) + min;
    }

    class Triangle {
      constructor() {
        this.size = random(80, 150);
        this.x = random(0, WIDTH);
        this.y = random(0, HEIGHT);
        this.vx = random(-1.5, 1.5);
        this.vy = random(-1.5, 1.5);
        this.angle = random(0, Math.PI * 2);
        this.rotationSpeed = random(-0.01, 0.01);
        this.color = colors[Math.floor(random(0, colors.length))];
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotationSpeed;

        // Bounce
        if (this.x < 0 || this.x > WIDTH) this.vx *= -1;
        if (this.y < 0 || this.y > HEIGHT) this.vy *= -1;
      }

      draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        ctx.moveTo(0, -this.size / 2);
        ctx.lineTo(-this.size / 2, this.size / 2);
        ctx.lineTo(this.size / 2, this.size / 2);
        ctx.closePath();

        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    const triangles = Array.from({ length: NUM_TRIANGLES }, () => new Triangle());

    function animate() {
      ctx.fillStyle = "rgba(17, 17, 17, 0.2)";
      ctx.fillRect(0, 0, WIDTH, HEIGHT);

      triangles.forEach(t => {
        t.update();
        t.draw(ctx);
      });

      requestAnimationFrame(animate);
    }

    animate();

    // Resize behavior (optional)
    const handleResize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full h-screen bg-[#111111] flex justify-center items-center overflow-hidden ">
      <div className="max-w-[1140px] h-[500px] blur-3xl">
        <canvas ref={canvasRef} className="w-full h-full block" />
      </div>
    </div>
  );
};

export default TriangleBackground;
