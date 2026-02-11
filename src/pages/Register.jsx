import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Link, useNavigate } from 'react-router-dom';
import './Auth.css';

function Register() {
    const { language, register: registerUser, showToast } = useApp();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organization: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [agreeTerms, setAgreeTerms] = useState(false);

    const texts = {
        title: { kz: 'Тіркелу', ru: 'Регистрация', en: 'Create Account' },
        subtitle: { kz: 'Жеке кабинетке тіркелу', ru: 'Регистрация в личном кабинете', en: 'Register for personal cabinet' },
        firstName: { kz: 'Аты', ru: 'Имя', en: 'First Name' },
        lastName: { kz: 'Тегі', ru: 'Фамилия', en: 'Last Name' },
        email: { kz: 'Электрондық пошта', ru: 'Электронная почта', en: 'Email' },
        phone: { kz: 'Телефон', ru: 'Телефон', en: 'Phone' },
        organization: { kz: 'Ұйым', ru: 'Организация', en: 'Organization' },
        password: { kz: 'Құпия сөз', ru: 'Пароль', en: 'Password' },
        confirmPassword: { kz: 'Құпия сөзді растаңыз', ru: 'Подтвердите пароль', en: 'Confirm Password' },
        agreeTerms: { kz: 'Қолдану шарттарымен келісемін', ru: 'Согласен с условиями использования', en: 'I agree to the Terms of Service' },
        register: { kz: 'Тіркелу', ru: 'Зарегистрироваться', en: 'Register' },
        haveAccount: { kz: 'Аккаунтыңыз бар ма?', ru: 'Уже есть аккаунт?', en: 'Already have an account?' },
        signIn: { kz: 'Кіру', ru: 'Войти', en: 'Sign In' },
        registerSuccess: { kz: 'Сәтті тіркелдіңіз!', ru: 'Вы успешно зарегистрировались!', en: 'Successfully registered!' },
        passwordMismatch: { kz: 'Құпия сөздер сәйкес келмейді', ru: 'Пароли не совпадают', en: 'Passwords do not match' },
        acceptTerms: { kz: 'Шарттарды қабылдаңыз', ru: 'Примите условия', en: 'Please accept the terms' },
        optional: { kz: '(міндетті емес)', ru: '(необязательно)', en: '(optional)' },
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            showToast(texts.passwordMismatch[language], 'error');
            return;
        }

        if (!agreeTerms) {
            showToast(texts.acceptTerms[language], 'error');
            return;
        }

        setIsLoading(true);

        try {
            const fullName = `${formData.firstName} ${formData.lastName}`.trim();
            await registerUser(fullName, formData.email, formData.password);
            showToast(texts.registerSuccess[language], 'success');
            navigate('/dashboard');
        } catch (error) {
            showToast(error.message || 'Registration failed', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container register-container">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-logo">
                            <span className="material-icons">biotech</span>
                        </div>
                        <h1>{texts.title[language]}</h1>
                        <p>{texts.subtitle[language]}</p>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="form-row-2">
                            <div className="form-group">
                                <label>{texts.firstName[language]}</label>
                                <div className="input-with-icon">
                                    <span className="material-icons">person</span>
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{texts.lastName[language]}</label>
                                <div className="input-with-icon">
                                    <span className="material-icons">person</span>
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label>{texts.email[language]}</label>
                            <div className="input-with-icon">
                                <span className="material-icons">mail</span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label>{texts.phone[language]}</label>
                                <div className="input-with-icon">
                                    <span className="material-icons">phone</span>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+7 (___) ___-__-__"
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{texts.organization[language]} <span className="optional">{texts.optional[language]}</span></label>
                                <div className="input-with-icon">
                                    <span className="material-icons">business</span>
                                    <input
                                        type="text"
                                        name="organization"
                                        value={formData.organization}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-row-2">
                            <div className="form-group">
                                <label>{texts.password[language]}</label>
                                <div className="input-with-icon">
                                    <span className="material-icons">lock</span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={6}
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>{texts.confirmPassword[language]}</label>
                                <div className="input-with-icon">
                                    <span className="material-icons">lock</span>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
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
                        </div>

                        <label className="checkbox-label terms-checkbox">
                            <input
                                type="checkbox"
                                checked={agreeTerms}
                                onChange={(e) => setAgreeTerms(e.target.checked)}
                            />
                            <span>{texts.agreeTerms[language]}</span>
                        </label>

                        <button type="submit" className="btn btn-primary btn-full" disabled={isLoading}>
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>
                                    <span className="material-icons">person_add</span>
                                    {texts.register[language]}
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <span>{texts.haveAccount[language]}</span>
                        <Link to="/login">{texts.signIn[language]}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
