import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Login() {
    const { language, login, showToast } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const texts = {
        title: { kz: 'Жүйеге кіру', ru: 'Вход в систему', en: 'Sign In' },
        subtitle: { kz: 'Жеке кабинетке қош келдіңіз', ru: 'Добро пожаловать в личный кабинет', en: 'Welcome to your personal cabinet' },
        email: { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
        password: { kz: 'Құпия сөз', ru: 'Пароль', en: 'Password' },
        rememberMe: { kz: 'Мені есте сақта', ru: 'Запомнить меня', en: 'Remember me' },
        forgotPassword: { kz: 'Құпия сөзді ұмыттыңыз ба?', ru: 'Забыли пароль?', en: 'Forgot password?' },
        signIn: { kz: 'Кіру', ru: 'Войти', en: 'Sign In' },
        noAccount: { kz: 'Аккаунтыңыз жоқ па?', ru: 'Нет аккаунта?', en: "Don't have an account?" },
        register: { kz: 'Тіркелу', ru: 'Зарегистрироваться', en: 'Register' },
        emailPlaceholder: { kz: 'email@example.com', ru: 'email@example.com', en: 'email@example.com' },
        passwordPlaceholder: { kz: 'Құпия сөзді енгізіңіз', ru: 'Введите пароль', en: 'Enter your password' },
        loginSuccess: { kz: 'Сәтті кірдіңіз!', ru: 'Вы успешно вошли!', en: 'Successfully logged in!' },
        loginError: { kz: 'Қате email немесе құпия сөз', ru: 'Неверный email или пароль', en: 'Invalid email or password' },
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Login attempt with:', formData.email);
        setIsLoading(true);

        try {
            const user = await login(formData.email, formData.password);
            console.log('Login success! User:', user);
            showToast(texts.loginSuccess[language], 'success');
            // Redirect based on role
            if (user.role === 'admin' || user.role === 'editor') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            showToast(error.message || texts.loginError[language], 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <span className="material-icons">biotech</span>
                        </div>
                        <h1>{texts.title[language]}</h1>
                        <p>{texts.subtitle[language]}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>{texts.email[language]}</label>
                            <div className="input-with-icon">
                                <span className="material-icons">mail</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder={texts.emailPlaceholder[language]}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>{texts.password[language]}</label>
                            <div className="input-with-icon">
                                <span className="material-icons">lock</span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder={texts.passwordPlaceholder[language]}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-password"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <span className="material-icons">
                                        {showPassword ? 'visibility_off' : 'visibility'}
                                    </span>
                                </button>
                            </div>
                        </div>

                        <div className="form-row">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>{texts.rememberMe[language]}</span>
                            </label>
                            <a href="#" className="forgot-link">{texts.forgotPassword[language]}</a>
                        </div>

                        <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>
                                    <span className="material-icons">login</span>
                                    {texts.signIn[language]}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>{texts.noAccount[language]}</span>
                        <Link to="/register">{texts.register[language]}</Link>
                    </div>
                </div>

                <div className="auth-decoration">
                    <div className="decoration-content">
                        <span className="material-icons">verified_user</span>
                        <h2>RVL Kazakhstan</h2>
                        <p>{language === 'kz' ? 'Республикалық ветеринарлық зертхана' :
                            language === 'ru' ? 'Республиканская ветеринарная лаборатория' :
                                'Republican Veterinary Laboratory'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
