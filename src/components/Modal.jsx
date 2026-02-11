import { useApp } from '../context/AppContext';
import './Modal.css';

function Modal() {
    const { modal, closeModal } = useApp();

    if (!modal.isOpen) return null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            closeModal();
        }
    };

    return (
        <div className="modal-backdrop" onClick={handleBackdropClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2>{modal.title}</h2>
                    <button className="modal-close" onClick={closeModal}>
                        <span className="material-icons">close</span>
                    </button>
                </div>
                <div className="modal-content">
                    {modal.content}
                </div>
            </div>
        </div>
    );
}

export default Modal;
