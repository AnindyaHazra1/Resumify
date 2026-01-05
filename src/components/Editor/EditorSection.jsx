import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const EditorSection = ({ title, icon: Icon, children, isOpen: initialIsOpen = false }) => {
  const [isOpen, setIsOpen] = useState(initialIsOpen);

  return (
    <div className={`editor-section ${isOpen ? 'open' : ''}`}>
      <button
        className="section-header"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="header-title">
          {Icon && <Icon size={18} className="section-icon" />}
          <h3>{title}</h3>
        </div>
        <div className="icon-wrapper">
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </div>
      </button>

      {isOpen && (
        <div className="section-content">
          {children}
        </div>
      )}

      <style jsx="true">{`
        .editor-section {
          background: transparent;
          border-bottom: 1px solid hsl(var(--color-border));
          transition: background-color 0.2s;
        }
        
        .editor-section.open {
            background: transparent; 
        }

        .section-header {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.5rem 0.5rem;
          background: none;
          cursor: pointer;
          color: hsl(var(--color-text-main));
          text-align: left;
        }
        
        .section-header:hover {
            color: hsl(var(--color-primary));
        }
        
        .section-header:hover .section-icon {
            color: hsl(var(--color-primary));
        }

        .header-title {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .section-icon {
          color: hsl(var(--color-text-muted));
          transition: color 0.2s;
        }

        .section-header h3 {
          font-size: 1.1rem;
          font-weight: 600;
          margin: 0;
          letter-spacing: -0.01em;
        }
        
        .icon-wrapper {
            color: hsl(var(--color-text-muted));
        }

        .section-content {
          padding: 0 0.5rem 2rem 0.5rem;
          animation: slideDown 0.3s ease-out;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default EditorSection;
