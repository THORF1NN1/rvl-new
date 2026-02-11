export const services = [
    {
        id: 1,
        category: 'diagnostics',
        icon: 'coronavirus',
        title: {
            kz: 'Құс тұмауын скрининг',
            ru: 'Скрининг на птичий грипп',
            en: 'Avian Influenza Screening',
        },
        description: {
            kz: 'ПТР және серологиялық тестілеу арқылы кешенді скрининг',
            ru: 'Комплексный скрининг методами ПЦР и серологического тестирования',
            en: 'Comprehensive screening using PCR and serological testing methods',
        },
        duration: '3-5 days',
        price: '25,000 ₸',
        details: {
            kz: 'Құс тұмауы вирустарын анықтауға арналған толық диагностикалық панель. Сынама жинау, тасымалдау және нәтижелерді талдау қамтылады.',
            ru: 'Полная диагностическая панель для выявления вирусов птичьего гриппа. Включает сбор образцов, транспортировку и анализ результатов.',
            en: 'Complete diagnostic panel for detection of avian influenza viruses. Includes sample collection, transportation, and results analysis.',
        },
    },
    {
        id: 2,
        category: 'diagnostics',
        icon: 'science',
        title: {
            kz: 'Бруцеллез тестілеу',
            ru: 'Тестирование на бруцеллёз',
            en: 'Brucellosis Testing',
        },
        description: {
            kz: 'Бактериологиялық және серологиялық талдау',
            ru: 'Бактериологический и серологический анализ',
            en: 'Bacteriological and serological analysis',
        },
        duration: '5-7 days',
        price: '18,000 ₸',
        details: {
            kz: 'Бруцеллез инфекциясын анықтауға арналған стандартталған әдістер. ISO 17025 сәйкес аккредиттелген.',
            ru: 'Стандартизированные методы выявления бруцеллёзной инфекции. Аккредитовано по ISO 17025.',
            en: 'Standardized methods for brucellosis infection detection. Accredited according to ISO 17025.',
        },
    },
    {
        id: 3,
        category: 'testing',
        icon: 'water_drop',
        title: {
            kz: 'Сүт сапасын талдау',
            ru: 'Анализ качества молока',
            en: 'Milk Quality Analysis',
        },
        description: {
            kz: 'Толық химиялық және микробиологиялық талдау',
            ru: 'Полный химический и микробиологический анализ',
            en: 'Complete chemical and microbiological analysis',
        },
        duration: '2-3 days',
        price: '12,000 ₸',
        details: {
            kz: 'Сүт өнімдерінің құрамы мен қауіпсіздігін талдау. Антибиотиктер, соматикалық жасушалар, май, ақуыз анықталады.',
            ru: 'Анализ состава и безопасности молочной продукции. Определяются антибиотики, соматические клетки, жир, белок.',
            en: 'Analysis of dairy product composition and safety. Antibiotics, somatic cells, fat, protein are detected.',
        },
    },
    {
        id: 4,
        category: 'testing',
        icon: 'biotech',
        title: {
            kz: 'Ауыр металдарды анықтау',
            ru: 'Определение тяжёлых металлов',
            en: 'Heavy Metals Detection',
        },
        description: {
            kz: 'Корм мен топырақтағы улы металдарды талдау',
            ru: 'Анализ токсичных металлов в кормах и почве',
            en: 'Analysis of toxic metals in feed and soil',
        },
        duration: '5-7 days',
        price: '35,000 ₸',
        details: {
            kz: 'Қорғасын, кадмий, мышьяк, сынап және басқа ауыр металдарды ICP-MS әдісімен анықтау.',
            ru: 'Определение свинца, кадмия, мышьяка, ртути и других тяжёлых металлов методом ICP-MS.',
            en: 'Detection of lead, cadmium, arsenic, mercury and other heavy metals using ICP-MS method.',
        },
    },
    {
        id: 5,
        category: 'diagnostics',
        icon: 'pets',
        title: {
            kz: 'Құтыру ауруын диагностикалау',
            ru: 'Диагностика бешенства',
            en: 'Rabies Diagnostics',
        },
        description: {
            kz: 'FAT және ПТР әдістерімен вирусты анықтау',
            ru: 'Выявление вируса методами FAT и ПЦР',
            en: 'Virus detection using FAT and PCR methods',
        },
        duration: '1-2 days',
        price: '15,000 ₸',
        details: {
            kz: 'Құтыру вирусын жедел анықтау. Ми тіні үлгілерін талдау. WOAH стандарттарына сай.',
            ru: 'Экспресс-диагностика вируса бешенства. Анализ образцов мозговой ткани. Соответствует стандартам WOAH.',
            en: 'Rapid rabies virus detection. Brain tissue sample analysis. Compliant with WOAH standards.',
        },
    },
    {
        id: 6,
        category: 'certification',
        icon: 'verified',
        title: {
            kz: 'Экспорттық сертификаттау',
            ru: 'Экспортная сертификация',
            en: 'Export Certification',
        },
        description: {
            kz: 'Мал өнімдерін экспорттауға арналған құжаттар',
            ru: 'Документация для экспорта животноводческой продукции',
            en: 'Documentation for livestock product exports',
        },
        duration: '7-10 days',
        price: '50,000 ₸',
        details: {
            kz: 'Халықаралық талаптарға сай экспорттық ветеринарлық сертификаттар. ЕАЭО елдері мен үшінші елдерге.',
            ru: 'Экспортные ветеринарные сертификаты согласно международным требованиям. Для стран ЕАЭС и третьих стран.',
            en: 'Export veterinary certificates according to international requirements. For EAEU countries and third countries.',
        },
    },
    {
        id: 7,
        category: 'testing',
        icon: 'medication',
        title: {
            kz: 'Антибиотиктер қалдығын анықтау',
            ru: 'Определение остатков антибиотиков',
            en: 'Antibiotic Residue Detection',
        },
        description: {
            kz: 'Ет пен сүт өнімдеріндегі дәрі-дәрмек қалдықтарын талдау',
            ru: 'Анализ остатков лекарств в мясе и молочных продуктах',
            en: 'Analysis of drug residues in meat and dairy products',
        },
        duration: '3-5 days',
        price: '28,000 ₸',
        details: {
            kz: 'HPLC-MS/MS әдісімен антибиотиктер, гормондар және басқа препараттар қалдықтарын анықтау.',
            ru: 'Определение остатков антибиотиков, гормонов и других препаратов методом HPLC-MS/MS.',
            en: 'Detection of antibiotic, hormone and other drug residues using HPLC-MS/MS method.',
        },
    },
    {
        id: 8,
        category: 'certification',
        icon: 'fact_check',
        title: {
            kz: 'Зертхана аккредиттеу',
            ru: 'Аккредитация лаборатории',
            en: 'Laboratory Accreditation',
        },
        description: {
            kz: 'ISO 17025 бойынша консультациялық қызметтер',
            ru: 'Консультационные услуги по ISO 17025',
            en: 'Consulting services for ISO 17025',
        },
        duration: '30-90 days',
        price: 'Келісім бойынша',
        details: {
            kz: 'Зертханаларды ISO/IEC 17025 стандартына сай аккредиттеуге дайындау. Құжаттамаларды әзірлеу, аудит.',
            ru: 'Подготовка лабораторий к аккредитации по стандарту ISO/IEC 17025. Разработка документации, аудит.',
            en: 'Preparation of laboratories for ISO/IEC 17025 accreditation. Documentation development, audit.',
        },
    },
];

export const serviceCategories = [
    { id: 'all', label: { kz: 'Барлығы', ru: 'Все', en: 'All' } },
    { id: 'diagnostics', label: { kz: 'Диагностика', ru: 'Диагностика', en: 'Diagnostics' } },
    { id: 'testing', label: { kz: 'Сынау', ru: 'Тестирование', en: 'Testing' } },
    { id: 'certification', label: { kz: 'Сертификаттау', ru: 'Сертификация', en: 'Certification' } },
];

export const resources = [
    { title: { kz: 'Қызметтер прайс-листі', ru: 'Прайс-лист услуг', en: 'Services Price List' }, format: 'PDF', size: '2.4 MB' },
    { title: { kz: 'Үлгілер талаптары', ru: 'Требования к образцам', en: 'Sample Requirements' }, format: 'PDF', size: '1.1 MB' },
    { title: { kz: 'Өтініш формасы', ru: 'Форма заявки', en: 'Application Form' }, format: 'DOCX', size: '0.5 MB' },
];
