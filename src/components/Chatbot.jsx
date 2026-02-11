import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { chatbotResponses } from '../data/chatbotResponses';
import './Chatbot.css';

function Chatbot() {
    const { language } = useApp();
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [hasGreeted, setHasGreeted] = useState(false);

    const responses = chatbotResponses[language];

    const handleOpen = () => {
        setIsOpen(true);
        if (!hasGreeted) {
            setMessages([{ type: 'bot', text: responses.greeting }]);
            setHasGreeted(true);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleQuestionClick = (question) => {
        // Add user message
        setMessages(prev => [...prev, { type: 'user', text: question.question }]);

        // Add bot response after small delay
        setTimeout(() => {
            setMessages(prev => [...prev, { type: 'bot', text: question.answer }]);
        }, 500);
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
                                {language === 'kz' ? 'РВЗ Көмекші' :
                                    language === 'ru' ? 'РВЛ Помощник' : 'RVL Assistant'}
                            </h4>
                            <span className="chatbot-status">
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
                                    <p key={i}>{line}</p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="chatbot-quick-replies">
                    <p className="quick-replies-label">
                        {language === 'kz' ? 'Жиі қойылатын сұрақтар:' :
                            language === 'ru' ? 'Частые вопросы:' : 'Quick questions:'}
                    </p>
                    <div className="quick-replies-list">
                        {responses.questions.map((q) => (
                            <button
                                key={q.id}
                                className="quick-reply-btn"
                                onClick={() => handleQuestionClick(q)}
                            >
                                {q.question}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                className={`chatbot-toggle ${isOpen ? 'open' : ''}`}
                onClick={isOpen ? handleClose : handleOpen}
                aria-label="Chat"
            >
                <span className="material-icons chatbot-icon-open">chat</span>
                <span className="material-icons chatbot-icon-close">close</span>
            </button>
        </div>
    );
}

export default Chatbot;
