import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { newsAPI } from '../api';
import './MediaCenter.css';

function MediaCenter() {
    const { language, showToast } = useApp();
    const [activeTopic, setActiveTopic] = useState('All');
    const [newsItems, setNewsItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);

    const texts = {
        breadcrumb: { kz: 'Басты бет / Медиа орталық', ru: 'Главная / Медиацентр', en: 'Home / Media Center' },
        title: { kz: 'Медиа орталық және хабарландырулар', ru: 'Медиацентр и объявления', en: 'Media Center & Announcements' },
        subtitle: { kz: 'Республикалық ветеринарлық зертхананың соңғы жаңалықтары, зерттеу нәтижелері мен хабарландыруларымен хабардар болыңыз.', ru: 'Будьте в курсе последних новостей, результатов исследований и объявлений Республиканской ветеринарной лаборатории.', en: 'Stay updated with the latest news, research findings, and announcements from the Republican Veterinary Laboratory.' },
        readFull: { kz: 'Толық мақаланы оқу', ru: 'Читать полную статью', en: 'Read Full Article' },
        browseByTopic: { kz: 'Тақырып бойынша шолу', ru: 'Просмотр по теме', en: 'Browse by Topic' },
        mediaKit: { kz: 'Медиа жиынтық', ru: 'Медиа-кит', en: 'Media Kit' },
        mediaKitText: { kz: 'Ресми логотиптерді, брендтің нұсқаулықтары мен баспасөз материалдарын жүктеп алыңыз.', ru: 'Скачайте официальные логотипы, руководство по бренду и пресс-материалы.', en: 'Download official logos, brand guidelines, and press materials.' },
        downloadKit: { kz: 'Медиа жиынтықты жүктеу', ru: 'Скачать медиа-кит', en: 'Download Media Kit' },
        stayUpdated: { kz: 'Хабардар болыңыз', ru: 'Будьте в курсе', en: 'Stay Updated' },
        subscribeText: { kz: 'Соңғы жаңалықтар мен хабарландыруларды алу үшін жазылыңыз.', ru: 'Подпишитесь, чтобы получать последние новости и обновления.', en: 'Subscribe to receive the latest news and updates.' },
        emailPlaceholder: { kz: 'Email-ді енгізіңіз', ru: 'Введите email', en: 'Enter your email' },
        subscribe: { kz: 'Жазылу', ru: 'Подписаться', en: 'Subscribe' },
        latestUpdates: { kz: 'Соңғы жаңартулар', ru: 'Последние обновления', en: 'Latest Updates' },
        loadMore: { kz: 'Тағы жүктеу', ru: 'Загрузить ещё', en: 'Load More Articles' },
    };

    const topics = {
        kz: ['Барлығы', 'Хабарландырулар', 'Есептер', 'Зерттеулер', 'Іс-шаралар', 'Жаңартулар'],
        ru: ['Все', 'Объявления', 'Отчёты', 'Исследования', 'События', 'Обновления'],
        en: ['All', 'Announcements', 'Reports', 'Research', 'Events', 'Updates'],
    };

    const staticNews = [
        {
            date: { kz: '5 ақпан 2026', ru: '5 февраля 2026', en: 'February 5, 2026' },
            category: { kz: 'Хабарландыру', ru: 'Объявление', en: 'Announcement' },
            title: { kz: 'Ветеринария ғылымын дамыту: Жаңа вирусология бөлімі ашылды', ru: 'Развитие ветеринарной науки: Открыто новое отделение вирусологии', en: 'Advancing Veterinary Science: New Virology Unit Opens' },
            excerpt: { kz: 'Республикалық ветеринарлық зертхана Астанада заманауи вирусология зерттеу бөлімінің ашылуын мақтанышпен хабарлайды.', ru: 'Республиканская ветеринарная лаборатория с гордостью объявляет об открытии современного вирусологического исследовательского подразделения в Астане.', en: 'The Republican Veterinary Laboratory proudly announces the opening of a state-of-the-art virology research unit in Astana.' },
        },
        {
            date: { kz: '1 ақпан 2026', ru: '1 февраля 2026', en: 'Feb 1, 2026' },
            category: { kz: 'Есеп', ru: 'Отчёт', en: 'Report' },
            title: { kz: 'Q3 Есеп: Мал вакцинациясы тиімділігін талдау', ru: 'Отчёт Q3: Анализ эффективности вакцинации скота', en: 'Q3 Report: Analysis of livestock vaccination efficacy' },
        },
    ];

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            try {
                const data = await newsAPI.getAll();
                if (data && data.length > 0) {
                    setNewsItems(data);
                } else {
                    setNewsItems(staticNews);
                }
            } catch (error) {
                console.error('Failed to fetch news:', error);
                setNewsItems(staticNews);
            } finally {
                setIsLoading(false);
            }
        };
        fetchNews();
    }, []);

    const filteredNews = activeTopic === 'All' || activeTopic === 'Все' || activeTopic === 'Барлығы'
        ? newsItems
        : newsItems.filter(item => {
            const cat = typeof item.category === 'object' ? item.category[language] : (item.category || '');
            const query = activeTopic.toLowerCase();
            return cat.toLowerCase().includes(query) ||
                (item.title && typeof item.title === 'object' && item.title[language] && item.title[language].toLowerCase().includes(query)) ||
                (typeof item.title === 'string' && item.title.toLowerCase().includes(query));
        });

    const featuredArt = newsItems[0] || staticNews[0];

    const handleSubscribe = () => {
        showToast(language === 'kz' ? 'Сіз сәтті жазылдыңыз!' : language === 'ru' ? 'Вы успешно подписались!' : 'Successfully subscribed!', 'success');
    };

    const formatDate = (item) => {
        const d = item.date;
        if (!d) return { day: '..', month: '' };

        let dateStr = typeof d === 'object' ? d[language] : d;
        if (dateStr.includes(' ')) {
            const parts = dateStr.split(' ');
            return { day: parts[1] || parts[0], month: parts[0] };
        }
        return { day: dateStr, month: '' };
    };

    return (
        <div className="media-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="breadcrumb">{texts.breadcrumb[language]}</span>
                    <h1>{texts.title[language]}</h1>
                    <p className="page-subtitle">{texts.subtitle[language]}</p>
                </div>
            </section>

            {/* Featured Article */}
            <section className="section">
                <div className="container">
                    <div className="featured-article">
                        <div className="featured-image">
                            {featuredArt?.image ? (
                                <img src={featuredArt.image} alt="Featured" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span className="material-icons">newspaper</span>
                            )}
                        </div>
                        <div className="featured-content">
                            <div className="featured-meta">
                                <span className="featured-category">{typeof featuredArt?.category === 'object' ? featuredArt.category[language] : featuredArt?.category}</span>
                                <span className="featured-date">{typeof featuredArt?.date === 'object' ? featuredArt.date[language] : featuredArt?.date}</span>
                            </div>
                            <h2>{typeof featuredArt?.title === 'object' ? featuredArt.title[language] : featuredArt?.title}</h2>
                            <p>{typeof featuredArt?.excerpt === 'object' ? featuredArt.excerpt[language] : featuredArt?.excerpt}</p>
                            <a href="#" className="btn btn-primary" onClick={(e) => e.preventDefault()}>
                                {texts.readFull[language]} <span className="material-icons">arrow_forward</span>
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* News List */}
            <section className="section news-list-section">
                <div className="container">
                    <div className="media-layout">
                        {/* Sidebar */}
                        <aside className="media-sidebar">
                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">filter_list</span>
                                    {texts.browseByTopic[language]}
                                </h3>
                                <div className="topic-buttons">
                                    {topics[language].map((topic, index) => (
                                        <button
                                            key={index}
                                            className={`topic-btn ${activeTopic === topic ? 'active' : ''}`}
                                            onClick={() => setActiveTopic(topic)}
                                        >
                                            {topic}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">folder_open</span>
                                    {texts.mediaKit[language]}
                                </h3>
                                <p className="sidebar-text">{texts.mediaKitText[language]}</p>
                                <a href="#" className="btn btn-outline btn-full" onClick={(e) => e.preventDefault()}>
                                    <span className="material-icons">download</span>
                                    {texts.downloadKit[language]}
                                </a>
                            </div>

                            <div className="sidebar-section subscribe-section">
                                <h3>
                                    <span className="material-icons">mail</span>
                                    {texts.stayUpdated[language]}
                                </h3>
                                <p className="sidebar-text">{texts.subscribeText[language]}</p>
                                <input type="email" placeholder={texts.emailPlaceholder[language]} className="subscribe-input" />
                                <button className="btn btn-primary btn-full" onClick={handleSubscribe}>{texts.subscribe[language]}</button>
                            </div>
                        </aside>

                        {/* News Grid */}
                        <div className="media-main">
                            <h2 className="section-title-left">{texts.latestUpdates[language]}</h2>
                            <div className="news-list">
                                {isLoading ? (
                                    <div className="loading-placeholder">Loading...</div>
                                ) : filteredNews.map((item, index) => {
                                    const { day, month } = formatDate(item);
                                    return (
                                        <article key={index} className="news-item">
                                            <div className="news-item-image">
                                                {item.image ? (
                                                    <img src={item.image} alt={typeof item.title === 'object' ? item.title[language] : item.title} />
                                                ) : (
                                                    <div className="image-placeholder">
                                                        <span className="material-icons">newspaper</span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="news-item-date">
                                                <span className="date-day">{day}</span>
                                                <span className="date-month">{month}</span>
                                            </div>
                                            <div className="news-item-content">
                                                <span className="news-item-category">{typeof item.category === 'object' ? item.category[language] : item.category}</span>
                                                <h3>{typeof item.title === 'object' ? item.title[language] : item.title}</h3>
                                            </div>
                                            <span className="material-icons news-arrow">arrow_forward</span>
                                        </article>
                                    );
                                })}
                            </div>
                            {filteredNews.length > 0 && (
                                <button className="btn btn-outline load-more" onClick={(e) => e.preventDefault()}>
                                    {texts.loadMore[language]}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default MediaCenter;
