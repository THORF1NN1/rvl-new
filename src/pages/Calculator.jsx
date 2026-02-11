import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './Calculator.css';

function Calculator() {
    const { language } = useApp();
    const [selectedServices, setSelectedServices] = useState([]);
    const [urgency, setUrgency] = useState('normal');
    const [animalCount, setAnimalCount] = useState(1);

    const texts = {
        title: { kz: 'Қызмет құнын есептеу', ru: 'Калькулятор стоимости услуг', en: 'Service Cost Calculator' },
        subtitle: { kz: 'Зертханалық зерттеулердің құнын есептеңіз', ru: 'Рассчитайте стоимость лабораторных исследований', en: 'Calculate the cost of laboratory tests' },
        selectServices: { kz: 'Қызметтерді таңдаңыз', ru: 'Выберите услуги', en: 'Select Services' },
        urgency: { kz: 'Жеделдік', ru: 'Срочность', en: 'Urgency' },
        animalCount: { kz: 'Жануар саны', ru: 'Количество животных', en: 'Number of Animals' },
        normal: { kz: 'Қалыпты (3-5 күн)', ru: 'Обычная (3-5 дней)', en: 'Normal (3-5 days)' },
        urgent: { kz: 'Жедел (1-2 күн) +50%', ru: 'Срочная (1-2 дня) +50%', en: 'Urgent (1-2 days) +50%' },
        express: { kz: 'Экспресс (24 сағат) +100%', ru: 'Экспресс (24 часа) +100%', en: 'Express (24 hours) +100%' },
        total: { kz: 'Жалпы сома', ru: 'Итого', en: 'Total' },
        perUnit: { kz: 'бірлігі үшін', ru: 'за единицу', en: 'per unit' },
        orderNow: { kz: 'Қазір тапсырыс беру', ru: 'Заказать сейчас', en: 'Order Now' },
        noServicesSelected: { kz: 'Қызметтерді таңдаңыз', ru: 'Выберите услуги', en: 'Select services' },
        priceNote: { kz: '* Бағалар шамамен берілген', ru: '* Цены указаны ориентировочно', en: '* Prices are approximate' },
        currency: { kz: '₸', ru: '₸', en: '₸' },
    };

    const services = [
        {
            id: 'brucellosis',
            name: { kz: 'Бруцеллёз диагностикасы', ru: 'Диагностика бруцеллёза', en: 'Brucellosis Diagnostics' },
            description: { kz: 'Серологиялық зерттеу', ru: 'Серологическое исследование', en: 'Serological testing' },
            price: 2500,
            icon: 'biotech'
        },
        {
            id: 'tuberculosis',
            name: { kz: 'Туберкулёз диагностикасы', ru: 'Диагностика туберкулёза', en: 'Tuberculosis Diagnostics' },
            description: { kz: 'Аллергиялық диагностика', ru: 'Аллергическая диагностика', en: 'Allergic diagnosis' },
            price: 3000,
            icon: 'coronavirus'
        },
        {
            id: 'pcr',
            name: { kz: 'ПТР диагностика', ru: 'ПЦР диагностика', en: 'PCR Diagnostics' },
            description: { kz: 'Молекулалық зерттеу', ru: 'Молекулярное исследование', en: 'Molecular testing' },
            price: 8000,
            icon: 'science'
        },
        {
            id: 'bacteriology',
            name: { kz: 'Бактериологиялық зерттеу', ru: 'Бактериологическое исследование', en: 'Bacteriological Analysis' },
            description: { kz: 'Бактериялық өсіру', ru: 'Бактериальный посев', en: 'Bacterial culture' },
            price: 5000,
            icon: 'bug_report'
        },
        {
            id: 'virology',
            name: { kz: 'Вирусологиялық зерттеу', ru: 'Вирусологическое исследование', en: 'Virology Tests' },
            description: { kz: 'Вирустарды анықтау', ru: 'Выявление вирусов', en: 'Virus detection' },
            price: 7000,
            icon: 'vaccines'
        },
        {
            id: 'antibiotic',
            name: { kz: 'Антибиотикке сезімталдық', ru: 'Чувствительность к антибиотикам', en: 'Antibiotic Sensitivity' },
            description: { kz: 'Антибиограмма', ru: 'Антибиограмма', en: 'Antibiogram' },
            price: 4000,
            icon: 'medication'
        },
        {
            id: 'parasitology',
            name: { kz: 'Паразитологиялық зерттеу', ru: 'Паразитологическое исследование', en: 'Parasitology Tests' },
            description: { kz: 'Паразиттерді анықтау', ru: 'Выявление паразитов', en: 'Parasite detection' },
            price: 3500,
            icon: 'pest_control'
        },
        {
            id: 'necropsy',
            name: { kz: 'Патологоанатомиялық зерттеу', ru: 'Патологоанатомическое исследование', en: 'Necropsy' },
            description: { kz: 'Өлген жануарларды зерттеу', ru: 'Исследование павших животных', en: 'Post-mortem examination' },
            price: 15000,
            icon: 'analytics'
        },
    ];

    const toggleService = (serviceId) => {
        if (selectedServices.includes(serviceId)) {
            setSelectedServices(selectedServices.filter(id => id !== serviceId));
        } else {
            setSelectedServices([...selectedServices, serviceId]);
        }
    };

    const getUrgencyMultiplier = () => {
        switch (urgency) {
            case 'urgent': return 1.5;
            case 'express': return 2;
            default: return 1;
        }
    };

    const calculateTotal = () => {
        const baseTotal = selectedServices.reduce((sum, serviceId) => {
            const service = services.find(s => s.id === serviceId);
            return sum + (service ? service.price : 0);
        }, 0);
        return Math.round(baseTotal * animalCount * getUrgencyMultiplier());
    };

    const formatPrice = (price) => {
        return price.toLocaleString('ru-RU');
    };

    return (
        <div className="calculator-page">
            <section className="calculator-hero">
                <div className="container">
                    <h1>{texts.title[language]}</h1>
                    <p>{texts.subtitle[language]}</p>
                </div>
            </section>

            <section className="calculator-content">
                <div className="container">
                    <div className="calculator-layout">
                        {/* Services Grid */}
                        <div className="services-selection">
                            <h2>{texts.selectServices[language]}</h2>
                            <div className="services-grid">
                                {services.map(service => (
                                    <div
                                        key={service.id}
                                        className={`service-card ${selectedServices.includes(service.id) ? 'selected' : ''}`}
                                        onClick={() => toggleService(service.id)}
                                    >
                                        <div className="service-icon">
                                            <span className="material-icons">{service.icon}</span>
                                        </div>
                                        <div className="service-info">
                                            <h3>{service.name[language]}</h3>
                                            <p>{service.description[language]}</p>
                                            <span className="service-price">
                                                {formatPrice(service.price)} {texts.currency[language]}
                                            </span>
                                        </div>
                                        <div className="service-check">
                                            <span className="material-icons">
                                                {selectedServices.includes(service.id) ? 'check_circle' : 'radio_button_unchecked'}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Calculator Summary */}
                        <aside className="calculator-summary">
                            <div className="summary-card">
                                <h3>{texts.total[language]}</h3>

                                {/* Options */}
                                <div className="summary-options">
                                    <div className="option-group">
                                        <label>{texts.animalCount[language]}</label>
                                        <div className="number-input">
                                            <button onClick={() => setAnimalCount(Math.max(1, animalCount - 1))}>
                                                <span className="material-icons">remove</span>
                                            </button>
                                            <span>{animalCount}</span>
                                            <button onClick={() => setAnimalCount(animalCount + 1)}>
                                                <span className="material-icons">add</span>
                                            </button>
                                        </div>
                                    </div>

                                    <div className="option-group">
                                        <label>{texts.urgency[language]}</label>
                                        <div className="urgency-options">
                                            {['normal', 'urgent', 'express'].map(u => (
                                                <button
                                                    key={u}
                                                    className={`urgency-btn ${urgency === u ? 'active' : ''}`}
                                                    onClick={() => setUrgency(u)}
                                                >
                                                    {texts[u][language]}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Selected Services */}
                                {selectedServices.length > 0 && (
                                    <div className="selected-list">
                                        {selectedServices.map(serviceId => {
                                            const service = services.find(s => s.id === serviceId);
                                            return (
                                                <div key={serviceId} className="selected-item">
                                                    <span>{service.name[language]}</span>
                                                    <span>{formatPrice(service.price)} {texts.currency[language]}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Total */}
                                <div className="summary-total">
                                    {selectedServices.length === 0 ? (
                                        <p className="no-selection">{texts.noServicesSelected[language]}</p>
                                    ) : (
                                        <>
                                            <div className="total-row">
                                                <span>{texts.total[language]}:</span>
                                                <span className="total-price">
                                                    {formatPrice(calculateTotal())} {texts.currency[language]}
                                                </span>
                                            </div>
                                            <p className="price-note">{texts.priceNote[language]}</p>
                                        </>
                                    )}
                                </div>

                                {/* Order Button */}
                                <Link
                                    to="/request"
                                    state={{
                                        selectedServices: selectedServices.map(id => services.find(s => s.id === id)),
                                        urgency,
                                        animalCount
                                    }}
                                    className={`btn btn-primary btn-full ${selectedServices.length === 0 ? 'disabled' : ''}`}
                                >
                                    <span className="material-icons">shopping_cart</span>
                                    {texts.orderNow[language]}
                                </Link>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Calculator;
