export const chatbotResponses = {
    kz: {
        greeting: 'Сәлем! Мен РВЗ виртуалды көмекшісімін. Сұрақтарыңызға жауап беруге дайынмын.',
        fallback: 'Кешіріңіз, бұл сұраққа жауап бере алмадым. +7 (7172) 55-01-23 нөміріне қоңырау шалыңыз.',
        questions: [
            {
                id: 'services',
                question: 'Қандай қызметтер бар?',
                answer: 'Біз диагностикалық зерттеулер, вакциналар сапасын бақылау, аккредиттеу және оқыту қызметтерін ұсынамыз. Толық тізімді "Қызметтер" бетінен қараңыз.'
            },
            {
                id: 'prices',
                question: 'Бағалар қандай?',
                answer: 'Қызмет бағалары 5,000 теңгеден басталады. Нақты бағаларды калькуляторда немесе "Қызметтер" бетінен көре аласыз.'
            },
            {
                id: 'branches',
                question: 'Филиалдар қайда орналасқан?',
                answer: 'Бізде Қазақстан бойынша 14 филиал бар. "Байланыс" бетінде толық мекенжайларды және картаны көре аласыз.'
            },
            {
                id: 'hours',
                question: 'Жұмыс уақыты қандай?',
                answer: 'Біз дүйсенбі-жұма, сағат 09:00-18:00 аралығында жұмыс істейміз. Түскі үзіліс: 13:00-14:00.'
            },
            {
                id: 'contact',
                question: 'Қалай байланысуға болады?',
                answer: 'Телефон: +7 (7172) 55-01-23\nEmail: info@rvl.kz\nМекенжай: Астана қ., Кенесары көшесі, 40'
            }
        ]
    },
    ru: {
        greeting: 'Здравствуйте! Я виртуальный помощник РВЛ. Готов ответить на ваши вопросы.',
        fallback: 'Извините, не смог найти ответ. Позвоните нам: +7 (7172) 55-01-23.',
        questions: [
            {
                id: 'services',
                question: 'Какие услуги вы предоставляете?',
                answer: 'Мы предоставляем диагностические исследования, контроль качества вакцин, аккредитацию и обучение. Полный список на странице "Услуги".'
            },
            {
                id: 'prices',
                question: 'Какие цены на услуги?',
                answer: 'Цены начинаются от 5,000 тенге. Точные цены можно узнать в калькуляторе или на странице "Услуги".'
            },
            {
                id: 'branches',
                question: 'Где находятся филиалы?',
                answer: 'У нас 14 филиалов по всему Казахстану. Адреса и карту смотрите на странице "Контакты".'
            },
            {
                id: 'hours',
                question: 'Какой режим работы?',
                answer: 'Мы работаем пн-пт с 09:00 до 18:00. Обед: 13:00-14:00.'
            },
            {
                id: 'contact',
                question: 'Как связаться с вами?',
                answer: 'Телефон: +7 (7172) 55-01-23\nEmail: info@rvl.kz\nАдрес: г. Астана, ул. Кенесары, 40'
            }
        ]
    },
    en: {
        greeting: 'Hello! I am the RVL virtual assistant. How can I help you?',
        fallback: 'Sorry, I could not find an answer. Please call us: +7 (7172) 55-01-23.',
        questions: [
            {
                id: 'services',
                question: 'What services do you provide?',
                answer: 'We provide diagnostic research, vaccine quality control, accreditation and training. See the full list on the "Services" page.'
            },
            {
                id: 'prices',
                question: 'What are your prices?',
                answer: 'Prices start from 5,000 KZT. Check the calculator or "Services" page for exact prices.'
            },
            {
                id: 'branches',
                question: 'Where are your branches?',
                answer: 'We have 14 branches across Kazakhstan. See addresses and map on the "Contact" page.'
            },
            {
                id: 'hours',
                question: 'What are your working hours?',
                answer: 'We work Mon-Fri, 09:00-18:00. Lunch break: 13:00-14:00.'
            },
            {
                id: 'contact',
                question: 'How can I contact you?',
                answer: 'Phone: +7 (7172) 55-01-23\nEmail: info@rvl.kz\nAddress: Astana, Kenesary St. 40'
            }
        ]
    }
};
