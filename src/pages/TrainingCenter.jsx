import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { applicationsAPI } from '../api';
import './TrainingCenter.css';

function TrainingCenter() {
    const { language, user, showToast } = useApp();
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const texts = {
        breadcrumb: { kz: 'Басты бет / Оқу орталығы', ru: 'Главная / Учебный центр', en: 'Home / Training Center' },
        title: { kz: 'Білім арқылы ветеринарлық озықтықты дамыту', ru: 'Развитие ветеринарного мастерства через образование', en: 'Advancing Veterinary Excellence through Education' },
        subtitle: { kz: 'Қазақстан бойынша зертхана мамандарын даярлау және кәсіби дамыту бойынша мемлекеттік сертификаты бар курстар.', ru: 'Государственные сертифицированные курсы подготовки и повышения квалификации специалистов лабораторий Казахстана.', en: 'State-certified training and professional development for laboratory specialists across Kazakhstan.' },
        upcomingEvent: { kz: 'Алдағы іс-шара', ru: 'Предстоящее событие', en: 'Upcoming Event' },
        calendar: { kz: 'Іс-шаралар күнтізбесі', ru: 'Календарь мероприятий', en: 'Event Calendar' },
        resources: { kz: 'Ресурстар', ru: 'Ресурсы', en: 'Resources' },
        needHelp: { kz: 'Көмек керек пе?', ru: 'Нужна помощь?', en: 'Need Help?' },
        helpText: { kz: 'Сертификаттау немесе арнайы оқыту туралы сұрақтар бойынша әдістемелік бөлімге хабарласыңыз.', ru: 'Свяжитесь с методическим отделом по вопросам сертификации или индивидуального обучения.', en: 'Contact the methodological department for questions about certification or custom training.' },
        featuredCourses: { kz: 'Таңдаулы курстар', ru: 'Рекомендуемые курсы', en: 'Featured Courses' },
        viewAll: { kz: 'Барлығын көру', ru: 'Смотреть все', en: 'View all' },
        enroll: { kz: 'Тіркелу', ru: 'Записаться', en: 'Enroll Now' },
    };

    const handleEnroll = async (course) => {
        if (!user) {
            showToast(language === 'kz' ? 'Курсқа жазылу үшін жүйеге кіріңіз' : language === 'ru' ? 'Войдите в систему для записи на курс' : 'Please login to enroll', 'info');
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        try {
            await applicationsAPI.create({
                client: user.name,
                service: `Training: ${course.title[language]}`,
                amount: '0 ₸', // Free or to be determined
                date: new Date(),
                status: 'pending',
                notes: `Enrolling in course: ${course.title.en}`
            });
            showToast(language === 'kz' ? 'Сіз курсқа сәтті жазылдыңыз!' : language === 'ru' ? 'Вы успешно записались на курс!' : 'Successfully enrolled in the course!', 'success');
        } catch (error) {
            console.error('Failed to enroll:', error);
            showToast(language === 'kz' ? 'Жазылу мүмкін болмады' : language === 'ru' ? 'Не удалось записаться' : 'Failed to enroll', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const stats = [
        { value: '120+', label: { kz: 'Сертификатталған мамандар', ru: 'Сертифицированных специалистов', en: 'Certified Specialists' }, icon: 'school' },
        { value: '45', label: { kz: 'Жылдық курстар', ru: 'Ежегодных курсов', en: 'Annual Courses' }, icon: 'library_books' },
        { value: '12', label: { kz: 'Серіктес зертханалар', ru: 'Партнерских лабораторий', en: 'Partner Labs' }, icon: 'handshake' },
    ];

    const courses = [
        {
            title: { kz: 'Ветеринариядағы ELISA диагностикасының заманауи әдістері', ru: 'Современные методы ELISA диагностики в ветеринарии', en: 'Modern Methods of ELISA Diagnostics in Vet Medicine' },
            description: { kz: 'Иммуноферменттік талдау техникасы мен протоколдары бойынша кешенді оқыту.', ru: 'Комплексное обучение методам и протоколам иммуноферментного анализа.', en: 'Comprehensive training on Enzyme-Linked Immunosorbent Assay techniques and protocols.' },
            instructor: { kz: 'Др. А. Иванов', ru: 'Др. А. Иванов', en: 'Dr. A. Ivanov' },
            credentials: { kz: 'PhD, Аға вирусолог', ru: 'PhD, Старший вирусолог', en: 'PhD, Senior Virologist' },
            duration: { kz: '5 күн', ru: '5 дней', en: '5 days' },
            level: { kz: 'Жоғары', ru: 'Продвинутый', en: 'Advanced' },
        },
        {
            title: { kz: 'Ветеринарлық зертханалардағы 1-3 биоқауіпсіздік деңгейлері', ru: 'Уровни биобезопасности 1-3 в ветеринарных лабораториях', en: 'Biosafety Levels 1-3 in Veterinary Laboratories' },
            description: { kz: 'Патогендерді өңдеу және қалдықтарды басқару бойынша маңызды қауіпсіздік протоколдары.', ru: 'Критические протоколы безопасности для работы с патогенами и управления отходами.', en: 'Critical safety protocols for handling pathogens and waste management in a lab environment.' },
            instructor: { kz: 'К. Нұрмақова', ru: 'К. Нурмакова', en: 'K. Nurmakova' },
            credentials: { kz: 'MSc, Қауіпсіздік жөніндегі маман', ru: 'MSc, Специалист по безопасности', en: 'MSc, Safety Officer' },
            duration: { kz: '3 күн', ru: '3 дня', en: '3 days' },
            level: { kz: 'Орта', ru: 'Средний', en: 'Intermediate' },
        },
        {
            title: { kz: 'ПТР диагностикасы: теория және практика', ru: 'ПЦР диагностика: теория и практика', en: 'PCR Diagnostics: Theory and Practice' },
            description: { kz: 'Ветеринарлық диагностикаға арналған полимераза тізбекті реакция техникасы бойынша практикалық оқыту.', ru: 'Практическое обучение методам полимеразной цепной реакции для ветеринарной диагностики.', en: 'Hands-on training in polymerase chain reaction techniques for veterinary diagnostics.' },
            instructor: { kz: 'Др. М. Сүлейменов', ru: 'Др. М. Сулейманов', en: 'Dr. M. Suleimanov' },
            credentials: { kz: 'PhD, Молекулалық биология', ru: 'PhD, Молекулярная биология', en: 'PhD, Molecular Biology' },
            duration: { kz: '4 күн', ru: '4 дня', en: '4 days' },
            level: { kz: 'Орта', ru: 'Средний', en: 'Intermediate' },
        },
    ];

    const resources = [
        { title: { kz: '2024 Сертификаттау нұсқаулары', ru: 'Руководство по сертификации 2024', en: '2024 Certification Guidelines' }, size: 'PDF • 2.4 MB', url: '/resources/guidelines_2024.pdf' },
        { title: { kz: 'Зертхана қауіпсіздігі нұсқаулығы v3.0', ru: 'Руководство по безопасности лаборатории v3.0', en: 'Lab Safety Manual v3.0' }, size: 'DOCX • 1.1 MB', url: '/resources/safety_manual.docx' },
        { title: { kz: 'Курстар каталогі Q4 2023', ru: 'Каталог курсов Q4 2023', en: 'Course Catalog Q4 2023' }, size: 'PDF • 5.8 MB', url: '/resources/catalog_2023.pdf' },
    ];

    const events = [
        { date: { kz: '25 Қаз', ru: '25 Окт', en: 'Oct 25' }, title: { kz: 'Эпидемиология бойынша халықаралық симпозиум', ru: 'Международный симпозиум по эпидемиологии', en: 'International Symposium on Epidemiology' }, location: { kz: 'Алматы', ru: 'Алматы', en: 'Almaty' } },
        { date: { kz: '10 Қар', ru: '10 Ноя', en: 'Nov 10' }, title: { kz: 'Биоқауіпсіздік семинарлары', ru: 'Серия семинаров по биобезопасности', en: 'Biosafety Workshop Series' }, location: { kz: 'Астана', ru: 'Астана', en: 'Astana' } },
        { date: { kz: '5 Жел', ru: '5 Дек', en: 'Dec 5' }, title: { kz: 'Жыл сайынғы ветеринарлық конференция', ru: 'Ежегодная ветеринарная конференция', en: 'Annual Veterinary Conference' }, location: { kz: 'Онлайн', ru: 'Онлайн', en: 'Online' } },
    ];

    return (
        <div className="training-page">
            {/* Hero */}
            <section className="training-hero">
                <div className="container">
                    <div className="training-hero-content">
                        <span className="breadcrumb">{texts.breadcrumb[language]}</span>
                        <h1>{texts.title[language]}</h1>
                        <p>{texts.subtitle[language]}</p>
                        <div className="training-stats">
                            {stats.map((stat, index) => (
                                <div key={index} className="training-stat">
                                    <span className="material-icons">{stat.icon}</span>
                                    <div>
                                        <span className="stat-value">{stat.value}</span>
                                        <span className="stat-label">{stat.label[language]}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="training-hero-event">
                        <span className="event-badge">{texts.upcomingEvent[language]}</span>
                        <h3>{events[0].title[language]}</h3>
                        <p>
                            <span className="material-icons">event</span>
                            {events[0].date[language]} • {events[0].location[language]}
                        </p>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="section training-content">
                <div className="container">
                    <div className="training-layout">
                        {/* Sidebar */}
                        <aside className="training-sidebar">
                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">calendar_month</span>
                                    {texts.calendar[language]}
                                </h3>
                                <div className="events-list">
                                    {events.map((event, index) => (
                                        <div key={index} className="event-item">
                                            <div className="event-date">{event.date[language]}</div>
                                            <div className="event-info">
                                                <span className="event-title">{event.title[language]}</span>
                                                <span className="event-location">{event.location[language]}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-section">
                                <h3>
                                    <span className="material-icons">folder_open</span>
                                    {texts.resources[language]}
                                </h3>
                                <div className="resources-list">
                                    {resources.map((res, index) => (
                                        <a key={index} href={res.url} download className="resource-item">
                                            <span className="material-icons">picture_as_pdf</span>
                                            <div>
                                                <span className="resource-title">{res.title[language]}</span>
                                                <span className="resource-size">{res.size}</span>
                                            </div>
                                            <span className="material-icons">download</span>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="sidebar-section help-section">
                                <span className="material-icons">help_outline</span>
                                <h4>{texts.needHelp[language]}</h4>
                                <p>{texts.helpText[language]}</p>
                            </div>
                        </aside>

                        {/* Courses */}
                        <div className="training-main">
                            <div className="courses-header">
                                <h2>
                                    <span className="material-icons">school</span>
                                    {texts.featuredCourses[language]}
                                </h2>
                                <a href="#" className="section-link">
                                    {texts.viewAll[language]} <span className="material-icons">arrow_forward</span>
                                </a>
                            </div>

                            <div className="courses-grid">
                                {courses.map((course, index) => (
                                    <div key={index} className="course-card">
                                        <div className="course-badges">
                                            <span className="badge badge-primary">{course.level[language]}</span>
                                            <span className="badge">{course.duration[language]}</span>
                                        </div>
                                        <h3>{course.title[language]}</h3>
                                        <p>{course.description[language]}</p>
                                        <div className="course-instructor">
                                            <div className="instructor-avatar">
                                                <span className="material-icons">person</span>
                                            </div>
                                            <div>
                                                <span className="instructor-name">{course.instructor[language]}</span>
                                                <span className="instructor-credentials">{course.credentials[language]}</span>
                                            </div>
                                        </div>
                                        <button
                                            className="btn btn-primary btn-full"
                                            onClick={() => handleEnroll(course)}
                                            disabled={isSubmitting}
                                        >
                                            {texts.enroll[language]}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default TrainingCenter;
