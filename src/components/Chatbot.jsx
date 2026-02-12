import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { chatbotResponses } from '../data/chatbotResponses';
import { servicesAPI } from '../api';
import './Chatbot.css';

function Chatbot() {
    const { language } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);
    const [services, setServices] = useState([]);

    const responses = chatbotResponses[language];

    useEffect(() => {
        // Load services for "smart" search
        servicesAPI.getAll().then(data => setServices(data)).catch(() => { });
    }, []);

    useEffect(() => {
        if (isOpen && messages.length === 0) {
            setMessages([{ type: 'bot', text: responses.greeting }]);
        }
        scrollToBottom();
    }, [isOpen, messages]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleOpen = () => setIsOpen(true);
    const handleClose = () => setIsOpen(false);

    const processQuery = (query) => {
        const lowerQuery = query.toLowerCase();
        let answer = null;

        // 1. Check services (Smart Search)
        const foundService = services.find(s =>
            s.title[language].toLowerCase().includes(lowerQuery) ||
            s.description[language].toLowerCase().includes(lowerQuery)
        );

        if (foundService) {
            const price = foundService.price || (language === 'kz' ? 'Бағасы нақтылануда' : language === 'ru' ? 'Цена по запросу' : 'Price on request');
            answer = language === 'kz'
                ? `Табылған қызмет: **${foundService.title.kz}**.\nБағасы: ${price}\n${foundService.description.kz}`
                : language === 'ru'
                    ? `Найдена услуга: **${foundService.title.ru}**.\nЦена: ${price}\n${foundService.description.ru}`
                    : `Found service: **${foundService.title.en}**.\nPrice: ${price}\n${foundService.description.en}`;
        }

        // 2. Check predefined questions (Fuzzy match)
        if (!answer) {
            const predefined = responses.questions.find(q => q.question.toLowerCase().includes(lowerQuery));
            if (predefined) answer = predefined.answer;
        }

        // 3. Default fallback
        if (!answer) {
            answer = language === 'kz'
                ? 'Кешіріңіз, мен бұл туралы ақпарат таппадым. Нақтырақ сұрап көріңіз немесе оператормен байланысыңыз.'
                : language === 'ru'
                    ? 'Извините, я не нашел информации. Попробуйте уточнить запрос или свяжитесь с оператором.'
                    : 'Sorry, I couldn\'t find information about that. Please clarify or contact an operator.';
        }

        return answer;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        // User message
        const userMsg = { type: 'user', text: inputValue };
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsTyping(true);

        // Simulate AI thinking delay
        setTimeout(() => {
            const botAnswer = processQuery(userMsg.text);
            setMessages(prev => [...prev, { type: 'bot', text: botAnswer }]);
            setIsTyping(false);
        }, 1000);
    };

    const handleQuestionClick = (question) => {
        setMessages(prev => [...prev, { type: 'user', text: question.question }]);
        setIsTyping(true);
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: question.answer }]);
            setIsTyping(false);
        }, 600);
    };

    return (
        <div className="chatbot-container">
            {/* Chat Window */}
            <div className={`chatbot-window ${isOpen ? 'open' : ''}`}>
                <div className="chatbot-header">
                    <div className="chatbot-header-info">
                        <div className="chatbot-avatar">
                            <span className="material-icons">smart_toy</span>
                        </div>
                        <div>
                            <h4>
                                {language === 'kz' ? 'РВЗ AI Көмекші' :
                                    language === 'ru' ? 'РВЛ AI Помощник' : 'RVL AI Assistant'}
                            </h4>
                            <span className="chatbot-status">
                                <span className="status-dot"></span>
                                {language === 'kz' ? 'Онлайн' :
                                    language === 'ru' ? 'Онлайн' : 'Online'}
                            </span>
                        </div>
                    </div>
                    <button className="chatbot-close" onClick={handleClose}>
                        <span className="material-icons">close</span>
                    </button>
                </div>

                <div className="chatbot-messages">
                    {messages.map((msg, index) => (
                        <div key={index} className={`chat-message ${msg.type}`}>
                            {msg.type === 'bot' && (
                                <div className="message-avatar">
                                    <span className="material-icons">smart_toy</span>
                                </div>
                            )}
                            <div className="message-content">
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i} dangerouslySetInnerHTML={{
                                        __html: line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                                    }}></p>
                                ))}
                            </div>
                        </div>
                    ))}
                    {isTyping && (
                        <div className="chat-message bot typing">
                            <div className="message-avatar">
                                <span className="material-icons">smart_toy</span>
                            </div>
                            <div className="typing-indicator">
                                <span></span><span></span><span></span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <div className="chatbot-footer">
                    <div className="chatbot-quick-replies">
                        {responses.questions.slice(0, 3).map((q) => (
                            <button
                                key={q.id}
                                className="quick-reply-btn"
                                onClick={() => handleQuestionClick(q)}
                            >
                                {q.question}
                            </button>
                        ))}
                    </div>
                    <form className="chatbot-input-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder={language === 'kz' ? 'Сұрағыңызды жазыңыз...' :
                                language === 'ru' ? 'Введите ваш вопрос...' : 'Type your question...'}
                        />
                        <button type="submit" disabled={!inputValue.trim()}>
                            <span className="material-icons">send</span>
                        </button>
                    </form>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={isOpen ? handleClose : handleOpen}
                aria-label="Chat"
            >
                <div className="toggle-icon-wrapper">
                    <span className="material-icons chatbot-icon-open">smart_toy</span>
                    <span className="material-icons chatbot-icon-close">close</span>
                </div>
            </button>
        </div>
    );
}

export default Chatbot;
