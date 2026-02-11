import { useApp } from '../context/AppContext';
import './Toast.css';

function Toast() {
    const { toasts, closeToast } = useApp();

    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map(toast => (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    <span className="material-icons toast-icon">
                        {toast.type === 'success' ? 'check_circle' :
                            toast.type === 'error' ? 'error' : 'info'}
                    </span>
                    <span className="toast-message">{toast.message}</span>
                    <button className="toast-close" onClick={() => closeToast(toast.id)}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Toast;
