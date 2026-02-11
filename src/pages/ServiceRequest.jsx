import { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './ServiceRequest.css';

function ServiceRequest() {
    const { language, user, showToast } = useApp();
    const navigate = useNavigate();
    const location = useLocation();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Service Selection
        serviceType: '',
        testType: '',
        urgency: 'normal',

        // Step 2: Sample Information
        animalType: '',
        animalCount: 1,
        sampleType: '',
        sampleDate: '',

        // Step 3: Contact Information
        organization: user?.organization || '',
        contactName: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',

        // Step 4: Additional
        notes: '',
        deliveryMethod: 'self',
        agreement: false,
    });

    // Populate from location state (from Calculator)
    useEffect(() => {
        if (location.state) {
            const { selectedServices, urgency, animalCount } = location.state;
            if (selectedServices && selectedServices.length > 0) {
                const firstService = selectedServices[0];
                setFormData(prev => ({
                    ...prev,
                    serviceType: 'diagnostics', // Default to diagnostics as most calculator items are diagnostics
                    testType: firstService.id,
                    urgency: urgency || 'normal',
                    animalCount: animalCount || 1
                }));
            }
        }
    }, [location.state]);

    const texts = {
        title: { kz: 'Қызметке онлайн өтінім', ru: 'Онлайн заявка на услугу', en: 'Online Service Request' },
        subtitle: { kz: 'Зертханалық зерттеуге өтінім беру', ru: 'Подать заявку на лабораторное исследование', en: 'Submit a request for laboratory testing' },

        // Steps
        step1: { kz: 'Қызметті таңдау', ru: 'Выбор услуги', en: 'Select Service' },
        step2: { kz: 'Үлгі туралы мәліметтер', ru: 'Информация об образце', en: 'Sample Information' },
        step3: { kz: 'Байланыс ақпараты', ru: 'Контактная информация', en: 'Contact Information' },
        step4: { kz: 'Қосымша мәліметтер', ru: 'Дополнительно', en: 'Additional Details' },

        // Labels
        serviceType: { kz: 'Қызмет түрі', ru: 'Тип услуги', en: 'Service Type' },
        testType: { kz: 'Зерттеу түрі', ru: 'Тип исследования', en: 'Test Type' },
        urgency: { kz: 'Жеделдік', ru: 'Срочность', en: 'Urgency' },
        normal: { kz: 'Қалыпты (3-5 күн)', ru: 'Обычная (3-5 дней)', en: 'Normal (3-5 days)' },
        urgent: { kz: 'Жедел (1-2 күн)', ru: 'Срочная (1-2 дня)', en: 'Urgent (1-2 days)' },
        express: { kz: 'Экспресс (24 сағат)', ru: 'Экспресс (24 часа)', en: 'Express (24 hours)' },

        animalType: { kz: 'Жануар түрі', ru: 'Вид животного', en: 'Animal Type' },
        animalCount: { kz: 'Жануар саны', ru: 'Количество животных', en: 'Number of Animals' },
        sampleType: { kz: 'Үлгі түрі', ru: 'Тип образца', en: 'Sample Type' },
        sampleDate: { kz: 'Үлгі алу күні', ru: 'Дата забора образца', en: 'Sample Collection Date' },

        organization: { kz: 'Ұйым атауы', ru: 'Название организации', en: 'Organization Name' },
        contactName: { kz: 'Байланыс тұлғасы', ru: 'Контактное лицо', en: 'Contact Person' },
        email: { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
        phone: { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
        address: { kz: 'Мекенжай', ru: 'Адрес', en: 'Address' },

        notes: { kz: 'Қосымша ескертпелер', ru: 'Дополнительные примечания', en: 'Additional Notes' },
        deliveryMethod: { kz: 'Үлгіні жеткізу әдісі', ru: 'Способ доставки образца', en: 'Sample Delivery Method' },
        selfDelivery: { kz: 'Өзім жеткіземін', ru: 'Привезу сам', en: 'Self Delivery' },
        courierPickup: { kz: 'Курьерлік жинау', ru: 'Курьерский забор', en: 'Courier Pickup' },
        agreement: { kz: 'Мен зерттеу шарттарымен келісемін', ru: 'Я согласен с условиями исследования', en: 'I agree to the research terms' },

        // Buttons
        next: { kz: 'Келесі', ru: 'Далее', en: 'Next' },
        previous: { kz: 'Артқа', ru: 'Назад', en: 'Back' },
        submit: { kz: 'Өтінім беру', ru: 'Подать заявку', en: 'Submit Request' },

        // Messages
        success: { kz: 'Өтінім сәтті қабылданды!', ru: 'Заявка успешно отправлена!', en: 'Request submitted successfully!' },
        required: { kz: 'Міндетті өріс', ru: 'Обязательное поле', en: 'Required field' },
        loginRequired: { kz: 'Өтінім беру үшін кіріңіз', ru: 'Войдите для подачи заявки', en: 'Login to submit request' },

        // Service Types
        diagnostics: { kz: 'Диагностика', ru: 'Диагностика', en: 'Diagnostics' },
        certification: { kz: 'Сертификация', ru: 'Сертификация', en: 'Certification' },
        consultation: { kz: 'Консультация', ru: 'Консультация', en: 'Consultation' },

        // Animal Types
        cattle: { kz: 'Ірі қара мал', ru: 'Крупный рогатый скот', en: 'Cattle' },
        sheep: { kz: 'Қой', ru: 'Овцы', en: 'Sheep' },
        goat: { kz: 'Ешкі', ru: 'Козы', en: 'Goats' },
        horse: { kz: 'Жылқы', ru: 'Лошади', en: 'Horses' },
        pig: { kz: 'Шошқа', ru: 'Свиньи', en: 'Pigs' },
        poultry: { kz: 'Құс', ru: 'Птица', en: 'Poultry' },
        dog: { kz: 'Ит', ru: 'Собаки', en: 'Dogs' },
        cat: { kz: 'Мысық', ru: 'Кошки', en: 'Cats' },
        other: { kz: 'Басқа', ru: 'Другое', en: 'Other' },

        // Sample Types
        blood: { kz: 'Қан', ru: 'Кровь', en: 'Blood' },
        serum: { kz: 'Сарысу', ru: 'Сыворотка', en: 'Serum' },
        tissue: { kz: 'Тін', ru: 'Ткань', en: 'Tissue' },
        feces: { kz: 'Нәжіс', ru: 'Фекалии', en: 'Feces' },
        milk: { kz: 'Сүт', ru: 'Молоко', en: 'Milk' },
        swab: { kz: 'Мазок', ru: 'Мазок', en: 'Swab' },
    };

    const testTypes = {
        diagnostics: [
            { id: 'brucellosis', name: { kz: 'Бруцеллёз диагностикасы', ru: 'Диагностика бруцеллёза', en: 'Brucellosis Diagnostics' } },
            { id: 'tuberculosis', name: { kz: 'Туберкулёз диагностикасы', ru: 'Диагностика туберкулёза', en: 'Tuberculosis Diagnostics' } },
            { id: 'pcr', name: { kz: 'ПТР диагностика', ru: 'ПЦР диагностика', en: 'PCR Diagnostics' } },
            { id: 'serology', name: { kz: 'Серологиялық зерттеу', ru: 'Серологические исследования', en: 'Serological Tests' } },
            { id: 'bacteriology', name: { kz: 'Бактериологиялық зерттеу', ru: 'Бактериологические исследования', en: 'Bacteriological Analysis' } },
            { id: 'virology', name: { kz: 'Вирусологиялық зерттеу', ru: 'Вирусологические исследования', en: 'Virology Tests' } },
        ],
        certification: [
            { id: 'export', name: { kz: 'Экспорт сертификаты', ru: 'Экспортный сертификат', en: 'Export Certificate' } },
            { id: 'quality', name: { kz: 'Сапа сертификаты', ru: 'Сертификат качества', en: 'Quality Certificate' } },
            { id: 'health', name: { kz: 'Денсаулық сертификаты', ru: 'Сертификат здоровья', en: 'Health Certificate' } },
        ],
        consultation: [
            { id: 'disease', name: { kz: 'Аурулар бойынша', ru: 'По заболеваниям', en: 'Disease Consultation' } },
            { id: 'prevention', name: { kz: 'Алдын алу шаралары', ru: 'Профилактические меры', en: 'Prevention Measures' } },
            { id: 'treatment', name: { kz: 'Емдеу', ru: 'Лечение', en: 'Treatment' } },
        ],
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleNext = () => {
        if (step < 4) setStep(step + 1);
    };

    const handlePrevious = () => {
        if (step > 1) setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Simulate submission
        showToast(texts.success[language], 'success');

        // Generate order ID and redirect to dashboard
        setTimeout(() => {
            navigate('/dashboard');
        }, 1500);
    };

    const renderStep1 = () => (
        <div className="form-step">
            <div className="form-group">
                <label>{texts.serviceType[language]} *</label>
                <div className="radio-cards">
                    {['diagnostics', 'certification', 'consultation'].map(type => (
                        <label key={type} className={`radio-card ${formData.serviceType === type ? 'selected' : ''}`}>
                            <input
                                type="radio"
                                name="serviceType"
                                value={type}
                                checked={formData.serviceType === type}
                                onChange={handleChange}
                            />
                            <span className="material-icons">
                                {type === 'diagnostics' ? 'biotech' : type === 'certification' ? 'verified' : 'support_agent'}
                            </span>
                            <span>{texts[type][language]}</span>
                        </label>
                    ))}
                </div>
            </div>

            {formData.serviceType && (
                <div className="form-group">
                    <label>{texts.testType[language]} *</label>
                    <select name="testType" value={formData.testType} onChange={handleChange} className="form-select">
                        <option value="">-- {language === 'kz' ? 'Таңдаңыз' : language === 'ru' ? 'Выберите' : 'Select'} --</option>
                        {testTypes[formData.serviceType]?.map(test => (
                            <option key={test.id} value={test.id}>{test.name[language]}</option>
                        ))}
                    </select>
                </div>
            )}

            <div className="form-group">
                <label>{texts.urgency[language]}</label>
                <div className="radio-group">
                    {['normal', 'urgent', 'express'].map(u => (
                        <label key={u} className="radio-option">
                            <input
                                type="radio"
                                name="urgency"
                                value={u}
                                checked={formData.urgency === u}
                                onChange={handleChange}
                            />
                            <span>{texts[u][language]}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="form-step">
            <div className="form-row-2">
                <div className="form-group">
                    <label>{texts.animalType[language]} *</label>
                    <select name="animalType" value={formData.animalType} onChange={handleChange} className="form-select">
                        <option value="">-- {language === 'kz' ? 'Таңдаңыз' : language === 'ru' ? 'Выберите' : 'Select'} --</option>
                        {['cattle', 'sheep', 'goat', 'horse', 'pig', 'poultry', 'dog', 'cat', 'other'].map(animal => (
                            <option key={animal} value={animal}>{texts[animal][language]}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>{texts.animalCount[language]} *</label>
                    <input
                        type="number"
                        name="animalCount"
                        min="1"
                        value={formData.animalCount}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-row-2">
                <div className="form-group">
                    <label>{texts.sampleType[language]} *</label>
                    <select name="sampleType" value={formData.sampleType} onChange={handleChange} className="form-select">
                        <option value="">-- {language === 'kz' ? 'Таңдаңыз' : language === 'ru' ? 'Выберите' : 'Select'} --</option>
                        {['blood', 'serum', 'tissue', 'feces', 'milk', 'swab'].map(sample => (
                            <option key={sample} value={sample}>{texts[sample][language]}</option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>{texts.sampleDate[language]} *</label>
                    <input
                        type="date"
                        name="sampleDate"
                        value={formData.sampleDate}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div className="form-step">
            <div className="form-group">
                <label>{texts.organization[language]} *</label>
                <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="form-row-2">
                <div className="form-group">
                    <label>{texts.contactName[language]} *</label>
                    <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label>{texts.phone[language]} *</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="form-input"
                    />
                </div>
            </div>

            <div className="form-group">
                <label>{texts.email[language]} *</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>

            <div className="form-group">
                <label>{texts.address[language]}</label>
                <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-input"
                />
            </div>
        </div>
    );

    const renderStep4 = () => (
        <div className="form-step">
            <div className="form-group">
                <label>{texts.deliveryMethod[language]}</label>
                <div className="radio-cards horizontal">
                    <label className={`radio-card ${formData.deliveryMethod === 'self' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="self"
                            checked={formData.deliveryMethod === 'self'}
                            onChange={handleChange}
                        />
                        <span className="material-icons">directions_car</span>
                        <span>{texts.selfDelivery[language]}</span>
                    </label>
                    <label className={`radio-card ${formData.deliveryMethod === 'courier' ? 'selected' : ''}`}>
                        <input
                            type="radio"
                            name="deliveryMethod"
                            value="courier"
                            checked={formData.deliveryMethod === 'courier'}
                            onChange={handleChange}
                        />
                        <span className="material-icons">local_shipping</span>
                        <span>{texts.courierPickup[language]}</span>
                    </label>
                </div>
            </div>

            <div className="form-group">
                <label>{texts.notes[language]}</label>
                <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    className="form-textarea"
                    rows="4"
                ></textarea>
            </div>

            <div className="form-group">
                <label className="checkbox-label">
                    <input
                        type="checkbox"
                        name="agreement"
                        checked={formData.agreement}
                        onChange={handleChange}
                    />
                    <span>{texts.agreement[language]} *</span>
                </label>
            </div>
        </div>
    );

    if (!user) {
        return (
            <div className="service-request-page">
                <div className="container">
                    <div className="login-prompt-card">
                        <span className="material-icons">lock</span>
                        <h2>{texts.loginRequired[language]}</h2>
                        <Link to="/login" className="btn btn-primary">
                            <span className="material-icons">login</span>
                            {language === 'kz' ? 'Кіру' : language === 'ru' ? 'Войти' : 'Login'}
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="service-request-page">
            <div className="container">
                <div className="request-header">
                    <h1>{texts.title[language]}</h1>
                    <p>{texts.subtitle[language]}</p>
                </div>

                <div className="request-content">
                    {/* Progress Steps */}
                    <div className="progress-steps">
                        {[1, 2, 3, 4].map(s => (
                            <div key={s} className={`progress-step ${step === s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                                <div className="step-circle">
                                    {step > s ? <span className="material-icons">check</span> : s}
                                </div>
                                <span className="step-label">{texts[`step${s}`][language]}</span>
                            </div>
                        ))}
                    </div>

                    {/* Form */}
                    <form className="request-form" onSubmit={handleSubmit}>
                        {step === 1 && renderStep1()}
                        {step === 2 && renderStep2()}
                        {step === 3 && renderStep3()}
                        {step === 4 && renderStep4()}

                        <div className="form-actions">
                            {step > 1 && (
                                <button type="button" className="btn btn-outline" onClick={handlePrevious}>
                                    <span className="material-icons">arrow_back</span>
                                    {texts.previous[language]}
                                </button>
                            )}
                            {step < 4 ? (
                                <button type="button" className="btn btn-primary" onClick={handleNext}>
                                    {texts.next[language]}
                                    <span className="material-icons">arrow_forward</span>
                                </button>
                            ) : (
                                <button type="submit" className="btn btn-primary" disabled={!formData.agreement}>
                                    <span className="material-icons">send</span>
                                    {texts.submit[language]}
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ServiceRequest;
