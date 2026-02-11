import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Search.css';

function Search() {
    const { language, isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery } = useApp();
    const inputRef = useRef(null);
    const [results, setResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const texts = {
        placeholder: { kz: 'Іздеу...', ru: 'Поиск...', en: 'Search...' },
        noResults: { kz: 'Нәтиже табылмады', ru: 'Результатов не найдено', en: 'No results found' },
        searching: { kz: 'Іздеу...', ru: 'Поиск...', en: 'Searching...' },
        pages: { kz: 'Беттер', ru: 'Страницы', en: 'Pages' },
        services: { kz: 'Қызметтер', ru: 'Услуги', en: 'Services' },
        documents: { kz: 'Құжаттар', ru: 'Документы', en: 'Documents' },
        close: { kz: 'Жабу', ru: 'Закрыть', en: 'Close' },
        hint: { kz: 'ESC басыңыз немесе сыртын басыңыз', ru: 'Нажмите ESC или кликните снаружи', en: 'Press ESC or click outside' },
    };

    // Search data - pages and content
    const searchData = [
        // Pages
        { type: 'page', title: { kz: 'Басты бет', ru: 'Главная', en: 'Home' }, path: '/', keywords: ['home', 'главная', 'басты'] },
        { type: 'page', title: { kz: 'Біз туралы', ru: 'О нас', en: 'About Us' }, path: '/about', keywords: ['about', 'о нас', 'біз туралы', 'история', 'тарих'] },
        { type: 'page', title: { kz: 'Қызметтер', ru: 'Услуги', en: 'Services' }, path: '/services', keywords: ['services', 'услуги', 'қызметтер', 'анализ', 'тест'] },
        { type: 'page', title: { kz: 'Оқу орталығы', ru: 'Учебный центр', en: 'Training Center' }, path: '/training', keywords: ['training', 'обучение', 'оқу', 'курсы', 'курстар'] },
        { type: 'page', title: { kz: 'Заңнама', ru: 'Законодательство', en: 'Legal Acts' }, path: '/legal', keywords: ['legal', 'закон', 'заң', 'нормативный', 'акт'] },
        { type: 'page', title: { kz: 'Медиа орталық', ru: 'Медиа центр', en: 'Media Center' }, path: '/media', keywords: ['media', 'медиа', 'новости', 'жаңалықтар', 'news'] },
        { type: 'page', title: { kz: 'Байланыс', ru: 'Контакты', en: 'Contacts' }, path: '/contacts', keywords: ['contacts', 'контакты', 'байланыс', 'адрес', 'телефон'] },
        { type: 'page', title: { kz: 'Жеке кабинет', ru: 'Личный кабинет', en: 'Dashboard' }, path: '/dashboard', keywords: ['dashboard', 'кабинет', 'профиль', 'profile'] },

        // Services
        { type: 'service', title: { kz: 'Бруцеллёз диагностикасы', ru: 'Диагностика бруцеллёза', en: 'Brucellosis Diagnostics' }, path: '/services', keywords: ['brucellosis', 'бруцеллёз', 'бруцеллез', 'диагностика'] },
        { type: 'service', title: { kz: 'ПТР диагностика', ru: 'ПЦР диагностика', en: 'PCR Diagnostics' }, path: '/services', keywords: ['pcr', 'пцр', 'птр', 'молекулярная', 'молекулалық'] },
        { type: 'service', title: { kz: 'Серологиялық зерттеу', ru: 'Серологические исследования', en: 'Serological Tests' }, path: '/services', keywords: ['serology', 'серология', 'серологиялық', 'антитела'] },
        { type: 'service', title: { kz: 'Бактериологиялық зерттеу', ru: 'Бактериологические исследования', en: 'Bacteriological Analysis' }, path: '/services', keywords: ['bacteriology', 'бактериология', 'бактериологиялық'] },
        { type: 'service', title: { kz: 'Вирусологиялық зерттеу', ru: 'Вирусологические исследования', en: 'Virology Tests' }, path: '/services', keywords: ['virology', 'вирусология', 'вирусологиялық', 'вирус'] },
        { type: 'service', title: { kz: 'Антибиотикке сезімталдық', ru: 'Чувствительность к антибиотикам', en: 'Antibiotic Sensitivity' }, path: '/services', keywords: ['antibiotic', 'антибиотик', 'антибиотикке', 'чувствительность'] },

        // Documents
        { type: 'document', title: { kz: 'Ветеринариялық заңнама', ru: 'Закон о ветеринарии', en: 'Veterinary Law' }, path: '/legal', keywords: ['veterinary law', 'закон', 'заң', 'ветеринария'] },
        { type: 'document', title: { kz: 'Сертификация ережелері', ru: 'Правила сертификации', en: 'Certification Rules' }, path: '/legal', keywords: ['certification', 'сертификация', 'сертификат', 'правила'] },
    ];

    // Focus input when modal opens
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
        }
    }, [isSearchOpen]);

    // Handle ESC key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') {
                setIsSearchOpen(false);
            }
        };
        if (isSearchOpen) {
            document.addEventListener('keydown', handleEsc);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEsc);
            document.body.style.overflow = '';
        };
    }, [isSearchOpen, setIsSearchOpen]);

    // Search function
    useEffect(() => {
        if (!searchQuery.trim()) {
            setResults([]);
            return;
        }

        setIsLoading(true);
        const query = searchQuery.toLowerCase();

        // Simulate search delay
        const timer = setTimeout(() => {
            const filtered = searchData.filter(item => {
                const titleMatch = item.title[language].toLowerCase().includes(query);
                const keywordMatch = item.keywords.some(k => k.includes(query));
                return titleMatch || keywordMatch;
            });
            setResults(filtered);
            setIsLoading(false);
        }, 200);

        return () => clearTimeout(timer);
    }, [searchQuery, language]);

    const handleClose = () => {
        setIsSearchOpen(false);
        setSearchQuery('');
        setResults([]);
    };

    const handleResultClick = () => {
        handleClose();
    };

    const groupedResults = {
        page: results.filter(r => r.type === 'page'),
        service: results.filter(r => r.type === 'service'),
        document: results.filter(r => r.type === 'document'),
    };

    if (!isSearchOpen) return null;

    return (
        <div className="search-overlay" onClick={handleClose}>
            <div className="search-modal" onClick={(e) => e.stopPropagation()}>
                <div className="search-header">
                    <div className="search-input-wrapper">
                        <span className="material-icons search-icon">search</span>
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={texts.placeholder[language]}
                            className="search-input"
                        />
                        {searchQuery && (
                            <button className="search-clear" onClick={() => setSearchQuery('')}>
                                <span className="material-icons">close</span>
                            </button>
                        )}
                    </div>
                    <button className="search-close-btn" onClick={handleClose}>
                        <span className="material-icons">close</span>
                    </button>
                </div>

                <div className="search-results">
                    {isLoading ? (
                        <div className="search-loading">
                            <span className="material-icons spinning">sync</span>
                            <span>{texts.searching[language]}</span>
                        </div>
                    ) : searchQuery && results.length === 0 ? (
                        <div className="search-no-results">
                            <span className="material-icons">search_off</span>
                            <span>{texts.noResults[language]}</span>
                        </div>
                    ) : (
                        <>
                            {groupedResults.page.length > 0 && (
                                <div className="search-group">
                                    <h4>{texts.pages[language]}</h4>
                                    {groupedResults.page.map((item, idx) => (
                                        <Link key={idx} to={item.path} className="search-result-item" onClick={handleResultClick}>
                                            <span className="material-icons">article</span>
                                            <span>{item.title[language]}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {groupedResults.service.length > 0 && (
                                <div className="search-group">
                                    <h4>{texts.services[language]}</h4>
                                    {groupedResults.service.map((item, idx) => (
                                        <Link key={idx} to={item.path} className="search-result-item" onClick={handleResultClick}>
                                            <span className="material-icons">science</span>
                                            <span>{item.title[language]}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                            {groupedResults.document.length > 0 && (
                                <div className="search-group">
                                    <h4>{texts.documents[language]}</h4>
                                    {groupedResults.document.map((item, idx) => (
                                        <Link key={idx} to={item.path} className="search-result-item" onClick={handleResultClick}>
                                            <span className="material-icons">description</span>
                                            <span>{item.title[language]}</span>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div className="search-footer">
                    <span>{texts.hint[language]}</span>
                </div>
            </div>
        </div>
    );
}

export default Search;
