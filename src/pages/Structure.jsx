import { useApp } from '../context/AppContext';
import './Structure.css';

function Structure() {
    const { language, showToast } = useApp();

    const texts = {
        breadcrumb: { kz: 'Басты бет / Құрылым', ru: 'Главная / Структура', en: 'Home / Structure' },
        title: { kz: 'Аймақтық филиалдар', ru: 'Региональные филиалы', en: 'Regional Branches' },
        subtitle: { kz: 'Біздің аймақтық зертханалар желісі Қазақстан бойынша ветеринарлық диагностикалық қызметтерді бүкіл елде қамтамасыз етеді.', ru: 'Наша сеть региональных лабораторий обеспечивает охват ветеринарных диагностических услуг по всему Казахстану.', en: 'Our network of regional laboratories ensures nationwide coverage for veterinary diagnostic services across Kazakhstan.' },
        interactiveMap: { kz: 'Қазақстанның интерактивті картасы', ru: 'Интерактивная карта Казахстана', en: 'Interactive Map of Kazakhstan' },
        clickRegion: { kz: 'Филиал мәліметтерін көру үшін аймақты басыңыз', ru: 'Нажмите на регион для просмотра деталей филиала', en: 'Click on a region to view branch details' },
        mainLab: { kz: 'Бас зертхана', ru: 'Главная лаборатория', en: 'Main Laboratory' },
        regionalBranch: { kz: 'Аймақтық филиал', ru: 'Региональный филиал', en: 'Regional Branch' },
        allBranches: { kz: 'Барлық филиалдар', ru: 'Все филиалы', en: 'All Branches' },
        headquarters: { kz: 'Орталық кеңсе', ru: 'Штаб-квартира', en: 'Headquarters' },
        address: { kz: 'Мекенжай', ru: 'Адрес', en: 'Address' },
        phone: { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
        viewDetails: { kz: 'Толығырақ', ru: 'Подробнее', en: 'View Details' },
    };

    const branches = [
        {
            city: { kz: 'Астана', ru: 'Астана', en: 'Astana' },
            name: { kz: 'Астана Орталық зертханасы', ru: 'Центральная лаборатория Астаны', en: 'Astana Central Lab' },
            director: { kz: 'Др. Арман Құсайынов', ru: 'Др. Арман Кусаинов', en: 'Dr. Arman Kussainov' },
            address: { kz: 'Жеңіс даңғылы, 45, Астана', ru: 'Проспект Жеңіс, 45, Астана', en: 'Zhengis Ave, 45, Astana' },
            phone: '+7 (7172) 55-01-23',
            isMain: true,
        },
        {
            city: { kz: 'Алматы', ru: 'Алматы', en: 'Almaty' },
            name: { kz: 'Алматы филиалы', ru: 'Алматинский филиал', en: 'Almaty Branch' },
            director: { kz: 'Др. Сәуле Төлегенова', ru: 'Др. Сауле Тулегенова', en: 'Dr. Saule Tuлегенова' },
            address: { kz: 'Абай даңғылы, 150, Алматы', ru: 'Проспект Абая, 150, Алматы', en: 'Abay Ave, 150, Almaty' },
            phone: '+7 (727) 333-44-55',
            isMain: false,
        },
        {
            city: { kz: 'Шымкент', ru: 'Шымкент', en: 'Shymkent' },
            name: { kz: 'Шымкент филиалы', ru: 'Шымкентский филиал', en: 'Shymkent Branch' },
            director: { kz: 'Др. Руслан Ахметов', ru: 'Др. Руслан Ахметов', en: 'Dr. Ruslan Akhmetov' },
            address: { kz: 'Тәуке хан даңғылы, 8', ru: 'Проспект Тауке хана, 8', en: 'Tauke Khan Ave, 8' },
            phone: '+7 (7252) 22-11-99',
            isMain: false,
        },
        {
            city: { kz: 'Ақтөбе', ru: 'Актобе', en: 'Aktobe' },
            name: { kz: 'Ақтөбе филиалы', ru: 'Актюбинский филиал', en: 'Aktobe Branch' },
            director: { kz: 'Др. Ерлан Садықов', ru: 'Др. Ерлан Садыков', en: 'Dr. Yerlan Sadykov' },
            address: { kz: 'Сәнқыбай батыр, 12', ru: 'Санкибай Батыр, 12', en: 'Sankibay Batyr, 12' },
            phone: '+7 (7132) 55-66-77',
            isMain: false,
        },
        {
            city: { kz: 'Қарағанды', ru: 'Караганда', en: 'Karaganda' },
            name: { kz: 'Қарағанды филиалы', ru: 'Карагандинский филиал', en: 'Karaganda Branch' },
            director: { kz: 'Др. Марат Оспанов', ru: 'Др. Марат Оспанов', en: 'Dr. Marat Ospanov' },
            address: { kz: 'Бұқар жырау, 25', ru: 'Бухар Жырау, 25', en: 'Bukhar Zhyrau, 25' },
            phone: '+7 (7212) 44-55-66',
            isMain: false,
        },
        {
            city: { kz: 'Атырау', ru: 'Атырау', en: 'Atyrau' },
            name: { kz: 'Атырау филиалы', ru: 'Атырауский филиал', en: 'Atyrau Branch' },
            director: { kz: 'Др. Дәулет Наурызов', ru: 'Др. Даулет Наурызов', en: 'Dr. Daulet Nauryzov' },
            address: { kz: 'Сәтбаев к-сі, 10', ru: 'Ул. Сатпаева, 10', en: 'Satpayev St, 10' },
            phone: '+7 (7122) 33-44-55',
            isMain: false,
        },
    ];

    const handleViewDetails = (branch) => {
        showToast(language === 'kz' ? `${branch.city[language]} филиалының мәліметтері жүктелуде...` : language === 'ru' ? `Загрузка деталей филиала ${branch.city[language]}...` : `Loading details for ${branch.city[language]} branch...`, 'info');
    };

    return (
        <div className="structure-page">
            {/* Hero */}
            <section className="structure-hero">
                <div className="container">
                    <span className="breadcrumb">{texts.breadcrumb[language]}</span>
                    <h1>{texts.title[language]}</h1>
                    <p className="page-subtitle">{texts.subtitle[language]}</p>
                </div>
            </section>

            {/* Map Section */}
            <section className="section map-section">
                <div className="container">
                    <div className="map-container-lg">
                        <div className="map-placeholder-lg">
                            <span className="material-icons">map</span>
                            <h3>{texts.interactiveMap[language]}</h3>
                            <p>{texts.clickRegion[language]}</p>

                            {/* Legend */}
                            <div className="map-legend">
                                <div className="legend-item">
                                    <span className="legend-dot main"></span>
                                    <span>{texts.mainLab[language]}</span>
                                </div>
                                <div className="legend-item">
                                    <span className="legend-dot regional"></span>
                                    <span>{texts.regionalBranch[language]}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Branches Grid */}
            <section className="section branches-section">
                <div className="container">
                    <h2 className="section-title">{texts.allBranches[language]}</h2>
                    <div className="branches-grid">
                        {branches.map((branch, index) => (
                            <div key={index} className={`branch-card ${branch.isMain ? 'main-branch' : ''}`}>
                                {branch.isMain && (
                                    <span className="main-badge">
                                        <span className="material-icons">star</span>
                                        {texts.headquarters[language]}
                                    </span>
                                )}
                                <h3>{branch.name[language]}</h3>
                                <p className="branch-director">
                                    <span className="material-icons">person</span>
                                    {branch.director[language]}
                                </p>
                                <div className="branch-details">
                                    <div className="detail-item">
                                        <span className="material-icons">location_on</span>
                                        <div>
                                            <span className="detail-label">{texts.address[language]}</span>
                                            <span className="detail-value">{branch.address[language]}</span>
                                        </div>
                                    </div>
                                    <div className="detail-item">
                                        <span className="material-icons">phone</span>
                                        <div>
                                            <span className="detail-label">{texts.phone[language]}</span>
                                            <a href={`tel:${branch.phone.replace(/\s/g, '')}`} className="detail-value">
                                                {branch.phone}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <button className="btn btn-outline btn-full" onClick={() => handleViewDetails(branch)}>
                                    <span className="material-icons">info</span>
                                    {texts.viewDetails[language]}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Structure;
