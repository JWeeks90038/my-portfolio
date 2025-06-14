import { useEffect, useRef, useState } from 'react'
import AnimatedCode from './AnimatedCode'
import CircuitGrid from './CircuitGrid'
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import ProjectsPage from "./ProjectsPage";
import ScrollToTop from "./ScrollToTop";
import FloatingCodeSymbols from "./FloatingCodeSymbols";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import './App.css'
import AOS from 'aos';
import 'aos/dist/aos.css';


function App() {
  //const [scrollY, setScrollY] = useState(window.scrollY);
  const [time, setTime] = useState(0);
  const [gradientT, setGradientT] = useState(0);
  const [svgWidth, setSvgWidth] = useState(window.innerWidth);
  const [docHeight, setDocHeight] = useState(document.documentElement.scrollHeight);
  const [contentHeight, setContentHeight] = useState(window.innerHeight);
  const [footerRect, setFooterRect] = useState({ top: 0, height: 80 });
  //const [animatedOrbY, setAnimatedOrbY] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [showSplash, setShowSplash] = useState(true);
  const [showGlow, setShowGlow] = useState(false);
  const [splashFading, setSplashFading] = useState(false);
  const [splashBgFaded, setSplashBgFaded] = useState(false);
  const [formMessage, setFormMessage] = useState("");

  const contentRef = useRef(null);
  const footerRef = useRef(null);

    // Orb animation parameters
  /*const mergeThreshold = 0.985;
  const mergeRange = 0.015;

  const t = time / 600;
  const pulse = 1 + 0.15 * Math.sin(t * 2);
  const orbRadius = 28 * pulse;
  const orbGlow = 0.7 + 0.3 * Math.abs(Math.sin(t * 2));

  // Frame and orb positions
 const framePadding = 40;
const centerX = 0;
const leftX = -svgWidth / 2 + framePadding;
const rightX = svgWidth / 2 - framePadding;

  const topY = 0;
  const footerHeight = 80; // Adjust to match your actual footer height
const bottomMargin = -20;
const bottomY = docHeight - orbRadius - bottomMargin;

  // Calculate scroll progress based on .site-content height
  const scrollableHeight = contentHeight - window.innerHeight;
  const progress = scrollableHeight > 0
    ? Math.max(0, Math.min(scrollY / scrollableHeight, 1))
    : 0;

      // Orb Y position as you scroll
  const getOrbY = () => {
    const minProgress = 0.15;
    const maxProgress = mergeThreshold;
    if (progress < minProgress) return topY;
    if (progress > maxProgress) return bottomY;
    const pct = (progress - minProgress) / (maxProgress - minProgress);
    return topY + (bottomY - topY) * pct;
  };*/

  const navigate = useNavigate();
const location = useLocation();

function handleContactClick(e) {
  e.preventDefault();
  if (location.pathname !== "/") {
    navigate("/", { replace: false });
    // Wait for navigation, then scroll
    setTimeout(() => {
      const el = document.getElementById("contact");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100); // Delay may need tuning
  } else {
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
}

const handleSubmit = async (e) => {
  e.preventDefault();
  const form = e.target;
  const data = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value,
  };

  const res = await fetch("https://formspree.io/f/xrbkkzqn", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data),
  });

  if (res.ok) {
    setFormMessage("Message sent!");
    form.reset();
  } else {
    setFormMessage("Error sending message.");
  }
};

useEffect(() => {
  if (showSplash) {
    setSplashBgFaded(false);
    const bgTimer = setTimeout(() => setSplashBgFaded(true), 200); // fade after 0.2s
    return () => clearTimeout(bgTimer);
  }
}, [showSplash]);

useEffect(() => {
  setShowGlow(true);
}, []);

useEffect(() => {
  if (!showSplash) {
    setShowGlow(true);
    const timeout = setTimeout(() => setShowGlow(false), 1700); // match animation duration
    return () => clearTimeout(timeout);
  }
}, [showSplash]);

useEffect(() => {
  AOS.init({
    duration: 800, // animation duration in ms
    once: true,    // whether animation should happen only once
  });
}, []);

  useEffect(() => {
  setFadeIn(true);
}, []);

  // Measure only the .site-content height, not the document
useEffect(() => {
  const updateContentHeight = () => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.offsetHeight);
    }
  };
  updateContentHeight();
  window.addEventListener('resize', updateContentHeight);
  window.addEventListener('scroll', updateContentHeight); // <-- Add this line

  // Re-measure after fade-in animation
  const fadeInTimeout = setTimeout(updateContentHeight, 1600);

  return () => {
    window.removeEventListener('resize', updateContentHeight);
    window.removeEventListener('scroll', updateContentHeight); // <-- And this line
    clearTimeout(fadeInTimeout);
  };
}, []);

