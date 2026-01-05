import { X, Sparkles, Wand2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const AIPromptModal = ({ isOpen, onClose, onGenerate, role }) => {
    const [context, setContext] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            setContext(''); // Reset on open
        } else {
            const timer = setTimeout(() => setIsAnimating(false), 200);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen && !isAnimating) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onGenerate(context);
    };

    return (
        <div className={`modal-overlay ${isOpen ? 'open' : ''}`}>
            <div className={`modal-content ${isOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <div className="header-title">
                        <div className="icon-bg">
                            <Sparkles size={18} color="white" />
                        </div>
                        <h3>AI Smart Assist</h3>
                    </div>
                    <button className="close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>
                </div>

                <div className="modal-body">
                    <p className="helper-text">
                        Tell us briefly what you did as a <strong>{role}</strong>.
                        The AI will generate specific bullet points for you.
                    </p>

                    <textarea
                        value={context}
                        onChange={(e) => setContext(e.target.value)}
                        placeholder='e.g. "Managed a team of 5 developers", "Increased sales by 20%", "Migrated legacy code to React"'
                        rows={3}
                        className="context-input"
                        autoFocus
                    />
                </div>

                <div className="modal-footer">
                    <button className="btn-cancel" onClick={onClose}>Cancel</button>
                    <button
                        className="btn-generate"
                        onClick={handleSubmit}
                        disabled={!context.trim()}
                    >
                        <Wand2 size={16} />
                        Generate Bullets
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
                    background-color: rgba(0, 0, 0, 0.4);
                    backdrop-filter: blur(4px);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    transition: opacity 0.2s ease;
                }

                .modal-overlay.open {
                    opacity: 1;
                }

                .modal-content {
                    background: white;
                    width: 90%;
                    max-width: 420px;
                    border-radius: 16px;
                    box-shadow: 
                        0 20px 25px -5px rgba(0, 0, 0, 0.1), 
                        0 10px 10px -5px rgba(0, 0, 0, 0.04);
                    transform: scale(0.95) translateY(10px);
                    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                    overflow: hidden;
                    border: 1px solid rgba(255,255,255,0.1);
                }

                .modal-content.open {
                    transform: scale(1) translateY(0);
                }

                .modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 16px 20px;
                    border-bottom: 1px solid #f1f5f9;
                    background: #f8fafc;
                }

                .header-title {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }

                .header-title h3 {
                    margin: 0;
                    font-size: 1rem;
                    font-weight: 600;
                    color: #0f172a;
                }

                .icon-bg {
                    width: 32px;
                    height: 32px;
                    border-radius: 8px;
                    background: linear-gradient(135deg, #6366f1, #a855f7);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 2px 4px rgba(99, 102, 241, 0.2);
                }

                .close-btn {
                    background: none;
                    border: none;
                    color: #94a3b8;
                    cursor: pointer;
                    padding: 6px;
                    border-radius: 6px;
                    transition: all 0.2s;
                    display: flex;
                }

                .close-btn:hover {
                    background: #e2e8f0;
                    color: #64748b;
                }

                .modal-body {
                    padding: 20px;
                }

                .helper-text {
                    font-size: 0.9rem;
                    color: #475569;
                    margin: 0 0 12px 0;
                    line-height: 1.5;
                }

                .helper-text strong {
                    color: #6366f1;
                    font-weight: 600;
                }

                .context-input {
                    width: 100%;
                    padding: 12px;
                    border: 1px solid #e2e8f0;
                    border-radius: 10px;
                    font-family: inherit;
                    font-size: 0.95rem;
                    resize: none;
                    outline: none;
                    transition: all 0.2s;
                    background: #f8fafc;
                    color: #334155;
                }

                .context-input:focus {
                    border-color: #8b5cf6;
                    background: white;
                    box-shadow: 0 0 0 3px rgba(139, 92, 246, 0.1);
                }

                .modal-footer {
                    padding: 16px 20px;
                    display: flex;
                    justify-content: flex-end;
                    gap: 12px;
                    border-top: 1px solid #f1f5f9;
                }

                .btn-cancel {
                    background: none;
                    border: 1px solid transparent;
                    padding: 8px 16px;
                    border-radius: 8px;
                    color: #64748b;
                    font-weight: 500;
                    cursor: pointer;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                }

                .btn-cancel:hover {
                    background: #f1f5f9;
                    color: #475569;
                }

                .btn-generate {
                    background: linear-gradient(135deg, #6366f1, #8b5cf6);
                    border: none;
                    padding: 8px 18px;
                    border-radius: 8px;
                    color: white;
                    font-weight: 500;
                    cursor: pointer;
                    font-size: 0.9rem;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    transition: all 0.2s;
                    box-shadow: 0 4px 6px -1px rgba(99, 102, 241, 0.3);
                }

                .btn-generate:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 6px 8px -1px rgba(99, 102, 241, 0.4);
                }
                
                .btn-generate:active {
                    transform: translateY(0);
                }

                .btn-generate:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                    transform: none;
                }
            `}</style>
        </div>
    );
};

export default AIPromptModal;
