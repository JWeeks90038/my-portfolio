import React, { useState, useEffect } from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./App.css";

const projects = [
  {
    title: "Dream Mint - Coming Soon",
    year: 2025,
    link: "#",
    image: "/Dream-Mint-Screen-Grab.png",
    description: "Dream Mint is an innovative decentralized application (dApp) that revolutionizes digital asset creation and NFT minting through AI-powered dream interpretation. Users can input their dreams, which are then transformed into unique digital artwork using advanced AI image generation APIs. The platform combines blockchain technology with artificial intelligence to create personalized, one-of-a-kind NFTs that represent users' subconscious experiences. Built on Ethereum with smart contract functionality for secure minting, trading, and royalty distribution.",
    tech: ["React", "Solidity", "Web3.js", "OpenAI API", "Solana", "IPFS", "MetaMask & Phantom Integration"]
  },
  {
    title: "Tikkra",
    year: 2025,
    link: "https://tikkra.com",
    image: "/tikkra-grab.png",
    description: "Tikkra is an advanced AI-powered timestamp generator designed specifically for content creators. By analyzing transcripts, Tikkra automatically generates precise and context-aware timestamps, streamlining the process of video and podcast editing. This allows creators to focus on producing high-quality content while Tikkra handles the technical details of segmenting and organizing their work. With its intuitive interface and robust AI algorithms, Tikkra empowers creators to enhance audience engagement and improve content accessibility with minimal effort.",
    tech: ["React", "CSS", "Firebase","OpenAI API", "Vercel", "Railway"]
  },
  {
    title: "Grubana",
    year: 2025,
    link: "https://grubana.com",
    image: "/grubana-grab.png",
    description: "Grubana is a dynamic, real-time web platform that bridges the gap between food lovers and mobile food vendors. Built to support food trucks, trailers, and carts, Grubana enables users to discover nearby vendor 'drops' on an interactive map, receive live updates, and engage with vendors through time-sensitive pings and heatmaps. The platform features vendor profiles, real-time location tracking, and analytics dashboards for business owners. With robust authentication, geolocation, and notification systems, Grubana streamlines the process of finding, promoting, and enjoying local mobile cuisine, empowering both vendors and customers to connect in new and meaningful ways.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Firebase Firestore", "Firebase Authentication", "Firebase Cloud Functions", "Google Maps API", "Real-time Database", "Vercel"]
  },
  {
    title: "Mindful Gateway Therapy",
    year: 2025,
    link: "https://mindfulgatewaytherapy.com",
    image: "/MGT-Screen-Grab.png",
    description: "Mindful Gateway Therapy is a thoughtfully designed, fully responsive website created for a licensed therapist specializing in holistic mental health services. The platform provides a calming and accessible user experience, featuring detailed service descriptions, therapist credentials, and an easy-to-navigate booking system. Visitors can explore therapeutic approaches, read client testimonials, and access valuable mental health resources. Built with a focus on professionalism, trust, and accessibility, the site helps clients connect with the therapist in a welcoming and supportive digital environment.",
    tech: ["HTML", "CSS", "Javascript", "SVG","Vercel"]
  }
];

const ProjectsPage = () => {
  const [currentProject, setCurrentProject] = useState(0);
  const [bgOffset, setBgOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setBgOffset(window.scrollY * 0.3); // Adjust multiplier for speed
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        {/* Replace video background with PNG image background */}
        <div className="projects-video-background">
          <img
            src="/coding-background.png"
            alt="Cinematic Blue Numbers Background"
            className="projects-video-bg"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '1.5rem',
              transform: `translateY(${bgOffset}px)`,
              transition: 'transform 0.1s linear',
            }}
          />
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
};

export default ProjectsPage;