import React, { useEffect, useRef, useState } from 'react'

const codeSnippets = [
  {
    lang: 'js',
    code: `// Fetch featured\nconst res = await fetch('/api/featured');`
  },
  {
    lang: 'py',
    code: `# Get projects\nimport requests\nprint(requests.get("https://jonasweeks.com/api/projects").json())`
  },
  {
    lang: 'html',
    code: `<h2>About Jonas Weeks</h2>`
  },
  {
    lang: 'css',
    code: `.glow-white { color: #fff; }`
  },
  {
    lang: 'json',
    code: `{"portfolio":"Jonas Weeks"}`
  },
  {
    lang: 'bash',
    code: `git clone https://github.com/jonasweeks/my-portfolio.git`
  }
];

const positions = [
  { top: 10, left: 2 },     // Far left, top
  { top: 10, left: 40 },    // Center, top
  { top: 10, right: 2 },    // Far right, top
  { top: 80, left: 8 },     // Far left, lower
  { top: 80, left: 45 },    // Center, lower
  { top: 80, right: 8 },    // Far right, lower
  { top: 150, left: 15 },   // Far left, bottom
  { top: 150, left: 50 },   // Center, bottom
  { top: 150, right: 15 },  // Far right, bottom
];

function AnimatedCode() {
  const [blocks, setBlocks] = useState([]);
  const blockId = useRef(0); // <-- useRef for persistent unique id

  // Show up to 3 code blocks at a time, each at a random position
  useEffect(() => {
    let timeout;
    function addBlock() {
      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const pos = positions[Math.floor(Math.random() * positions.length)];
      blockId.current += 1; // <-- increment the ref
      setBlocks(blocks => [
        ...blocks,
        {
          id: blockId.current, // <-- use the ref value
          lang: snippet.lang,
          code: '',
          fullCode: snippet.code,
          pos,
          charIdx: 0,
          opacity: 1,
        },
      ]);
      timeout = setTimeout(addBlock, 1600 + Math.random() * 1200);
    }
    addBlock();
    return () => clearTimeout(timeout);
  }, []);

  // Animate typing and fading
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(blocks =>
        blocks
          .map(block => {
            // Typing effect
            if (block.charIdx < block.fullCode.length) {
              return {
                ...block,
                code: block.fullCode.slice(0, block.charIdx + 1),
                charIdx: block.charIdx + 1,
              };
            }
            // Fade out after fully typed
            if (block.opacity > 0) {
              return {
                ...block,
                opacity: block.opacity - 0.02,
              };
            }
            return block;
          })
          // Remove faded blocks, keep max 3 at a time
          .filter((block, i, arr) => block.opacity > 0 && arr.length - i <= 3)
      );
    }, 30);
    return () => clearInterval(interval);
  }, []);

 return (
  <div className="animated-code-multi-container">
    {blocks.map(block => (
      <pre
  key={block.id}
  className={`floating-code-multi lang-${block.lang}`}
  style={{
    position: "absolute",
    top: `${block.pos.top}px`,
    ...(block.pos.left !== undefined ? { left: `${block.pos.left}%` } : {}),
    ...(block.pos.right !== undefined ? { right: `${block.pos.right}%` } : {}),
    opacity: block.opacity,
    pointerEvents: "none",
  }}
>
  {block.code}
</pre>
    ))}
  </div>
);
}

export default AnimatedCode;