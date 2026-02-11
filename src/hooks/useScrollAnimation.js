import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for scroll-triggered animations using Intersection Observer
 * @param {Object} options - Intersection Observer options
 * @returns {Object} - ref and inView state
 */
export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    // Once animated, don't re-trigger
                    observer.unobserve(element);
                }
            },
            {
                threshold: options.threshold || 0.1,
                rootMargin: options.rootMargin || '0px 0px -50px 0px',
                ...options
            }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [options.threshold, options.rootMargin]);

    return { ref, inView };
}

/**
 * Animated counter hook for statistics
 * @param {number} end - Target number
 * @param {number} duration - Animation duration in ms
 * @param {boolean} start - Whether to start counting
 * @returns {number} - Current count value
 */
export function useAnimatedCounter(end, duration = 2000, start = false) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (!start) return;

        let startTime;
        let animationFrame;

        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            // Easing function (ease-out)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(end * easeOut));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, start]);

    return count;
}

export default useScrollAnimation;
