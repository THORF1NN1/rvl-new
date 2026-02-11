require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Application = require('./models/Application');
const News = require('./models/News');
const Service = require('./models/Service');
const Branch = require('./models/Branch');
const Settings = require('./models/Settings');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/rvl';

async function seed() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        // Clear existing data
        await Promise.all([
            User.deleteMany({}),
            Application.deleteMany({}),
            News.deleteMany({}),
            Service.deleteMany({}),
            Branch.deleteMany({}),
            Settings.deleteMany({}),
        ]);
        console.log('🗑️  Cleared old data');

        // ===== USERS =====
        await User.create([
            { name: 'Admin User', email: 'admin@rvl.kz', password: 'admin123', role: 'admin', status: 'active' },
            { name: 'Arman S.', email: 'arman.s@rvl.kz', password: 'editor123', role: 'editor', status: 'active' },
            { name: 'Elena V.', email: 'elena.v@rvl.kz', password: 'support123', role: 'support', status: 'inactive' },
            { name: 'Kairat M.', email: 'kairat.m@rvl.kz', password: 'user123', role: 'user', status: 'active' },
        ]);
        console.log('👤 Users seeded');

        // ===== APPLICATIONS =====
        await Application.create([
            { client: 'ТОО "Агрофирма Казахстан"', service: 'Диагностика бруцеллеза', amount: '45,000 ₸', date: new Date('2026-02-09'), status: 'pending' },
            { client: 'ИП Ахметов К.', service: 'Вакцинация КРС', amount: '120,000 ₸', date: new Date('2026-02-09'), status: 'processing' },
            { client: 'АО "Мясокомбинат"', service: 'Сертификация продукции', amount: '85,000 ₸', date: new Date('2026-02-08'), status: 'approved' },
            { client: 'КХ "Жаңа Өмір"', service: 'Анализ молока', amount: '25,000 ₸', date: new Date('2026-02-08'), status: 'approved' },
            { client: 'ФХ "Степное"', service: 'Диагностика', amount: '35,000 ₸', date: new Date('2026-02-07'), status: 'rejected' },
            { client: 'ТОО "Молпром"', service: 'Контроль качества', amount: '55,000 ₸', date: new Date('2026-02-07'), status: 'approved' },
        ]);
        console.log('📋 Applications seeded');

        // ===== NEWS =====
        await News.create([
            {
                title: { kz: 'Ветеринария ғылымын дамыту: Жаңа вирусология бөлімі ашылды', ru: 'Развитие ветеринарной науки: Открыто новое отделение вирусологии', en: 'Advancing Veterinary Science: New Virology Unit Opens' },
                excerpt: { kz: 'Республикалық ветеринарлық зертхана Астанада заманауи вирусология зерттеу бөлімін ашқанын мақтанышпен хабарлайды.', ru: 'Республиканская ветеринарная лаборатория с гордостью сообщает об открытии современного отделения вирусологических исследований в Астане.', en: 'The Republican Veterinary Laboratory proudly announces the opening of a state-of-the-art virology research unit in Astana.' },
                category: { kz: 'Хабарландыру', ru: 'Объявление', en: 'Announcement' },
                date: new Date('2026-02-05'), featured: true,
                image: '/images/news-virology.png',
            },
            {
                title: { kz: 'Q3 Есеп: Мал вакцинациясының тиімділігін талдау', ru: 'Отчёт Q3: Анализ эффективности вакцинации скота', en: 'Q3 Report: Analysis of livestock vaccination efficacy' },
                excerpt: { kz: 'Үшінші тоқсандағы вакцинация бағдарламаларының нәтижелері.', ru: 'Результаты программ вакцинации за третий квартал.', en: 'Results of vaccination programs for the third quarter.' },
                category: { kz: 'Есеп', ru: 'Отчёт', en: 'Report' },
                date: new Date('2026-02-01'), featured: false,
                image: '/images/lab-research.png',
            },
            {
                title: { kz: 'Министрлік делегациясы орталық вирусология бөлімін аралады', ru: 'Делегация министерства посетила центральное отделение вирусологии', en: 'Ministry delegates visit central virology unit' },
                excerpt: { kz: 'Ауыл шаруашылығы министрлігінің өкілдері зертхананың жаңа құрылғыларымен танысты.', ru: 'Представители Министерства сельского хозяйства ознакомились с новым оборудованием лаборатории.', en: 'Ministry of Agriculture representatives familiarized themselves with the new laboratory equipment.' },
                category: { kz: 'Іс-шара', ru: 'Событие', en: 'Event' },
                date: new Date('2026-01-28'), featured: false,
                image: '/images/news-meeting.png',
            },
            {
                title: { kz: 'Жоспарлы техникалық жұмыс: Клиенттер порталы уақытша қолжетімсіз', ru: 'Плановые работы: Временная недоступность клиентского портала', en: 'Scheduled Maintenance: Client Portal Downtime' },
                excerpt: { kz: 'Ақпараттық жүйелерді жаңарту мақсатында порталда техникалық жұмыстар жүргізіледі.', ru: 'В связи с обновлением информационных систем на портале проводятся технические работы.', en: 'Technical maintenance is being performed on the portal due to information system updates.' },
                category: { kz: 'Хабарлама', ru: 'Уведомление', en: 'Notice' },
                date: new Date('2026-01-25'), featured: false,
                image: '/images/quality-control.png',
            },
            {
                title: { kz: 'Бруцеллезді анықтау әдістерінде жаңалық', ru: 'Прорыв в методах обнаружения бруцеллёза', en: 'Breakthrough in Brucellosis detection methods' },
                excerpt: { kz: 'Біздің ғалымдар бруцеллезді анықтаудың жаңа жоғары сезімтал әдісін әзірледі.', ru: 'Наши учёные разработали новый высокочувствительный метод обнаружения бруцеллёза.', en: 'Our scientists have developed a new highly sensitive method for brucellosis detection.' },
                category: { kz: 'Зерттеу', ru: 'Исследование', en: 'Research' },
                date: new Date('2026-01-20'), featured: false,
                image: '/images/lab-research.png',
            },
            {
                title: { kz: 'Жыл сайынғы ветеринарлық конференция 2024 қорытындысы', ru: 'Итоги ежегодной ветеринарной конференции 2024', en: 'Annual Veterinary Conference 2024 Recap' },
                excerpt: { kz: 'Конференцияда 200-ден астам маман қатысып, 50-ден астам баяндама тыңдалды.', ru: 'В конференции приняли участие более 200 специалистов, было заслушано более 50 докладов.', en: 'More than 200 specialists participated in the conference, over 50 reports were presented.' },
                category: { kz: 'Іс-шара', ru: 'Событие', en: 'Event' },
                date: new Date('2026-01-15'), featured: false,
                image: '/images/news-meeting.png',
            },
        ]);
        console.log('📰 News seeded');

        // ===== SERVICES =====
        await Service.create([
            {
                category: 'diagnostics',
                icon: 'coronavirus',
                title: { kz: 'Құс тұмауын скрининг', ru: 'Скрининг на птичий грипп', en: 'Avian Influenza Screening' },
                description: { kz: 'ПТР және серологиялық тестілеу арқылы кешенді скрининг', ru: 'Комплексный скрининг методами ПЦР и серологического тестирования', en: 'Comprehensive screening using PCR and serological testing methods' },
                details: { kz: 'Құс тұмауы вирустарын анықтауға арналған толық диагностикалық панель. Сынама жинау, тасымалдау және нәтижелерді талдау қамтылады.', ru: 'Полная диагностическая панель для выявления вирусов птичьего гриппа. Включает сбор образцов, транспортировку и анализ результатов.', en: 'Complete diagnostic panel for detection of avian influenza viruses. Includes sample collection, transportation, and results analysis.' },
                duration: '3-5 days',
                price: '25,000 ₸',
            },
            {
                category: 'diagnostics',
                icon: 'science',
                title: { kz: 'Бруцеллез тестілеу', ru: 'Тестирование на бруцеллёз', en: 'Brucellosis Testing' },
                description: { kz: 'Бактериологиялық және серологиялық талдау', ru: 'Бактериологический и серологический анализ', en: 'Bacteriological and serological analysis' },
                details: { kz: 'Бруцеллез инфекциясын анықтауға арналған стандартталған әдістер. ISO 17025 сәйкес аккредиттелген.', ru: 'Стандартизированные методы выявления бруцеллёзной инфекции. Аккредитовано по ISO 17025.', en: 'Standardized methods for brucellosis infection detection. Accredited according to ISO 17025.' },
                duration: '5-7 days',
                price: '18,000 ₸'
            },
            {
                category: 'testing',
                icon: 'water_drop',
                title: { kz: 'Сүт сапасын талдау', ru: 'Анализ качества молока', en: 'Milk Quality Analysis' },
                description: { kz: 'Толық химиялық және микробиологиялық талдау', ru: 'Полный химический и микробиологический анализ', en: 'Complete chemical and microbiological analysis' },
                details: { kz: 'Сүт өнімдерінің құрамы мен қауіпсіздігін талдау. Антибиотиктер, соматикалық жасушалар, май, ақуыз анықталады.', ru: 'Анализ состава и безопасности молочной продукции. Определяются антибиотики, соматические клетки, жир, белок.', en: 'Analysis of dairy product composition and safety. Antibiotics, somatic cells, fat, protein are detected.' },
                duration: '2-3 days',
                price: '12,000 ₸'
            },
            {
                category: 'testing',
                icon: 'biotech',
                title: { kz: 'Ауыр металдарды анықтау', ru: 'Определение тяжёлых металлов', en: 'Heavy Metals Detection' },
                description: { kz: 'Корм мен топырақтағы улы металдарды талдау', ru: 'Анализ токсичных металлов в кормах и почве', en: 'Analysis of toxic metals in feed and soil' },
                details: { kz: 'Қорғасын, кадмий, мышьяк, сынап және басқа ауыр металдарды ICP-MS әдісімен анықтау.', ru: 'Определение свинца, кадмия, мышьяка, ртути и других тяжёлых металлов методом ICP-MS.', en: 'Detection of lead, cadmium, arsenic, mercury and other heavy metals using ICP-MS method.' },
                duration: '5-7 days',
                price: '35,000 ₸'
            },
            {
                category: 'diagnostics',
                icon: 'pets',
                title: { kz: 'Құтыру ауруын диагностикалау', ru: 'Диагностика бешенства', en: 'Rabies Diagnostics' },
                description: { kz: 'FAT және ПТР әдістерімен вирусты анықтау', ru: 'Выявление вируса методами FAT и ПЦР', en: 'Virus detection using FAT and PCR methods' },
                details: { kz: 'Құтыру вирусын жедел анықтау. Ми тіні үлгілерін талдау. WOAH стандарттарына сай.', ru: 'Экспресс-диагностика вируса бешенства. Анализ образцов мозговой ткани. Соответствует стандартам WOAH.', en: 'Rapid rabies virus detection. Brain tissue sample analysis. Compliant with WOAH standards.' },
                duration: '1-2 days',
                price: '15,000 ₸'
            },
            {
                category: 'certification',
                icon: 'verified',
                title: { kz: 'Экспорттық сертификаттау', ru: 'Экспортная сертификация', en: 'Export Certification' },
                description: { kz: 'Мал өнімдерін экспорттауға арналған құжаттар', ru: 'Документация для экспорта животноводческой продукции', en: 'Documentation for livestock product exports' },
                details: { kz: 'Халықаралық талаптарға сай экспорттық ветеринарлық сертификаттар. ЕАЭО елдері мен үшінші елдерге.', ru: 'Экспортные ветеринарные сертификаты согласно международным требованиям. Для стран ЕАЭС и третьих стран.', en: 'Export veterinary certificates according to international requirements. For EAEU countries and third countries.' },
                duration: '7-10 days',
                price: '50,000 ₸'
            },
            {
                category: 'testing',
                icon: 'medication',
                title: { kz: 'Антибиотиктер қалдығын анықтау', ru: 'Определение остатков антибиотиков', en: 'Antibiotic Residue Detection' },
                description: { kz: 'Ет пен сүт өнімдеріндегі дәрі-дәрмек қалдықтарын талдау', ru: 'Анализ остатков лекарств в мясе и молочных продуктах', en: 'Analysis of drug residues in meat and dairy products' },
                details: { kz: 'HPLC-MS/MS әдісімен антибиотиктер, гормондар және басқа препараттар қалдықтарын анықтау.', ru: 'Определение остатков антибиотиков, гормонов и других препаратов методом HPLC-MS/MS.', en: 'Detection of antibiotic, hormone and other drug residues using HPLC-MS/MS method.' },
                duration: '3-5 days',
                price: '28,000 ₸'
            },
            {
                category: 'certification',
                icon: 'fact_check',
                title: { kz: 'Зертхана аккредиттеу', ru: 'Аккредитация лаборатории', en: 'Laboratory Accreditation' },
                description: { kz: 'ISO 17025 бойынша консультациялық қызметтер', ru: 'Консультационные услуги по ISO 17025', en: 'Consulting services for ISO 17025' },
                details: { kz: 'Зертханаларды ISO/IEC 17025 стандартына сай аккредиттеуге дайындау. Құжаттамаларды әзірлеу, аудит.', ru: 'Подготовка лабораторий к аккредитации по стандарту ISO/IEC 17025. Разработка документации, аудит.', en: 'Preparation of laboratories for ISO/IEC 17025 accreditation. Documentation development, audit.' },
                duration: '30-90 days',
                price: 'Келісім бойынша'
            }
        ]);
        console.log('🔬 Services seeded');

        // ===== BRANCHES =====
        await Branch.create([
            { city: { kz: 'Астана', ru: 'Астана', en: 'Astana' }, name: { kz: 'Астана орталық зертханасы', ru: 'Центральная лаборатория Астаны', en: 'Astana Central Lab' }, director: { kz: 'Др. Арман Құсайынов', ru: 'Д-р Арман Кусаинов', en: 'Dr. Arman Kussainov' }, address: { kz: 'Жеңіс даңғылы, 45, Астана', ru: 'Пр. Женис, 45, Астана', en: '45 Zhengis Ave, Astana' }, phone: '+7 (7172) 55-01-23', email: 'astana@rvl.kz', isMain: true, coords: [51.1694, 71.4491] },
            { city: { kz: 'Алматы', ru: 'Алматы', en: 'Almaty' }, name: { kz: 'Алматы филиалы', ru: 'Алматинский филиал', en: 'Almaty Branch' }, director: { kz: 'Др. Сәуле Төлегенова', ru: 'Д-р Сауле Тулегенова', en: 'Dr. Saule Tulegenova' }, address: { kz: 'Абай даңғылы, 150, Алматы', ru: 'Пр. Абая, 150, Алматы', en: '150 Abay Ave, Almaty' }, phone: '+7 (727) 333-44-55', email: 'almaty@rvl.kz', isMain: false, coords: [43.2220, 76.8512] },
            { city: { kz: 'Шымкент', ru: 'Шымкент', en: 'Shymkent' }, name: { kz: 'Шымкент филиалы', ru: 'Шымкентский филиал', en: 'Shymkent Branch' }, director: { kz: 'Др. Руслан Ахметов', ru: 'Д-р Руслан Ахметов', en: 'Dr. Ruslan Akhmetov' }, address: { kz: 'Тәуке хан даңғылы, 8', ru: 'Пр. Тауке хана, 8', en: '8 Tauke Khan Ave' }, phone: '+7 (7252) 22-11-99', email: 'shymkent@rvl.kz', isMain: false, coords: [42.3154, 69.5966] },
            { city: { kz: 'Ақтөбе', ru: 'Актобе', en: 'Aktobe' }, name: { kz: 'Ақтөбе филиалы', ru: 'Актюбинский филиал', en: 'Aktobe Branch' }, director: { kz: 'Др. Ерлан Садықов', ru: 'Д-р Ерлан Садыков', en: 'Dr. Yerlan Sadykov' }, address: { kz: 'Сәнкібай батыр, 12', ru: 'Ул. Санкибай Батыра, 12', en: '12 Sankibay Batyr St' }, phone: '+7 (7132) 55-66-77', email: 'aktobe@rvl.kz', isMain: false, coords: [50.2839, 57.1670] },
            { city: { kz: 'Қарағанды', ru: 'Караганда', en: 'Karaganda' }, name: { kz: 'Қарағанды филиалы', ru: 'Карагандинский филиал', en: 'Karaganda Branch' }, director: { kz: 'Др. Марат Оспанов', ru: 'Д-р Марат Оспанов', en: 'Dr. Marat Ospanov' }, address: { kz: 'Бұқар жырау, 25', ru: 'Ул. Бухар Жырау, 25', en: '25 Bukhar Zhyrau St' }, phone: '+7 (7212) 44-55-66', email: 'karaganda@rvl.kz', isMain: false, coords: [49.8047, 73.0856] },
            { city: { kz: 'Атырау', ru: 'Атырау', en: 'Atyrau' }, name: { kz: 'Атырау филиалы', ru: 'Атырауский филиал', en: 'Atyrau Branch' }, director: { kz: 'Др. Дәулет Наурызов', ru: 'Д-р Даулет Наурызов', en: 'Dr. Daulet Nauryzov' }, address: { kz: 'Сәтпаев көшесі, 10', ru: 'Ул. Сатпаева, 10', en: '10 Satpayev St' }, phone: '+7 (7122) 33-44-55', email: 'atyrau@rvl.kz', isMain: false, coords: [46.8606, 51.8806] },
        ]);
        console.log('🏢 Branches seeded');

        // ===== SETTINGS =====
        await Settings.create({ siteName: 'RVL Kazakhstan', adminEmail: 'admin@rvl.kz', maintenanceMode: false });
        console.log('⚙️  Settings seeded');

        console.log('\n🎉 Database seeded successfully!');
        process.exit(0);
    } catch (error) {
        console.error('❌ Seed error:', error);
        process.exit(1);
    }
}

seed();
