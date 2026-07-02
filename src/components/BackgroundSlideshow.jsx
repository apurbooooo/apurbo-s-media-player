import React, { useState, useEffect } from 'react';

const SLIDES = [
  '/slideshow/slide1.jpg',
  '/slideshow/slide2.jpg',
  '/slideshow/slide3.jpg',
  '/slideshow/slide4.jpg',
  '/slideshow/slide5.jpg'
];

export default function BackgroundSlideshow() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % SLIDES.length);
    }, 7000); // Transition slides every 7 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="background-slideshow-container" aria-hidden="true">
      {SLIDES.map((slide, index) => (
        <div
          key={index}
          className={`background-slide ${index === activeIndex ? 'active' : ''}`}
          style={{ backgroundImage: `url(${slide})` }}
        />
      ))}
      <div className="background-slideshow-overlay" />
    </div>
  );
}
