import { useApp } from '../context/AppContext';
import './Team.css';

function Team() {
    const { language } = useApp();

    const team = [
        {
            id: 1,
            name: { kz: 'Ахметов Арман Жандосұлы', ru: 'Ахметов Арман Жандосович', en: 'Akhmetov Arman Zhandosovich' },
            role: { kz: 'Бас директор', ru: 'Генеральный директор', en: 'General Director' },
            bio: {
                kz: 'Ветеринария ғылымдарының докторы, профессор. Салада 25 жылдық тәжірибесі бар.',
                ru: 'Доктор ветеринарных наук, профессор. Опыт работы в сфере более 25 лет.',
                en: 'Doctor of Veterinary Sciences, Professor. More than 25 years of experience in the field.'
            },
            image: '/images/avatar-1.png'
        },
        {
            id: 2,
            name: { kz: 'Иванова Елена Сергеевна', ru: 'Иванова Елена Сергеевна', en: 'Ivanova Elena Sergeevna' },
            role: { kz: 'Вирусология бөлімінің меңгерушісі', ru: 'Заведующая отделом вирусологии', en: 'Head of Virology Department' },
            bio: {
                kz: 'Халықаралық сарапшы, PCR зертханаларын құру бойынша маман.',
                ru: 'Международный эксперт, специалист по созданию ПЦР лабораторий.',
                en: 'International expert, specialist in setting up PCR laboratories.'
            },
            image: '/images/avatar-2.png'
        },
        {
            id: 3,
            name: { kz: 'Сапарұлы Дәулет', ru: 'Сапарулы Даулет', en: 'Saparuly Daulet' },
            role: { kz: 'Бас эпизоотолог', ru: 'Главный эпизоотолог', en: 'Chief Epizootologist' },
            bio: {
                kz: 'Жұқпалы аурулардың алдын алу және жою бойынша жетекші маман.',
                ru: 'Ведущий специалист по профилактике и ликвидации инфекционных заболеваний.',
                en: 'Leading specialist in the prevention and eradication of infectious diseases.'
            },
            image: '/images/avatar-3.png'
        },
        {
            id: 4,
            name: { kz: 'Петров Алексей Владимирович', ru: 'Петров Алексей Владимирович', en: 'Petrov Alexey Vladimirovich' },
            role: { kz: 'Сапа жөніндегі менеджер', ru: 'Менеджер по качеству', en: 'Quality Manager' },
            bio: {
                kz: 'ISO 17025 стандартын енгізу және бақылау бойынша жауапты.',
                ru: 'Ответственный за внедрение и контроль стандарта ISO 17025.',
                en: 'Responsible for implementation and control of ISO 17025 standard.'
            },
            image: '/images/avatar-4.png'
        }
    ];

    return (
        <div className="team-page">
            <div className="team-header">
                <div className="container">
                    <h1>{language === 'kz' ? 'Біздің басшылық' : language === 'ru' ? 'Наше руководство' : 'Our Leadership'}</h1>
                    <p>
                        {language === 'kz' ? 'Елдің ветеринариялық қауіпсіздігін қамтамасыз ететін кәсіби мамандар' :
                            language === 'ru' ? 'Профессионалы, обеспечивающие ветеринарную безопасность страны' :
                                'Professionals ensuring the veterinary safety of the country'}
                    </p>
                </div>
            </div>

            <div className="container team-content">
                <div className="team-grid">
                    {team.map(member => (
                        <div key={member.id} className="team-card">
                            <div className="member-image">
                                <span className="material-icons person-icon">person</span>
                            </div>
                            <div className="member-info">
                                <h3>{member.name[language]}</h3>
                                <span className="member-role">{member.role[language]}</span>
                                <p className="member-bio">{member.bio[language]}</p>
                                <div className="member-socials">
                                    <button className="social-btn"><span className="material-icons">email</span></button>
                                    <button className="social-btn"><span className="material-icons">share</span></button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Team;
