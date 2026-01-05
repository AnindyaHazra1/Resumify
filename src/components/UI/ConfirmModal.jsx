import { AlertTriangle, X } from 'lucide-react';
import { useEffect, useRef } from 'react';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message, confirmText = "Confirm", cancelText = "Cancel", isDanger = false }) => {
    const modalRef = useRef(null);

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
        }}>
            <div className="modal-content" role="dialog" aria-modal="true" ref={modalRef}>
                <button className="close-btn" onClick={onClose}>
                    <X size={20} />
                </button>

                <div className="modal-header">
                    <div className={`icon-wrapper ${isDanger ? 'danger' : ''}`}>
                        <AlertTriangle size={24} />
                    </div>
                    <h3>{title}</h3>
                </div>

                <div className="modal-body">
                    <p>{message}</p>
                </div>

                <div className="modal-footer">
                    <button className="btn btn-secondary" onClick={onClose}>
                        {cancelText}
                    </button>
                    <button
                        className={`btn ${isDanger ? 'btn-danger-solid' : 'btn-primary'}`}
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>

            <style jsx="true">{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          animation: fadeIn 0.2s ease-out;
        }

        .modal-content {
          background: white;
          width: 90%;
          max-width: 400px;
          border-radius: var(--radius-lg);
          padding: 1.5rem;
          box-shadow: var(--shadow-lg);
          position: relative;
          animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .close-btn {
          position: absolute;
          top: 1rem;
          right: 1rem;
          color: hsl(var(--color-text-muted));
          padding: 0.25rem;
          border-radius: var(--radius-sm);
        }
        .close-btn:hover {
            background-color: hsl(var(--color-surface-hover));
        }

        .modal-header {
           display: flex;
           flex-direction: column;
           align-items: center;
           text-align: center;
           margin-bottom: 1rem;
        }
        
        .icon-wrapper {
            width: 48px;
            height: 48px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 1rem;
            background-color: hsl(var(--color-surface-hover));
            color: hsl(var(--color-text-main));
        }
        
        .icon-wrapper.danger {
            background-color: #fee2e2;
            color: #dc2626;
        }

        .modal-header h3 {
           font-size: 1.25rem;
           font-weight: 600;
           color: hsl(var(--color-text-main));
           margin: 0;
        }

        .modal-body {
           text-align: center;
           margin-bottom: 1.5rem;
        }
        
        .modal-body p {
            color: hsl(var(--color-text-muted));
            font-size: 0.95rem;
        }

        .modal-footer {
           display: flex;
           gap: 0.75rem;
           justify-content: center;
        }
        
        .btn-danger-solid {
            background-color: #dc2626;
            color: white;
        }
        .btn-danger-solid:hover {
            background-color: #b91c1c;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
      `}</style>
        </div>
    );
};

export default ConfirmModal;
