
import React, { useEffect, useRef } from "react";
import p5 from "p5";

const SplashGlitchP5 = ({ text = "Jonas Weeks" }) => {
  const sketchRef = useRef();


  useEffect(() => {
    let myp5;
    let rafId;

    function tryInitP5() {
      if (!sketchRef.current) return;
      const w = sketchRef.current.offsetWidth;
      const h = sketchRef.current.offsetHeight;
      if (w === 0 || h === 0) {
        rafId = requestAnimationFrame(tryInitP5);
        return;
      }
      // Set parent to relative and overflow hidden for absolute canvas
      sketchRef.current.style.position = 'relative';
      sketchRef.current.style.overflow = 'hidden';
      myp5 = new p5(sketch, sketchRef.current);
    }

    const sketch = (p) => {
      let glitchBlocks = [];
      let glitchScanlines = [];
      let glitchSlices = [];
      let glitchText = text;

      function setupGlitchBlocks() {
        glitchBlocks = [];
        for (let i = 0; i < 18; i++) {
          glitchBlocks.push({
            x: p.random(p.width),
            y: p.random(p.height),
            w: p.random(p.width * 0.18, p.width * 0.32),
            h: p.random(18, 32),
            code: "",
            alpha: p.random(80, 180),
            speed: p.random(0.5, 2),
            t: p.random(1000)
          });
        }
      }

      function setupGlitchScanlines() {
        glitchScanlines = [];
        for (let y = 0; y < p.height; y += 2) {
          glitchScanlines.push({ y, alpha: p.random(10, 30) });
        }
      }

      function setupGlitchSlices() {
        glitchSlices = [];
        for (let i = 0; i < 8; i++) {
          glitchSlices.push({
            y: p.random(p.height),
            h: p.random(10, 40),
            dx: p.random(-40, 40),
            t: p.random(1000)
          });
        }
      }

      function getParentSize() {
        if (p._curElement && p._curElement.elt && p._curElement.elt.parentElement) {
          return [p._curElement.elt.parentElement.offsetWidth, p._curElement.elt.parentElement.offsetHeight];
        }
        return [window.innerWidth, window.innerHeight];
      }

      p.setup = function () {
        // Wait for parent to have a size
        let w = 0, h = 0;
        if (p._curElement && p._curElement.elt && p._curElement.elt.parentElement) {
          w = p._curElement.elt.parentElement.offsetWidth;
          h = p._curElement.elt.parentElement.offsetHeight;
        } else {
          w = window.innerWidth;
          h = window.innerHeight;
        }
        p.createCanvas(w, h);
        // Make canvas fill parent absolutely
        p.canvas.style.position = 'absolute';
        p.canvas.style.top = '0';
        p.canvas.style.left = '0';
        p.canvas.style.width = '100%';
        p.canvas.style.height = '100%';
        p.canvas.style.display = 'block';
        p.colorMode(p.HSB, 360, 100, 100, 255);
        p.textFont("monospace");
        setupGlitchBlocks();
        setupGlitchScanlines();
        setupGlitchSlices();
      };

      p.windowResized = function () {
        const [w, h] = getParentSize();
        p.resizeCanvas(w, h);
        // Re-apply styles in case
        p.canvas.style.position = 'absolute';
        p.canvas.style.top = '0';
        p.canvas.style.left = '0';
        p.canvas.style.width = '100%';
        p.canvas.style.height = '100%';
        p.canvas.style.display = 'block';
        setupGlitchBlocks();
        setupGlitchScanlines();
        setupGlitchSlices();
      };

      p.draw = function () {
        p.background('#18181b');
        for (let y = 0; y < p.height; y++) {
          let inter = p.map(y, 0, p.height, 0, 1);
          let c = p.lerpColor(p.color(250, 60, 5, 255), p.color(280, 40, 10, 255), inter * 0.8);
          p.stroke(c);
          p.line(0, y, p.width, y);
        }
        p.textFont("monospace");
        p.textSize(16);
        for (let b of glitchBlocks) {
          let yShift = p.sin(p.frameCount * 0.09 + b.t) * 8 + p.random(-1, 1);
          let x = b.x;
          let y = b.y + yShift;
          let flicker = p.random() < 0.12;
          p.fill(flicker ? p.color(140, 80, 100, 220) : p.color(200, 80, 100, 220));
          p.textAlign(p.LEFT, p.TOP);
          if (b.code && b.code.length > 0) p.text(b.code, x + 8, y + 6);
          if (p.random() < 0.01) {
            b.x = p.random(0, p.width - b.w);
            b.y = p.random(0, p.height - b.h);
            b.code = "";
          }
          b.x += p.random(-0.5, 0.5) + b.speed * 0.1 * (p.random() < 0.5 ? 1 : -1);
          b.y += p.random(-0.2, 0.2);
          if (b.x > p.width) b.x = -b.w;
          if (b.x < -b.w) b.x = p.width;
          if (b.y > p.height) b.y = -b.h;
          if (b.y < -b.h) b.y = p.height;
        }
        for (let s of glitchSlices) {
          if (p.random() < 0.08) {
            s.dx = p.random(-60, 60);
            s.y = p.random(p.height);
            s.h = p.random(8, 40);
          }
          let y = p.int(s.y);
          let h = p.int(s.h);
          p.copy(0, y, p.width, h, s.dx, y, p.width, h);
        }
        for (let s of glitchScanlines) {
          p.fill(0, 0, 0, s.alpha);
          p.noStroke();
          p.rect(0, s.y, p.width, 1);
        }
        let baseY = p.height * 0.5;
        let baseX = p.width * 0.5;
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(64);
        p.fill(200, 80, 100, 220);
        p.text(glitchText, baseX, baseY);
        if (p.frameCount % 12 < 4) {
          p.fill(140, 80, 100, 120);
          p.text(glitchText, baseX + 3, baseY + 1);
          p.fill(180, 80, 100, 120);
          p.text(glitchText, baseX - 3, baseY - 1);
        }
        if (p.random() < 0.12) {
          p.fill(0, 0, 100, 60);
          p.text(glitchText, baseX + p.random(-2, 2), baseY + p.random(-2, 2));
        }
        p.textSize(18);
        p.fill(140, 80, 100, 60);
        let y = baseY + 60;
        let code = '';
        for (let j = 0; j < 24; j++) code += String(p.int(p.random(0, 10)));
        p.text(code, baseX, y + p.sin(p.frameCount * 0.1) * 2);
        p.pop();
      };
    };

    tryInitP5();

    return () => {
      if (myp5) myp5.remove();
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [text]);

  // Only a single div, which is the p5 parent
  return (
    <div ref={sketchRef} style={{ width: "100%", height: "100%", pointerEvents: "none" }} />
  );
};

export default SplashGlitchP5;
