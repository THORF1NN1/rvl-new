import { useApp } from '../context/AppContext';
import './About.css';

function About() {
    const { language } = useApp();

    const texts = {
        breadcrumb: { kz: 'Басты бет / Біз туралы', ru: 'Главная / О нас', en: 'Home / About Us' },
        title: { kz: 'Зертхана туралы', ru: 'О лаборатории', en: 'About the Laboratory' },
        subtitle: { kz: 'Қауіпсіз Қазақстан үшін ветеринария ғылымын дамыту', ru: 'Развитие ветеринарной науки для безопасного Казахстана', en: 'Advancing Veterinary Science for a Safer Kazakhstan' },
        missionTitle: { kz: 'Біздің миссиямыз', ru: 'Наша миссия', en: 'Our Mission' },
        missionText: { kz: 'Қазақстанның ауыл шаруашылығы секторын қолдай отырып, жетілдірілген ветеринарлық диагностика, ғылыми зерттеулер және кәсіби тәжірибе арқылы мал денсаулығын қорғау және тамақ қауіпсіздігін қамтамасыз ету.', ru: 'Защита здоровья животных и обеспечение безопасности продовольствия посредством передовой ветеринарной диагностики, научных исследований и профессионального опыта, поддерживая сельскохозяйственный сектор Казахстана.', en: 'To protect animal health and ensure food safety through advanced veterinary diagnostics, scientific research, and professional expertise, supporting the agricultural sector of Kazakhstan.' },
        visionTitle: { kz: 'Біздің көзқарасымыз', ru: 'Наше видение', en: 'Our Vision' },
        visionText: { kz: 'Орталық Азиядағы диагностикалық қызметтердегі озық тәжірибемен, зерттеулердегі инновациялармен және биоқауіпсіздікке берілгендігімен танылған жетекші ветеринарлық зертхана болу.', ru: 'Стать ведущей ветеринарной лабораторией в Центральной Азии, признанной за превосходство в диагностических услугах, инновации в исследованиях и приверженность биобезопасности.', en: 'To be the leading veterinary laboratory in Central Asia, recognized for excellence in diagnostic services, innovation in research, and commitment to biosecurity.' },
        historyTitle: { kz: 'Тарих және кезеңдер', ru: 'История и этапы', en: 'History & Milestones' },
        teamTitle: { kz: 'Басшылық', ru: 'Руководство', en: 'Management Team' },
        certsTitle: { kz: 'Аккредитация және сертификаттар', ru: 'Аккредитации и сертификаты', en: 'Accreditations & Certificates' },
    };

    const milestones = [
        { year: '1932', event: { kz: 'Алматыда алғашқы ветеринарлық зертхананың құрылуы', ru: 'Создание первой ветеринарной лаборатории в Алматы', en: 'Establishment of the first veterinary laboratory in Almaty' } },
        { year: '1991', event: { kz: 'Республикалық ветеринарлық зертхана ретінде қайта құру', ru: 'Реорганизация в Республиканскую ветеринарную лабораторию', en: 'Reorganization as the Republican Veterinary Laboratory' } },
        { year: '2005', event: { kz: 'Алғашқы ISO/IEC 17025 аккредитациясы', ru: 'Первая аккредитация ISO/IEC 17025', en: 'First ISO/IEC 17025 accreditation' } },
        { year: '2015', event: { kz: 'Астанада жаңа орталық ғимараттың ашылуы', ru: 'Открытие нового центрального здания в Астане', en: 'Opening of the new central facility in Astana' } },
        { year: '2023', event: { kz: 'Цифрлық қызметтер мен онлайн порталды іске қосу', ru: 'Запуск цифровых услуг и онлайн-портала', en: 'Launch of digital services and online portal' } },
    ];

    const team = [
        {
            name: { kz: 'Др. Азамат Нұрғалиев', ru: 'Др. Азамат Нургалиев', en: 'Dr. Azamat Nurgaliyev' },
            position: { kz: 'Бас директор', ru: 'Генеральный директор', en: 'General Director' },
            credentials: { kz: 'PhD, Ветеринария ғылымы', ru: 'PhD, Ветеринария', en: 'PhD in Veterinary Science' },
        },
        {
            name: { kz: 'Др. Сәуле Ахметова', ru: 'Др. Сауле Ахметова', en: 'Dr. Saule Akhmetova' },
            position: { kz: 'Бас ғалым', ru: 'Главный научный сотрудник', en: 'Chief Scientist' },
            credentials: { kz: 'DSc, Вирусология', ru: 'DSc, Вирусология', en: 'DSc, Virology' },
        },
        {
            name: { kz: 'Мырза Берік Серіков', ru: 'Г-н Берик Сериков', en: 'Mr. Berik Serikov' },
            position: { kz: 'Директордың орынбасары', ru: 'Заместитель директора', en: 'Deputy Director' },
            credentials: { kz: 'MBA, Мемлекеттік басқару', ru: 'MBA, Государственное управление', en: 'MBA, Public Administration' },
        },
    ];

    const certificates = [
        { title: 'ISO/IEC 17025:2017', desc: { kz: 'Сынақ және калибрлеу зертханалары', ru: 'Испытательные и калибровочные лаборатории', en: 'Testing and Calibration Laboratories' } },
        { title: 'ISO 9001:2015', desc: { kz: 'Сапа менеджменті жүйелері', ru: 'Системы менеджмента качества', en: 'Quality Management Systems' } },
        { title: 'EAEU', desc: { kz: 'Еуразиялық экономикалық одақ аккредитациясы', ru: 'Аккредитация ЕАЭС', en: 'Eurasian Economic Union Accreditation' } },
        { title: 'OIE', desc: { kz: 'Бүкіләлемдік мал денсаулығы ұйымы', ru: 'Всемирная организация здоровья животных', en: 'World Organisation for Animal Health' } },
    ];

    return (
        <div className="about-page">
            {/* Hero */}
            <section className="page-hero">
                <div className="container">
                    <span className="breadcrumb">{texts.breadcrumb[language]}</span>
                    <h1>{texts.title[language]}</h1>
                    <p className="page-subtitle">{texts.subtitle[language]}</p>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="section">
                <div className="container">
                    <div className="mission-grid">
                        <div className="mission-card">
                            <div className="mission-icon">
                                <span className="material-icons">flag</span>
                            </div>
                            <h2>{texts.missionTitle[language]}</h2>
                            <p>{texts.missionText[language]}</p>
                        </div>
                        <div className="mission-card">
                            <div className="mission-icon">
                                <span className="material-icons">visibility</span>
                            </div>
                            <h2>{texts.visionTitle[language]}</h2>
                            <p>{texts.visionText[language]}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* History */}
            <section className="section history-section">
                <div className="container">
                    <h2 className="section-title">{texts.historyTitle[language]}</h2>
                    <div className="timeline">
                        {milestones.map((item, index) => (
                            <div key={index} className="timeline-item">
                                <div className="timeline-year">{item.year}</div>
                                <div className="timeline-content">
                                    <p>{item.event[language]}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="section team-section">
                <div className="container">
                    <h2 className="section-title">{texts.teamTitle[language]}</h2>
                    <div className="team-grid">
                        {team.map((member, index) => (
                            <div key={index} className="team-card">
                                <div className="team-avatar">
                                    <span className="material-icons">person</span>
                                </div>
                                <h3>{member.name[language]}</h3>
                                <p className="team-position">{member.position[language]}</p>
                                <p className="team-credentials">{member.credentials[language]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Accreditations */}
            <section className="section certificates-section">
                <div className="container">
                    <h2 className="section-title">{texts.certsTitle[language]}</h2>
                    <div className="certificates-grid">
                        {certificates.map((cert, index) => (
                            <div key={index} className="certificate-card">
                                <span className="material-icons cert-icon">verified</span>
                                <h3>{cert.title}</h3>
                                <p>{cert.desc[language]}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

export default About;
