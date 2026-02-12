import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { t } from '../data/translations';
import ThemeToggle from './ThemeToggle';
import './Header.css';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, setLanguage, setIsSearchOpen, user, settings } = useApp();

  const authTexts = {
    login: { kz: 'Кіру', ru: 'Войти', en: 'Login' },
    register: { kz: 'Тіркелу', ru: 'Регистрация', en: 'Register' },
    cabinet: { kz: 'Кабинет', ru: 'Кабинет', en: 'Cabinet' },
  };

  const navLinks = [
    { path: '/', key: 'nav.home' },
    { path: '/about', key: 'nav.about' },
    { path: '/team', key: 'nav.team' },
    { path: '/services', key: 'nav.services' },
    { path: '/training', key: 'nav.training' },
    { path: '/legal', key: 'nav.legal' },
    { path: '/media', key: 'nav.media' },
    { path: '/contacts', key: 'nav.contacts' },
  ];

  const languages = ['kz', 'ru', 'en'];

  return (
    <header className="header">
      <div className="header-top">
        <div className="container header-top-content">
          <div className="header-contacts">
            <span className="material-icons">phone</span>
            <a href="tel:+77172550123">+7 (7172) 55-01-23</a>
            <span className="divider">|</span>
            <span className="material-icons">email</span>
            <a href="mailto:info@rvl.kz">info@rvl.kz</a>
          </div>
          <div className="header-top-right">
            <div className="language-switcher">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`lang-btn ${language === lang ? 'active' : ''}`}
                  onClick={() => setLanguage(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="auth-buttons">
              {user ? (
                <Link to="/dashboard" className="auth-btn cabinet-btn">
                  <span className="material-icons">person</span>
                  <span>{authTexts.cabinet[language]}</span>
                </Link>
              ) : (
                <>
                  <Link to="/login" className="auth-btn login-btn">
                    <span className="material-icons">login</span>
                    <span>{authTexts.login[language]}</span>
                  </Link>
                  <Link to="/register" className="auth-btn register-btn">
                    <span>{authTexts.register[language]}</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="header-main">
        <div className="container header-main-content">
          <Link to="/" className="logo">
            <div className="logo-icon">
              <span className="material-icons">biotech</span>
            </div>
            <div className="logo-text">
              <span className="logo-title">{settings.siteName[language] || t('header.title', language)}</span>
              <span className="logo-subtitle">{t('header.subtitle', language)}</span>
            </div>
          </Link>

          <nav className={`nav ${mobileMenuOpen ? 'nav-open' : ''}`}>
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {t(link.key, language)}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <ThemeToggle />
            <Link to="/verify" className="verify-btn" aria-label={t('header.verify', language)}>
              <span className="material-icons">verified_user</span>
              <span className="verify-text">{t('header.verify', language)}</span>
            </Link>
            <button
              className="search-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label={t('header.search', language)}
            >
              <span className="material-icons">search</span>
            </button>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-icons">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
