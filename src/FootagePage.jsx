import React from "react";
import "./App.css";

const footageClips = [
  {
    title: "Malware Breach Alert Red",
    src: "/matrix_cyber_red.mp4",
    poster: "/malware-breach-alert-red-preview.png",
    description: "A high-intensity animation featuring flashing red breach alerts, digital warning signals, and cascading code snippets. Perfect for illustrating cybersecurity threats, hacking scenes, or IT incident response. This footage captures the urgency and chaos of a malware attack with bold colors and dynamic motion."
  },
  {
    title: "Cinematic Elemental Wave",
    src: "/cinematic-elemental-wave.mp4",
    poster: "/cinematic-elemental-wave-preview.png",
    description: "A mesmerizing animation featuring flowing, wave-like patterns that evoke the movement of elemental forces. This cinematic footage blends digital artistry with fluid motion, making it ideal for sci-fi intros, creative backgrounds, technology presentations, or any project seeking a dynamic and visually captivating effect."
  },
  {
    title: "Blue & Green Energy Particles",
    src: "/blue-green-energy-particles.mp4",
    poster: "/blue-green-energy-particles-preview.png",
    description: "Abstract blue and green particles flowing through a digital landscape, perfect for tech intros and digital backgrounds."
  },
  {
    title: "Matrix 3D Blue",
    src: "/matrix_3d_blue.mp4",
    poster: "/Dream-Mint-Screen-Grab.png",
    description: "3D matrix-inspired animation, ideal for sci-fi, cyber, and creative projects."
  }
  // Add more clips as needed
];

export default function FootagePage() {
  return (
    <section className="footage-page" style={{ marginTop: '4rem' }}>
      <h2>Stock Footage Collection</h2>
      <div style={{ maxWidth: 700, margin: '0 auto 2rem auto', color: '#b6e3ff', fontSize: '1.15rem', textAlign: 'center', lineHeight: 1.7 }}>
        These stock footage clips were crafted using a blend of creative coding and 3D animation. Some visuals were generated programmatically with JavaScript and p5.js, leveraging algorithmic patterns and digital effects. Others were designed and rendered in <strong>Blender</strong>, utilizing procedural materials, geometry nodes, and custom animation scripts to achieve cinematic results. This collection is a fusion of code-driven art and professional 3D workflows—perfect for tech, creative, and sci-fi projects.
      </div>
      <div className="footage-under-construction" style={{ textAlign: 'center', margin: '1.5rem 0', color: '#888', fontStyle: 'italic' }}>
        🚧 This page is under construction! Dazzling stock footage is on the way. 🚧<br />
        (Our developer is currently negotiating with his coffee mugs.)
      </div>
      <div className="footage-grid">
        {footageClips.map((clip, idx) => (
          <div className="footage-card" key={idx}>
            <video controls poster={clip.poster} width="480" height="270">
  <source src={clip.src} type="video/mp4" />
  Your browser does not support the video tag.
</video>
            <div className="footage-info">
              <h3>{clip.title}</h3>
              <p>{clip.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
