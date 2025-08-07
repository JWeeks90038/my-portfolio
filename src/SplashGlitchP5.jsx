
import React, { useEffect, useRef } from "react";
import p5 from "p5";

const SplashGlitchP5 = ({ text = "Jonas Weeks" }) => {
  const sketchRef = useRef();

  // Utility: detect mobile device
  function isMobile() {
    if (typeof window === 'undefined') return false;
    return /Mobi|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }


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

    const CODE_SNIPPETS = [];
    const sketch = (p) => {
      let glitchBlocks = [];
      let glitchScanlines = [];
      let glitchSlices = [];
      let glitchText = text;
      let gradientBg;
      let glitchActive = false;
      let glitchIntervalId = null;
      let glitchTimeoutId = null;

      // Start glitch pulse after 2 seconds
      setTimeout(() => {
        glitchIntervalId = setInterval(() => {
          glitchActive = true;
          // Only show glitch for a short burst (e.g., 80ms)
          if (glitchTimeoutId) clearTimeout(glitchTimeoutId);
          glitchTimeoutId = setTimeout(() => {
            glitchActive = false;
          }, 80);
        }, 500); // 0.5s interval
      }, 2000);

      // Restore mobile-specific parameters for better performance
      const isMobileDevice = isMobile();
      const BLOCKS = isMobileDevice ? 7 : 18;
      const SLICES = isMobileDevice ? 3 : 8;
      const SCANLINE_STEP = isMobileDevice ? 4 : 2;

      function setupGlitchBlocks() {
        glitchBlocks = [];
        for (let i = 0; i < BLOCKS; i++) {
          glitchBlocks.push({
            x: p.random(p.width),
            y: p.random(p.height),
            w: p.random(p.width * 0.18, p.width * 0.32),
            h: p.random(18, 32),
            code: CODE_SNIPPETS.length > 0 ? p.random(CODE_SNIPPETS) : '',
            alpha: p.random(80, 180),
            speed: p.random(1.2, 2.2), // Slower on mobile
            t: p.random(1000)
          });
        }
      }

      function setupGlitchScanlines() {
        glitchScanlines = [];
        for (let y = 0; y < p.height; y += SCANLINE_STEP) {
          glitchScanlines.push({ y, alpha: p.random(10, 30) });
        }
      }

      function setupGlitchSlices() {
        glitchSlices = [];
        for (let i = 0; i < SLICES; i++) {
          glitchSlices.push({
            y: p.random(p.height),
            h: p.random(10, 40),
            dx: p.random(-60, 60), // Less aggressive on mobile
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

      function createGradientBg(w, h) {
        let g = p.createGraphics(w, h);
        g.colorMode(p.HSB, 360, 100, 100, 255);
        for (let y = 0; y < h; y++) {
          let inter = p.map(y, 0, h, 0, 1);
          let c = p.lerpColor(p.color(250, 60, 5, 255), p.color(280, 40, 10, 255), inter * 0.8);
          g.stroke(c);
          g.line(0, y, w, y);
        }
        return g;
      }

      p.setup = function () {
        let w = 0, h = 0;
        if (p._curElement && p._curElement.elt && p._curElement.elt.parentElement) {
          w = p._curElement.elt.parentElement.offsetWidth;
          h = p._curElement.elt.parentElement.offsetHeight;
        } else {
          w = window.innerWidth;
          h = window.innerHeight;
        }
        p.createCanvas(w, h);
        if (isMobileDevice) p.pixelDensity(1); // Lower pixel density for mobile
        p.frameRate(60);
        p.canvas.style.position = 'absolute';
        p.canvas.style.top = '0';
        p.canvas.style.left = '0';
        p.canvas.style.width = '100%';
        p.canvas.style.height = '100%';
        p.canvas.style.display = 'block';
        p.colorMode(p.HSB, 360, 100, 100, 255);
        p.textFont('monospace');
        gradientBg = createGradientBg(w, h);
        setupGlitchBlocks();
        setupGlitchScanlines();
        setupGlitchSlices();
      };

      p.windowResized = function () {
        const [w, h] = getParentSize();
        p.resizeCanvas(w, h);
        p.canvas.style.position = 'absolute';
        p.canvas.style.top = '0';
        p.canvas.style.left = '0';
        p.canvas.style.width = '100%';
        p.canvas.style.height = '100%';
        p.canvas.style.display = 'block';
        gradientBg = createGradientBg(w, h);
        setupGlitchBlocks();
        setupGlitchScanlines();
        setupGlitchSlices();
      };

      p.draw = function () {
        // --- Background gradient (cached) ---
        if (gradientBg) {
          p.image(gradientBg, 0, 0, p.width, p.height);
        }

        const baseY = p.height * 0.5;
        const baseX = p.width * 0.5;
        if (!glitchActive) {
          // Show only the main text, no glitch
          p.push();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(64);
          p.fill(200, 80, 100, 220);
          p.text(glitchText, baseX, baseY);
          p.pop();
        } else {
          // --- Glitch blocks ---
          p.textFont('monospace');
          p.textSize(16);
          for (let b of glitchBlocks) {
            let yShift = p.sin(p.frameCount * 0.18 + b.t) * 12 + p.random(-2, 2); // Faster, more energetic
            let x = b.x;
            let y = b.y + yShift;
            let flicker = p.random() < 0.22; // More frequent flicker
            p.fill(flicker ? p.color(140, 80, 100, 220) : p.color(200, 80, 100, 220));
            p.textAlign(p.LEFT, p.TOP);
            if (b.code && b.code.length > 0) p.text(b.code, x + 8, y + 6);
            if (p.random() < 0.03) { // More frequent jump
              b.x = p.random(0, p.width - b.w);
              b.y = p.random(0, p.height - b.h);
              b.code = CODE_SNIPPETS.length > 0 ? p.random(CODE_SNIPPETS) : '';
            }
            b.x += p.random(-1.2, 1.2) + b.speed * 0.25 * (p.random() < 0.5 ? 1 : -1); // Faster
            b.y += p.random(-0.5, 0.5);
            if (b.x > p.width) b.x = -b.w;
            if (b.x < -b.w) b.x = p.width;
            if (b.y > p.height) b.y = -b.h;
            if (b.y < -b.h) b.y = p.height;
          }

          // --- Glitch slices ---
          for (let s of glitchSlices) {
            if (p.random() < 0.16) {
              s.dx = p.random(-120, 120);
              s.y = p.random(p.height);
              s.h = p.random(8, 60);
            }
            let y = p.int(s.y);
            let h = p.int(s.h);
            p.copy(0, y, p.width, h, s.dx, y, p.width, h);
          }

          // --- Glitch scanlines ---
          for (let s of glitchScanlines) {
            p.fill(0, 0, 0, s.alpha);
            p.noStroke();
            p.rect(0, s.y, p.width, 1);
          }

          // --- Glitch text (main effect) ---
          p.push();
          p.textAlign(p.CENTER, p.CENTER);
          p.textSize(64);
          // Main text in blue
          p.fill(200, 80, 100, 220);
          p.text(glitchText, baseX, baseY);
          // RGB split and flicker, more dynamic
          if (p.frameCount % 8 < 4) {
            p.fill(140, 80, 100, 120);
            p.text(glitchText, baseX + p.random(2, 6), baseY + p.random(1, 3));
            p.fill(180, 80, 100, 120);
            p.text(glitchText, baseX - p.random(2, 6), baseY - p.random(1, 3));
          }
          // Digital scan flicker, more frequent
          if (p.random() < 0.22) {
            p.fill(0, 0, 100, 60);
            p.text(glitchText, baseX + p.random(-4, 4), baseY + p.random(-4, 4));
          }
          p.pop();
        }

        // --- Data code overlay (numbers) ---
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(18);
        p.fill(140, 80, 100, 60);
        const numbersY = baseY + 60;
        let numbersCode = '';
        for (let j = 0; j < 24; j++) numbersCode += String(p.int(p.random(0, 10)));
        p.text(numbersCode, baseX, numbersY + p.sin(p.frameCount * 0.2) * 4);
        p.pop();

        // --- Glitch blocks ---
        p.textFont('monospace');
        p.textSize(16);
        for (let b of glitchBlocks) {
          let yShift = p.sin(p.frameCount * 0.18 + b.t) * 12 + p.random(-2, 2); // Faster, more energetic
          let x = b.x;
          let y = b.y + yShift;
          let flicker = p.random() < 0.22; // More frequent flicker
          p.fill(flicker ? p.color(140, 80, 100, 220) : p.color(200, 80, 100, 220));
          p.textAlign(p.LEFT, p.TOP);
          if (b.code && b.code.length > 0) p.text(b.code, x + 8, y + 6);
          if (p.random() < 0.03) { // More frequent jump
            b.x = p.random(0, p.width - b.w);
            b.y = p.random(0, p.height - b.h);
            b.code = CODE_SNIPPETS.length > 0 ? p.random(CODE_SNIPPETS) : '';
          }
          b.x += p.random(-1.2, 1.2) + b.speed * 0.25 * (p.random() < 0.5 ? 1 : -1); // Faster
          b.y += p.random(-0.5, 0.5);
          if (b.x > p.width) b.x = -b.w;
          if (b.x < -b.w) b.x = p.width;
          if (b.y > p.height) b.y = -b.h;
          if (b.y < -b.h) b.y = p.height;
        }

        // --- Glitch slices ---
        for (let s of glitchSlices) {
          if (p.random() < 0.16) {
            s.dx = p.random(-120, 120);
            s.y = p.random(p.height);
            s.h = p.random(8, 60);
          }
          let y = p.int(s.y);
          let h = p.int(s.h);
          p.copy(0, y, p.width, h, s.dx, y, p.width, h);
        }

        // --- Glitch scanlines ---
        for (let s of glitchScanlines) {
          p.fill(0, 0, 0, s.alpha);
          p.noStroke();
          p.rect(0, s.y, p.width, 1);
        }

        // --- Glitch text (main effect) ---
        p.push();
        p.textAlign(p.CENTER, p.CENTER);
        p.textSize(64);
        // Main text in blue
        p.fill(200, 80, 100, 220);
        p.text(glitchText, baseX, baseY);
        // RGB split and flicker, more dynamic
        if (p.frameCount % 8 < 4) {
          p.fill(140, 80, 100, 120);
          p.text(glitchText, baseX + p.random(2, 6), baseY + p.random(1, 3));
          p.fill(180, 80, 100, 120);
          p.text(glitchText, baseX - p.random(2, 6), baseY - p.random(1, 3));
        }
        // Digital scan flicker, more frequent
        if (p.random() < 0.22) {
          p.fill(0, 0, 100, 60);
          p.text(glitchText, baseX + p.random(-4, 4), baseY + p.random(-4, 4));
        }
        p.pop();
      };
    };

    tryInitP5();

    return () => {
      if (myp5) myp5.remove();
      if (rafId) cancelAnimationFrame(rafId);
      // Clear the glitch interval and timeout if they exist
      if (typeof glitchIntervalId === 'number') clearInterval(glitchIntervalId);
      if (typeof glitchTimeoutId === 'number') clearTimeout(glitchTimeoutId);
    };
  }, [text]);

  // Only a single div, which is the p5 parent
  return (
    <div ref={sketchRef} style={{ width: "100%", height: "100%", pointerEvents: "none" }} />
  );
};

export default SplashGlitchP5;
