import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { messagesAPI } from '../../api';

function AdminMessages() {
    const { language, showToast } = useApp();
    const { searchQuery } = useOutletContext();
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadMessages();
    }, []);

    const loadMessages = async () => {
        try {
            setLoading(true);
            const data = await messagesAPI.getAll();
            setMessages(data);
        } catch (err) {
            console.error('Failed to load messages:', err);
            showToast('Failed to load messages', 'error');
        } finally {
            setLoading(false);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await messagesAPI.update(id, { status: 'read' });
            setMessages(prev => prev.map(msg => msg._id === id ? { ...msg, status: 'read' } : msg));
            showToast(language === 'ru' ? 'Отмечено как прочитанное' : 'Marked as read', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const filteredMessages = messages.filter(msg => {
        if (!searchQuery) return true;
        const query = searchQuery.toLowerCase();
        return (
            msg.name.toLowerCase().includes(query) ||
            msg.email.toLowerCase().includes(query) ||
            msg.subject.toLowerCase().includes(query) ||
            msg.message.toLowerCase().includes(query)
        );
    });

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    };

    return (
        <div className="admin-messages">
            <div className="admin-table-wrapper premium-table">
                <div className="admin-table-header">
                    <div className="table-actions">
                        <button className="btn btn-outline btn-sm" onClick={loadMessages}>
                            <span className="material-icons">refresh</span>
                        </button>
                    </div>
                </div>
                <div className="table-responsive">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                            <span className="material-icons spinning">sync</span>
                            <p>Loading...</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>{language === 'kz' ? 'Жіберуші' : language === 'ru' ? 'Отправитель' : 'Sender'}</th>
                                    <th>{language === 'kz' ? 'Тақырып' : language === 'ru' ? 'Тема' : 'Subject'}</th>
                                    <th>{language === 'kz' ? 'Хабарлама' : language === 'ru' ? 'Сообщение' : 'Message'}</th>
                                    <th>{language === 'kz' ? 'Күні' : language === 'ru' ? 'Дата' : 'Date'}</th>
                                    <th>{language === 'kz' ? 'Статус' : language === 'ru' ? 'Статус' : 'Status'}</th>
                                    <th>{language === 'kz' ? 'Әрекеттер' : language === 'ru' ? 'Действия' : 'Actions'}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredMessages.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                                            {language === 'kz' ? 'Хабарламалар жоқ' : language === 'ru' ? 'Нет сообщений' : 'No messages'}
                                        </td>
                                    </tr>
                                ) : (
                                    filteredMessages.map((msg) => (
                                        <tr key={msg._id} className={msg.status === 'new' ? 'highlight-row' : ''}>
                                            <td>
                                                <div className="sender-info">
                                                    <strong>{msg.name}</strong>
                                                    <div className="sender-email">{msg.email}</div>
                                                    <div className="sender-phone">{msg.phone}</div>
                                                </div>
                                            </td>
                                            <td>{msg.subject}</td>
                                            <td>
                                                <div className="message-preview" title={msg.message}>
                                                    {msg.message.length > 50 ? msg.message.substring(0, 50) + '...' : msg.message}
                                                </div>
                                            </td>
                                            <td>
                                                <div className="date-cell">
                                                    {formatDate(msg.createdAt)}
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`status-badge status-${msg.status}`}>
                                                    {msg.status === 'new' ? (language === 'ru' ? 'Новое' : 'New') :
                                                        msg.status === 'read' ? (language === 'ru' ? 'Прочитано' : 'Read') : msg.status}
                                                </span>
                                            </td>
                                            <td>
                                                <div className="action-row">
                                                    {msg.status === 'new' && (
                                                        <button
                                                            className="action-icon-btn check"
                                                            title="Mark as Read"
                                                            onClick={() => handleMarkAsRead(msg._id)}
                                                        >
                                                            <span className="material-icons">mark_email_read</span>
                                                        </button>
                                                    )}
                                                    <a
                                                        href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                                        className="action-icon-btn edit"
                                                        title="Reply"
                                                    >
                                                        <span className="material-icons">reply</span>
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AdminMessages;
