import { useState, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './AdminLayout.css';

function AdminLayout() {
    const { language, user, authLoading } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!authLoading) {
            if (!user) {
                navigate('/login');
            } else if (user.role !== 'admin' && user.role !== 'editor') {
                navigate('/dashboard');
            }
        }
    }, [user, authLoading, navigate]);

    useEffect(() => {
        setIsTransitioning(true);
        const timer = setTimeout(() => setIsTransitioning(false), 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    const notifications = [
        { id: 1, text: language === 'ru' ? 'Новая заявка: RVL-2026-1247' : 'New request: RVL-2026-1247', time: '2m ago', unread: true },
        { id: 2, text: language === 'ru' ? 'Новости успешно опубликованы' : 'News published successfully', time: '1h ago', unread: false },
        { id: 3, text: language === 'ru' ? 'Еженедельный отчет готов' : 'Weekly report is ready', time: '3h ago', unread: false },
    ];

    const menuItems = [
        { path: '/admin', icon: 'dashboard', label: { kz: 'Басқару тақтасы', ru: 'Панель', en: 'Dashboard' } },
        { path: '/admin/applications', icon: 'assignment', label: { kz: 'Өтінімдер', ru: 'Заявки', en: 'Applications' } },
        { path: '/admin/messages', icon: 'chat', label: { kz: 'Хабарламалар', ru: 'Сообщения', en: 'Messages' } },
        { path: '/admin/news', icon: 'newspaper', label: { kz: 'Жаңалықтар', ru: 'Новости', en: 'News' } },
        { path: '/admin/users', icon: 'people', label: { kz: 'Пайдаланушылар', ru: 'Пользователи', en: 'Users' } },
        { path: '/admin/settings', icon: 'settings', label: { kz: 'Баптаулар', ru: 'Настройки', en: 'Settings' } },
    ];

    if (authLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc' }}>
                <div className="loading-spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-layout">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="admin-sidebar-header">
                    <div className="admin-logo">
                        <span className="material-icons">biotech</span>
                        <span>RVL Admin</span>
                    </div>
                </div>

                <nav className="admin-nav">
                    {menuItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/admin'}
                            className={({ isActive }) => `admin-nav-link ${isActive ? 'active' : ''}`}
                        >
                            <span className="material-icons">{item.icon}</span>
                            <span>{item.label[language]}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="admin-sidebar-footer">
                    <button className="admin-logout" onClick={() => navigate('/')}>
                        <span className="material-icons">arrow_back</span>
                        <span>{language === 'kz' ? 'Сайтқа қайту' : language === 'ru' ? 'На сайт' : 'Back to Site'}</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-main">
                <header className="admin-header">
                    <h1>
                        {menuItems.find(m => m.path === location.pathname)?.label[language] ||
                            (language === 'kz' ? 'Әкімшілік панель' : language === 'ru' ? 'Админ-панель' : 'Admin Panel')}
                    </h1>

                    <div className="admin-header-actions">
                        <div className="admin-search-box">
                            <span className="material-icons">search</span>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder={language === 'kz' ? 'Іздеу...' : language === 'ru' ? 'Поиск...' : 'Search...'}
                            />
                        </div>

                        <div className="admin-notif-wrapper">
                            <button
                                className={`admin-notification-btn ${isNotifOpen ? 'active' : ''}`}
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                title="Notifications"
                            >
                                <span className="material-icons">notifications</span>
                                <span className="notification-badge"></span>
                            </button>

                            {isNotifOpen && (
                                <div className="notif-dropdown">
                                    <div className="notif-header">
                                        <h4>{language === 'ru' ? 'Уведомления' : 'Notifications'}</h4>
                                        <button onClick={() => setIsNotifOpen(false)}><span className="material-icons">close</span></button>
                                    </div>
                                    <div className="notif-list">
                                        {notifications.map(n => (
                                            <div key={n.id} className={`notif-item ${n.unread ? 'unread' : ''}`}>
                                                <div className="notif-icon">
                                                    <span className="material-icons">info</span>
                                                </div>
                                                <div className="notif-content">
                                                    <p>{n.text}</p>
                                                    <span>{n.time}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="notif-footer">
                                        <button>{language === 'ru' ? 'Все уведомления' : 'View all'}</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="admin-user">
                            <span className="material-icons">account_circle</span>
                            <span>{user?.name || 'Admin'}</span>
                        </div>
                    </div>
                </header>
                <div className={`admin-content ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                    <Outlet context={{ searchQuery }} />
                </div>
            </main>
        </div>
    );
}

export default AdminLayout;

