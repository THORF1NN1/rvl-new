import { useState, useEffect } from 'react';
import './ThemeToggle.css';

function ThemeToggle() {
    const [isDark, setIsDark] = useState(() => {
        const saved = localStorage.getItem('theme');
        return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDark]);

    return (
        <button
            className="theme-toggle"
            onClick={() => setIsDark(!isDark)}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Light Mode' : 'Dark Mode'}
        >
            <span className={`theme-icon ${isDark ? 'hidden' : ''}`}>
                <span className="material-icons">dark_mode</span>
            </span>
            <span className={`theme-icon ${isDark ? '' : 'hidden'}`}>
                <span className="material-icons">light_mode</span>
            </span>
        </button>
    );
}

export default ThemeToggle;
