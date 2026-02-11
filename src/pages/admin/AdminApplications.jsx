import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { applicationsAPI } from '../../api';

function AdminApplications() {
    const { language, showToast } = useApp();
    const { searchQuery } = useOutletContext();
    const [filter, setFilter] = useState('all');
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadApplications();
    }, []);

    const loadApplications = async () => {
        try {
            setLoading(true);
            const data = await applicationsAPI.getAll();
            setApplications(data);
        } catch (err) {
            console.error('Failed to load applications:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await applicationsAPI.update(id, { status: newStatus });
            setApplications(prev => prev.map(app => app._id === id ? { ...app, status: newStatus } : app));
            showToast(language === 'ru' ? 'Статус обновлён' : 'Status updated', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await applicationsAPI.delete(id);
            setApplications(prev => prev.filter(app => app._id !== id));
            showToast(language === 'ru' ? 'Заявка удалена' : 'Application deleted', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const statusLabels = {
        pending: { kz: 'Күтуде', ru: 'Ожидает', en: 'Pending' },
        processing: { kz: 'Өңделуде', ru: 'В работе', en: 'Processing' },
        approved: { kz: 'Мақұлданды', ru: 'Одобрено', en: 'Approved' },
        rejected: { kz: 'Қабылданбады', ru: 'Отклонено', en: 'Rejected' },
    };

    const filters = [
        { id: 'all', label: { kz: 'Барлығы', ru: 'Все', en: 'All' } },
        { id: 'pending', label: { kz: 'Күтуде', ru: 'Ожидает', en: 'Pending' } },
        { id: 'processing', label: { kz: 'Өңделуде', ru: 'В работе', en: 'Processing' } },
        { id: 'approved', label: { kz: 'Мақұлданды', ru: 'Одобрено', en: 'Approved' } },
    ];

    const filteredApps = applications.filter(app => {
        const matchesSearch = searchQuery ?
            (app.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                app.service.toLowerCase().includes(searchQuery.toLowerCase())) : true;
        const matchesFilter = filter === 'all' ? true : app.status === filter;
        return matchesSearch && matchesFilter;
    });

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    };

    return (
        <div className="admin-applications">
            <div className="admin-table-wrapper premium-table">
                <div className="admin-table-header">
                    <h2>{language === 'kz' ? 'Өтінімдер' : language === 'ru' ? 'Заявки' : 'Applications'}</h2>
                    <div className="filter-group">
                        {filters.map(f => (
                            <button
                                key={f.id}
                                className={`filter-chip ${filter === f.id ? 'active' : ''}`}
                                onClick={() => setFilter(f.id)}
                            >
                                {f.label[language]}
                            </button>
                        ))}
                    </div>
                </div>
                <div className="table-responsive">
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
                                    <th>{language === 'kz' ? 'Әрекеттер' : language === 'ru' ? 'Действия' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredApps.map((app) => (
                                    <tr key={app._id}>
                                        <td><div className="client-info"><strong>{app.client}</strong></div></td>
                                        <td>{app.service}</td>
                                        <td className="amount-cell">{app.amount}</td>
                                        <td>{formatDate(app.date)}</td>
                                        <td>
                                            <select
                                                value={app.status}
                                                onChange={(e) => handleStatusChange(app._id, e.target.value)}
                                                className={`status-select ${app.status}`}
                                                style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '0.85rem', cursor: 'pointer' }}
                                            >
                                                {Object.entries(statusLabels).map(([key, val]) => (
                                                    <option key={key} value={key}>{val[language]}</option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <div className="action-row">
                                                <button className="action-icon-btn delete" title="Delete" onClick={() => handleDelete(app._id)}>
                                                    <span className="material-icons">delete</span>
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminApplications;
