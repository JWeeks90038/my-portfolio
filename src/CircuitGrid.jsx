import React, { useEffect, useRef } from 'react';

function CircuitGrid({ width = 600, height = 200, nodeRows = 6, nodeCols = 14 }) {
  const canvasRef = useRef();
  const glitchRef = useRef({ active: false, timer: null, frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    const nodes = [];
    const pulses = [];

    // Generate grid nodes with slight random offset for organic look
    for (let y = 0; y < nodeRows; y++) {
      for (let x = 0; x < nodeCols; x++) {
        nodes.push({
          x: (width / (nodeCols - 1)) * x + (Math.random() - 0.5) * 8,
          y: (height / (nodeRows - 1)) * y + (Math.random() - 0.5) * 8,
        });
      }
    }

    // Generate edges (horizontal, vertical, and some diagonals)
    const edges = [];
    for (let y = 0; y < nodeRows; y++) {
      for (let x = 0; x < nodeCols; x++) {
        const idx = y * nodeCols + x;
        if (x < nodeCols - 1) edges.push([idx, idx + 1]);
        if (y < nodeRows - 1) edges.push([idx, idx + nodeCols]);
        // Diagonals for more tech detail
        if (x < nodeCols - 1 && y < nodeRows - 1) edges.push([idx, idx + nodeCols + 1]);
        if (x > 0 && y < nodeRows - 1) edges.push([idx, idx + nodeCols - 1]);
      }
    }

    // Add random pulses
    function addPulse() {
      const edge = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({
        edge,
        t: 0,
        speed: 0.008 + Math.random() * 0.018,
        color: '#39ff14', // MS-DOS neon green
      });
      setTimeout(addPulse, 120 + Math.random() * 300);
    }
    addPulse();

    // Glitch effect logic
    function triggerGlitch() {
      glitchRef.current.active = true;
      glitchRef.current.frame = 0;
      // End glitch after 200ms
      glitchRef.current.timer = setTimeout(() => {
        glitchRef.current.active = false;
      }, 200);
      // Next glitch in 3-4 seconds
      setTimeout(triggerGlitch, 3000 + Math.random() * 1000);
    }
    setTimeout(triggerGlitch, 3000 + Math.random() * 1000);

    function draw() {
      // Draw to offscreen canvas for glitch effect
      let offCanvas, offCtx;
      if (glitchRef.current.active) {
        offCanvas = document.createElement('canvas');
        offCanvas.width = width;
        offCanvas.height = height;
        offCtx = offCanvas.getContext('2d');
      }
      const drawCtx = glitchRef.current.active ? offCtx : ctx;

      // Background
      drawCtx.fillStyle = '#101510';
      drawCtx.fillRect(0, 0, width, height);

      // Draw edges
      drawCtx.save();
      drawCtx.strokeStyle = '#39ff14';
      drawCtx.globalAlpha = 0.18;
      drawCtx.lineWidth = 2;
      for (const [a, b] of edges) {
        drawCtx.beginPath();
        drawCtx.moveTo(nodes[a].x, nodes[a].y);
        drawCtx.lineTo(nodes[b].x, nodes[b].y);
        drawCtx.stroke();
      }
      drawCtx.restore();

      // Draw pulses
      for (const pulse of pulses) {
        const [a, b] = pulse.edge;
        const x = nodes[a].x + (nodes[b].x - nodes[a].x) * pulse.t;
        const y = nodes[a].y + (nodes[b].y - nodes[a].y) * pulse.t;
        drawCtx.save();
        drawCtx.globalAlpha = 0.85;
        drawCtx.shadowColor = pulse.color;
        drawCtx.shadowBlur = 16;
        drawCtx.beginPath();
        drawCtx.arc(x, y, 4, 0, Math.PI * 2);
        drawCtx.fillStyle = pulse.color;
        drawCtx.fill();
        drawCtx.restore();
        pulse.t += pulse.speed;
      }
      // Remove finished pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        if (pulses[i].t > 1) pulses.splice(i, 1);
      }

      // Draw nodes
      for (const node of nodes) {
        drawCtx.save();
        drawCtx.beginPath();
        drawCtx.arc(node.x, node.y, 3.5, 0, Math.PI * 2);
        drawCtx.fillStyle = '#39ff14';
        drawCtx.shadowColor = '#39ff14';
        drawCtx.shadowBlur = 10;
        drawCtx.globalAlpha = 0.95;
        drawCtx.fill();
        drawCtx.restore();
      }

      // If glitching, composite with offsets and tint
      if (glitchRef.current.active) {
        ctx.clearRect(0, 0, width, height);
        // Main image
        ctx.drawImage(offCanvas, 0, 0);
        // Glitch layers: offset and tint
        const shiftX = Math.floor(Math.random() * 12 - 6);
        const shiftY = Math.floor(Math.random() * 8 - 4);
        ctx.globalAlpha = 0.7;
        ctx.globalCompositeOperation = 'lighter';
        ctx.filter = 'brightness(1.5) hue-rotate(80deg)';
        ctx.drawImage(offCanvas, shiftX, shiftY);
        ctx.filter = 'none';
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        // Optionally, add scanline effect
        for (let y = 0; y < height; y += 4) {
          ctx.globalAlpha = 0.08 + Math.random() * 0.08;
          ctx.fillStyle = '#39ff14';
          ctx.fillRect(0, y, width, 2);
        }
        ctx.globalAlpha = 1;
      }
    }

    function animate() {
      draw();
      animationId = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      cancelAnimationFrame(animationId);
      if (glitchRef.current.timer) clearTimeout(glitchRef.current.timer);
    };
  }, [width, height, nodeRows, nodeCols]);

  return (
    <div style={{ width: '100%', height: height, margin: '48px 0', overflow: 'hidden' }}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: '#101510',
        }}
      />
    </div>
  );
}

export default CircuitGrid;