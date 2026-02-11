import { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import './LegalActs.css';

function LegalActs() {
    const { language, showToast } = useApp();
    const [documentType, setDocumentType] = useState('all');
    const [selectedYear, setSelectedYear] = useState('');
    const [statusFilter, setStatusFilter] = useState({ active: true, superseded: false });

    const texts = {
        breadcrumb: { kz: 'Басты бет / Құқықтық актілер', ru: 'Главная / Правовые акты', en: 'Home / Legal Acts' },
        title: { kz: 'Құқықтық және нормативтік актілер', ru: 'Правовые и нормативные акты', en: 'Legal and Regulatory Acts' },
        subtitle: { kz: 'Қазақстан Республикасындағы ветеринарлық қызметті реттейтін заңдар, бұйрықтар мен техникалық регламенттердің ресми дерекқоры.', ru: 'Официальная база данных законов, приказов и технических регламентов, регулирующих ветеринарную деятельность в Республике Казахстан.', en: 'Official database of laws, orders, and technical regulations governing veterinary activities in the Republic of Kazakhstan.' },
        filters: { kz: 'Сүзгілер', ru: 'Фильтры', en: 'Filters' },
        documentType: { kz: 'Құжат түрі', ru: 'Тип документа', en: 'Document Type' },
        yearAdoption: { kz: 'Қабылдау жылы', ru: 'Год принятия', en: 'Year of Adoption' },
        allYears: { kz: 'Барлық жылдар', ru: 'Все годы', en: 'All Years' },
        before2022: { kz: '2022 жылға дейін', ru: 'До 2022', en: 'Before 2022' },
        status: { kz: 'Мәртебе', ru: 'Статус', en: 'Status' },
        active: { kz: 'Қолданыста', ru: 'Действующий', en: 'Active' },
        superseded: { kz: 'Алмастырылған', ru: 'Заменённый', en: 'Superseded' },
        showing: { kz: 'Көрсетілуде', ru: 'Показано', en: 'Showing' },
        documents: { kz: 'құжат', ru: 'документов', en: 'documents' },
        openInAdilet: { kz: 'Әділетте ашу', ru: 'Открыть в Адилет', en: 'Open in Adilet' },
        viewHistory: { kz: 'Тарихты көру', ru: 'Посмотреть историю', en: 'View History' },
        redirecting: { kz: 'Әділет порталына өту...', ru: 'Переход на портал Адилет...', en: 'Redirecting to Adilet portal...' },
    };

    const types = [
        { id: 'all', label: { kz: 'Барлық құжаттар', ru: 'Все документы', en: 'All Documents' } },
        { id: 'law', label: { kz: 'Заңдар', ru: 'Законы', en: 'Laws' } },
        { id: 'order', label: { kz: 'Бұйрықтар', ru: 'Приказы', en: 'Orders' } },
        { id: 'regulation', label: { kz: 'Регламенттер', ru: 'Регламенты', en: 'Regulations' } },
        { id: 'standard', label: { kz: 'Стандарттар', ru: 'Стандарты', en: 'Standards' } },
    ];

    const typeLabels = {
        law: { kz: 'Заң', ru: 'Закон', en: 'Law' },
        order: { kz: 'Бұйрық', ru: 'Приказ', en: 'Order' },
        regulation: { kz: 'Регламент', ru: 'Регламент', en: 'Regulation' },
        standard: { kz: 'Стандарт', ru: 'Стандарт', en: 'Standard' },
    };

    const documents = [
        {
            id: 1,
            type: 'law',
            title: { kz: 'Ветеринария туралы', ru: 'О ветеринарии', en: 'On Veterinary Medicine' },
            description: { kz: 'Бұл Заң Қазақстан Республикасы аумағында ветеринариялық қызметті жүзеге асырудың құқықтық, ұйымдастырушылық және экономикалық негіздерін реттейді.', ru: 'Настоящий Закон регулирует правовые, организационные и экономические основы осуществления ветеринарной деятельности на территории Республики Казахстан.', en: 'This Law regulates legal, organizational, and economic basis of implementation of veterinary activity in the territory of the Republic of Kazakhstan.' },
            year: 2002,
            status: 'active',
        },
        {
            id: 2,
            type: 'order',
            title: { kz: 'Ветеринариялық (ветеринариялық-санитариялық) ережелерді бекіту', ru: 'Утверждение ветеринарных (ветеринарно-санитарных) правил', en: 'Approval of Veterinary (Veterinary-Sanitary) Rules' },
            description: { kz: 'Ветеринариялық-санитариялық ережелерді белгілейтін Ауыл шаруашылығы министрінің бұйрығы.', ru: 'Приказ Министра сельского хозяйства, устанавливающий ветеринарно-санитарные правила.', en: 'Order of the Minister of Agriculture establishing veterinary sanitary rules.' },
            year: 2015,
            status: 'active',
        },
        {
            id: 3,
            type: 'regulation',
            title: { kz: 'Сүт және сүт өнімдерінің қауіпсіздігіне қойылатын талаптар', ru: 'Требования к безопасности молока и молочной продукции', en: 'Requirements for Safety of Milk and Dairy Products' },
            description: { kz: 'ЕАЭО Техникалық регламенті TR TS 033/2013 алмастырылды', ru: 'Заменено Техническим регламентом ЕАЭС TR TS 033/2013', en: 'Replaced by EAEU Technical Regulation TR TS 033/2013' },
            year: 2010,
            status: 'superseded',
        },
        {
            id: 4,
            type: 'standard',
            title: { kz: 'Бруцеллёздың зертханалық диагностикасы. Зерттеу әдістері.', ru: 'Лабораторная диагностика бруцеллёза. Методы исследования.', en: 'Laboratory diagnostics of brucellosis. Methods of research.' },
            description: { kz: 'Бруцеллёзды зертханалық анықтау және сәйкестендіру бойынша ұлттық стандарт.', ru: 'Национальный стандарт по лабораторному обнаружению и идентификации бруцеллёза.', en: 'National standard for laboratory detection and identification of brucellosis.' },
            year: 2018,
            status: 'active',
        },
        {
            id: 5,
            type: 'law',
            title: { kz: 'Тамақ қауіпсіздігі туралы', ru: 'О безопасности пищевой продукции', en: 'On Food Safety' },
            description: { kz: 'Қазақстандағы тамақ қауіпсіздігі талаптары мен бақылау шараларын реттейді.', ru: 'Регулирует требования к безопасности пищевых продуктов и меры контроля в Казахстане.', en: 'Regulates food safety requirements and control measures in Kazakhstan.' },
            year: 2007,
            status: 'active',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 2; // Set to 2 to demonstrate pagination with small dataset

    // Reset page when filters change
    useMemo(() => {
        setCurrentPage(1);
    }, [documentType, selectedYear, statusFilter]);

    const filteredDocs = useMemo(() => {
        return documents.filter(doc => {
            if (documentType !== 'all' && doc.type !== documentType) return false;

            if (selectedYear) {
                if (selectedYear === 'older') {
                    if (doc.year >= 2022) return false;
                } else if (doc.year !== parseInt(selectedYear)) {
                    return false;
                }
            }

            if (doc.status === 'active' && !statusFilter.active) return false;
            if (doc.status === 'superseded' && !statusFilter.superseded) return false;

            return true;
        });
    }, [documentType, selectedYear, statusFilter]);

    const totalPages = Math.ceil(filteredDocs.length / ITEMS_PER_PAGE);
    const currentDocs = filteredDocs.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleOpenAdilet = (doc) => {
        showToast(texts.redirecting[language], 'info');
        // Simulate redirecting to official portal
        setTimeout(() => {
            window.open(`https://adilet.zan.kz/kaz/search/docs/fulltext=${encodeURIComponent(doc.title.kz)}`, '_blank');
        }, 1000);
    };

    return (
        <div className="legal-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="breadcrumb">{texts.breadcrumb[language]}</span>
                    <h1>{texts.title[language]}</h1>
                    <p className="page-subtitle">{texts.subtitle[language]}</p>
                </div>
            </section>

            {/* Main Content */}
            <section className="section">
                <div className="container">
                    <div className="legal-layout">
                        {/* Filters */}
                        <aside className="legal-sidebar">
                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">filter_list</span>
                                    {texts.filters[language]}
                                </h3>

                                <div className="filter-group">
                                    <h4>{texts.documentType[language]}</h4>
                                    <div className="filter-options">
                                        {types.map(type => (
                                            <label key={type.id} className="filter-option">
                                                <input
                                                    type="radio"
                                                    name="documentType"
                                                    checked={documentType === type.id}
                                                    onChange={() => setDocumentType(type.id)}
                                                />
                                                <span>{type.label[language]}</span>
                                            </label>
                                        ))}
                                    </div>
                                </div>

                                <div className="filter-group">
                                    <h4>{texts.yearAdoption[language]}</h4>
                                    <select
                                        className="filter-select"
                                        value={selectedYear}
                                        onChange={(e) => setSelectedYear(e.target.value)}
                                    >
                                        <option value="">{texts.allYears[language]}</option>
                                        <option value="2024">2024</option>
                                        <option value="2023">2023</option>
                                        <option value="2022">2022</option>
                                        <option value="older">{texts.before2022[language]}</option>
                                    </select>
                                </div>

                                <div className="filter-group">
                                    <h4>{texts.status[language]}</h4>
                                    <div className="filter-options">
                                        <label className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={statusFilter.active}
                                                onChange={(e) => setStatusFilter({ ...statusFilter, active: e.target.checked })}
                                            />
                                            <span>{texts.active[language]}</span>
                                        </label>
                                        <label className="filter-option">
                                            <input
                                                type="checkbox"
                                                checked={statusFilter.superseded}
                                                onChange={(e) => setStatusFilter({ ...statusFilter, superseded: e.target.checked })}
                                            />
                                            <span>{texts.superseded[language]}</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        {/* Documents List */}
                        <div className="legal-main">
                            <div className="results-header">
                                <span>{texts.showing[language]} {filteredDocs.length} {texts.documents[language]}</span>
                            </div>

                            <div className="documents-list">
                                {currentDocs.map(doc => (
                                    <div key={doc.id} className="document-card">
                                        <div className="document-header">
                                            <span className={`doc-type doc-type-${doc.type}`}>
                                                {typeLabels[doc.type][language]}
                                            </span>
                                            <span className={`doc-status ${doc.status === 'active' ? 'status-active' : 'status-superseded'}`}>
                                                {doc.status === 'active' ? texts.active[language] : texts.superseded[language]}
                                            </span>
                                            <span className="doc-year">{doc.year}</span>
                                        </div>
                                        <h3>{doc.title[language]}</h3>
                                        <p>{doc.description[language]}</p>
                                        <div className="document-actions">
                                            <a
                                                href="#"
                                                className="doc-link"
                                                onClick={(e) => { e.preventDefault(); handleOpenAdilet(doc); }}
                                            >
                                                <span className="material-icons">open_in_new</span>
                                                {texts.openInAdilet[language]}
                                            </a>
                                            {doc.status === 'superseded' && (
                                                <a href="#" className="doc-link">
                                                    <span className="material-icons">history</span>
                                                    {texts.viewHistory[language]}
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {totalPages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="page-btn"
                                        disabled={currentPage === 1}
                                        onClick={() => handlePageChange(currentPage - 1)}
                                    >
                                        <span className="material-icons">chevron_left</span>
                                    </button>

                                    {[...Array(totalPages)].map((_, i) => (
                                        <button
                                            key={i}
                                            className={`page-btn ${currentPage === i + 1 ? 'active' : ''}`}
                                            onClick={() => handlePageChange(i + 1)}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}

                                    <button
                                        className="page-btn"
                                        disabled={currentPage === totalPages}
                                        onClick={() => handlePageChange(currentPage + 1)}
                                    >
                                        <span className="material-icons">chevron_right</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default LegalActs;
