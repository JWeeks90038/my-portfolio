import React, { useState, useEffect } from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./App.css";

const projects = [
  {
    title: "Stellar Merit Statuary",
    year: 2025,
    link: "https://stellarmeritstatuary.com/",
    image: "/stellar-merit-image.png",
    description: "Stellar Merit Statuary is a professional website designed for a specialized concrete statue building business. The platform showcases custom concrete statuary services, featuring an elegant gallery of handcrafted sculptures, monuments, and decorative concrete artwork. The site provides detailed information about custom design processes, material options, and installation services. With integrated Stripe payment processing, customers can seamlessly place orders and make secure payments for their custom concrete sculptures. With a focus on craftsmanship and durability, Stellar Merit Statuary helps clients visualize and commission unique concrete sculptures for gardens, memorials, commercial spaces, and architectural projects.",
    tech: ["React", "CSS", "JavaScript", "Stripe Integration", "Responsive Design", "Image Gallery", "Contact Forms", "SEO Optimization"]
  },
  {
    title: "Grubana",
    year: 2025,
    link: "#",
    image: "/grubana-thumbnail.png",
    description: "Grubana was a dynamic, real-time web platform that bridged the gap between food lovers and mobile food vendors. Built to support food trucks, trailers, and carts, the platform enabled users to discover nearby vendor 'drops' on an interactive map, receive live updates, and engage with vendors through time-sensitive pings and heatmaps. The project featured vendor profiles, real-time location tracking, and analytics dashboards for business owners. With robust authentication, geolocation, and notification systems, Grubana streamlined the process of finding, promoting, and enjoying local mobile cuisine. Successfully developed both web and mobile applications, with the mobile app receiving approval for distribution on both Apple App Store and Google Play Store.",
    tech: ["React", "JavaScript", "Tailwind CSS", "Firebase Firestore", "Firebase Authentication", "Firebase Cloud Functions", "Google Maps API", "Real-time Database", "Stripe", "React Native", "App Store Approval", "Google Play Approval", "Vercel"],
    appStoreLogos: {
      appleStore: "/apple-app-store-logo.png",
      googlePlay: "/google-play-store-logo.png"
    }
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
        <div className="projects-video-background">
          <img
            src="/coding-background.png"
            alt="Cinematic Blue Numbers Background"
            className="projects-video-bg"
            style={{
              width: '100vw', // Span the full width of the screen
              height: '50%',
              objectFit: 'cover',
              borderRadius: '1.5rem',
              position: 'absolute', // Anchor the image
              top: '75%', // Move the image lower on the page
              left: '50%', // Center horizontally
              transform: 'translate(-50%, -50%)', // Adjust for centering
              transition: 'transform 0.1s linear',
              zIndex: 0, // Ensure image is below the video
            }}
          />
        </div>
        <h2>My Projects</h2>

        <div className="projects-video-wrapper">
          <video
            className="projects-video"
            src="/quantum-c.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              borderRadius: '1.5rem',
              opacity: 0.7,
              zIndex: 0, // Ensure video is above the image
              position: 'relative',
              boxShadow: '0 0 20px 10px rgba(0, 0, 0, 0.5)', // Feathered border effect
            }}
          />
        </div>
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
          <div className="project-carousel-container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <div
              className="project-slides-wrapper"
              style={{ transform: `translateX(-${currentProject * 100}%)` }}
            >
              {projects.map((project, index) => (
                <div key={index} className="project-card-carousel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div className="project-title-container" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.5rem', color: 'white' }}>
                      {project.title} <span className="project-year">({project.year})</span>
                    </h3>
                  </div>
                  <div className="project-image-container">
                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                      <img
                        src={project.image}
                        alt={project.title + " preview"}
                        className="project-image-carousel"
                        style={{ width: '100%', marginBottom: '1rem' }}
                      />
                    </a>
                  </div>
                  <div className="project-info-carousel">
                    <p>{project.description}</p>
                    {project.appStoreLogos && (
                      <div className="app-store-logos" style={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        gap: '1rem', 
                        margin: '1rem 0',
                        flexWrap: 'wrap'
                      }}>
                        <img 
                          src={project.appStoreLogos.appleStore} 
                          alt="Available on Apple App Store" 
                          style={{ 
                            height: '40px', 
                            width: 'auto',
                            borderRadius: '8px'
                          }}
                        />
                        <img 
                          src={project.appStoreLogos.googlePlay} 
                          alt="Available on Google Play Store" 
                          style={{ 
                            height: '40px', 
                            width: 'auto',
                            borderRadius: '8px'
                          }}
                        />
                      </div>
                    )}
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