useEffect(() => {
  const updateDocHeight = () => setDocHeight(document.documentElement.scrollHeight);
  window.addEventListener('resize', updateDocHeight);
  window.addEventListener('scroll', updateDocHeight);
  return () => {
    window.removeEventListener('resize', updateDocHeight);
    window.removeEventListener('scroll', updateDocHeight);
  };
}, []);

/*useEffect(() => {
  let animationFrame;
  const animate = () => {
    const targetY = getOrbY();
    setAnimatedOrbY(prevY => {
      const lerp = 0.15; // 0.0 = no smoothing, 1.0 = instant
      return prevY + (targetY - prevY) * lerp;
    });
    animationFrame = requestAnimationFrame(animate);
  };
  animate();
  return () => cancelAnimationFrame(animationFrame);
}, [progress, time, svgWidth, contentHeight]);*/

useEffect(() => {
  const updateFooterRect = () => {
    if (footerRef.current) {
      const rect = footerRef.current.getBoundingClientRect();
      setFooterRect({
        top: rect.top + window.scrollY,
        height: rect.height,
      });
    }
  };
  updateFooterRect();
  window.addEventListener('resize', updateFooterRect);
  window.addEventListener('scroll', updateFooterRect);
  return () => {
    window.removeEventListener('resize', updateFooterRect);
    window.removeEventListener('scroll', updateFooterRect);
  };
}, []);

 useEffect(() => {
  const handleResize = () => setSvgWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setGradientT(t => t + 0.015);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => setTime(Date.now()), 30);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);

  if (
    isNaN(svgWidth) || isNaN(contentHeight) ||
    svgWidth === 0 || contentHeight === 0 ||
    typeof svgWidth !== 'number' || typeof contentHeight !== 'number'
  ) {
    return null;
  }

  // Calculate orb positions based on scroll progress
  /*let leftOrb = { x: centerX, y: topY };
  let rightOrb = { x: centerX, y: topY };
  let showSingleTopOrb = false;
  let showSingleBottomOrb = false;

  if (progress < 0.05) {
    showSingleTopOrb = true;
    leftOrb = { x: centerX, y: topY };
    rightOrb = { x: centerX, y: topY };
  } else if (progress < 0.15) {
    const pct = (progress - 0.05) / 0.1;
    leftOrb = {
      x: centerX + (leftX - centerX) * pct,
      y: topY,
    };
    rightOrb = {
      x: centerX + (rightX - centerX) * pct,
      y: topY,
    };
  } else if (progress < mergeThreshold) {
  leftOrb = { x: leftX, y: animatedOrbY };
  rightOrb = { x: rightX, y: animatedOrbY };
  } else if (progress < mergeThreshold + mergeRange) {
    const pct = (progress - mergeThreshold) / mergeRange;
    leftOrb = {
      x: leftX + (centerX - leftX) * pct,
      y: bottomY,
    };
    rightOrb = {
      x: rightX + (centerX - rightX) * pct,
      y: bottomY,
    };
  } else {
  showSingleBottomOrb = true;
  leftOrb = { x: centerX, y: bottomY };
  rightOrb = { x: centerX, y: bottomY };
}

  console.log({
  scrollY,
  contentHeight,
  windowHeight: window.innerHeight,
  scrollableHeight: contentHeight - window.innerHeight,
  progress
});*/
return (
  <>
    <div className="atmospheric-gradient-bg" aria-hidden="true"></div>
   
      <>
      <a id="top"></a>
  <ScrollToTop />
  <div className={`site-fade-in${fadeIn ? ' visible' : ''}`}>
    <div className="atmospheric-gradient-bg" aria-hidden="true"></div>
    {/* Main site content, only after splash */}
    <div className="hazy-bg" aria-hidden="true"></div>
    <div className="hazy-blob blob1"></div>
    <div className="hazy-blob blob2"></div>
    <div className="hazy-blob blob3"></div>
 
      
    <div className="site-content" ref={contentRef}>
      <nav className="glow-navbar">
          <Link to="/" className="nav-orb">
    <span className="orb-dot"></span>
    <span className="orb-label">Home</span>
    </Link>
        <Link to="/projects" className="nav-orb">
          <span className="orb-dot"></span>
          <span className="orb-label">Projects</span>
        </Link>
        <a
          href="#contact"
          className="nav-orb"
          onClick={handleContactClick}
        >
          <span className="orb-dot"></span>
          <span className="orb-label">Contact</span>
        </a>
      </nav>
      <br />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              {/* Hero Section */}
            <section className="hero-section" data-aos="fade-up">
              <div className="glass-card">
  <div className="name-border-animate">
  <span className={showGlow ? "name-glow-animate" : ""}>
      Jonas Weeks
    </span>
  <svg className="name-border-svg" width="100%" height="100%" viewBox="0 0 400 70" preserveAspectRatio="none">
    <rect x="2" y="2" width="396" height="66" rx="12" ry="12" />
  </svg>
</div><br></br><br></br><br></br>
  <p>Full Stack Web Developer | Creative Coder | Problem Solver</p><br></br><br></br><br></br>

  {/* Tech Stack Badges */}
  <div className="tech-stack-badges">
    <span className="tech-badge">React</span>
    <span className="tech-badge">Next.js</span>
    <span className="tech-badge">JavaScript</span>
    <span className="tech-badge">TypeScript</span>
    <span className="tech-badge">HTML</span>
    <span className="tech-badge">CSS</span>
    <span className="tech-badge">Tailwind CSS</span>
    <span className="tech-badge">Firebase</span>
    <span className="tech-badge">Node.js</span>
    <span className="tech-badge">Git</span>
    <span className="tech-badge">Vercel</span><br></br><br></br>
  </div>
  <div className="tech-stack-learning">
    <span className="learning-label">In Learning Process:</span>
    <span className="tech-badge">Solidity</span>
    <span className="tech-badge">Web3</span>
    <span className="tech-badge">Python</span>
  </div>
  </div>
  <br></br><br></br>

  <Link to="/projects" className="cta-btn">See My Work</Link>
</section>

              <main>
                <div className="code-float-section" data-aos="fade-up">
                  <AnimatedCode />
                </div>
                <br /><br /><br />
                <section id="projects" className="glow-white-section" data-aos="fade-up">
                  <h2>Meet the Maker:</h2>
                  <div className="about-text">
                  <div>
                    <p>
                      A self-taught full stack developer with a passion for building creative and impactful web applications. With three projects already under my belt, I thrive on learning by doing and love turning ideas into real, working products. My journey proves that curiosity and determination are the best teachers in tech!
                    </p>
                    <p>
                      Every project I take on is an opportunity to push my skills further and explore new technologies. From designing intuitive user interfaces to architecting robust backend systems, I enjoy the challenge of bringing all the pieces together into a seamless experience. My hands-on approach means I’m always experimenting, iterating, and refining my craft.
                    </p>
                    <p>
                      I believe that great software is built by those who are willing to learn, adapt, and solve problems creatively. My portfolio is a reflection of my growth as a developer and my commitment to delivering solutions that make a difference. I’m excited to continue this journey, tackling new challenges and building applications that leave a lasting impact.
                    </p>
                    {/* Add more projects here */}
                  </div>
                  </div>
                </section>

                <div className="floating-code-symbols">
                  <FloatingCodeSymbols count={36} />
                </div>

                <section id="contact" className="contact-section" data-aos="fade-up">
                  <h2>Contact</h2>
                  <form className="contact-form" onSubmit={handleSubmit}
                    action="https://formspree.io/f/xrbkkzqn"
                    method="POST"
                  >
                    <label>
                      Name
                      <input type="text" name="name" required />
                    </label>
                    <label>
                      Email
                      <input type="email" name="email" required />
                    </label>
                    <label>
                      Message
                      <textarea name="message" rows="5" required />
                    </label>
                    <button type="submit">Send</button>
  {formMessage && (
    <div className="form-message">{formMessage}</div>
  )}
                  </form>
                </section>
              </main>
              <a href="#top" className="back-to-top-link">↑ Back to Top</a><br></br><br></br>
              <footer ref={footerRef}>
  <div className="social-links">
    <a href="https://github.com/JWeeks90038" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
      <FaGithub />
    </a>
    <a href="https://www.facebook.com/profile.php?id=61566879270909" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
      <FaFacebook />
    </a>
    <a href="https://instagram.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
      <FaInstagram />
    </a>
    <a href="https://www.linkedin.com/in/jonas-weeks-447136a4" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
      <FaLinkedin />
    </a>
    <a href="jonasweeks.dev@gmail.com" aria-label="Email">
      <FaEnvelope />
    </a>
  </div>
  <p>&copy; {new Date().getFullYear()} Jonas Weeks</p>
</footer><br></br><br></br>
            </div>
          }
        />
        <Route path="/projects" element={<ProjectsPage />} />
      </Routes>
         </div>
        </div>
          </>
  </>
);
}

export default App