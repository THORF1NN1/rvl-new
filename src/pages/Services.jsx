import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import { services as staticServices, serviceCategories, resources } from '../data/services';
import { servicesAPI, applicationsAPI } from '../api';
import './Services.css';

function Services() {
    const { language, openModal, closeModal, user, showToast } = useApp();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [services, setServices] = useState(staticServices);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        servicesAPI.getAll()
            .then(data => { if (data.length) setServices(data); })
            .catch(() => { }); // fallback to static data
    }, []);

    const handleApply = async (service) => {
        if (!user) {
            showToast(language === 'kz' ? 'Өтінім беру үшін жүйеге кіріңіз' : language === 'ru' ? 'Войдите в систему для подачи заявки' : 'Please login to apply', 'info');
            navigate('/login');
            closeModal();
            return;
        }

        setIsSubmitting(true);
        try {
            await applicationsAPI.create({
                client: user.name,
                service: service.title[language],
                amount: service.price,
                date: new Date(),
                status: 'pending'
            });
            showToast(language === 'kz' ? 'Өтініміңіз қабылданды' : language === 'ru' ? 'Ваша заявка принята' : 'Application submitted successfully', 'success');
            closeModal();
        } catch (error) {
            console.error('Failed to submit application:', error);
            showToast(t('common.error', language), 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Filter services based on category and search
    const filteredServices = services.filter(service => {
        const matchesCategory = activeFilter === 'all' || service.category === activeFilter;
        const matchesSearch = searchQuery === '' ||
            service.title[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
            service.description[language].toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const handleServiceClick = (service) => {
        openModal(
            service.title[language],
            <div className="service-modal">
                <p className="service-details">{service.details[language]}</p>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="material-icons">schedule</span>
                        <span>{t('services.duration', language)}: {service.duration}</span>
                    </div>
                    <div className="info-item">
                        <span className="material-icons">payments</span>
                        <span>{t('services.price', language)}: {service.price}</span>
                    </div>
                </div>
                <div className="modal-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => handleApply(service)}
                        disabled={isSubmitting}
                    >
                        <span className="material-icons">assignment</span>
                        {language === 'kz' ? 'Өтінім беру' : language === 'ru' ? 'Подать заявку' : 'Apply Now'}
                    </button>
                    <button className="btn btn-outline">
                        <span className="material-icons">download</span>
                        {t('common.download', language)}
                    </button>
                </div>
            </div>
        );
    };

    const handleDownload = (resource) => {
        // Simulate file download
        const link = document.createElement('a');
        link.href = '#';
        link.download = resource.title[language];
        alert(`${t('common.download', language)}: ${resource.title[language]}`);
    };

    return (
        <div className="services-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="breadcrumb">
                        {t('nav.home', language)} / {t('nav.services', language)}
                    </span>
                    <h1>{t('services.title', language)}</h1>
                    <p className="page-subtitle">{t('services.subtitle', language)}</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section services-content">
                <div className="container">
                    <div className="services-layout">
                        {/* Sidebar */}
                        <aside className="services-sidebar">
                            {/* Search */}
                            <div className="sidebar-section">
                                <div className="search-input-wrapper">
                                    <span className="material-icons">search</span>
                                    <input
                                        type="text"
                                        placeholder={t('header.search', language)}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="search-input"
                                    />
                                    {searchQuery && (
                                        <button
                                            className="clear-search"
                                            onClick={() => setSearchQuery('')}
                                        >
                                            <span className="material-icons">close</span>
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Filters */}
                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">filter_list</span>
                                    {t('services.filters.all', language) === 'Барлығы' ? 'Санаттар' :
                                        t('services.filters.all', language) === 'Все' ? 'Категории' : 'Categories'}
                                </h3>
                                <div className="filter-buttons">
                                    {serviceCategories.map((cat) => (
                                        <button
                                            key={cat.id}
                                            className={`filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                                            onClick={() => setActiveFilter(cat.id)}
                                        >
                                            {cat.label[language]}
                                            <span className="filter-count">
                                                {cat.id === 'all'
                                                    ? services.length
                                                    : services.filter(s => s.category === cat.id).length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Resources */}
                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">folder_open</span>
                                    {t('services.resources', language)}
                                </h3>
                                <div className="resources-list">
                                    {resources.map((res, index) => (
                                        <button
                                            key={index}
                                            className="resource-item"
                                            onClick={() => handleDownload(res)}
                                        >
                                            <span className="material-icons">
                                                {res.format === 'PDF' ? 'picture_as_pdf' : 'description'}
                                            </span>
                                            <div>
                                                <span className="resource-title">{res.title[language]}</span>
                                                <span className="resource-size">{res.format} • {res.size}</span>
                                            </div>
                                            <span className="material-icons">download</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        {/* Services Grid */}
                        <div className="services-main">
                            <div className="services-header">
                                <span className="results-count">
                                    {filteredServices.length} {
                                        language === 'kz' ? 'қызмет табылды' :
                                            language === 'ru' ? 'услуг найдено' : 'services found'
                                    }
                                </span>
                            </div>

                            {filteredServices.length === 0 ? (
                                <div className="no-results">
                                    <span className="material-icons">search_off</span>
                                    <p>
                                        {language === 'kz' ? 'Нәтижелер табылмады' :
                                            language === 'ru' ? 'Ничего не найдено' : 'No results found'}
                                    </p>
                                </div>
                            ) : (
                                <div className="services-grid">
                                    {filteredServices.map((service) => (
                                        <div
                                            key={service.id}
                                            className="service-card"
                                            onClick={() => handleServiceClick(service)}
                                        >
                                            <div className="service-icon">
                                                <span className="material-icons">{service.icon}</span>
                                            </div>
                                            <h3>{service.title[language]}</h3>
                                            <p>{service.description[language]}</p>
                                            <div className="service-meta">
                                                <span>
                                                    <span className="material-icons">schedule</span>
                                                    {service.duration}
                                                </span>
                                                <span>
                                                    <span className="material-icons">payments</span>
                                                    {service.price}
                                                </span>
                                            </div>
                                            <button className="btn btn-outline btn-full">
                                                {t('services.details', language)}
                                                <span className="material-icons">arrow_forward</span>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Services;
