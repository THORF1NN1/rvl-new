import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import { applicationsAPI } from '../api';
import './Dashboard.css';

function Dashboard() {
    const { language, setLanguage, user, logout, login, showToast, isDarkMode, toggleDarkMode } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [isEditing, setIsEditing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [statsData, setStatsData] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (!user) return;

        const fetchData = async () => {
            try {
                const [stats, apps] = await Promise.all([
                    applicationsAPI.getStats(),
                    applicationsAPI.getAll('limit=5')
                ]);
                setStatsData(stats);
                setOrders(apps);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [user]);

    const [profileData, setProfileData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        email: user?.email || '',
        phone: user?.phone || '+7 (___) ___-__-__',
        organization: user?.organization || '',
        position: user?.position || '',
        address: user?.address || '',
    });

    const texts = {
        welcome: { kz: 'Қош келдіңіз', ru: 'Добро пожаловать', en: 'Welcome' },
        dashboard: { kz: 'Жеке кабинет', ru: 'Личный кабинет', en: 'Personal Cabinet' },
        overview: { kz: 'Шолу', ru: 'Обзор', en: 'Overview' },
        profile: { kz: 'Профиль', ru: 'Профиль', en: 'Profile' },
        myOrders: { kz: 'Менің тапсырыстарым', ru: 'Мои заказы', en: 'My Orders' },
        myResults: { kz: 'Менің нәтижелерім', ru: 'Мои результаты', en: 'My Results' },
        documents: { kz: 'Құжаттар', ru: 'Документы', en: 'Documents' },
        notifications: { kz: 'Хабарламалар', ru: 'Уведомления', en: 'Notifications' },
        settings: { kz: 'Баптаулар', ru: 'Настройки', en: 'Settings' },
        logout: { kz: 'Шығу', ru: 'Выйти', en: 'Log Out' },
        logoutSuccess: { kz: 'Сәтті шықтыңыз', ru: 'Вы вышли из системы', en: 'Successfully logged out' },

        // Profile
        personalInfo: { kz: 'Жеке ақпарат', ru: 'Личная информация', en: 'Personal Information' },
        firstName: { kz: 'Аты', ru: 'Имя', en: 'First Name' },
        lastName: { kz: 'Тегі', ru: 'Фамилия', en: 'Last Name' },
        email: { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
        phone: { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
        organization: { kz: 'Ұйым', ru: 'Организация', en: 'Organization' },
        position: { kz: 'Лауазымы', ru: 'Должность', en: 'Position' },
        address: { kz: 'Мекенжай', ru: 'Адрес', en: 'Address' },
        edit: { kz: 'Өңдеу', ru: 'Редактировать', en: 'Edit' },
        save: { kz: 'Сақтау', ru: 'Сохранить', en: 'Save' },
        cancel: { kz: 'Болдырмау', ru: 'Отмена', en: 'Cancel' },
        profileUpdated: { kz: 'Профиль сәтті жаңартылды', ru: 'Профиль успешно обновлён', en: 'Profile updated successfully' },
        changePassword: { kz: 'Құпия сөзді өзгерту', ru: 'Изменить пароль', en: 'Change Password' },
        securitySettings: { kz: 'Қауіпсіздік параметрлері', ru: 'Настройки безопасности', en: 'Security Settings' },
        twoFactor: { kz: 'Екі факторлы аутентификация', ru: 'Двухфакторная аутентификация', en: 'Two-Factor Authentication' },
        enabled: { kz: 'Қосылған', ru: 'Включено', en: 'Enabled' },
        disabled: { kz: 'Өшірілген', ru: 'Отключено', en: 'Disabled' },

        // Stats
        activeOrders: { kz: 'Белсенді тапсырыстар', ru: 'Активные заказы', en: 'Active Orders' },
        completedTests: { kz: 'Аяқталған тестер', ru: 'Завершённые тесты', en: 'Completed Tests' },
        pendingResults: { kz: 'Күтудегі нәтижелер', ru: 'Ожидающие результаты', en: 'Pending Results' },
        certificates: { kz: 'Сертификаттар', ru: 'Сертификаты', en: 'Certificates' },

        // Quick Actions
        quickActions: { kz: 'Жылдам әрекеттер', ru: 'Быстрые действия', en: 'Quick Actions' },
        orderTest: { kz: 'Тест тапсырыс беру', ru: 'Заказать тест', en: 'Order a Test' },
        viewResults: { kz: 'Нәтижелерді көру', ru: 'Посмотреть результаты', en: 'View Results' },
        downloadCert: { kz: 'Сертификат жүктеу', ru: 'Скачать сертификат', en: 'Download Certificate' },
        contactSupport: { kz: 'Қолдау қызметі', ru: 'Связаться с поддержкой', en: 'Contact Support' },

        // Recent Activity
        recentActivity: { kz: 'Соңғы белсенділік', ru: 'Последняя активность', en: 'Recent Activity' },

        // Orders
        orderId: { kz: 'Тапсырыс №', ru: 'Заказ №', en: 'Order #' },
        date: { kz: 'Күні', ru: 'Дата', en: 'Date' },
        status: { kz: 'Мәртебе', ru: 'Статус', en: 'Status' },
        inProgress: { kz: 'Орындалуда', ru: 'В процессе', en: 'In Progress' },
        completed: { kz: 'Аяқталды', ru: 'Завершён', en: 'Completed' },
        noOrders: { kz: 'Тапсырыстар жоқ', ru: 'Нет заказов', en: 'No orders yet' },

        // Results
        testName: { kz: 'Тест атауы', ru: 'Название теста', en: 'Test Name' },
        result: { kz: 'Нәтиже', ru: 'Результат', en: 'Result' },
        negative: { kz: 'Теріс', ru: 'Отрицательный', en: 'Negative' },
        positive: { kz: 'Оң', ru: 'Положительный', en: 'Positive' },
        download: { kz: 'Жүктеу', ru: 'Скачать', en: 'Download' },
        noResults: { kz: 'Нәтижелер жоқ', ru: 'Нет результатов', en: 'No results yet' },

        // Settings
        generalSettings: { kz: 'Жалпы баптаулар', ru: 'Общие настройки', en: 'General Settings' },
        notificationSettings: { kz: 'Хабарлама баптаулары', ru: 'Настройки уведомлений', en: 'Notification Settings' },
        languageSettings: { kz: 'Тіл баптаулары', ru: 'Настройки языка', en: 'Language Settings' },
        emailNotifications: { kz: 'Email хабарламалар', ru: 'Email уведомления', en: 'Email Notifications' },
        smsNotifications: { kz: 'SMS хабарламалар', ru: 'SMS уведомления', en: 'SMS Notifications' },
        pushNotifications: { kz: 'Push хабарламалар', ru: 'Push уведомления', en: 'Push Notifications' },
        orderUpdates: { kz: 'Тапсырыс жаңартулары', ru: 'Обновления заказов', en: 'Order Updates' },
        resultReady: { kz: 'Нәтижелер дайын', ru: 'Результаты готовы', en: 'Results Ready' },
        newsletter: { kz: 'Жаңалықтар', ru: 'Рассылка новостей', en: 'Newsletter' },
        darkMode: { kz: 'Қараңғы режим', ru: 'Тёмный режим', en: 'Dark Mode' },
        selectLanguage: { kz: 'Тілді таңдаңыз', ru: 'Выберите язык', en: 'Select Language' },
        settingsSaved: { kz: 'Баптаулар сақталды', ru: 'Настройки сохранены', en: 'Settings saved' },

        // Notifications
        allNotifications: { kz: 'Барлық хабарламалар', ru: 'Все уведомления', en: 'All Notifications' },
        unread: { kz: 'Оқылмаған', ru: 'Непрочитанные', en: 'Unread' },
        markAllRead: { kz: 'Барлығын оқылған деп белгілеу', ru: 'Отметить все как прочитанные', en: 'Mark all as read' },
        today: { kz: 'Бүгін', ru: 'Сегодня', en: 'Today' },
        yesterday: { kz: 'Кеше', ru: 'Вчера', en: 'Yesterday' },
        earlier: { kz: 'Бұрынырақ', ru: 'Ранее', en: 'Earlier' },
    };

    const handleLogout = () => {
        logout();
        showToast(texts.logoutSuccess[language], 'success');
        navigate('/');
    };

    const handleProfileChange = (e) => {
        setProfileData({ ...profileData, [e.target.name]: e.target.value });
    };

    const handleProfileSave = () => {
        // Update user in context
        login({
            ...user,
            name: `${profileData.firstName} ${profileData.lastName}`,
            email: profileData.email,
            phone: profileData.phone,
            organization: profileData.organization,
            position: profileData.position,
            address: profileData.address,
        });
        setIsEditing(false);
        showToast(texts.profileUpdated[language], 'success');
    };

    // If not logged in, redirect to login
    if (!user) {
        return (
            <div className="dashboard-page">
                <div className="dashboard-login-prompt">
                    <span className="material-icons">lock</span>
                    <h2>{language === 'kz' ? 'Кіру қажет' : language === 'ru' ? 'Требуется вход' : 'Login Required'}</h2>
                    <p>{language === 'kz' ? 'Жеке кабинетке кіру үшін авторизациядан өтіңіз' : language === 'ru' ? 'Для доступа к личному кабинету войдите в систему' : 'Please log in to access your personal cabinet'}</p>
                    <Link to="/login" className="btn btn-primary">
                        <span className="material-icons">login</span>
                        {language === 'kz' ? 'Кіру' : language === 'ru' ? 'Войти' : 'Sign In'}
                    </Link>
                </div>
            </div>
        );
    }

    const stats = [
        { icon: 'shopping_cart', value: statsData.total, label: texts.activeOrders[language], color: 'blue' },
        { icon: 'task_alt', value: statsData.approved, label: texts.completedTests[language], color: 'green' },
        { icon: 'hourglass_empty', value: statsData.pending, label: texts.pendingResults[language], color: 'orange' },
        { icon: 'verified', value: statsData.rejected, label: texts.certificates[language], color: 'purple' },
    ];

    const quickActions = [
        { icon: 'add_circle', label: texts.orderTest[language], href: '/services' },
        { icon: 'analytics', label: texts.viewResults[language], onClick: () => setActiveTab('results') },
        { icon: 'download', label: texts.downloadCert[language], href: '#' },
        { icon: 'support_agent', label: texts.contactSupport[language], href: '/contacts' },
    ];

    const menuItems = [
        { id: 'overview', icon: 'dashboard', label: texts.overview[language] },
        { id: 'profile', icon: 'person', label: texts.profile[language] },
        { id: 'orders', icon: 'shopping_cart', label: texts.myOrders[language] },
        { id: 'results', icon: 'science', label: texts.myResults[language] },
        { id: 'documents', icon: 'folder', label: texts.documents[language] },
        { id: 'notifications', icon: 'notifications', label: texts.notifications[language], badge: 3 },
        { id: 'settings', icon: 'settings', label: texts.settings[language] },
    ];

    const sampleOrders = orders;

    const sampleResults = [
        { id: 1, testName: language === 'kz' ? 'Бруцеллёз тесті' : language === 'ru' ? 'Тест на бруцеллёз' : 'Brucellosis Test', date: '05.02.2026', result: 'negative' },
        { id: 2, testName: language === 'kz' ? 'Сальмонеллёз тесті' : language === 'ru' ? 'Тест на сальмонеллёз' : 'Salmonella Test', date: '01.02.2026', result: 'negative' },
        { id: 3, testName: language === 'kz' ? 'Антибиотик сезімталдылығы' : language === 'ru' ? 'Чувствительность к антибиотикам' : 'Antibiotic Sensitivity', date: '28.01.2026', result: 'positive' },
    ];

    const renderOverview = () => (
        <>
            {/* Stats Grid */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className={`stat-card stat-${stat.color}`}>
                        <div className="stat-icon">
                            <span className="material-icons">{stat.icon}</span>
                        </div>
                        <div className="stat-content">
                            <span className="stat-value">{stat.value}</span>
                            <span className="stat-label">{stat.label}</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Quick Actions */}
            <section className="dashboard-section">
                <h2>{texts.quickActions[language]}</h2>
                <div className="quick-actions">
                    {quickActions.map((action, index) => (
                        action.onClick ? (
                            <button key={index} onClick={action.onClick} className="quick-action-card">
                                <span className="material-icons">{action.icon}</span>
                                <span>{action.label}</span>
                            </button>
                        ) : (
                            <Link key={index} to={action.href} className="quick-action-card">
                                <span className="material-icons">{action.icon}</span>
                                <span>{action.label}</span>
                            </Link>
                        )
                    ))}
                </div>
            </section>

            {/* Recent Activity */}
            <section className="dashboard-section">
                <h2>{texts.recentActivity[language]}</h2>
                <div className="activity-list">
                    <div className="activity-item">
                        <div className="activity-icon success">
                            <span className="material-icons">check_circle</span>
                        </div>
                        <div className="activity-content">
                            <p><strong>{language === 'kz' ? 'Бруцеллёз тесті аяқталды' : language === 'ru' ? 'Тест на бруцеллёз завершён' : 'Brucellosis test completed'}</strong></p>
                            <span>{language === 'kz' ? '2 сағат бұрын' : language === 'ru' ? '2 часа назад' : '2 hours ago'}</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-icon pending">
                            <span className="material-icons">hourglass_empty</span>
                        </div>
                        <div className="activity-content">
                            <p><strong>{language === 'kz' ? 'ПТР диагностикасы өңделуде' : language === 'ru' ? 'ПЦР диагностика в обработке' : 'PCR diagnostics processing'}</strong></p>
                            <span>{language === 'kz' ? 'Кеше' : language === 'ru' ? 'Вчера' : 'Yesterday'}</span>
                        </div>
                    </div>
                    <div className="activity-item">
                        <div className="activity-icon info">
                            <span className="material-icons">receipt_long</span>
                        </div>
                        <div className="activity-content">
                            <p><strong>{language === 'kz' ? 'Жаңа тапсырыс жасалды #2024-0125' : language === 'ru' ? 'Новый заказ создан #2024-0125' : 'New order created #2024-0125'}</strong></p>
                            <span>{language === 'kz' ? '3 күн бұрын' : language === 'ru' ? '3 дня назад' : '3 days ago'}</span>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );

    const renderProfile = () => (
        <div className="profile-section">
            <div className="profile-card">
                <div className="profile-card-header">
                    <h2>{texts.personalInfo[language]}</h2>
                    {!isEditing ? (
                        <button className="btn btn-outline" onClick={() => setIsEditing(true)}>
                            <span className="material-icons">edit</span>
                            {texts.edit[language]}
                        </button>
                    ) : (
                        <div className="profile-actions">
                            <button className="btn btn-outline" onClick={() => setIsEditing(false)}>
                                {texts.cancel[language]}
                            </button>
                            <button className="btn btn-primary" onClick={handleProfileSave}>
                                <span className="material-icons">save</span>
                                {texts.save[language]}
                            </button>
                        </div>
                    )}
                </div>

                <div className="profile-avatar-section">
                    <div className="profile-avatar-large">
                        <span className="material-icons">person</span>
                    </div>
                    {isEditing && (
                        <button className="btn btn-outline btn-sm">
                            <span className="material-icons">photo_camera</span>
                            {language === 'kz' ? 'Фото өзгерту' : language === 'ru' ? 'Изменить фото' : 'Change Photo'}
                        </button>
                    )}
                </div>

                <div className="profile-form">
                    <div className="form-row-2">
                        <div className="form-group">
                            <label>{texts.firstName[language]}</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="firstName"
                                    value={profileData.firstName}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="form-value">{profileData.firstName || '-'}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>{texts.lastName[language]}</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="lastName"
                                    value={profileData.lastName}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="form-value">{profileData.lastName || '-'}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-row-2">
                        <div className="form-group">
                            <label>{texts.email[language]}</label>
                            {isEditing ? (
                                <input
                                    type="email"
                                    name="email"
                                    value={profileData.email}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="form-value">{profileData.email}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>{texts.phone[language]}</label>
                            {isEditing ? (
                                <input
                                    type="tel"
                                    name="phone"
                                    value={profileData.phone}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="form-value">{profileData.phone || '-'}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-row-2">
                        <div className="form-group">
                            <label>{texts.organization[language]}</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="organization"
                                    value={profileData.organization}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="form-value">{profileData.organization || '-'}</p>
                            )}
                        </div>
                        <div className="form-group">
                            <label>{texts.position[language]}</label>
                            {isEditing ? (
                                <input
                                    type="text"
                                    name="position"
                                    value={profileData.position}
                                    onChange={handleProfileChange}
                                    className="form-input"
                                />
                            ) : (
                                <p className="form-value">{profileData.position || '-'}</p>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label>{texts.address[language]}</label>
                        {isEditing ? (
                            <input
                                type="text"
                                name="address"
                                value={profileData.address}
                                onChange={handleProfileChange}
                                className="form-input"
                            />
                        ) : (
                            <p className="form-value">{profileData.address || '-'}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Security Section */}
            <div className="profile-card">
                <div className="profile-card-header">
                    <h2>{texts.securitySettings[language]}</h2>
                </div>
                <div className="security-options">
                    <div className="security-item">
                        <div className="security-info">
                            <span className="material-icons">lock</span>
                            <div>
                                <h4>{texts.changePassword[language]}</h4>
                                <p>{language === 'kz' ? 'Құпия сөзді жаңартыңыз' : language === 'ru' ? 'Обновите ваш пароль' : 'Update your password'}</p>
                            </div>
                        </div>
                        <button className="btn btn-outline btn-sm">
                            {texts.edit[language]}
                        </button>
                    </div>
                    <div className="security-item">
                        <div className="security-info">
                            <span className="material-icons">security</span>
                            <div>
                                <h4>{texts.twoFactor[language]}</h4>
                                <p>{language === 'kz' ? 'Қосымша қауіпсіздік деңгейі' : language === 'ru' ? 'Дополнительный уровень безопасности' : 'Additional layer of security'}</p>
                            </div>
                        </div>
                        <span className="status-badge status-disabled">{texts.disabled[language]}</span>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderOrders = () => (
        <div className="orders-section">
            <div className="section-header">
                <h2>{texts.myOrders[language]}</h2>
                <Link to="/services" className="btn btn-primary">
                    <span className="material-icons">add</span>
                    {texts.orderTest[language]}
                </Link>
            </div>
            <div className="orders-table">
                <div className="table-header">
                    <span>{texts.orderId[language]}</span>
                    <span>{texts.date[language]}</span>
                    <span>{language === 'kz' ? 'Қызмет' : language === 'ru' ? 'Услуга' : 'Service'}</span>
                    <span>{texts.status[language]}</span>
                </div>
                {sampleOrders.length === 0 ? (
                    <div className="no-data-message">{texts.noOrders[language]}</div>
                ) : (
                    sampleOrders.map(order => (
                        <div key={order._id} className="table-row">
                            <span className="order-id">#{order._id.slice(-6)}</span>
                            <span>{new Date(order.date).toLocaleDateString()}</span>
                            <span>{order.service}</span>
                            <span className={`status-badge status-${order.status}`}>
                                {order.status === 'approved' ? texts.completed[language] : texts.inProgress[language]}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );

    const renderResults = () => (
        <div className="results-section">
            <div className="section-header">
                <h2>{texts.myResults[language]}</h2>
            </div>
            <div className="results-table">
                <div className="table-header">
                    <span>{texts.testName[language]}</span>
                    <span>{texts.date[language]}</span>
                    <span>{texts.result[language]}</span>
                    <span></span>
                </div>
                {sampleResults.map(result => (
                    <div key={result.id} className="table-row">
                        <span>{result.testName}</span>
                        <span>{result.date}</span>
                        <span className={`result-badge result-${result.result}`}>
                            {result.result === 'negative' ? texts.negative[language] : texts.positive[language]}
                        </span>
                        <button className="btn btn-outline btn-sm">
                            <span className="material-icons">download</span>
                            {texts.download[language]}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderNotifications = () => {
        const notifications = [
            {
                id: 1,
                type: 'success',
                icon: 'check_circle',
                title: language === 'kz' ? 'Тест нәтижесі дайын' : language === 'ru' ? 'Результат теста готов' : 'Test result ready',
                message: language === 'kz' ? 'Бруцеллёз тестінің нәтижесі дайын' : language === 'ru' ? 'Результат теста на бруцеллёз готов' : 'Brucellosis test result is ready',
                time: language === 'kz' ? '2 сағат бұрын' : language === 'ru' ? '2 часа назад' : '2 hours ago',
                isNew: true,
                group: 'today'
            },
            {
                id: 2,
                type: 'info',
                icon: 'local_shipping',
                title: language === 'kz' ? 'Үлгі жеткізілді' : language === 'ru' ? 'Образец доставлен' : 'Sample delivered',
                message: language === 'kz' ? 'Сіздің үлгіңіз зертханаға жеткізілді' : language === 'ru' ? 'Ваш образец доставлен в лабораторию' : 'Your sample has been delivered to the laboratory',
                time: language === 'kz' ? '5 сағат бұрын' : language === 'ru' ? '5 часов назад' : '5 hours ago',
                isNew: true,
                group: 'today'
            },
            {
                id: 3,
                type: 'warning',
                icon: 'schedule',
                title: language === 'kz' ? 'Тапсырыс өңделуде' : language === 'ru' ? 'Заказ обрабатывается' : 'Order processing',
                message: language === 'kz' ? 'ПТР диагностикасы өңделуде' : language === 'ru' ? 'ПЦР диагностика обрабатывается' : 'PCR diagnostics is being processed',
                time: texts.yesterday[language],
                isNew: true,
                group: 'yesterday'
            },
            {
                id: 4,
                type: 'info',
                icon: 'campaign',
                title: language === 'kz' ? 'Жаңа қызметтер қолжетімді' : language === 'ru' ? 'Новые услуги доступны' : 'New services available',
                message: language === 'kz' ? 'Жаңа диагностикалық қызметтер қосылды' : language === 'ru' ? 'Добавлены новые диагностические услуги' : 'New diagnostic services have been added',
                time: language === 'kz' ? '3 күн бұрын' : language === 'ru' ? '3 дня назад' : '3 days ago',
                isNew: false,
                group: 'earlier'
            },
        ];

        const groupedNotifications = {
            today: notifications.filter(n => n.group === 'today'),
            yesterday: notifications.filter(n => n.group === 'yesterday'),
            earlier: notifications.filter(n => n.group === 'earlier'),
        };

        return (
            <div className="notifications-section">
                <div className="section-header">
                    <h2>{texts.notifications[language]}</h2>
                    <button className="btn btn-outline btn-sm">
                        <span className="material-icons">done_all</span>
                        {texts.markAllRead[language]}
                    </button>
                </div>

                {Object.entries(groupedNotifications).map(([group, items]) => (
                    items.length > 0 && (
                        <div key={group} className="notification-group">
                            <h3 className="notification-group-title">
                                {group === 'today' ? texts.today[language] : group === 'yesterday' ? texts.yesterday[language] : texts.earlier[language]}
                            </h3>
                            <div className="notification-list">
                                {items.map(notification => (
                                    <div key={notification.id} className={`notification-item ${notification.isNew ? 'unread' : ''}`}>
                                        <div className={`notification-icon ${notification.type}`}>
                                            <span className="material-icons">{notification.icon}</span>
                                        </div>
                                        <div className="notification-content">
                                            <h4>{notification.title}</h4>
                                            <p>{notification.message}</p>
                                            <span className="notification-time">{notification.time}</span>
                                        </div>
                                        {notification.isNew && <span className="unread-dot"></span>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                ))}
            </div>
        );
    };

    const renderSettings = () => (
        <div className="settings-section">
            {/* Notification Settings */}
            <div className="settings-card">
                <h2>{texts.notificationSettings[language]}</h2>
                <div className="settings-list">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">email</span>
                            <div>
                                <h4>{texts.emailNotifications[language]}</h4>
                                <p>{language === 'kz' ? 'Электрондық поштаға хабарлама алу' : language === 'ru' ? 'Получать уведомления на email' : 'Receive notifications via email'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">sms</span>
                            <div>
                                <h4>{texts.smsNotifications[language]}</h4>
                                <p>{language === 'kz' ? 'SMS хабарлама алу' : language === 'ru' ? 'Получать SMS уведомления' : 'Receive SMS notifications'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">notifications_active</span>
                            <div>
                                <h4>{texts.pushNotifications[language]}</h4>
                                <p>{language === 'kz' ? 'Браузер хабарламаларын алу' : language === 'ru' ? 'Получать push уведомления' : 'Receive push notifications'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Notification Types */}
            <div className="settings-card">
                <h2>{language === 'kz' ? 'Хабарлама түрлері' : language === 'ru' ? 'Типы уведомлений' : 'Notification Types'}</h2>
                <div className="settings-list">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">shopping_cart</span>
                            <div>
                                <h4>{texts.orderUpdates[language]}</h4>
                                <p>{language === 'kz' ? 'Тапсырыс мәртебесі өзгерген кезде хабарлама' : language === 'ru' ? 'Уведомления об изменении статуса заказа' : 'Notifications about order status changes'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">science</span>
                            <div>
                                <h4>{texts.resultReady[language]}</h4>
                                <p>{language === 'kz' ? 'Нәтижелер дайын болған кезде хабарлама' : language === 'ru' ? 'Уведомления о готовности результатов' : 'Notifications when results are ready'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" defaultChecked />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">newspaper</span>
                            <div>
                                <h4>{texts.newsletter[language]}</h4>
                                <p>{language === 'kz' ? 'Жаңалықтар мен акциялар туралы хабарлама' : language === 'ru' ? 'Рассылка новостей и акций' : 'Newsletter and promotions'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>

            {/* Language Settings */}
            <div className="settings-card">
                <h2>{texts.languageSettings[language]}</h2>
                <div className="settings-list">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">language</span>
                            <div>
                                <h4>{texts.selectLanguage[language]}</h4>
                                <p>{language === 'kz' ? 'Интерфейс тілін таңдаңыз' : language === 'ru' ? 'Выберите язык интерфейса' : 'Select interface language'}</p>
                            </div>
                        </div>
                        <select className="settings-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option value="kz">Қазақша</option>
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* General Settings */}
            <div className="settings-card">
                <h2>{texts.generalSettings[language]}</h2>
                <div className="settings-list">
                    <div className="setting-item">
                        <div className="setting-info">
                            <span className="material-icons">dark_mode</span>
                            <div>
                                <h4>{texts.darkMode[language]}</h4>
                                <p>{language === 'kz' ? 'Қараңғы тақырыпты қолдану' : language === 'ru' ? 'Использовать тёмную тему' : 'Use dark theme'}</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input type="checkbox" checked={isDarkMode} onChange={toggleDarkMode} />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return renderProfile();
            case 'orders':
                return renderOrders();
            case 'results':
                return renderResults();
            case 'notifications':
                return renderNotifications();
            case 'settings':
                return renderSettings();
            default:
                return renderOverview();
        }
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-container">
                {/* Sidebar */}
                <aside className="dashboard-sidebar">
                    <div className="user-profile">
                        <div className="user-avatar">
                            <span className="material-icons">person</span>
                        </div>
                        <div className="user-info">
                            <h3>{user.name}</h3>
                            <p>{user.email}</p>
                        </div>
                    </div>

                    <nav className="sidebar-menu">
                        {menuItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`menu-item ${activeTab === item.id ? 'active' : ''}`}
                            >
                                <span className="material-icons">{item.icon}</span>
                                <span>{item.label}</span>
                                {item.badge && <span className="menu-badge">{item.badge}</span>}
                            </button>
                        ))}

                        {user.role === 'admin' && (
                            <button
                                onClick={() => navigate('/admin')}
                                className="menu-item admin-link"
                                style={{ color: 'var(--primary)', fontWeight: '500', marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}
                            >
                                <span className="material-icons">admin_panel_settings</span>
                                <span>{language === 'kz' ? 'Әкімшілік панель' : language === 'ru' ? 'Админ-панель' : 'Admin Panel'}</span>
                            </button>
                        )}
                    </nav>

                    <button className="logout-btn" onClick={handleLogout}>
                        <span className="material-icons">logout</span>
                        <span>{texts.logout[language]}</span>
                    </button>
                </aside>

                {/* Main Content */}
                <main className="dashboard-main">
                    <div className="dashboard-header">
                        <div>
                            <h1>{texts.welcome[language]}, {user.name}!</h1>
                            <p>{texts.dashboard[language]}</p>
                        </div>
                    </div>

                    {renderContent()}
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
