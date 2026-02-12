import { useState } from 'react';
import { useApp } from '../context/AppContext';
import './Verification.css';

function Verification() {
    const { language } = useApp();
    const [searchId, setSearchId] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchId.trim()) return;

        setLoading(true);
        setError('');
        setResult(null);

        // Simulate API call
        setTimeout(() => {
            if (searchId.toUpperCase() === 'RVL-2024-X9Y2') {
                setResult({
                    id: 'RVL-2024-X9Y2',
                    patient: 'Moo-Moo Farm #42',
                    type: { kz: 'Бруцеллез (қан)', ru: 'Бруцеллез (кровь)', en: 'Brucellosis (Blood)' },
                    date: '10.02.2024',
                    status: 'clean', // clean, infected
                    doctor: { kz: 'Дәрігер А.С. Иванов', ru: 'Врач Иванов А.С.', en: 'Dr. Ivanov A.S.' }
                });
            } else {
                setError(language === 'kz' ? 'Нәтиже табылмады' : language === 'ru' ? 'Результат не найден' : 'Result not found');
            }
            setLoading(false);
        }, 1500);
    };

    return (
        <div className="verification-page">
            <div className="container">
                <div className="verification-card">
                    <div className="verification-header">
                        <span className="material-icons verify-icon">verified_user</span>
                        <h1>{language === 'kz' ? 'Нәтижені тексеру' : language === 'ru' ? 'Проверка результатов' : 'Verify Results'}</h1>
                        <p>{language === 'kz' ? 'Ресми зертханалық қорытындыны тексеру үшін ID енгізіңіз' :
                            language === 'ru' ? 'Введите ID для проверки официального заключения лаборатории' :
                                'Enter ID to verify the official laboratory report'}</p>
                    </div>

                    <form onSubmit={handleSearch} className="verification-form">
                        <input
                            type="text"
                            placeholder="RVL-2024-XXXX"
                            value={searchId}
                            onChange={(e) => setSearchId(e.target.value)}
                            className={error ? 'error' : ''}
                        />
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? <span className="loader"></span> : (language === 'kz' ? 'Тексеру' : language === 'ru' ? 'Проверить' : 'Check')}
                        </button>
                    </form>

                    {error && <div className="verification-error">
                        <span className="material-icons">error_outline</span>
                        {error}
                    </div>}

                    {result && (
                        <div className="result-ticket animate-pop-in">
                            <div className="ticket-header">
                                <div className="ticket-logo">
                                    <span className="material-icons">biotech</span>
                                    <span>RVL OFFICIAL</span>
                                </div>
                                <div className="ticket-status success">
                                    <span className="material-icons">check_circle</span>
                                    {language === 'kz' ? 'РАСТАЛДЫ' : language === 'ru' ? 'ПОДТВЕРЖДЕНО' : 'VERIFIED'}
                                </div>
                            </div>
                            <div className="ticket-body">
                                <div className="ticket-row">
                                    <span className="label">ID:</span>
                                    <span className="value mono">{result.id}</span>
                                </div>
                                <div className="ticket-row">
                                    <span className="label">{language === 'kz' ? 'Клиент:' : language === 'ru' ? 'Клиент:' : 'Client:'}</span>
                                    <span className="value">{result.patient}</span>
                                </div>
                                <div className="ticket-row">
                                    <span className="label">{language === 'kz' ? 'Талдау:' : language === 'ru' ? 'Анализ:' : 'Analysis:'}</span>
                                    <span className="value">{result.type[language]}</span>
                                </div>
                                <div className="ticket-row">
                                    <span className="label">{language === 'kz' ? 'Күні:' : language === 'ru' ? 'Дата:' : 'Date:'}</span>
                                    <span className="value">{result.date}</span>
                                </div>
                                <div className="ticket-row">
                                    <span className="label">{language === 'kz' ? 'Дәрігер:' : language === 'ru' ? 'Врач:' : 'Doctor:'}</span>
                                    <span className="value">{result.doctor[language]}</span>
                                </div>
                            </div>
                            <div className="ticket-footer">
                                <div className="qr-placeholder">
                                    <span className="material-icons">qr_code_2</span>
                                </div>
                                <div className="stamp">
                                    <div className="stamp-inner">APPROVED</div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="verification-info">
                    <p className="hint">
                        {language === 'kz' ? '* Тест үшін мына ID қолданыңыз: RVL-2024-X9Y2' :
                            language === 'ru' ? '* Для теста используйте ID: RVL-2024-X9Y2' :
                                '* For test use ID: RVL-2024-X9Y2'}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Verification;
