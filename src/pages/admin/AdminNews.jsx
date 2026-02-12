import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { newsAPI } from '../../api';

function AdminNews() {
    const { language, showToast } = useApp();
    const [showEditor, setShowEditor] = useState(false);
    const [editingNews, setEditingNews] = useState(null);
    const [newsList, setNewsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ title: { kz: '', ru: '', en: '' }, excerpt: { kz: '', ru: '', en: '' }, category: { kz: '', ru: '', en: '' }, image: '', featured: false });

    useEffect(() => {
        loadNews();
    }, []);

    const loadNews = async () => {
        try {
            const data = await newsAPI.getAll();
            setNewsList(data);
        } catch (err) {
            console.error('Failed to load news:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (news) => {
        setEditingNews(news);
        setFormData({ title: news.title, excerpt: news.excerpt, category: news.category, image: news.image || '', featured: news.featured });
        setShowEditor(true);
    };

    const handleCreate = () => {
        setEditingNews(null);
        setFormData({ title: { kz: '', ru: '', en: '' }, excerpt: { kz: '', ru: '', en: '' }, category: { kz: '', ru: '', en: '' }, image: '', featured: false });
        setShowEditor(true);
    };

    const handleSave = async () => {
        try {
            if (editingNews) {
                const updated = await newsAPI.update(editingNews._id, formData);
                setNewsList(prev => prev.map(n => n._id === editingNews._id ? updated : n));
                showToast(language === 'ru' ? 'Новость обновлена' : 'News updated', 'success');
            } else {
                const created = await newsAPI.create({ ...formData, date: new Date() });
                setNewsList(prev => [created, ...prev]);
                showToast(language === 'ru' ? 'Новость создана' : 'News created', 'success');
            }
            setShowEditor(false);
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await newsAPI.delete(id);
            setNewsList(prev => prev.filter(n => n._id !== id));
            showToast(language === 'ru' ? 'Новость удалена' : 'News deleted', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const formatDate = (dateStr) => {
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    };

    return (
        <div className="admin-news">
            {showEditor ? (
                <div className="admin-card news-editor">
                    <div className="card-header">
                        <h2>{editingNews ? (language === 'ru' ? 'Редактировать новость' : 'Edit News') : (language === 'ru' ? 'Новая новость' : 'New News')}</h2>
                        <button className="action-icon-btn" onClick={() => setShowEditor(false)}>
                            <span className="material-icons">close</span>
                        </button>
                    </div>

                    <div className="editor-form">
                        {['ru', 'kz', 'en'].map(lang => (
                            <div key={lang} className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                                    {language === 'ru' ? 'Заголовок' : 'Title'} ({lang.toUpperCase()})
                                </label>
                                <input
                                    type="text"
                                    className="premium-input"
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                    value={formData.title[lang]}
                                    onChange={(e) => setFormData({ ...formData, title: { ...formData.title, [lang]: e.target.value } })}
                                    placeholder={`${language === 'ru' ? 'Заголовок' : 'Title'} (${lang.toUpperCase()})...`}
                                />
                            </div>
                        ))}

                        {['ru', 'kz', 'en'].map(lang => (
                            <div key={lang} className="form-group" style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                                    {language === 'ru' ? 'Содержание' : 'Content'} ({lang.toUpperCase()})
                                </label>
                                <textarea
                                    rows="4"
                                    style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc', resize: 'vertical' }}
                                    value={formData.excerpt[lang]}
                                    onChange={(e) => setFormData({ ...formData, excerpt: { ...formData.excerpt, [lang]: e.target.value } })}
                                    placeholder={`${language === 'ru' ? 'Содержание' : 'Content'} (${lang.toUpperCase()})...`}
                                ></textarea>
                            </div>
                        ))}
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                                {language === 'ru' ? 'Изображение (URL)' : 'Image URL'}
                            </label>
                            <input
                                type="text"
                                className="premium-input"
                                style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', border: '1px solid #e2e8f0', background: '#f8fafc' }}
                                value={formData.image}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="/images/news-virology.png"
                            />
                        </div>

                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', fontSize: '0.9rem' }}>
                                <input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} />
                                {language === 'ru' ? 'Избранная новость' : 'Featured'}
                            </label>
                        </div>

                        <div className="editor-actions" style={{ display: 'flex', gap: '1rem' }}>
                            <button className="btn btn-primary" onClick={handleSave} style={{ padding: '12px 24px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                <span className="material-icons">save</span>
                                {language === 'ru' ? 'Сохранить' : 'Save'}
                            </button>
                            <button className="btn btn-outline" onClick={() => setShowEditor(false)} style={{ padding: '12px 24px', borderRadius: '12px' }}>
                                {language === 'ru' ? 'Отмена' : 'Cancel'}
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="admin-table-wrapper premium-table">
                    <div className="admin-table-header news-header-actions">
                        <button className="btn btn-primary" onClick={handleCreate} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px' }}>
                            <span className="material-icons">add</span>
                            {language === 'ru' ? 'Добавить новость' : 'Add Post'}
                        </button>
                    </div>
                    <div className="table-responsive">
                        {loading ? (
                            <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                                <p>{language === 'ru' ? 'Загрузка...' : 'Loading...'}</p>
                            </div>
                        ) : (
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>{language === 'ru' ? 'Заголовок' : 'Title'}</th>
                                        <th>{language === 'ru' ? 'Дата' : 'Date'}</th>
                                        <th>{language === 'ru' ? 'Избранная' : 'Featured'}</th>
                                        <th>{language === 'ru' ? 'Действия' : 'Actions'}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {newsList.map((news) => (
                                        <tr key={news._id}>
                                            <td><div style={{ maxWidth: '400px', fontWeight: '600' }}>{news.title[language] || news.title.ru}</div></td>
                                            <td>{formatDate(news.date)}</td>
                                            <td>
                                                {news.featured ? (
                                                    <span className="status-badge approved">{language === 'ru' ? 'Да' : 'Yes'}</span>
                                                ) : (
                                                    <span className="status-badge" style={{ background: '#f1f5f9', color: '#64748b' }}>{language === 'ru' ? 'Нет' : 'No'}</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="action-row">
                                                    <button className="action-icon-btn" onClick={() => handleEdit(news)} title="Edit">
                                                        <span className="material-icons">edit</span>
                                                    </button>
                                                    <button className="action-icon-btn delete" onClick={() => handleDelete(news._id)} title="Delete">
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
            )}
        </div>
    );
}

export default AdminNews;
