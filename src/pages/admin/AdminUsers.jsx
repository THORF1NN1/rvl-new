import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { usersAPI } from '../../api';

function AdminUsers() {
    const { language, showToast } = useApp();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await usersAPI.getAll();
            setUsers(data);
        } catch (err) {
            console.error('Failed to load users:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (id, newRole) => {
        try {
            const updated = await usersAPI.update(id, { role: newRole });
            setUsers(prev => prev.map(u => u._id === id ? updated : u));
            showToast(language === 'ru' ? 'Роль обновлена' : 'Role updated', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            await usersAPI.delete(id);
            setUsers(prev => prev.filter(u => u._id !== id));
            showToast(language === 'ru' ? 'Пользователь удалён' : 'User deleted', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return '—';
        const d = new Date(dateStr);
        return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`;
    };

    return (
        <div className="admin-users">
            <div className="admin-table-wrapper premium-table">

                <div className="table-responsive">
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                            <p>{language === 'ru' ? 'Загрузка...' : 'Loading...'}</p>
                        </div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Last Login</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user._id}>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '700', color: '#64748b' }}>
                                                    {user.name?.charAt(0) || '?'}
                                                </div>
                                                <strong>{user.name}</strong>
                                            </div>
                                        </td>
                                        <td>{user.email}</td>
                                        <td>
                                            <select
                                                value={user.role}
                                                onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                                style={{ fontSize: '0.8rem', color: '#64748b', background: '#f1f5f9', padding: '4px 8px', borderRadius: '6px', border: '1px solid #e2e8f0', cursor: 'pointer' }}
                                            >
                                                <option value="admin">Admin</option>
                                                <option value="editor">Editor</option>
                                                <option value="support">Support</option>
                                                <option value="user">User</option>
                                            </select>
                                        </td>
                                        <td>
                                            <span className={`status-badge ${user.status === 'active' ? 'approved' : 'orange'}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td>{formatDate(user.lastLogin)}</td>
                                        <td>
                                            <div className="action-row">
                                                <button className="action-icon-btn delete" onClick={() => handleDelete(user._id)}>
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

export default AdminUsers;
