import React from "react";
import { FaGithub, FaFacebook, FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./App.css";

<a id="top"></a>

const projects = [
    {
    title: "Mindful Gateway Therapy",
    year: 2025,
    link: "https://mindfulgatewaytherapy.com",
    image: "/MGT-Screen-Grab.png",
    description: "Mindful Gateway Therapy is a calming, responsive, and informative website built for a licensed therapist offering holistic mental health services. The site presents services, booking details, and therapeutic approaches in a professional and welcoming tone. Emphasis was placed on accessibility, modern aesthetics, and smooth user experience. The design reinforces the brand’s mission: to offer clients a safe gateway to healing through mindfulness and evidence-based therapy.",
    tech: 
      [
        "React", "Next.js", "Tailwind CSS", "Vercel"
      ]
  },
  {
   title: "Grubana",
    year: 2025,
    link: "https://grubana.com",
    image: "/Grubana-Screen-Grab.png",
    description: "Grubana is a dynamic web platform that connects food lovers with mobile food vendors in real time. Designed to support food trucks, trailers, and carts, Grubana lets users discover nearby drops (exclusive deals or menu items), see active vendors on a live map, and interact through time-sensitive “pings” and heatmaps. Vendors can update their locations instantly, highlight limited-time offers, and gather analytics on customer engagement. The system is optimized for mobile-first interactions, with a focus on speed, clarity, and community engagement.",
    tech: [
  "React", "Javascript", "Tailwind CSS", "Firebase Firestore", "Firebase Authentication", "Firebase Cloud Functions", "Vercel"
]
  },
  // Add more projects here
];

export default function ProjectsPage() {
  return (
    <>
      <section className="projects-page">
        <h2>My Projects</h2>
        <div className="projects-list">
          {projects.map((proj, i) => (
            <div className="project-card" key={i}>
              <a href={proj.link} target="_blank" rel="noopener noreferrer">
                <img src={proj.image} alt={proj.title + " preview"} className="project-image" />
              </a>
              <div className="project-info">
                <h3>{proj.title} <span className="project-year">({proj.year})</span></h3>
                <p>{proj.description}</p>
                <div className="project-meta">
                  <div className="project-tech">
                    {proj.tech.map((t, idx) => (
                      <span key={idx} className="tech-badge">{t}</span>
                    ))}
                  </div>
                  <a href={proj.link} target="_blank" rel="noopener noreferrer" className="project-link">Visit Site</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <a href="#top" className="back-to-top-link">↑ Back to Top</a><br></br><br></br>

      <footer>
        <div className="social-links">
          <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
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