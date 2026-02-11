import { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { settingsAPI } from '../../api';

function AdminSettings() {
    const { language, showToast } = useApp();
    const [settings, setSettings] = useState({ siteName: '', adminEmail: '', maintenanceMode: false });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        try {
            const data = await settingsAPI.get();
            setSettings(data);
        } catch (err) {
            console.error('Failed to load settings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const updated = await settingsAPI.update({
                siteName: settings.siteName,
                adminEmail: settings.adminEmail,
                maintenanceMode: settings.maintenanceMode,
            });
            setSettings(updated);
            showToast(language === 'ru' ? 'Настройки сохранены' : 'Settings saved', 'success');
        } catch (err) {
            showToast(err.message, 'error');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>{language === 'ru' ? 'Загрузка...' : 'Loading...'}</div>;
    }

    return (
        <div className="admin-settings">
            <div className="dashboard-grid">
                <div className="admin-card">
                    <div className="card-header">
                        <h3>{language === 'ru' ? 'Общие настройки' : 'General Settings'}</h3>
                    </div>
                    <div className="settings-form" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Site Name</label>
                            <input
                                type="text"
                                className="premium-input"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                value={settings.siteName}
                                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Admin Email</label>
                            <input
                                type="email"
                                className="premium-input"
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                value={settings.adminEmail}
                                onChange={(e) => setSettings({ ...settings, adminEmail: e.target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem' }}>Maintenance Mode</label>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <input
                                    type="checkbox"
                                    id="maint"
                                    checked={settings.maintenanceMode}
                                    onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                                />
                                <label htmlFor="maint">Enable maintenance mode</label>
                            </div>
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleSave}
                            disabled={saving}
                            style={{ alignSelf: 'flex-start', padding: '10px 20px', borderRadius: '8px' }}
                        >
                            {saving ? (language === 'ru' ? 'Сохранение...' : 'Saving...') : (language === 'ru' ? 'Сохранить' : 'Save Changes')}
                        </button>
                    </div>
                </div>

                <div className="admin-card">
                    <div className="card-header">
                        <h3>{language === 'ru' ? 'Безопасность' : 'Security'}</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <p style={{ fontSize: '0.9rem', color: '#64748b' }}>Manage your account security and password.</p>
                        <button className="btn btn-outline" style={{ borderRadius: '8px' }}>Change Password</button>
                        <button className="btn btn-outline" style={{ borderRadius: '8px' }}>Two-Factor Auth</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSettings;
