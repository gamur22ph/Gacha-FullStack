import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react'; // Optional: Install lucide-react for clean icons
import { useAuth } from '../contexts/AuthContext';
import { isTokenValid } from '../helpers/TokenValidatorUtils';

const HeroBanner = ({onHeroBannerClick}: {onHeroBannerClick : () => void}) => {
    const { user, token } = useAuth();

  // Sample data structure expected from your MERN backend
  const slides = [
    {
      image: "src/assets/night-background.jpg",
      title: "Gacha System",
      subtitle: "Get items and win rare stuffs. Test your luck now.",
      ctaText: "Try Gacha",
      ctaLink: (user && token ? "/gacha" : ""),
      ctaButton: (token && !isTokenValid(token) ? () => onHeroBannerClick() : () => onHeroBannerClick())
    },
    {
      image: "src/assets/design/green-wp.avif",
      title: "Full Stack Web Application",
      subtitle: "MERN Stack App with full authentication, payment system, and a Gacha System for proof of concept.",
      ctaText: "Show Details",
      ctaLink: "#system-details"
    },
    {
      image: "src/assets/design/dev-wallpaper.jpg",
      title: "Developer",
      subtitle: "Take a look at the developer's portfolio and projects.",
      ctaText: "View Portfolio",
      ctaLink: "/cv"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Navigation Functions
  const prevSlide = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  // Auto-play Effect
  useEffect(() => {
    if (isHovered) return; // Pause auto-play on hover

    const slideInterval = setInterval(() => {
      nextSlide();
    }, 5000); // Changes slide every 5 seconds

    return () => clearInterval(slideInterval);
  }, [currentIndex, isHovered]);

  return (
    <div 
      className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden group bg-gray-900"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Slide Background and Content */}
      <div
        className="w-full h-full bg-cover bg-center duration-700 ease-in-out transition-all"
        style={{ backgroundImage: `url(${slides[currentIndex].image})` }}
      >
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center px-8 md:px-16 text-white">
          <div className="max-w-2xl space-y-4 animate-fadeIn">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-none">
              {slides[currentIndex].title}
            </h1>
            <p className="text-lg md:text-xl text-gray-200">
              {slides[currentIndex].subtitle}
            </p>
            <div className="pt-4">
                {slides[currentIndex].title === slides[0].title ?
                    <>
                        {token && isTokenValid(token) ?
                            <a
                                href={slides[currentIndex].ctaLink}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 shadow-lg"
                            >
                                {slides[currentIndex].ctaText}
                            </a>
                        :
                            <button
                                onClick={slides[currentIndex].ctaButton}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 shadow-lg"
                            >
                                {slides[currentIndex].ctaText}
                            </button>
                        }
                    </>
                :
                    ""
                }
                {slides[currentIndex].title !== slides[0].title ? 
                    <a
                        href={slides[currentIndex].ctaLink}
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-md transition-colors duration-200 shadow-lg"
                    >
                        {slides[currentIndex].ctaText}
                    </a>
                    :
                    ""
                }
                
              
            </div>
          </div>
        </div>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={prevSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 left-5 text-2xl rounded-full p-2 bg-black/30 hover:bg-black/60 text-white cursor-pointer transition-colors duration-200"
        aria-label="Previous slide"
      >
        <ChevronLeft size={30} />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={nextSlide}
        className="hidden group-hover:block absolute top-1/2 -translate-y-1/2 right-5 text-2xl rounded-full p-2 bg-black/30 hover:bg-black/60 text-white cursor-pointer transition-colors duration-200"
        aria-label="Next slide"
      >
        <ChevronRight size={30} />
      </button>

      {/* Bottom Indicator Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;