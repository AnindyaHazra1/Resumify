import { Type, ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const FONT_OPTIONS = [
    { name: 'Calibri', value: 'Calibri' },
    { name: 'Arial', value: 'Arial' },
    { name: 'Helvetica', value: 'Helvetica' },
    { name: 'Roboto', value: 'Roboto' },
    { name: 'Times New Roman', value: '"Times New Roman"' },
    { name: 'Georgia', value: 'Georgia' },
    { name: 'Garamond', value: 'Garamond' },
    { name: 'Cambria', value: 'Cambria' },
];

const FontSelector = ({ currentFont, onFontChange }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const selectedFont = FONT_OPTIONS.find(f => f.value === currentFont) || FONT_OPTIONS[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        onFontChange(value);
        setIsOpen(false);
    };

    return (
        <div className="font-selector" ref={dropdownRef}>
            <button
                className={`selector-trigger ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                title="Change Resume Font"
            >
                <div className="icon-wrapper">
                    <Type size={16} color="#444" />
                </div>
                <span className="current-font-name" style={{ fontFamily: selectedFont.value }}>
                    {selectedFont.name}
                </span>
                <ChevronDown size={14} className={`chevron ${isOpen ? 'rotate' : ''}`} />
            </button>

            {isOpen && (
                <div className="font-dropdown">
                    <div className="dropdown-header">Select Font</div>
                    <ul className="font-list">
                        {FONT_OPTIONS.map((font) => (
                            <li
                                key={font.value}
                                onClick={() => handleSelect(font.value)}
                                className={currentFont === font.value ? 'selected' : ''}
                                style={{ fontFamily: font.value }}
                            >
                                {font.name}
                                {currentFont === font.value && <div className="check-indicator"></div>}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <style jsx="true">{`
        .font-selector {
            position: relative;
            z-index: 50;
        }

        .selector-trigger {
            display: flex;
            align-items: center;
            background: linear-gradient(to bottom, #ffffff, #f9f9f9);
            border: 1px solid #e2e8f0;
            border-radius: 6px; /* Tighter radius */
            padding: 3px 8px; /* Minimal padding */
            cursor: pointer;
            transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
            height: 28px; /* Very compact height */
            min-width: 120px; /* Reduced width */
            color: #334155;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .selector-trigger:hover {
            border-color: hsl(var(--color-primary));
            transform: translateY(-0.5px);
            box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.1);
            color: hsl(var(--color-primary));
        }
        
        .selector-trigger.active {
            border-color: hsl(var(--color-primary));
            box-shadow: 0 0 0 2px hsl(var(--color-primary) / 0.15);
            background: #ffffff;
        }

        .icon-wrapper {
            display: flex;
            align-items: center;
            margin-right: 6px;
            color: hsl(var(--color-primary));
            opacity: 1;
            transform: scale(0.9); /* Smaller icon */
        }

        .current-font-name {
            flex: 1;
            text-align: left;
            font-size: 0.8rem; /* Small font */
            margin-right: 4px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-weight: 500;
        }

        .chevron {
            opacity: 0.4;
            transition: transform 0.3s ease;
            transform: scale(0.9);
        }

        .chevron.rotate {
            transform: rotate(180deg) scale(0.9);
            opacity: 1;
            color: hsl(var(--color-primary));
        }

        .font-dropdown {
            position: absolute;
            top: calc(100% + 4px);
            right: 0; 
            width: 160px; /* Very narrow dropdown */
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.4);
            border-radius: 8px;
            box-shadow: 
                0 4px 12px -2px rgba(0, 0, 0, 0.1), 
                0 0 0 1px rgba(0,0,0,0.05);
            padding: 4px;
            animation: scaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: top right;
        }

        @media (max-width: 768px) {
            .font-dropdown {
                right: auto;
                left: 0; /* Align left on mobile to avoid off-screen to the right if button is on edge */
                transform-origin: top left;
                width: 150px;
            }
        }

        @keyframes scaleIn {
            from { opacity: 0; transform: scale(0.95) translateY(-5px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .dropdown-header {
            font-size: 0.6rem;
            font-weight: 700;
            text-transform: uppercase;
            color: #94a3b8;
            padding: 4px 8px 2px;
            letter-spacing: 0.05em;
        }

        .font-list {
            list-style: none;
            max-height: 200px;
            overflow-y: auto;
        }

        .font-list li {
            padding: 6px 8px;
            cursor: pointer;
            border-radius: 4px;
            font-size: 0.85rem;
            color: #1e293b;
            display: flex;
            align-items: center;
            justify-content: space-between;
            transition: all 0.2s ease;
            margin-bottom: 1px;
        }

        .font-list li:hover {
            background: linear-gradient(90deg, hsl(var(--color-primary) / 0.1), transparent);
            color: hsl(var(--color-primary));
            padding-left: 12px;
        }

        .font-list li.selected {
            background: hsl(var(--color-primary) / 0.1);
            color: hsl(var(--color-primary));
            font-weight: 600;
        }

        .check-indicator {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background-color: hsl(var(--color-primary));
            box-shadow: 0 0 0 1px white;
        }

        /* Custom scrollbar */
        .font-list::-webkit-scrollbar { width: 3px; }
        .font-list::-webkit-scrollbar-thumb { 
            background-color: #cbd5e1; 
            border-radius: 20px; 
            border: 1px solid transparent; 
            background-clip: content-box; 
        }
        .font-list::-webkit-scrollbar-thumb:hover { background-color: #94a3b8; }
      `}</style>
        </div>
    );
};

export default FontSelector;
