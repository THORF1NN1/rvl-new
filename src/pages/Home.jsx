import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { newsAPI } from '../api';
import { t } from '../data/translations';
import { Link } from 'react-router-dom';
import { useScrollAnimation, useAnimatedCounter } from '../hooks/useScrollAnimation';
import DnaModel from '../components/DnaModel';
import './Home.css';

function Home() {
    const { language } = useApp();

    // Scroll animation refs
    const { ref: statsRef, inView: statsInView } = useScrollAnimation();
    const { ref: featuredRef, inView: featuredInView } = useScrollAnimation();
    const { ref: deptRef, inView: deptInView } = useScrollAnimation();
    const { ref: newsRef, inView: newsInView } = useScrollAnimation();
    const { ref: ctaRef, inView: ctaInView } = useScrollAnimation();

    // Animated counters for featured stats
    const regionsCount = useAnimatedCounter(17, 1500, featuredInView);
    const testsCount = useAnimatedCounter(1000000, 2000, featuredInView);

    const departments = [
        { icon: 'coronavirus', key: 'diagnostics', image: '/images/news-virology.png' },
        { icon: 'science', key: 'research', image: '/images/lab-research.png' },
        { icon: 'verified', key: 'accreditation', image: '/images/quality-control.png' },
        { icon: 'fact_check', key: 'quality', image: '/images/livestock-cattle.png' },
    ];

    const stats = [
        { value: '14', label: { kz: 'Филиал', ru: 'Филиалов', en: 'Branches' } },
        { value: '200+', label: { kz: 'Маман', ru: 'Специалистов', en: 'Specialists' } },
        { value: '50+', label: { kz: 'Зерттеу түрі', ru: 'Видов исследований', en: 'Research Types' } },
        { value: 'ISO', label: { kz: 'Аккредиттелген', ru: 'Аккредитовано', en: 'Accredited' } },
    ];

    const staticNews = [
        { date: '05.02.2026', category: { kz: 'Хабарландыру', ru: 'Объявление', en: 'Announcement' }, title: { kz: 'Жаңа вирусология бөлімі ашылды', ru: 'Открыто новое отделение вирусологии', en: 'New Virology Unit Opens' }, image: '/images/news-virology.png' },
        { date: '01.02.2026', category: { kz: 'Есеп', ru: 'Отчёт', en: 'Report' }, title: { kz: 'Q3 Есеп: Вакцинация тиімділігі', ru: 'Отчёт Q3: Эффективность вакцинации', en: 'Q3 Report: Vaccination Efficacy' }, image: '/images/lab-research.png' },
        { date: '28.01.2026', category: { kz: 'Іс-шара', ru: 'Событие', en: 'Event' }, title: { kz: 'Министрлік делегациясы келді', ru: 'Визит делегации министерства', en: 'Ministry Delegation Visit' }, image: '/images/news-meeting.png' },
    ];

    const [news, setNews] = useState(staticNews);

    useEffect(() => {
        newsAPI.getAll('limit=3')
            .then(data => {
                if (data && data.length) {
                    setNews(data.map(n => ({
                        date: n.date ? new Date(n.date).toLocaleDateString(language === 'kz' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US') : '...',
                        category: n.category,
                        title: n.title,
                        excerpt: n.excerpt,
                        image: n.image // Added missing image field
                    })));
                }
            })
            .catch(() => { });
    }, [language]);

    const formatNumber = (num) => {
        if (num >= 1000000) return '1M+';
        return num.toLocaleString();
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero-bg">
                    <img src="/images/hero-lab.png" alt="Laboratory" />
                    <div className="hero-overlay"></div>
                    <DnaModel />
                </div>
                <div className="container hero-content">
                    <div className="hero-text animate-hero">
                        <span className="hero-badge">
                            <span className="material-icons">verified</span>
                            {t('home.badge', language)}
                        </span>
                        <h1>{t('home.heroTitle', language)}</h1>
                        <p className="hero-description">{t('home.heroDescription', language)}</p>
                        <div className="hero-actions">
                            <Link to="/services" className="btn btn-primary btn-lg">
                                <span className="material-icons">science</span>
                                {t('home.ourServices', language)}
                            </Link>
                            <Link to="/contacts" className="btn btn-outline-light btn-lg">
                                <span className="material-icons">mail</span>
                                {t('home.contactUs', language)}
                            </Link>
                        </div>
                    </div>
                    <div className="hero-card animate-hero-card">
                        <div className="hero-card-icon">
                            <span className="material-icons">workspace_premium</span>
                        </div>
                        <h3>ISO/IEC 17025:2017</h3>
                        <p>{t('home.accreditation', language)}</p>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="stats-section" ref={statsRef}>
                <div className="container">
                    <div className={`stats-grid ${statsInView ? 'animate-stagger' : ''}`}>
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="stat-item"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <span className="stat-value">{stat.value}</span>
                                <span className="stat-label">{stat.label[language]}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured Image Section */}
            <section className="featured-section" ref={featuredRef}>
                <div className="container">
                    <div className="featured-content">
                        <div className={`featured-image ${featuredInView ? 'animate-slide-in-left' : ''}`}>
                            <img src="/images/livestock-cattle.png" alt="Veterinary Field Work" />
                        </div>
                        <div className={`featured-text ${featuredInView ? 'animate-slide-in-right' : ''}`}>
                            <h2>
                                {language === 'kz' ? 'Қазақстан бойынша ветеринарлық қауіпсіздік' :
                                    language === 'ru' ? 'Ветеринарная безопасность по всему Казахстану' :
                                        'Veterinary Safety Across Kazakhstan'}
                            </h2>
                            <p>
                                {language === 'kz' ? 'Біз елдің барлық аймақтарында мал денсаулығын қорғап, ауыл шаруашылығының орнықты дамуына үлес қосамыз.' :
                                    language === 'ru' ? 'Мы защищаем здоровье животных во всех регионах страны, способствуя устойчивому развитию сельского хозяйства.' :
                                        'We protect animal health in all regions of the country, contributing to sustainable agricultural development.'}
                            </p>
                            <div className="featured-stats">
                                <div className="featured-stat">
                                    <span className="featured-stat-value">{regionsCount}</span>
                                    <span className="featured-stat-label">
                                        {language === 'kz' ? 'Аймақ' : language === 'ru' ? 'Регионов' : 'Regions'}
                                    </span>
                                </div>
                                <div className="featured-stat">
                                    <span className="featured-stat-value">{formatNumber(testsCount)}</span>
                                    <span className="featured-stat-label">
                                        {language === 'kz' ? 'Зерттеу/жыл' : language === 'ru' ? 'Исследований/год' : 'Tests/Year'}
                                    </span>
                                </div>
                            </div>
                            <Link to="/structure" className="btn btn-primary">
                                {language === 'kz' ? 'Филиалдарды көру' : language === 'ru' ? 'Посмотреть филиалы' : 'View Branches'}
                                <span className="material-icons">arrow_forward</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Departments */}
            <section className="section departments-section" ref={deptRef}>
                <div className="container">
                    <div className={`section-header ${deptInView ? 'animate-fade-down' : ''}`}>
                        <h2>{t('home.keyDepartments', language)}</h2>
                        <Link to="/services" className="section-link">
                            {t('home.viewAll', language)}
                            <span className="material-icons">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="departments-grid">
                        {departments.map((dept, index) => (
                            <Link
                                to="/services"
                                key={index}
                                className={`department-card ${deptInView ? 'animate-card' : ''}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="department-image">
                                    <img src={dept.image} alt={t(`departments.${dept.key}.title`, language)} />
                                    <div className="department-icon">
                                        <span className="material-icons">{dept.icon}</span>
                                    </div>
                                </div>
                                <div className="department-content">
                                    <h3>{t(`departments.${dept.key}.title`, language)}</h3>
                                    <p>{t(`departments.${dept.key}.description`, language)}</p>
                                    <span className="department-link">
                                        {t('home.learnMore', language)}
                                        <span className="material-icons">arrow_forward</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* News */}
            <section className="section news-section" ref={newsRef}>
                <div className="container">
                    <div className={`section-header ${newsInView ? 'animate-fade-down' : ''}`}>
                        <h2>{t('home.latestNews', language)}</h2>
                        <Link to="/media" className="section-link">
                            {t('home.viewAll', language)}
                            <span className="material-icons">arrow_forward</span>
                        </Link>
                    </div>
                    <div className="news-grid">
                        {news.map((item, index) => (
                            <Link
                                to="/media"
                                key={index}
                                className={`news-card ${newsInView ? 'animate-card' : ''}`}
                                style={{ animationDelay: `${index * 0.15}s` }}
                            >
                                <div className="news-image">
                                    {item.image ? (
                                        <img src={item.image} alt={typeof item.title === 'object' ? item.title[language] : item.title} />
                                    ) : (
                                        <div className="news-image-placeholder">
                                            <span className="material-icons">newspaper</span>
                                        </div>
                                    )}
                                </div>
                                <div className="news-content">
                                    <div className="news-meta">
                                        <span className="news-date">{item.date}</span>
                                        <span className="news-category">{item.category[language]}</span>
                                    </div>
                                    <h3>{item.title[language]}</h3>
                                    <span className="news-link">
                                        {t('home.readMore', language)}
                                        <span className="material-icons">arrow_forward</span>
                                    </span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="cta-section" ref={ctaRef}>
                <div className="cta-bg">
                    <img src="/images/hero-lab.png" alt="Laboratory" />
                    <div className="cta-overlay"></div>
                </div>
                <div className="container">
                    <div className={`cta-content ${ctaInView ? 'animate-zoom-in' : ''}`}>
                        <h2>
                            {language === 'kz' ? 'Сұрақтарыңыз бар ма?' :
                                language === 'ru' ? 'Есть вопросы?' :
                                    'Have Questions?'}
                        </h2>
                        <p>
                            {language === 'kz' ? 'Біздің мамандар сізге көмектесуге дайын' :
                                language === 'ru' ? 'Наши специалисты готовы вам помочь' :
                                    'Our specialists are ready to help you'}
                        </p>
                        <Link to="/contacts" className="btn btn-primary btn-lg">
                            <span className="material-icons">phone</span>
                            {t('home.contactUs', language)}
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Home;
