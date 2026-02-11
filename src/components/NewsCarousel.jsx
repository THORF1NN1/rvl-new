import { useState, useEffect, useCallback } from 'react';
import './NewsCarousel.css';

function NewsCarousel({ news, language }) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % news.length);
    }, [news.length]);

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + news.length) % news.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
        setIsAutoPlaying(false);
        // Resume auto-play after 10 seconds
        setTimeout(() => setIsAutoPlaying(true), 10000);
    };

    // Auto-play
    useEffect(() => {
        if (!isAutoPlaying) return;

        const interval = setInterval(nextSlide, 5000);
        return () => clearInterval(interval);
    }, [isAutoPlaying, nextSlide]);

    return (
        <div className="news-carousel">
            <div className="carousel-container">
                <div
                    className="carousel-track"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                    {news.map((item, index) => (
                        <div key={index} className="carousel-slide">
                            <div className="carousel-image">
                                <img src={item.image} alt={item.title[language]} />
                                <div className="carousel-overlay">
                                    <span className="carousel-category">{item.category[language]}</span>
                                </div>
                            </div>
                            <div className="carousel-content">
                                <span className="carousel-date">
                                    <span className="material-icons">calendar_today</span>
                                    {item.date}
                                </span>
                                <h3>{item.title[language]}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button className="carousel-arrow carousel-prev" onClick={prevSlide}>
                <span className="material-icons">chevron_left</span>
            </button>
            <button className="carousel-arrow carousel-next" onClick={nextSlide}>
                <span className="material-icons">chevron_right</span>
            </button>

            {/* Dots */}
            <div className="carousel-dots">
                {news.map((_, index) => (
                    <button
                        key={index}
                        className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                        onClick={() => goToSlide(index)}
                    />
                ))}
            </div>

            {/* Progress Bar */}
            <div className="carousel-progress">
                <div
                    className="carousel-progress-bar"
                    style={{
                        animationDuration: isAutoPlaying ? '5s' : '0s',
                        animationPlayState: isAutoPlaying ? 'running' : 'paused'
                    }}
                    key={currentSlide}
                />
            </div>
        </div>
    );
}

export default NewsCarousel;
