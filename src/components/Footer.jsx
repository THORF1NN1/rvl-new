import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import './Footer.css';

function Footer() {
    const { language, showToast } = useApp();

    const quickLinks = [
        { path: '/about', key: 'nav.about' },
        { path: '/services', key: 'nav.services' },
        { path: '/training', key: 'nav.training' },
        { path: '/contacts', key: 'nav.contacts' },
        { path: '/admin', key: 'nav.admin' },
    ];

    const officialResources = [
        {
            href: 'https://www.gov.kz',
            label: { kz: 'Қазақстан Үкіметі', ru: 'Правительство Казахстана', en: 'Government of Kazakhstan' }
        },
        {
            href: 'https://moa.gov.kz',
            label: { kz: 'Ауыл шаруашылығы министрлігі', ru: 'Министерство сельского хозяйства', en: 'Ministry of Agriculture' }
        },
        {
            href: 'https://adilet.zan.kz',
            label: { kz: 'Әділет (Заңнама базасы)', ru: 'Адилет (База законодательства)', en: 'Adilet (Legal Database)' }
        },
    ];

    const handleSubscribe = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        if (email && /\S+@\S+\.\S+/.test(email)) {
            showToast(t('common.subscribed', language), 'success');
            e.target.email.value = '';
        } else {
            showToast(t('common.invalidEmail', language), 'error');
        }
    };

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* Branding */}
                    <div className="footer-brand">
                        <div className="footer-logo">
                            <img src="/images/logo.png" alt="RVL Logo" className="footer-logo-image" />
                            <span className="footer-logo-text">RVL Kazakhstan</span>
                        </div>
                        <p>{t('footer.description', language)}</p>
                        <div className="social-links">
                            <a href="#" className="social-link" aria-label="Facebook">
                                <span className="material-icons">facebook</span>
                            </a>
                            <a href="#" className="social-link" aria-label="Telegram">
                                <span className="material-icons">send</span>
                            </a>
                            <a href="#" className="social-link" aria-label="YouTube">
                                <span className="material-icons">play_circle</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-links">
                        <h4>{t('footer.quickLinks', language)}</h4>
                        <ul>
                            {quickLinks.map((link) => (
                                <li key={link.path}>
                                    <Link to={link.path}>{t(link.key, language)}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Official Resources */}
                    <div className="footer-links">
                        <h4>{t('footer.resources', language)}</h4>
                        <ul>
                            {officialResources.map((res, index) => (
                                <li key={index}>
                                    <a href={res.href} target="_blank" rel="noopener noreferrer">
                                        {res.label[language]}
                                        <span className="material-icons external-icon">open_in_new</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Subscribe */}
                    <div className="footer-contact">
                        <h4>{t('footer.contact', language)}</h4>
                        <div className="contact-item">
                            <span className="material-icons">location_on</span>
                            <span>
                                {language === 'kz' ? 'Жеңіс даңғылы, 45, Астана' :
                                    language === 'ru' ? 'Пр. Женис, 45, Астана' :
                                        'Zhengis Ave, 45, Astana'}
                            </span>
                        </div>
                        <div className="contact-item">
                            <span className="material-icons">phone</span>
                            <a href="tel:+77172550123">+7 (7172) 55-01-23</a>
                        </div>
                        <div className="contact-item">
                            <span className="material-icons">email</span>
                            <a href="mailto:info@rvl.kz">info@rvl.kz</a>
                        </div>

                        <form className="subscribe-form" onSubmit={handleSubscribe}>
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                            />
                            <button type="submit" className="btn btn-primary">
                                {t('common.subscribe', language)}
                            </button>
                        </form>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p>{t('footer.copyright', language)}</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
