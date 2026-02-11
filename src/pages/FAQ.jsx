import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link } from 'react-router-dom';
import './FAQ.css';

function FAQ() {
    const { language } = useApp();
    const [openItems, setOpenItems] = useState([0]);
    const [activeCategory, setActiveCategory] = useState('general');

    const texts = {
        title: { kz: 'Жиі қойылатын сұрақтар', ru: 'Часто задаваемые вопросы', en: 'Frequently Asked Questions' },
        subtitle: { kz: 'Сұрақтарыңызға жауап табыңыз', ru: 'Найдите ответы на ваши вопросы', en: 'Find answers to your questions' },
        searchPlaceholder: { kz: 'Сұрақты іздеу...', ru: 'Поиск вопроса...', en: 'Search questions...' },
        noResults: { kz: 'Сұрақтар табылмады', ru: 'Вопросы не найдены', en: 'No questions found' },
        contactUs: { kz: 'Жауап таппадыңыз ба?', ru: 'Не нашли ответ?', en: "Didn't find an answer?" },
        contactLink: { kz: 'Бізге хабарласыңыз', ru: 'Свяжитесь с нами', en: 'Contact us' },

        // Categories
        general: { kz: 'Жалпы', ru: 'Общие', en: 'General' },
        services: { kz: 'Қызметтер', ru: 'Услуги', en: 'Services' },
        testing: { kz: 'Зерттеу', ru: 'Исследования', en: 'Testing' },
        payment: { kz: 'Төлем', ru: 'Оплата', en: 'Payment' },
        delivery: { kz: 'Жеткізу', ru: 'Доставка', en: 'Delivery' },
    };

    const faqData = {
        general: [
            {
                question: {
                    kz: 'Республикалық ветеринариялық зертхана қандай қызметтер көрсетеді?',
                    ru: 'Какие услуги предоставляет Республиканская ветеринарная лаборатория?',
                    en: 'What services does the Republican Veterinary Laboratory provide?'
                },
                answer: {
                    kz: 'Біз диагностикалық зерттеулер, серологиялық тестілеу, бактериологиялық талдау, ПТР диагностика, сертификация және ветеринариялық консультация қызметтерін ұсынамыз.',
                    ru: 'Мы предоставляем диагностические исследования, серологическое тестирование, бактериологический анализ, ПЦР диагностику, сертификацию и ветеринарные консультации.',
                    en: 'We provide diagnostic research, serological testing, bacteriological analysis, PCR diagnostics, certification and veterinary consultations.'
                }
            },
            {
                question: {
                    kz: 'Зертхананың жұмыс уақыты қандай?',
                    ru: 'Какой режим работы лаборатории?',
                    en: 'What are the laboratory working hours?'
                },
                answer: {
                    kz: 'Зертхана дүйсенбіден жұмаға дейін сағат 9:00-ден 18:00-ге дейін жұмыс істейді. Сенбі күні 9:00-ден 14:00-ге дейін. Жексенбі - демалыс.',
                    ru: 'Лаборатория работает с понедельника по пятницу с 9:00 до 18:00. В субботу с 9:00 до 14:00. Воскресенье - выходной.',
                    en: 'The laboratory operates Monday to Friday from 9:00 AM to 6:00 PM. Saturday from 9:00 AM to 2:00 PM. Sunday is a day off.'
                }
            },
            {
                question: {
                    kz: 'Филиалдар қай қалаларда орналасқан?',
                    ru: 'В каких городах расположены филиалы?',
                    en: 'In which cities are the branches located?'
                },
                answer: {
                    kz: 'Біздің филиалдар Қазақстанның барлық облыстарында орналасқан: Алматы, Астана, Шымкент, Қарағанды, Ақтөбе, Атырау және басқа қалаларда.',
                    ru: 'Наши филиалы расположены во всех областях Казахстана: Алматы, Астана, Шымкент, Караганда, Актобе, Атырау и других городах.',
                    en: 'Our branches are located in all regions of Kazakhstan: Almaty, Astana, Shymkent, Karaganda, Aktobe, Atyrau and other cities.'
                }
            },
        ],
        services: [
            {
                question: {
                    kz: 'Қандай жануарларды зерттеуге қабылдайсыздар?',
                    ru: 'Каких животных вы принимаете на исследование?',
                    en: 'What animals do you accept for testing?'
                },
                answer: {
                    kz: 'Біз барлық түрдегі ауылшаруашылық малдарын, үй жануарларын және жабайы хайуандарды зерттеуге қабылдаймыз: ірі қара мал, қой, ешкі, жылқы, шошқа, құс, ит, мысық және басқалар.',
                    ru: 'Мы принимаем на исследование все виды сельскохозяйственных животных, домашних питомцев и диких животных: крупный рогатый скот, овцы, козы, лошади, свиньи, птица, собаки, кошки и др.',
                    en: 'We accept all types of farm animals, pets and wild animals for testing: cattle, sheep, goats, horses, pigs, poultry, dogs, cats and others.'
                }
            },
            {
                question: {
                    kz: 'Онлайн өтінім қалай беруге болады?',
                    ru: 'Как подать онлайн заявку?',
                    en: 'How to submit an online application?'
                },
                answer: {
                    kz: 'Сайтта тіркеліп, жеке кабинетке кіріп, "Өтінім беру" бөліміне өтіңіз. Қажетті қызметті таңдап, форманы толтырыңыз.',
                    ru: 'Зарегистрируйтесь на сайте, войдите в личный кабинет и перейдите в раздел "Подать заявку". Выберите нужную услугу и заполните форму.',
                    en: 'Register on the website, log into your personal account and go to the "Submit Application" section. Select the required service and fill out the form.'
                }
            },
        ],
        testing: [
            {
                question: {
                    kz: 'Зерттеу нәтижелері қанша уақытта дайын болады?',
                    ru: 'Через сколько времени будут готовы результаты исследований?',
                    en: 'How long does it take to get test results?'
                },
                answer: {
                    kz: 'Стандартты зерттеу - 3-5 жұмыс күні, жедел зерттеу - 1-2 жұмыс күні, экспресс зерттеу - 24 сағат ішінде. Нақты мерзім зерттеу түріне байланысты.',
                    ru: 'Стандартное исследование - 3-5 рабочих дней, срочное исследование - 1-2 рабочих дня, экспресс исследование - в течение 24 часов. Точные сроки зависят от типа исследования.',
                    en: 'Standard testing - 3-5 business days, urgent testing - 1-2 business days, express testing - within 24 hours. Exact timing depends on the type of test.'
                }
            },
            {
                question: {
                    kz: 'Үлгілерді қалай дұрыс алу керек?',
                    ru: 'Как правильно отобрать образцы?',
                    en: 'How to properly collect samples?'
                },
                answer: {
                    kz: 'Үлгілерді арнайы контейнерлерге салып, суықта сақтау керек. Егер өзіңіз ала алмасаңыз, біздің курьерлік қызметті пайдалануға болады.',
                    ru: 'Образцы необходимо поместить в специальные контейнеры и хранить в холоде. Если вы не можете произвести забор самостоятельно, можно воспользоваться нашей курьерской службой.',
                    en: 'Samples must be placed in special containers and stored cold. If you cannot collect samples yourself, you can use our courier service.'
                }
            },
        ],
        payment: [
            {
                question: {
                    kz: 'Қызметтерге қалай төлеуге болады?',
                    ru: 'Как оплатить услуги?',
                    en: 'How to pay for services?'
                },
                answer: {
                    kz: 'Төлем қолма-қол, банк картасымен, банк аударымымен немесе онлайн төлем жүйелері арқылы жасалуы мүмкін.',
                    ru: 'Оплата может быть произведена наличными, банковской картой, банковским переводом или через системы онлайн-оплаты.',
                    en: 'Payment can be made in cash, by bank card, bank transfer or through online payment systems.'
                }
            },
            {
                question: {
                    kz: 'Қызметтердің бағасы қандай?',
                    ru: 'Какова стоимость услуг?',
                    en: 'What is the cost of services?'
                },
                answer: {
                    kz: 'Бағалар зерттеу түріне және жеделдігіне байланысты. Толық прайс-листі сайттың "Қызметтер" бөлімінде немесе телефон арқылы білуге болады.',
                    ru: 'Цены зависят от типа исследования и срочности. Полный прайс-лист доступен в разделе "Услуги" на сайте или по телефону.',
                    en: 'Prices depend on the type of test and urgency. The full price list is available in the "Services" section of the website or by phone.'
                }
            },
        ],
        delivery: [
            {
                question: {
                    kz: 'Курьерлік қызмет бар ма?',
                    ru: 'Есть ли курьерская служба?',
                    en: 'Is there a courier service?'
                },
                answer: {
                    kz: 'Иә, біз үлгілерді алу және нәтижелерді жеткізу үшін курьерлік қызмет ұсынамыз. Бағасы қашықтыққа байланысты.',
                    ru: 'Да, мы предоставляем курьерскую службу для забора образцов и доставки результатов. Стоимость зависит от расстояния.',
                    en: 'Yes, we provide courier service for sample collection and delivery of results. The cost depends on the distance.'
                }
            },
            {
                question: {
                    kz: 'Нәтижелерді қалай алуға болады?',
                    ru: 'Как получить результаты?',
                    en: 'How to get the results?'
                },
                answer: {
                    kz: 'Нәтижелерді жеке кабинетте онлайн көруге, электрондық поштаға алуға немесе зертханадан қағаз түрінде алуға болады.',
                    ru: 'Результаты можно посмотреть онлайн в личном кабинете, получить на электронную почту или забрать в лаборатории в бумажном виде.',
                    en: 'Results can be viewed online in your personal account, received by email or picked up in paper form at the laboratory.'
                }
            },
        ],
    };

    const [searchQuery, setSearchQuery] = useState('');

    const toggleItem = (index) => {
        if (openItems.includes(index)) {
            setOpenItems(openItems.filter(i => i !== index));
        } else {
            setOpenItems([...openItems, index]);
        }
    };

    const categories = ['general', 'services', 'testing', 'payment', 'delivery'];

    const filteredFaqs = searchQuery
        ? Object.values(faqData).flat().filter(faq =>
            faq.question[language].toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.answer[language].toLowerCase().includes(searchQuery.toLowerCase())
        )
        : faqData[activeCategory];

    return (
        <div className="faq-page">
            {/* Hero */}
            <section className="faq-hero">
                <div className="container">
                    <h1>{texts.title[language]}</h1>
                    <p>{texts.subtitle[language]}</p>
                    <div className="faq-search">
                        <span className="material-icons">search</span>
                        <input
                            type="text"
                            placeholder={texts.searchPlaceholder[language]}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="faq-content">
                <div className="container">
                    <div className="faq-layout">
                        {/* Categories */}
                        {!searchQuery && (
                            <aside className="faq-sidebar">
                                <nav className="faq-categories">
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            className={`category-btn ${activeCategory === cat ? 'active' : ''}`}
                                            onClick={() => {
                                                setActiveCategory(cat);
                                                setOpenItems([0]);
                                            }}
                                        >
                                            <span className="material-icons">
                                                {cat === 'general' ? 'help_outline' :
                                                    cat === 'services' ? 'science' :
                                                        cat === 'testing' ? 'biotech' :
                                                            cat === 'payment' ? 'payments' : 'local_shipping'}
                                            </span>
                                            {texts[cat][language]}
                                        </button>
                                    ))}
                                </nav>
                            </aside>
                        )}

                        {/* FAQ List */}
                        <div className="faq-list">
                            {filteredFaqs.length === 0 ? (
                                <div className="no-results">
                                    <span className="material-icons">search_off</span>
                                    <p>{texts.noResults[language]}</p>
                                </div>
                            ) : (
                                filteredFaqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className={`faq-item ${openItems.includes(index) ? 'open' : ''}`}
                                    >
                                        <button className="faq-question" onClick={() => toggleItem(index)}>
                                            <span>{faq.question[language]}</span>
                                            <span className="material-icons">
                                                {openItems.includes(index) ? 'remove' : 'add'}
                                            </span>
                                        </button>
                                        <div className="faq-answer">
                                            <p>{faq.answer[language]}</p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Contact CTA */}
                    <div className="faq-contact">
                        <span>{texts.contactUs[language]}</span>
                        <Link to="/contacts" className="contact-link">
                            {texts.contactLink[language]}
                            <span className="material-icons">arrow_forward</span>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default FAQ;
