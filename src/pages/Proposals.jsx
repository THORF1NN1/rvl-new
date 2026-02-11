import { useApp } from '../context/AppContext';
import './Proposals.css';

function Proposals() {
    const { language, showToast } = useApp();

    const texts = {
        dashboard: { kz: 'Басқару тақтасы', ru: 'Панель управления', en: 'Dashboard' },
        proposals: { kz: 'Ұсыныстар', ru: 'Предложения', en: 'Proposals' },
        teams: { kz: 'Командалар', ru: 'Команды', en: 'Teams' },
        analytics: { kz: 'Аналитика', ru: 'Аналитика', en: 'Analytics' },
        title: { kz: 'Қатысушылардың ұсыныстары', ru: 'Предложения участников', en: 'Contestants\' Proposals' },
        subtitle: { kz: 'Ұлттық зертханалық жүйе үшін ұсынылған соңғы технологиялық жетістіктерді қараңыз және бағалаңыз.', ru: 'Просмотрите и оцените последние технологические предложения для национальной лабораторной системы.', en: 'Review and evaluate the latest technological advancements proposed for the national laboratory system.' },
        theProblem: { kz: 'Мәселе', ru: 'Проблема', en: 'The Problem' },
        theSolution: { kz: 'Шешім', ru: 'Решение', en: 'The Solution' },
        review: { kz: 'Қарау', ru: 'Рассмотреть', en: 'Review' },
        save: { kz: 'Сақтау', ru: 'Сохранить', en: 'Save' },
        submitted: { kz: 'Жіберілді', ru: 'Отправлено', en: 'Submitted' },
        reviewPeriodActive: { kz: 'Қарау кезеңі белсенді', ru: 'Период рассмотрения активен', en: 'Review Period Active' },
        reviewDeadline: { kz: 'Барлық бағалауларды 2024 жылғы 15 қазанға дейін тапсыру керек.', ru: 'Все оценки должны быть представлены до 15 октября 2024 года.', en: 'All evaluations must be submitted by October 15th, 2024.' },
    };

    const statusLabels = {
        under_review: { kz: 'Қарауда', ru: 'На рассмотрении', en: 'Under Review' },
        approved: { kz: 'Мақұлданды', ru: 'Одобрено', en: 'Approved' },
        pending: { kz: 'Күтуде', ru: 'Ожидает', en: 'Pending' },
    };

    const stats = [
        { value: '24', label: { kz: 'Барлық ұсыныстар', ru: 'Всего предложений', en: 'Total Proposals' }, icon: 'description' },
        { value: '35%', label: { kz: 'Орт. тиімділік өсімі', ru: 'Ср. рост эффективности', en: 'Avg. Efficiency Gain' }, icon: 'trending_up' },
        { value: '8', label: { kz: 'Қатысушы командалар', ru: 'Участвующих команд', en: 'Participating Teams' }, icon: 'groups' },
    ];

    const proposals = [
        {
            id: 1,
            title: { kz: 'Lab-Track: Нақты уақыттағы үлгілерді бақылау', ru: 'Lab-Track: Отслеживание образцов в реальном времени', en: 'Lab-Track: Real-time Sample Tracking' },
            team: 'Team Alpha',
            submitted: { kz: '2 күн бұрын', ru: '2 дня назад', en: '2 days ago' },
            problem: { kz: 'Қолмен тіркеу қателері мен бөлшектелген курьер деректеріне байланысты жылдық үлгі жоғалуы 15%.', ru: '15% ежегодная потеря образцов из-за ошибок ручной регистрации и фрагментированных данных курьеров.', en: '15% annual sample loss due to manual logging errors and fragmented courier data.' },
            solution: { kz: 'Қазіргі LIMS инфрақұрылымымен біріктірілген IoT негізіндегі RFID бақылау жүйесі.', ru: 'Система отслеживания RFID на базе IoT, интегрированная с текущей инфраструктурой LIMS.', en: 'IoT-based RFID tracking system integrated seamlessly with current LIMS infrastructure.' },
            status: 'under_review',
        },
        {
            id: 2,
            title: { kz: 'AI-Assistant: Жылдам құқықтық іздеу', ru: 'AI-Assistant: Быстрый правовой поиск', en: 'AI-Assistant: Rapid Legal Search' },
            team: 'TechNeural',
            submitted: { kz: '1 апта бұрын', ru: '1 неделю назад', en: '1 week ago' },
            problem: { kz: 'Зерттеушілер күнделікті 4+ сағат ескірген ветеринарлық ережелерді тексеруге жұмсайды.', ru: 'Исследователи тратят 4+ часа ежедневно на сверку устаревших ветеринарных правил.', en: 'Researchers spend 4+ hours daily cross-referencing outdated veterinary regulations.' },
            solution: { kz: 'Қазақстанның құқықтық дерекқорында оқытылған нейросеть арқылы лезде сұрауларға жауап алу.', ru: 'Нейронная сеть, обученная на правовой базе Казахстана для мгновенного ответа на запросы.', en: 'Neural network trained on Kazakhstan\'s legal database for instant query resolution.' },
            status: 'approved',
        },
        {
            id: 3,
            title: { kz: 'Digital Certificate: Blockchain растау', ru: 'Digital Certificate: Верификация через Blockchain', en: 'Digital Certificate: Blockchain Verify' },
            team: 'BlockSecure',
            submitted: { kz: 'кеше', ru: 'вчера', en: 'yesterday' },
            problem: { kz: 'Жалған сынақ нәтижелері экспорт сертификаттары мен қоғам сенімін қаупі.', ru: 'Риск мошеннических результатов тестов, влияющих на экспортные сертификаты и общественное доверие.', en: 'Risk of fraudulent test results affecting export certifications and public trust.' },
            solution: { kz: 'QR код арқылы тексеруге болатын барлық берілген сертификаттар үшін өзгертілмейтін blockchain тізілімі.', ru: 'Неизменяемый реестр blockchain для всех выданных сертификатов, проверяемый через QR-код.', en: 'Immutable blockchain ledger for all issued certificates, verifiable via QR code.' },
            status: 'pending',
        },
    ];

    const getStatusBadge = (status) => {
        const statusMap = {
            under_review: { label: statusLabels.under_review[language], class: 'status-review' },
            approved: { label: statusLabels.approved[language], class: 'status-approved' },
            pending: { label: statusLabels.pending[language], class: 'status-pending' },
        };
        return statusMap[status] || statusMap.pending;
    };

    const handleAction = (action) => {
        const msg = {
            review: { kz: 'Ұсыныс қаралуға жіберілді', ru: 'Предложение отправлено на рассмотрение', en: 'Proposal sent for review' },
            save: { kz: 'Ұсыныс сақталды', ru: 'Предложение сохранено', en: 'Proposal saved' }
        };
        showToast(msg[action][language], 'success');
    };

    return (
        <div className="proposals-page">
            {/* Header */}
            <header className="proposals-header">
                <div className="proposals-nav">
                    <div className="proposals-logo">
                        <span className="material-icons">biotech</span>
                        <span>RVL Kazakhstan</span>
                    </div>
                    <nav className="proposals-menu">
                        <a href="#" className="active">{texts.dashboard[language]}</a>
                        <a href="#">{texts.proposals[language]}</a>
                        <a href="#">{texts.teams[language]}</a>
                        <a href="#">{texts.analytics[language]}</a>
                    </nav>
                </div>
            </header>

            {/* Main Content */}
            <main className="proposals-main">
                <div className="container">
                    <div className="proposals-intro">
                        <h1>{texts.title[language]}</h1>
                        <p>{texts.subtitle[language]}</p>
                    </div>

                    {/* Stats */}
                    <div className="proposals-stats">
                        {stats.map((stat, index) => (
                            <div key={index} className="proposal-stat">
                                <span className="material-icons">{stat.icon}</span>
                                <div>
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label[language]}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Proposals Grid */}
                    <div className="proposals-grid">
                        {proposals.map(proposal => {
                            const status = getStatusBadge(proposal.status);
                            return (
                                <div key={proposal.id} className="proposal-card">
                                    <div className="proposal-header">
                                        <h3>{proposal.title[language]}</h3>
                                        <span className={`proposal-status ${status.class}`}>
                                            {status.label}
                                        </span>
                                    </div>
                                    <div className="proposal-meta">
                                        <span className="team">{proposal.team}</span>
                                        <span className="date">{texts.submitted[language]} {proposal.submitted[language]}</span>
                                    </div>

                                    <div className="proposal-section">
                                        <h4>
                                            <span className="material-icons">error_outline</span>
                                            {texts.theProblem[language]}
                                        </h4>
                                        <p>{proposal.problem[language]}</p>
                                    </div>

                                    <div className="proposal-section">
                                        <h4>
                                            <span className="material-icons">lightbulb</span>
                                            {texts.theSolution[language]}
                                        </h4>
                                        <p>{proposal.solution[language]}</p>
                                    </div>

                                    <div className="proposal-actions">
                                        <button className="btn btn-primary" onClick={() => handleAction('review')}>
                                            <span className="material-icons">rate_review</span>
                                            {texts.review[language]}
                                        </button>
                                        <button className="btn btn-outline" onClick={() => handleAction('save')}>
                                            <span className="material-icons">bookmark_border</span>
                                            {texts.save[language]}
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Notice */}
                    <div className="review-notice">
                        <span className="material-icons">schedule</span>
                        <div>
                            <strong>{texts.reviewPeriodActive[language]}</strong>
                            <p>{texts.reviewDeadline[language]}</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Proposals;
