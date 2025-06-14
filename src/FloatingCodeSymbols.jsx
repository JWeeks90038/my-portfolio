import React, { useEffect, useRef } from "react";

const SYMBOLS = [
  "{", "}", "()", "</>", ";", "=", "=>", "[]", "const", "let", "if", "return",
  "function", "()", "[]", "<>", "&&", "||", "!", "true", "false", "while",
  "class", "import", "export", "useState", "useEffect", "null", "undefined", "async", "await", "catch", "finally", "map", "filter", "=>", "setTimeout", "Promise", "new", "props", "state", "render",
];

function randomBetween(a, b) {
  return Math.random() * (b - a) + a;
}

export default function FloatingCodeSymbols({ count = 18 }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Remove old symbols
    container.innerHTML = "";

    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.textContent = SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
      span.style.position = "absolute";
      span.style.left = `${randomBetween(0, 95)}%`;
      span.style.bottom = `-${randomBetween(10, 40)}px`;
      span.style.fontSize = `${randomBetween(1.2, 2.2)}rem`;
      span.style.opacity = 0.7;
      span.style.color = "#38bdf8";
      span.style.pointerEvents = "none";
      span.style.filter = "drop-shadow(0 0 6px #38bdf8)";
      span.style.animation = `floatUp ${randomBetween(5, 10)}s linear ${randomBetween(0, 2)}s infinite`;

      container.appendChild(span);
    }
  }, [count]);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "300px",
        overflow: "visible",
        pointerEvents: "none",
      }}
      className="floating-code-symbols"
    />
  );
}