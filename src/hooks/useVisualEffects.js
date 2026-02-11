import { useState, useEffect, useCallback } from 'react';

export function useParallax(speed = 0.5) {
    const [offset, setOffset] = useState(0);

    const handleScroll = useCallback(() => {
        const scrollY = window.scrollY;
        setOffset(scrollY * speed);
    }, [speed]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return offset;
}

export function useTilt(ref, options = {}) {
    const { max = 15, speed = 400, perspective = 1000 } = options;

    useEffect(() => {
        const element = ref?.current;
        if (!element) return;

        const handleMouseMove = (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -max;
            const rotateY = ((x - centerX) / centerX) * max;

            element.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        };

        const handleMouseLeave = () => {
            element.style.transform = `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        };

        element.style.transition = `transform ${speed}ms ease`;
        element.addEventListener('mousemove', handleMouseMove);
        element.addEventListener('mouseleave', handleMouseLeave);

        return () => {
            element.removeEventListener('mousemove', handleMouseMove);
            element.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [ref, max, speed, perspective]);
}
