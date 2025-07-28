import React, { useState } from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./App.css";

const projects = [
  {
    title: "Mindful Gateway Therapy",
    year: 2025,
    link: "https://mindfulgatewaytherapy.com",
    image: "/MGT-Screen-Grab.png",
    description: "Mindful Gateway Therapy is a calming, responsive, and informative website built for a licensed therapist offering holistic mental health services. The site presents services, booking details, and therapeutic approaches in a professional and welcoming tone.",
    tech: ["HTML", "CSS", "Javascript", "SVG","Vercel"]
  },
  {
    title: "Grubana",
    year: 2025,
    link: "https://grubana.com",
    image: "/Grubana-Screen-Grab.png",
    description: "Grubana is a dynamic web platform that connects food lovers with mobile food vendors in real time. Designed to support food trucks, trailers, and carts, Grubana lets users discover nearby drops and interact through time-sensitive 'pings' and heatmaps.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Firebase Firestore", "Firebase Authentication", "Firebase Cloud Functions", "Google Maps API", "Geolocation API", "Real-time Database", "Vercel"]
  },
  {
    title: "Dream Mint - Coming Soon",
    year: 2025,
    link: "#",
    image: "/Dream-Mint-Screen-Grab.png",
    description: "Dream Mint is an innovative decentralized application (DApp) that revolutionizes digital asset creation and NFT minting through AI-powered dream interpretation. Users can input their dreams, which are then transformed into unique digital artwork using advanced AI image generation APIs. The platform combines blockchain technology with artificial intelligence to create personalized, one-of-a-kind NFTs that represent users' subconscious experiences. Built on Ethereum with smart contract functionality for secure minting, trading, and royalty distribution.",
    tech: ["React", "Solidity", "Web3.js", "OpenAI API", "Ethereum", "IPFS", "MetaMask Integration"]
  }
];

export default function ProjectsPage() {
  const [currentProject, setCurrentProject] = useState(0);

  const nextProject = () => {
    setCurrentProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setCurrentProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setCurrentProject(index);
  };

 return (
  <>
    <div className="name-watermark">
      <span>Jonas Weeks</span>
    </div>
    
    <section className="projects-page">
      {/* Add video background */}
      <div className="projects-video-background">
        <video 
          className="projects-video-bg"
          autoPlay 
          muted 
          loop 
          playsInline
          preload="auto"
          poster="/video-poster.jpg"
        >
          <source src="/cinematic_blue_numbers.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <h2>My Projects</h2>
      
      <div className="project-carousel">
          {/* Move controls to the top */}
          <div className="carousel-controls">
            <button onClick={prevProject} className="carousel-btn">
              <FaChevronLeft />
            </button>
            
            <div className="carousel-dots">
              {projects.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToProject(index)}
                  className={`carousel-dot ${index === currentProject ? 'active' : ''}`}
                />
              ))}
            </div>
            
            <button onClick={nextProject} className="carousel-btn">
              <FaChevronRight />
            </button>
          </div>

          <div className="carousel-counter">
            {currentProject + 1} of {projects.length}
          </div>
          
          {/* Project slides below controls */}
          <div className="project-carousel-container">
            <div 
              className="project-slides-wrapper"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="project-card-carousel">
                  <a href={project.link} target="_blank" rel="noopener noreferrer">
                    <img 
                      src={project.image} 
                      alt={project.title + " preview"} 
                      className="project-image-carousel" 
                    />
                  </a>
                  <div className="project-info-carousel">
                    <h3>{project.title} <span className="project-year">({project.year})</span></h3>
                    <p>{project.description}</p>
                    <div className="project-meta">
                      <div className="project-tech">
                        {project.tech.map((t, idx) => (
                          <span key={idx} className="tech-badge">{t}</span>
                        ))}
                      </div>
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        Visit Site
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <button
        className="back-to-top-link"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑ Back to Top
      </button>
      <br /><br />

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
          <a href="jonasweeks.dev@gmail.com" aria-label="Email">
            <FaEnvelope />
          </a>
        </div>
        <p>&copy; {new Date().getFullYear()} Jonas Weeks</p>
      </footer>
      <br /><br />
    </>
  );
}