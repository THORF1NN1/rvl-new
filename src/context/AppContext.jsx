import { createContext, useContext, useState, useEffect } from 'react';
import { authAPI, settingsAPI } from '../api';

const AppContext = createContext();

export function AppProvider({ children }) {
    // Language state (stored in localStorage)
    const [language, setLanguage] = useState(() => {
        return localStorage.getItem('rvl-language') || 'ru';
    });

    // Theme state (stored in localStorage)
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('rvl-dark-mode');
        return saved === 'true';
    });

    // Site settings
    const [settings, setSettings] = useState({
        siteName: { kz: 'РВП', ru: 'РВЛ', en: 'RVL' },
        siteDescription: { kz: '', ru: '', en: '' },
    });

    // Auth state
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('rvl-token'));
    const [authLoading, setAuthLoading] = useState(true);

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Toast notifications
    const [toasts, setToasts] = useState([]);

    // Modal state
    const [modal, setModal] = useState({ isOpen: false, content: null, title: '' });

    // Persist language preference
    useEffect(() => {
        localStorage.setItem('rvl-language', language);
        document.documentElement.lang = language;
    }, [language]);

    // Persist dark mode preference and apply class
    useEffect(() => {
        localStorage.setItem('rvl-dark-mode', isDarkMode);
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);

    // Restore session and settings on mount
    useEffect(() => {
        const init = async () => {
            // Fetch settings
            try {
                const s = await settingsAPI.get();
                if (s) setSettings(s);
            } catch (err) {
                console.error('Failed to fetch settings:', err);
            }

            if (token) {
                try {
                    const userData = await authAPI.me();
                    setUser(userData);
                } catch {
                    // Token invalid — clear it
                    localStorage.removeItem('rvl-token');
                    setToken(null);
                }
            }
            setAuthLoading(false);
        };
        init();
    }, []);

    // Theme functions
    const toggleDarkMode = () => {
        setIsDarkMode(prev => !prev);
    };

    // Auth functions
    const login = async (email, password) => {
        const data = await authAPI.login(email, password);
        localStorage.setItem('rvl-token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    };

    const register = async (name, email, password) => {
        const data = await authAPI.register(name, email, password);
        localStorage.setItem('rvl-token', data.token);
        setToken(data.token);
        setUser(data.user);
        return data.user;
    };

    const logout = () => {
        localStorage.removeItem('rvl-token');
        setToken(null);
        setUser(null);
    };

    // Toast functions
    const showToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    };

    const closeToast = (id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    };

    // Modal functions
    const openModal = (title, content) => {
        setModal({ isOpen: true, title, content });
    };

    const closeModal = () => {
        setModal({ isOpen: false, content: null, title: '' });
    };

    const value = {
        // Language
        language,
        setLanguage,
        // Settings
        settings,
        setSettings,
        // Theme
        isDarkMode,
        setIsDarkMode,
        toggleDarkMode,
        // Auth
        user,
        token,
        authLoading,
        login,
        register,
        logout,
        // Search
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        // Toast
        toasts,
        showToast,
        closeToast,
        // Modal
        modal,
        openModal,
        closeModal,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within AppProvider');
    }
    return context;
}

export default AppContext;
