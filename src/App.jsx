import SplashGlitchP5 from './SplashGlitchP5';

import { useEffect, useRef, useState } from 'react';
import AnimatedCode from './AnimatedCode';
import CircuitGrid from './CircuitGrid';
import { Routes, Route, Link, useNavigate, useLocation } from "react-router-dom";
import FootagePage from "./FootagePage";
import ProjectsPage from "./ProjectsPage";
import ScrollToTop from "./ScrollToTop";
import FloatingCodeSymbols from "./FloatingCodeSymbols";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import './App.css';
import AOS from 'aos';
import 'aos/dist/aos.css';



function App() {
  //const [scrollY, setScrollY] = useState(window.scrollY);
  const [time, setTime] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const [wipeUp, setWipeUp] = useState(false);
  const [gradientT, setGradientT] = useState(0);
  const [svgWidth, setSvgWidth] = useState(window.innerWidth);
  const [docHeight, setDocHeight] = useState(document.documentElement.scrollHeight);
  const [contentHeight, setContentHeight] = useState(window.innerHeight);
  const [footerRect, setFooterRect] = useState({ top: 0, height: 80 });
  //const [animatedOrbY, setAnimatedOrbY] = useState(0);
  const [fadeIn, setFadeIn] = useState(false);
  const [showGlow, setShowGlow] = useState(false);
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

// Add this useEffect after your existing useEffects in App.jsx
useEffect(() => {
  const typeWriterElements = document.querySelectorAll('.typewriter-text');
  
  const typeWriter = (element, text, speed = 50) => {
    let index = 0;
    element.textContent = '';
    
    const type = () => {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(type, speed);
      } else {
        element.classList.add('typing-complete');
      }
    };
    
    type();
  };

  const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
        entry.target.classList.add('typed');
        const text = entry.target.getAttribute('data-text');
        // Stagger the typing animation for each testimonial
        setTimeout(() => {
          typeWriter(entry.target, text, 30 + Math.random() * 20);
        }, index * 1000); // 1 second delay between each testimonial
      }
    });
  }, observerOptions);

  typeWriterElements.forEach(element => {
    observer.observe(element);
  });

  return () => {
    typeWriterElements.forEach(element => {
      observer.unobserve(element);
    });
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

  /*useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    const interval = setInterval(() => setTime(Date.now()), 30);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, []);*/

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
  // Splash wipe-up logic
  useEffect(() => {
    if (showSplash) {
      // Show splash for 6s, then trigger wipe-up
      const timer1 = setTimeout(() => setWipeUp(true), 6000);
      // After wipe-up animation (1s), hide splash
      const timer2 = setTimeout(() => setShowSplash(false), 7000);
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [showSplash]);

  return (
    <div>
      {/* Splash Intro Overlay */}
      {showSplash && (
        <div className={`splash-intro-overlay${wipeUp ? ' wipe-up' : ''}`}>
          <SplashGlitchP5 text="Jonas Weeks" />
        </div>
      )}
      {/* Main site content always present, just covered by overlay */}
      <div className="atmospheric-gradient-bg" aria-hidden="true"></div>
      <a id="top"></a>
      <ScrollToTop />
      <nav className="glow-navbar">
        <Link to="/" className="nav-orb">
          <span className="orb-dot"></span>
          <span className="orb-label">Home</span>
        </Link>
        <Link to="/projects" className="nav-orb">
          <span className="orb-dot"></span>
          <span className="orb-label">Projects</span>
        </Link>
        <Link to="/footage" className="nav-orb">
          <span className="orb-dot"></span>
          <span className="orb-label">Footage</span>
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
      <div className={`site-fade-in${fadeIn ? ' visible' : ''}`}> 
        <div className="atmospheric-gradient-bg" aria-hidden="true"></div>
        {/* Main site content, always present */}
        <div className="hazy-bg" aria-hidden="true"></div>
        <div className="hazy-blob blob1"></div>
        <div className="hazy-blob blob2"></div>
        <div className="hazy-blob blob3"></div>
        <div className="site-content" ref={contentRef}>
          <Routes>
            <Route path="/" element={
              <>
                {/* Hero Section */}
                <div className="name-watermark">
                  <span>Jonas Weeks</span>
                </div>
                <section className="hero-section" data-aos="fade-up">
                  <div className="glass-card">
                    <div className="hero-video-background">
                      <video 
                        className="hero-video-bg"
                        autoPlay 
                        muted 
                        loop 
                        playsInline
                        preload="auto"
                        poster="/video-poster.jpg"
                      >
                        <source src="/matrix_3d_blue.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    <p>Full Stack Web Developer | Creative Coder | Problem Solver</p>
                    <br /><br /><br />
                    {/* Tech Stack Badges */}
                    <div className="tech-stack-badges">
                      <div className="tech-category">
                        <span className="learning-label">Languages:</span>
                        <span className="tech-badge">HTML</span>
                        <span className="tech-badge">CSS</span>
                        <span className="tech-badge">JavaScript</span>
                        <span className="tech-badge">TypeScript</span>
                        <span className="tech-badge">Solidity</span>
                        <span className="tech-badge">Python</span>
                      </div>
                      <div className="tech-category">
                        <span className="learning-label">Frameworks & Libraries:</span>
                        <span className="tech-badge">React</span>
                        <span className="tech-badge">Next.js</span>
                        <span className="tech-badge">Node.js</span>
                        <span className="tech-badge">Web3</span>
                      </div>
                      <div className="tech-category">
                        <span className="learning-label">Tools & Platforms:</span>
                        <span className="tech-badge">Git</span>
                        <span className="tech-badge">Vercel</span>
                        <span className="tech-badge">Railway</span>
                        <span className="tech-badge">VS Code</span>
                      </div>
                      <div className="tech-category">
                        <span className="learning-label">Databases & Services:</span>
                        <span className="tech-badge">Firebase</span>
                        <span className="tech-badge">Clerk</span>
                        <span className="tech-badge">API Integration</span>
                      </div>
                    </div>
                    <br /><br />
                    <Link to="/projects" className="cta-btn">See My Work</Link>
                    <br /><br /><br />
                  </div>
                </section>
                <main>
                  <br /><br /><br /><br /><br /><br /><br /><br /><br />
                  <section id="projects" className="glow-white-section" data-aos="fade-up">
                    <h2>Meet the Developer:</h2>
                    <div className="developer-photo-container">
                      <img
                        src="/jonas-img.png"
                        alt="Jonas Weeks"
                        className="developer-photo"
                      />
                    </div>
                    <div className="about-text">
                      <div>
                        <p>
                          I am a full stack developer who thrives on building creative, impactful websites, applications, and AI automation tools. In a world where technology and artificial intelligence are evolving at breakneck speed, I believe that embracing change and leveraging the latest AI tools is essential—not just for innovation, but for staying relevant. My portfolio spans projects from blockchain applications to AI-powered solutions, each one a testament to my drive to adapt, learn, and turn new ideas into real products.
                        </p>
                        <p>
                          Every project is an opportunity to push boundaries and explore what’s possible with modern technology. Whether I’m designing intuitive user interfaces, architecting robust backend systems, integrating AI APIs for intelligent features, or building custom automation workflows, I approach each challenge with a mindset of continuous learning and adaptation. My hands-on process means I’m always experimenting with the latest in Web3, machine learning, and automation—because in today’s world, standing still is not an option.
                        </p>
                        <p>
                          I believe that great software is built by those who are willing to evolve, adapt, and solve problems creatively—especially as AI and emerging technologies reshape our industry. My portfolio reflects not only my foundation in traditional web development, but also my commitment to exploring smart contracts, DeFi protocols, and AI-driven automation. I’m excited to keep moving forward, building solutions that harness the power of both blockchain and AI to meet the demands of our rapidly changing world.
                        </p>
<div className="availability-info glass-card availability-glow" data-aos="zoom-in">
  <div className="animated-border"></div>
  <p className="availability-title"><strong>Currently available for new projects and collaborations.</strong></p>
  <div className="expertise-message">
    <div style={{ marginBottom: '1.1rem' }}>
      <span className="highlighted-text gradient-text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600 }}>
        Flexible project structures for development, AI/blockchain, and design—tailored to your needs.
      </span>
      <span className="highlighted-text gradient-text" style={{ display: 'block', fontWeight: 500 }}>
        Fixed-price and milestone-based options available.
      </span>
      <span className="highlighted-text gradient-text" style={{ display: 'block', marginTop: '0.5rem', fontWeight: 500 }}>
        Discounts for startups, non-profits, and long-term engagements.
      </span>
    </div>
    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1rem' }}>
      <span className="invite-text gradient-text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>
        Curious about working together? Reach out for a free consultation and project estimate.
      </span>
      <span className="invite-text gradient-text" style={{ display: 'block', fontWeight: 500 }}>
        Contact me to discuss your project and get a personalized proposal.
      </span>
    </div>
  </div>
</div>
                        <div className="testimonials-section" data-aos="fade-up">
                          <h3>What Clients Are Saying:</h3>
                          <div className="testimonials-container">
                            <div className="testimonial">
                              <div className="testimonial-content">
                                <span className="typewriter-text" data-text='"Working with Jonas to build our company website was an incredibly smooth and professional experience. From the very beginning, he took the time to understand the needs of my practice and translated them into a site that feels calm, welcoming, and aligned with my brand. He was attentive to detail, highly responsive during the entire process — especially when last-minute updates were needed — and made sure the site was fast, mobile-friendly, and easy for me to manage. I have already received positive feedback from clients about how user-friendly and visually appealing the site is. I am so pleased with the result and would absolutely recommend his work to other small business owners or therapists looking for a reliable developer."'></span>
                              </div>
                              <div className="testimonial-author">
                                <span className="client-name">— Karina, LPCC & Founder</span>
                                <span className="client-project">Mindful Gateway Therapy</span>
                              </div>
                            </div>
                            <div className="testimonial">
                              <div className="testimonial-content">
                                <span className="typewriter-text" data-text='"Building Grubana has been one of the most challenging and rewarding journeys of my career. I created the platform from the ground up to solve a real problem I saw in the food truck community — the disconnect between incredible local food vendors and the people trying to find them. As a full stack developer and founder, I architected every part of Grubana — from the real-time map and ping system to the analytics dashboard and drop claiming system — with scalability, speed, and user experience in mind. But more than just code, Grubana represents my belief that technology should empower small business owners and create vibrant communities. I am proud of what Grubana has become, and even more excited about where it is going. This is just the beginning."'></span>
                              </div>
                              <div className="testimonial-author">
                                <span className="client-name">— Jonas, Developer & Founder</span>
                                <span className="client-project">Grubana Platform</span>
                              </div>
                            </div>
                          </div>
                        </div>
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
                <button
                  className="back-to-top-link"
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  ↑ Back to Top
                </button>
                <br /><br />
                <footer ref={footerRef}>
                  <div className="social-links">
                    <a href="https://github.com/JWeeks90038" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                      <FaGithub />
                    </a>
                    <a href="https://www.facebook.com/profile.php?id=61566879270909" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                      <FaFacebook />
                    </a>
                    <a href="https://www.instagram.com/treecastle82/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
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
                </footer>
              </>
            } />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/footage" element={<FootagePage />} />
          </Routes>
        </div>
      </div>
    </div>
  );
// ...existing code...
}

export default App