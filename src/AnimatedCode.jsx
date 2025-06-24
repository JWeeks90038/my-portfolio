import React, { useEffect, useRef, useState } from 'react'

const codeSnippets = [
  {
    lang: 'js',
    code: `// Advanced React with custom hooks\nconst useAuth = () => {\n  const [user, setUser] = useState(null);\n  return { user, login, logout };\n};`
  },
  {
    lang: 'js',
    code: `// API integration with error handling\nconst fetchUserData = async (id) => {\n  try {\n    const response = await fetch(\`/api/users/\${id}\`);\n    return await response.json();\n  } catch (error) {\n    console.error('Failed to fetch user:', error);\n  }\n};`
  },
  {
    lang: 'css',
    code: `/* Modern CSS Grid layout */\n.dashboard {\n  display: grid;\n  grid-template-columns: 250px 1fr;\n  grid-template-rows: 60px 1fr;\n  height: 100vh;\n  gap: 1rem;\n}`
  },
  {
    lang: 'css',
    code: `/* Responsive design with animations */\n@media (max-width: 768px) {\n  .card {\n    transform: translateY(20px);\n    opacity: 0;\n    animation: slideUp 0.6s ease forwards;\n  }\n}`
  },
  {
    lang: 'html',
    code: `<!-- Semantic HTML5 structure -->\n<main role="main">\n  <section aria-labelledby="projects-heading">\n    <h2 id="projects-heading">Featured Projects</h2>\n    <article class="project-showcase">\n      <!-- Project content -->\n    </article>\n  </section>\n</main>`
  },
  {
    lang: 'js',
    code: `// State management with useReducer\nconst taskReducer = (state, action) => {\n  switch (action.type) {\n    case 'ADD_TASK':\n      return [...state, { id: Date.now(), ...action.payload }];\n    case 'COMPLETE_TASK':\n      return state.map(task => \n        task.id === action.id ? { ...task, completed: true } : task\n      );\n    default:\n      return state;\n  }\n};`
  },
  {
    lang: 'bash',
    code: `# Full-stack deployment pipeline\nnpm run test && npm run build\ndocker build -t my-app .\ndocker push registry/my-app:latest\nkubectl apply -f deployment.yaml`
  },
  {
    lang: 'json',
    code: `{\n  "name": "modern-web-app",\n  "scripts": {\n    "dev": "vite",\n    "build": "vite build",\n    "test": "vitest",\n    "deploy": "vercel --prod"\n  },\n  "dependencies": {\n    "react": "^18.0.0",\n    "typescript": "^5.0.0"\n  }\n}`
  },
  {
    lang: 'js',
    code: `// TypeScript interface for type safety\ninterface UserProfile {\n  id: string;\n  name: string;\n  email: string;\n  preferences: {\n    theme: 'light' | 'dark';\n    notifications: boolean;\n  };\n}`
  },
  {
    lang: 'css',
    code: `/* Advanced CSS with custom properties */\n:root {\n  --primary-color: hsl(210, 100%, 60%);\n  --shadow-soft: 0 10px 30px rgba(0,0,0,0.1);\n}\n\n.button {\n  background: var(--primary-color);\n  box-shadow: var(--shadow-soft);\n  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);\n}`
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

// ...existing code...

function AnimatedCode() {
  const [blocks, setBlocks] = useState([]);
  const blockId = useRef(0);
  const usedPositionsRef = useRef(new Set());

  // Show up to 3 code blocks at a time, each at a unique position
  useEffect(() => {
    let timeout;
    
    function addBlock() {
      // Limit to 3 blocks on screen at a time
      if (blocks.length >= 3) {
        timeout = setTimeout(addBlock, 500);
        return;
      }

      // Find available positions
      const availablePositions = positions.filter((_, index) => !usedPositionsRef.current.has(index));
      
      // If no positions available, wait and try again
      if (availablePositions.length === 0) {
        timeout = setTimeout(addBlock, 500);
        return;
      }

      const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
      const randomIndex = Math.floor(Math.random() * availablePositions.length);
      const pos = availablePositions[randomIndex];
      const positionIndex = positions.indexOf(pos);
      
      // Immediately mark position as used
      usedPositionsRef.current.add(positionIndex);
      
      blockId.current += 1;
      
      setBlocks(blocks => [
        ...blocks,
        {
          id: blockId.current,
          lang: snippet.lang,
          code: '',
          fullCode: snippet.code,
          pos,
          positionIndex,
          charIdx: 0,
          phase: 'typing', // 'typing' or 'fading'
          opacity: 0.3,    // Start faint
          scale: 0.3,      // Start small
          blur: 8,         // Start blurred
        },
      ]);
      
      timeout = setTimeout(addBlock, 1600 + Math.random() * 1200);
    }
    
    addBlock();
    return () => clearTimeout(timeout);
  }, [blocks.length]);

  // Animate typing and approaching
  useEffect(() => {
    const interval = setInterval(() => {
      setBlocks(blocks =>
        blocks
          .map(block => {
            if (block.phase === 'typing') {
              // Typing effect - moving closer
              if (block.charIdx < block.fullCode.length) {
                const progress = block.charIdx / block.fullCode.length;
                return {
                  ...block,
                  code: block.fullCode.slice(0, block.charIdx + 1),
                  charIdx: block.charIdx + 1,
                  // Gradually get closer as it types
                  opacity: 0.3 + (progress * 0.7), // 0.3 → 1.0
                  scale: 0.3 + (progress * 0.7),   // 0.3 → 1.0
                  blur: 8 - (progress * 7),        // 8 → 1
                };
              } else {
                // Switch to fading phase when typing is complete
                return {
                  ...block,
                  phase: 'fading',
                };
              }
            } else if (block.phase === 'fading') {
              // Fade out while staying at current size/clarity
              return {
                ...block,
                opacity: Math.max(0, block.opacity - 0.02),
                // Keep scale and blur the same (don't retreat)
              };
            }
            return block;
          })
          .filter(block => {
            // Remove faded blocks and free up their positions
            if (block.opacity <= 0) {
              usedPositionsRef.current.delete(block.positionIndex);
              return false;
            }
            return true;
          })
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
            transform: `scale(${block.scale})`,
            filter: `blur(${block.blur}px)`,
            pointerEvents: "none",
            transformOrigin: "center",
          }}
        >
          {block.code}
        </pre>
      ))}
    </div>
  );
}

export default AnimatedCode;