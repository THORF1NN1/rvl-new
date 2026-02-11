import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import { messagesAPI } from '../api';
import BranchMap from '../components/BranchMap';
import './Contacts.css';

function Contacts() {
    const { language, showToast } = useApp();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const contactInfo = [
        {
            icon: 'location_on',
            title: t('contacts.address', language),
            content: language === 'kz' ? 'Жеңіс даңғылы, 45\nАстана, 010000\nҚазақстан' :
                language === 'ru' ? 'Пр. Женис, 45\nАстана, 010000\nКазахстан' :
                    'Zhengis Ave, 45\nAstana, 010000\nKazakhstan',
        },
        {
            icon: 'phone',
            title: t('contacts.phone', language),
            content: '+7 (7172) 55-01-23\n+7 (7172) 55-01-24',
        },
        {
            icon: 'email',
            title: t('contacts.email', language),
            content: 'info@rvl.kz\nreception@rvl.kz',
        },
        {
            icon: 'schedule',
            title: t('contacts.workingHours', language),
            content: language === 'kz' ? 'Дүйсенбі - Жұма\n9:00 - 18:00' :
                language === 'ru' ? 'Понедельник - Пятница\n9:00 - 18:00' :
                    'Monday - Friday\n9:00 AM - 6:00 PM',
        },
    ];

    const validateForm = () => {
        const newErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = t('common.required', language);
        }

        if (!formData.email.trim()) {
            newErrors.email = t('common.required', language);
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = t('common.invalidEmail', language);
        }

        if (!formData.subject) {
            newErrors.subject = t('common.required', language);
        }

        if (!formData.message.trim()) {
            newErrors.message = t('common.required', language);
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await messagesAPI.send(formData);
            showToast(t('contacts.success', language), 'success');

            // Reset form
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
            });
            setErrors({});
        } catch (error) {
            console.error('Failed to send message:', error);
            showToast(language === 'kz' ? 'Хабарламаны жіберу мүмкін болмады' : language === 'ru' ? 'Не удалось отправить сообщение' : 'Failed to send message', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    return (
        <div className="contacts-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="breadcrumb">
                        {t('nav.home', language)} / {t('nav.contacts', language)}
                    </span>
                    <h1>{t('contacts.title', language)}</h1>
                    <p className="page-subtitle">{t('contacts.subtitle', language)}</p>
                </div>
            </section>

            {/* Contact Info */}
            <section className="section">
                <div className="container">
                    <div className="contact-cards">
                        {contactInfo.map((item, index) => (
                            <div key={index} className="contact-card">
                                <div className="contact-card-icon">
                                    <span className="material-icons">{item.icon}</span>
                                </div>
                                <h3>{item.title}</h3>
                                <p style={{ whiteSpace: 'pre-line' }}>{item.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Form & Map */}
            <section className="section contact-section">
                <div className="container">
                    <div className="contact-layout">
                        {/* Form */}
                        <div className="contact-form-wrapper">
                            <h2>
                                <span className="material-icons">chat_bubble</span>
                                {t('contacts.sendMessage', language)}
                            </h2>
                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">{t('contacts.form.name', language)} *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className={errors.name ? 'error' : ''}
                                            placeholder={language === 'kz' ? 'Атыңызды енгізіңіз' :
                                                language === 'ru' ? 'Введите ваше имя' :
                                                    'Enter your name'}
                                        />
                                        {errors.name && <span className="error-message">{errors.name}</span>}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">{t('contacts.form.email', language)} *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={errors.email ? 'error' : ''}
                                            placeholder={language === 'kz' ? 'Email енгізіңіз' :
                                                language === 'ru' ? 'Введите email' :
                                                    'Enter your email'}
                                        />
                                        {errors.email && <span className="error-message">{errors.email}</span>}
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="phone">{t('contacts.form.phone', language)}</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="+7 (___) ___-__-__"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="subject">{t('contacts.form.subject', language)} *</label>
                                        <select
                                            id="subject"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className={errors.subject ? 'error' : ''}
                                        >
                                            <option value="">{t('contacts.form.selectSubject', language)}</option>
                                            <option value="services">{t('contacts.form.subjects.services', language)}</option>
                                            <option value="training">{t('contacts.form.subjects.training', language)}</option>
                                            <option value="partnership">{t('contacts.form.subjects.partnership', language)}</option>
                                            <option value="other">{t('contacts.form.subjects.other', language)}</option>
                                        </select>
                                        {errors.subject && <span className="error-message">{errors.subject}</span>}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">{t('contacts.form.message', language)} *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className={errors.message ? 'error' : ''}
                                        rows="5"
                                        placeholder={language === 'kz' ? 'Сұрағыңызды жазыңыз...' :
                                            language === 'ru' ? 'Опишите ваш вопрос...' :
                                                'Describe your inquiry...'}
                                    ></textarea>
                                    {errors.message && <span className="error-message">{errors.message}</span>}
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <span className="material-icons spinning">sync</span>
                                            {t('common.loading', language)}
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-icons">send</span>
                                            {t('contacts.form.submit', language)}
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Interactive Map */}
                        <div className="map-wrapper">
                            <h2>
                                <span className="material-icons">map</span>
                                {language === 'kz' ? 'Филиалдар картасы' :
                                    language === 'ru' ? 'Карта филиалов' : 'Branch Map'}
                            </h2>
                            <BranchMap />
                            <div className="map-legend">
                                <div className="legend-item">
                                    <span className="legend-marker main"></span>
                                    {language === 'kz' ? 'Бас кеңсе' :
                                        language === 'ru' ? 'Главный офис' : 'Head Office'}
                                </div>
                                <div className="legend-item">
                                    <span className="legend-marker branch"></span>
                                    {language === 'kz' ? 'Филиалдар' :
                                        language === 'ru' ? 'Филиалы' : 'Branches'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Contacts;
