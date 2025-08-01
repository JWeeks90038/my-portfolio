import React from "react";
import "./App.css";

const footageClips = [
  {
    title: "Cinematic Blue Numbers",
    src: "/cinematic_blue_numbers.mp4",
    poster: "/Link-Preview-image.png",
    description: "Abstract blue numbers and code rain, perfect for tech intros and digital backgrounds."
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
      <div className="footage-under-construction" style={{ textAlign: 'center', margin: '1.5rem 0', color: '#888', fontStyle: 'italic' }}>
        🚧 This page is under construction! Dazzling stock footage is on the way. 🚧<br />
        (Our developer is currently negotiating with his coffee mugs.)
      </div>
      <div className="footage-grid">
        {footageClips.map((clip, idx) => (
          <div className="footage-card" key={idx}>
            <video controls poster={clip.poster} width="320" height="180">
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
