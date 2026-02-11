import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Breadcrumbs.css';

const routeNames = {
    kz: {
        '/': 'Басты бет',
        '/about': 'Біз туралы',
        '/services': 'Қызметтер',
        '/training': 'Оқу орталығы',
        '/legal': 'Құқықтық актілер',
        '/media': 'Медиа-орталық',
        '/contacts': 'Байланыс',
        '/login': 'Кіру',
        '/register': 'Тіркелу',
        '/dashboard': 'Жеке кабинет',
        '/faq': 'Жиі қойылатын сұрақтар',
        '/calculator': 'Калькулятор',
        '/request': 'Өтінім',
        '/proposals': 'Ұсыныстар',
    },
    ru: {
        '/': 'Главная',
        '/about': 'О нас',
        '/services': 'Услуги',
        '/training': 'Учебный центр',
        '/legal': 'Правовые акты',
        '/media': 'Медиа-центр',
        '/contacts': 'Контакты',
        '/login': 'Вход',
        '/register': 'Регистрация',
        '/dashboard': 'Личный кабинет',
        '/faq': 'Частые вопросы',
        '/calculator': 'Калькулятор',
        '/request': 'Заявка',
        '/proposals': 'Предложения',
    },
    en: {
        '/': 'Home',
        '/about': 'About Us',
        '/services': 'Services',
        '/training': 'Training Center',
        '/legal': 'Legal Acts',
        '/media': 'Media Center',
        '/contacts': 'Contact',
        '/login': 'Login',
        '/register': 'Register',
        '/dashboard': 'Dashboard',
        '/faq': 'FAQ',
        '/calculator': 'Calculator',
        '/request': 'Request',
        '/proposals': 'Proposals',
    },
};

function Breadcrumbs() {
    const location = useLocation();
    const { language } = useApp();

    // Don't show on home page
    if (location.pathname === '/') {
        return null;
    }

    const currentName = routeNames[language][location.pathname] || location.pathname.replace('/', '');
    const homeName = routeNames[language]['/'];

    return (
        <nav className="breadcrumbs" aria-label="Breadcrumb">
            <div className="container">
                <ol className="breadcrumbs-list">
                    <li className="breadcrumb-item">
                        <Link to="/">
                            <span className="material-icons">home</span>
                            {homeName}
                        </Link>
                    </li>
                    <li className="breadcrumb-separator">
                        <span className="material-icons">chevron_right</span>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                        {currentName}
                    </li>
                </ol>
            </div>
        </nav>
    );
}

export default Breadcrumbs;
