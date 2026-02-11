import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { useOutletContext } from 'react-router-dom';
import { applicationsAPI } from '../../api';
import '../../components/AdminLayout.css';

// Simple SVG Chart Component for Weekly Activity
function ActivityChart({ language }) {
    const data = [45, 52, 38, 65, 48, 70, 58];
    const days = {
        kz: ['Дс', 'Сс', 'Ср', 'Бс', 'Жм', 'Сб', 'Жс'],
        ru: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        en: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    };

    return (
        <div className="admin-card chart-card">
            <div className="card-header">
                <h3>{language === 'ru' ? 'Активность за неделю' : language === 'kz' ? 'Апталық белсенділік' : 'Weekly Activity'}</h3>
                <span className="trend positive">+12%</span>
            </div>
            <div className="chart-container">
                <svg viewBox="0 0 700 300" className="activity-svg">
                    <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.3" />
                            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                        </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    {[0, 1, 2, 3].map(i => (
                        <line key={i} x1="50" y1={50 + i * 70} x2="650" y2={50 + i * 70} stroke="#e2e8f0" strokeDasharray="4 4" />
                    ))}

                    {/* Area path */}
                    <path
                        d={`M 100 280 ${data.map((val, i) => `L ${100 + i * 90} ${280 - val * 3}`).join(' ')} V 280 H 100 Z`}
                        fill="url(#chartGradient)"
                    />

                    {/* Line path */}
                    <path
                        d={`M 100 ${280 - data[0] * 3} ${data.slice(1).map((val, i) => `L ${100 + (i + 1) * 90} ${280 - val * 3}`).join(' ')}`}
                        fill="none"
                        stroke="#3b82f6"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />

                    {/* Dots */}
                    {data.map((val, i) => (
                        <circle key={i} cx={100 + i * 90} cy={280 - val * 3} r="5" fill="#3b82f6" stroke="#fff" strokeWidth="2" />
                    ))}

                    {/* X Labels */}
                    {days[language].map((day, i) => (
                        <text key={i} x={100 + i * 90} y="315" textAnchor="middle" fill="#64748b" fontSize="12">{day}</text>
                    ))}
                </svg>
            </div>
        </div>
    );
}

function AdminDashboard() {
    const { language } = useApp();
    const { searchQuery } = useOutletContext();
    const [applications, setApplications] = useState([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            try {
                const [appsData, statsData] = await Promise.all([
                    applicationsAPI.getAll('limit=5'),
                    applicationsAPI.getStats(),
                ]);
                setApplications(appsData);
                setStats(statsData);
            } catch (err) {
                console.error('Failed to load dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    const recentApplications = searchQuery ? applications.filter(app =>
        app.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.service.toLowerCase().includes(searchQuery.toLowerCase())
    ) : applications;

    const statusLabels = {
        pending: { kz: 'Күтуде', ru: 'Ожидает', en: 'Pending' },
        processing: { kz: 'Өңделуде', ru: 'В работе', en: 'Processing' },
        approved: { kz: 'Мақұлданды', ru: 'Одобрено', en: 'Approved' },
        rejected: { kz: 'Қабылданбады', ru: 'Отклонено', en: 'Rejected' },
    };

    const statCards = [
        { icon: 'assignment', label: { kz: 'Жалпы өтінімдер', ru: 'Всего заявок', en: 'Total Applications' }, value: stats.total, color: 'blue' },
        { icon: 'pending_actions', label: { kz: 'Күтуде', ru: 'В ожидании', en: 'Pending' }, value: stats.pending, color: 'orange' },
        { icon: 'check_circle', label: { kz: 'Аяқталды', ru: 'Завершено', en: 'Completed' }, value: stats.approved, color: 'green' },
        { icon: 'cancel', label: { kz: 'Қабылданбады', ru: 'Отклонено', en: 'Rejected' }, value: stats.rejected, color: 'purple' },
    ];

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    };

    return (
        <div className="admin-dashboard">
            {/* Stats Grid */}
            <div className="admin-stats">
                {statCards.map((stat, index) => (
                    <div key={index} className="admin-stat-card">
                        <div className={`admin-stat-icon ${stat.color}`}>
                            <span className="material-icons">{stat.icon}</span>
                        </div>
                        <div className="admin-stat-content">
                            <h3>{stat.label[language]}</h3>
                            <div className="admin-stat-value">{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="dashboard-grid">
                <ActivityChart language={language} />

                <div className="admin-card quick-actions">
                    <div className="card-header">
                        <h3>{language === 'ru' ? 'Быстрые действия' : language === 'kz' ? 'Жылдам әрекеттер' : 'Quick Actions'}</h3>
                    </div>
                    <div className="actions-grid">
                        <button className="action-btn">
                            <span className="material-icons">add_box</span>
                            <span>{language === 'ru' ? 'Новая заявка' : 'New Request'}</span>
                        </button>
                        <button className="action-btn">
                            <span className="material-icons">post_add</span>
                            <span>{language === 'ru' ? 'Добавить новость' : 'Post News'}</span>
                        </button>
                        <button className="action-btn">
                            <span className="material-icons">file_download</span>
                            <span>{language === 'ru' ? 'Экспорт отчёта' : 'Export Report'}</span>
                        </button>
                        <button className="action-btn">
                            <span className="material-icons">help_outline</span>
                            <span>{language === 'ru' ? 'Поддержка' : 'Support'}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Recent Applications Table */}
            <div className="admin-table-wrapper">
                <div className="admin-table-header">
                    <h2>{language === 'kz' ? 'Соңғы өтінімдер' : language === 'ru' ? 'Последние заявки' : 'Recent Applications'}</h2>
                </div>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                        <span className="material-icons" style={{ fontSize: '2rem', animation: 'spin 1s linear infinite' }}>sync</span>
                        <p>{language === 'ru' ? 'Загрузка...' : 'Loading...'}</p>
                    </div>
                ) : (
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>{language === 'kz' ? 'Клиент' : language === 'ru' ? 'Клиент' : 'Client'}</th>
                                <th>{language === 'kz' ? 'Қызмет' : language === 'ru' ? 'Услуга' : 'Service'}</th>
                                <th>{language === 'kz' ? 'Сома' : language === 'ru' ? 'Сумма' : 'Amount'}</th>
                                <th>{language === 'kz' ? 'Күні' : language === 'ru' ? 'Дата' : 'Date'}</th>
                                <th>{language === 'kz' ? 'Статус' : language === 'ru' ? 'Статус' : 'Status'}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentApplications.map((app) => (
                                <tr key={app._id}>
                                    <td><strong>{app.client}</strong></td>
                                    <td>{app.service}</td>
                                    <td>{app.amount}</td>
                                    <td>{formatDate(app.date)}</td>
                                    <td>
                                        <span className={`status-badge ${app.status}`}>
                                            {statusLabels[app.status]?.[language] || app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
