import { Palette, RotateCcw, Check, Plus } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const PRESET_COLORS = [
  '#2563eb', // Blue (Default-ish)
  '#0f172a', // Slate
  '#059669', // Emerald
  '#7c3aed', // Violet
  '#db2777', // Pink
  '#dc2626', // Red
  '#ea580c', // Orange
  '#0891b2', // Cyan
];

const DEFAULT_COLOR = '#2563eb';

const ThemeSelector = ({ currentColor, onThemeChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorSelect = (color) => {
    onThemeChange(color);
    // Don't close immediately so user can see selection
  };

  const handleCustomClick = () => {
    inputRef.current?.click();
  };

  const handleCustomChange = (e) => {
    onThemeChange(e.target.value);
    // Keep dropdown open or close? Maybe keep open to see result.
  };

  return (
    <div className="theme-selector" ref={dropdownRef}>
      <div className="selector-trigger" onClick={() => setIsOpen(!isOpen)} title="Change Accent Color">
        <div className="color-preview" style={{ backgroundColor: currentColor || DEFAULT_COLOR }}>
          <div className="shine"></div>
        </div>
        <div className="trigger-label">Color</div>
      </div>

      {isOpen && (
        <div className="theme-dropdown">
          <div className="dropdown-header">Premium Colors</div>
          <div className="color-grid">
            {PRESET_COLORS.map((color) => (
              <button
                key={color}
                className={`color-option ${currentColor === color ? 'selected' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => handleColorSelect(color)}
                aria-label={`Select color ${color}`}
              >
                {currentColor === color && <Check size={14} color="#fff" strokeWidth={3} />}
              </button>
            ))}
          </div>

          <div className="divider"></div>

          <div className="custom-section">
            <div className="dropdown-header">Custom</div>
            <div className="custom-actions">
              <div className="custom-picker-btn" onClick={handleCustomClick}>
                <div className="rainbow-gradient"></div>
                <Plus size={14} className="plus-icon" />
                <span className="custom-text">Pick Color</span>
              </div>
              <button
                className="reset-action"
                onClick={() => onThemeChange(DEFAULT_COLOR)}
                title="Reset to Default"
              >
                <RotateCcw size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="color"
        className="hidden-input"
        value={currentColor || DEFAULT_COLOR}
        onChange={handleCustomChange}
      />

      <style jsx="true">{`
        .theme-selector {
            position: relative;
            margin-right: 12px;
            padding-right: 12px;
            border-right: 1px solid hsl(var(--color-border));
        }

        .selector-trigger {
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 4px 10px 4px 4px;
            background: white;
            border: 1px solid #e2e8f0;
            border-radius: 99px;
            cursor: pointer;
            transition: all 0.2s ease;
            box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .selector-trigger:hover {
            border-color: hsl(var(--color-primary));
            transform: translateY(-1px);
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }

        .color-preview {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            position: relative;
            border: 2px solid white;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.1);
            overflow: hidden;
        }

        .shine {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 50%);
        }

        .trigger-label {
            font-size: 0.85rem;
            font-weight: 600;
            color: #475569;
            margin-right: 2px;
        }

        .theme-dropdown {
            position: absolute;
            top: calc(100% + 8px);
            right: -10px;
            width: 240px;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(12px);
            border: 1px solid rgba(255,255,255,0.5);
            border-radius: 12px;
            padding: 12px;
            box-shadow: 
                0 10px 25px -5px rgba(0, 0, 0, 0.1), 
                0 8px 10px -6px rgba(0, 0, 0, 0.1),
                0 0 0 1px rgba(0,0,0,0.05);
            z-index: 100;
            transform-origin: top right;
            animation: slideDown 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-10px) scale(0.95); }
            to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .dropdown-header {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #94a3b8;
            font-weight: 700;
            margin-bottom: 8px;
        }

        .color-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 12px;
        }

        .color-option {
            width: 100%;
            aspect-ratio: 1;
            border-radius: 50%;
            border: none;
            cursor: pointer;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .color-option:hover {
            transform: scale(1.15);
            z-index: 2;
        }

        .color-option.selected {
            transform: scale(1.1);
            box-shadow: 0 0 0 2px white, 0 0 0 4px currentColor;
        }

        .divider {
            height: 1px;
            background: #f1f5f9;
            margin: 0 -12px 12px -12px;
        }

        .custom-actions {
            display: flex;
            gap: 8px;
        }

        .custom-picker-btn {
            flex: 1;
            display: flex;
            align-items: center;
            gap: 8px;
            padding: 8px 12px;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .custom-picker-btn:hover {
            background: #f1f5f9;
            border-color: #cbd5e1;
        }

        .rainbow-gradient {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: conic-gradient(red, yellow, lime, aqua, blue, magenta, red);
            border: 2px solid white;
            box-shadow: 0 1px 2px rgba(0,0,0,0.1);
        }

        .custom-text {
            font-size: 0.85rem;
            font-weight: 500;
            color: #334155;
        }

        .reset-action {
            width: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: #fff0f0;
            color: #ef4444;
            border: 1px solid #fecaca;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.2s;
        }

        .reset-action:hover {
            background: #fee2e2;
            transform: rotate(-15deg);
        }

        .hidden-input {
            position: absolute;
            width: 0;
            height: 0;
            opacity: 0;
            pointer-events: none;
        }

        @media (max-width: 768px) {
           .theme-selector {
             margin-right: 8px;
             padding-right: 8px;
           }
           
           .theme-dropdown {
               right: -40px; /* Shift a bit to fit on screen */
               width: 220px;
           }
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;
