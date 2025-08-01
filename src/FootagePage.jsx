
import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./App.css";

// Replace with your actual Shutterstock portfolio link
const SHUTTERSTOCK_URL = "https://www.shutterstock.com/g/EnergyEvolving11";

const footageClips = [
  {
    title: "Malware Breach Alert Red",
    poster: "/malware-breach-alert-red-preview.png",
    description: "A high-intensity animation featuring flashing red breach alerts, digital warning signals, and cascading code snippets. Perfect for illustrating cybersecurity threats, hacking scenes, or IT incident response. This footage captures the urgency and chaos of a malware attack with bold colors and dynamic motion."
  },
  {
    title: "Blue Particle Streams Evolution",
    poster: "/blue-particles-streams-preview.png",
    description: "A captivating 3D animation featuring luminous blue particles swirling and weaving through space, creating intricate, hypnotic patterns. The dynamic movement and depth evoke a sense of wonder and futuristic energy, making this footage ideal for technology intros, sci-fi visuals, creative backgrounds, or any project seeking a mesmerizing and immersive digital atmosphere."
  },
  {
    title: "Blue & Green Energy Particles",
    poster: "/blue-green-energy-particles-preview.png",
    description: "Abstract blue and green particles flowing through a digital landscape, perfect for tech intros and digital backgrounds."
  },
  {
    title: "Crawling Particles",
    poster: "/crawling-particles-preview.png",
    description: "An intricate animation featuring countless particles crawling and weaving across a dark digital surface, forming dynamic trails and organic patterns. This footage evokes the feel of neural networks, data flows, or microscopic life, making it ideal for technology, science, or abstract creative projects."
  },
  {
    title: "Green Diamond Craft Hover",
    poster: "/green-diamond-craft-preview.png",
    description: "A mesmerizing 3D animation featuring a luminous green diamond-shaped craft hovering and gracefully spinning above a wet, dark landscape. Cool, cinematic lighting reflects off the glistening surface, creating an atmospheric and futuristic scene. Perfect for sci-fi intros, technology showcases, or any project seeking a striking and immersive visual centerpiece."
  }
  // Add more clips as needed
];

export default function FootagePage() {
  return (
    <>
      <section className="footage-page" style={{ marginTop: '4rem' }}>
        {/* Top section with background video */}
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '1.5rem', marginBottom: '2.5rem', maxWidth: 900, marginLeft: 'auto', marginRight: 'auto' }}>
          <video
            className="footage-bg-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              zIndex: 0,
              opacity: 0.22,
              filter: typeof window !== 'undefined' && window.innerWidth <= 600 ? 'blur(1px) brightness(0.95)' : 'blur(2.5px) brightness(0.7)',
              pointerEvents: 'none',
              transition: 'opacity 0.4s',
            }}
          >
            <source src="/cinematic_elemental_wave.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div style={{ position: 'relative', zIndex: 2, padding: '3.5rem 1.5rem 2.5rem 1.5rem' }}>
            <h2 style={{ color: '#9ed1e7ff' }}>Stock Footage Collection</h2>
            <div style={{ maxWidth: 700, margin: '0 auto 2rem auto', color: '#b6e3ff', fontSize: '1.15rem', textAlign: 'center', lineHeight: 1.7 }}>
              These stock footage clips were crafted using a blend of creative coding and 3D animation. Some visuals were generated programmatically with JavaScript and p5.js, leveraging algorithmic patterns and digital effects. Others were designed and rendered in <strong>Blender</strong>, utilizing procedural materials, geometry nodes, and custom animation scripts to achieve cinematic results. This collection is a fusion of code-driven art and professional 3D workflows—perfect for tech, creative, and sci-fi projects.
            </div>
            <div style={{ textAlign: 'center' }}>
              <a href={SHUTTERSTOCK_URL} target="_blank" rel="noopener noreferrer" style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, #38bdf8 0%, #38f87a 100%)',
                color: '#18181b',
                fontWeight: 700,
                fontSize: '1.25rem',
                padding: '1rem 2.5rem',
                borderRadius: '2rem',
                textDecoration: 'none',
                boxShadow: '0 4px 24px 0 #38bdf822',
                letterSpacing: '0.04em',
                transition: 'background 0.2s, color 0.2s',
              }}>
                View Full Collection on Shutterstock
              </a>
            </div>
          </div>
        </div>
        <div className="footage-grid">
          {footageClips.map((clip, idx) => (
            <div className="footage-card" key={idx}>
              <a href={SHUTTERSTOCK_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'block', width: '100%' }}>
                <img
                  src={clip.poster}
                  alt={clip.title + ' preview'}
                  style={{
                    width: '100%',
                    maxWidth: '640px',
                    height: 'auto',
                    borderRadius: '10px',
                    boxShadow: '0 2px 16px #38bdf822',
                    marginBottom: '1rem',
                    transition: 'transform 0.2s',
                    objectFit: 'cover',
                    cursor: 'pointer',
                  }}
                />
              </a>
              <div className="footage-info">
                <h3 style={{ color: '#38bdf8' }}>{clip.title}</h3>
                <p style={{ color: '#b6e3ff' }}>{clip.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <button
        className="back-to-top-link"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{ margin: '2rem auto', display: 'block' }}
      >
        ↑ Back to Top
      </button>

      <footer>
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
          <a href="mailto:jonasweeks.dev@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Jonas Weeks</p>
      </footer>
      <br /><br />
    </>
  );
}
