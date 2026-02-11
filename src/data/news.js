export const news = [
    {
        id: 1,
        date: '2026-02-05',
        category: { kz: 'Хабарландыру', ru: 'Объявление', en: 'Announcement' },
        title: {
            kz: 'Ветеринария ғылымын дамыту: Жаңа вирусология бөлімі ашылды',
            ru: 'Развитие ветеринарной науки: Открыто новое отделение вирусологии',
            en: 'Advancing Veterinary Science: New Virology Unit Opens',
        },
        excerpt: {
            kz: 'Республикалық ветеринарлық зертхана Астанада заманауи вирусология зерттеу бөлімін ашқанын мақтанышпен хабарлайды.',
            ru: 'Республиканская ветеринарная лаборатория с гордостью сообщает об открытии современного отделения вирусологических исследований в Астане.',
            en: 'The Republican Veterinary Laboratory proudly announces the opening of a state-of-the-art virology research unit in Astana.',
        },
        featured: true,
    },
    {
        id: 2,
        date: '2026-02-01',
        category: { kz: 'Есеп', ru: 'Отчёт', en: 'Report' },
        title: {
            kz: 'Q3 Есеп: Мал вакцинациясының тиімділігін талдау',
            ru: 'Отчёт Q3: Анализ эффективности вакцинации скота',
            en: 'Q3 Report: Analysis of livestock vaccination efficacy',
        },
        excerpt: {
            kz: 'Үшінші тоқсандағы вакцинация бағдарламаларының нәтижелері.',
            ru: 'Результаты программ вакцинации за третий квартал.',
            en: 'Results of vaccination programs for the third quarter.',
        },
        featured: false,
    },
    {
        id: 3,
        date: '2026-01-28',
        category: { kz: 'Іс-шара', ru: 'Событие', en: 'Event' },
        title: {
            kz: 'Министрлік делегациясы орталық вирусология бөлімін аралады',
            ru: 'Делегация министерства посетила центральное отделение вирусологии',
            en: 'Ministry delegates visit central virology unit',
        },
        excerpt: {
            kz: 'Ауыл шаруашылығы министрлігінің өкілдері зертхананың жаңа құрылғыларымен танысты.',
            ru: 'Представители Министерства сельского хозяйства ознакомились с новым оборудованием лаборатории.',
            en: 'Ministry of Agriculture representatives familiarized themselves with the new laboratory equipment.',
        },
        featured: false,
    },
    {
        id: 4,
        date: '2026-01-25',
        category: { kz: 'Хабарлама', ru: 'Уведомление', en: 'Notice' },
        title: {
            kz: 'Жоспарлы техникалық жұмыс: Клиенттер порталы уақытша қолжетімсіз',
            ru: 'Плановые работы: Временная недоступность клиентского портала',
            en: 'Scheduled Maintenance: Client Portal Downtime',
        },
        excerpt: {
            kz: 'Ақпараттық жүйелерді жаңарту мақсатында порталда техникалық жұмыстар жүргізіледі.',
            ru: 'В связи с обновлением информационных систем на портале проводятся технические работы.',
            en: 'Technical maintenance is being performed on the portal due to information system updates.',
        },
        featured: false,
    },
    {
        id: 5,
        date: '2026-01-20',
        category: { kz: 'Зерттеу', ru: 'Исследование', en: 'Research' },
        title: {
            kz: 'Бруцеллезді анықтау әдістерінде жаңалық',
            ru: 'Прорыв в методах обнаружения бруцеллёза',
            en: 'Breakthrough in Brucellosis detection methods',
        },
        excerpt: {
            kz: 'Біздің ғалымдар бруцеллезді анықтаудың жаңа жоғары сезімтал әдісін әзірледі.',
            ru: 'Наши учёные разработали новый высокочувствительный метод обнаружения бруцеллёза.',
            en: 'Our scientists have developed a new highly sensitive method for brucellosis detection.',
        },
        featured: false,
    },
    {
        id: 6,
        date: '2026-01-15',
        category: { kz: 'Іс-шара', ru: 'Событие', en: 'Event' },
        title: {
            kz: 'Жыл сайынғы ветеринарлық конференция 2024 қорытындысы',
            ru: 'Итоги ежегодной ветеринарной конференции 2024',
            en: 'Annual Veterinary Conference 2024 Recap',
        },
        excerpt: {
            kz: 'Конференцияда 200-ден астам маман қатысып, 50-ден астам баяндама тыңдалды.',
            ru: 'В конференции приняли участие более 200 специалистов, было заслушано более 50 докладов.',
            en: 'More than 200 specialists participated in the conference, over 50 reports were presented.',
        },
        featured: false,
    },
];

export const topics = [
    { id: 'all', label: { kz: 'Барлығы', ru: 'Все', en: 'All' } },
    { id: 'announcements', label: { kz: 'Хабарландырулар', ru: 'Объявления', en: 'Announcements' } },
    { id: 'reports', label: { kz: 'Есептер', ru: 'Отчёты', en: 'Reports' } },
    { id: 'research', label: { kz: 'Зерттеулер', ru: 'Исследования', en: 'Research' } },
    { id: 'events', label: { kz: 'Іс-шаралар', ru: 'События', en: 'Events' } },
    { id: 'updates', label: { kz: 'Жаңартулар', ru: 'Обновления', en: 'Updates' } },
];
