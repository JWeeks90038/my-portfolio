import { useEffect, useRef } from "react";
import "./SplashMatrix.css";

const MATRIX_CHARS = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズヅブプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function getRandomChar() {
  return MATRIX_CHARS[Math.floor(Math.random() * MATRIX_CHARS.length)];
}

export default function SplashMatrix({ onFinish }) {
  const rainRef = useRef();
  const splashRef = useRef();

  useEffect(() => {
    if (!rainRef.current || !splashRef.current) return;
    // Generate matrix columns
    const columns = Math.floor(window.innerWidth / 18);
    const drops = Array(columns).fill(1);

    let animationFrame;
    let running = true;

    function draw() {
      const ctx = rainRef.current.getContext("2d");
      ctx.fillStyle = "rgba(24,24,27,0.18)";
      ctx.fillRect(0, 0, rainRef.current.width, rainRef.current.height);

      ctx.font = "18px monospace";
      ctx.fillStyle = "#38f87a";
      for (let i = 0; i < drops.length; i++) {
        const text = getRandomChar();
        ctx.fillText(text, i * 18, drops[i] * 18);
        if (Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      if (running) animationFrame = requestAnimationFrame(draw);
    }

    rainRef.current.width = window.innerWidth;
    rainRef.current.height = window.innerHeight;
    draw();

    // Start fade out after 1.7s
    const timeout = setTimeout(() => {
    splashRef.current.classList.add("matrix-fade");
    running = true;
    setTimeout(() => {
         console.log("Calling onFinish from SplashMatrix");
      if (typeof onFinish === "function") onFinish();
    }, 900); // match your fade duration
  }, 1700);


     return () => {
    running = false;
    clearTimeout(timeout);
    cancelAnimationFrame(animationFrame);
  };
}, [onFinish]);

  return (
    <div ref={splashRef} className="matrix-splash-overlay">
      <canvas ref={rainRef} className="matrix-canvas" />
      <span className="matrix-splash-name">Jonas Weeks</span>
    </div>
  );
}
