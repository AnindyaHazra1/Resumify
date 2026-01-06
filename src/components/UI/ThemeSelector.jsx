import { Palette, RotateCcw, Check, Plus, ArrowLeft, Hash } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from "react-colorful";

const PRESET_COLORS = [
  '#2563eb', // Blue
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
  const [showCustom, setShowCustom] = useState(false);
  const dropdownRef = useRef(null);

  // Initial color for the picker if current is invalid
  const validColor = /^#[0-9A-F]{6}$/i.test(currentColor) ? currentColor : DEFAULT_COLOR;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setShowCustom(false); // Reset on close
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleColorSelect = (color) => {
    onThemeChange(color);
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
          {!showCustom ? (
            <>
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
                <div className="custom-picker-btn" onClick={() => setShowCustom(true)}>
                  <div className="rainbow-gradient"></div>
                  <Plus size={14} className="plus-icon" />
                  <span className="custom-text">Custom Color</span>
                </div>
                <button
                  className="reset-action"
                  onClick={() => onThemeChange(DEFAULT_COLOR)}
                  title="Reset to Default"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </>
          ) : (
            <div className="custom-picker-view">
              <div className="picker-header">
                <button className="back-btn" onClick={() => setShowCustom(false)}>
                  <ArrowLeft size={14} /> Back
                </button>
                <span className="header-title">Custom Color</span>
              </div>

              <div className="picker-wrapper">
                <HexColorPicker color={validColor} onChange={onThemeChange} />
              </div>

              <div className="hex-input-wrapper">
                <Hash size={14} className="hex-icon" />
                <input
                  type="text"
                  value={currentColor}
                  onChange={(e) => onThemeChange(e.target.value)}
                  className="hex-input"
                  placeholder="#000000"
                />
              </div>
            </div>
          )}
        </div>
      )}

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
            right: 0; /* Align perfectly with the right edge */
            width: 240px;
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255,255,255,0.6);
            border-radius: 12px;
            padding: 12px;
            box-shadow: 
                0 10px 30px -5px rgba(0, 0, 0, 0.15), 
                0 0 0 1px rgba(0,0,0,0.05);
            z-index: 100;
            transform-origin: top right;
            animation: slideDown 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        @keyframes slideDown {
            from { opacity: 0; transform: translateY(-8px) scale(0.96); }
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
            transition: all 0.2s;
            box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
        }

        .color-option:hover {
            transform: scale(1.1);
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

        .custom-section {
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
            width: 18px;
            height: 18px;
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
        }

        /* Custom Picker View */
        .picker-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
        }

        .back-btn {
            display: flex;
            align-items: center;
            gap: 4px;
            font-size: 0.75rem;
            color: #64748b;
            background: transparent;
            border: none;
            cursor: pointer;
            padding: 4px;
            border-radius: 4px;
        }

        .back-btn:hover {
            background: #f1f5f9;
            color: #334155;
        }
        
        .header-title {
            font-size: 0.75rem;
            font-weight: 600;
            color: #64748b;
        }

        .picker-wrapper {
            margin-bottom: 12px;
        }
        
        /* Overwrite react-colorful styles slightly */
        .react-colorful {
            width: 100% !important;
            height: 150px !important;
        }

        .hex-input-wrapper {
            display: flex;
            align-items: center;
            background: #f8fafc;
            border: 1px solid #e2e8f0;
            border-radius: 6px;
            padding: 0 8px;
        }

        .hex-icon {
            color: #94a3b8;
            margin-right: 4px;
        }

        .hex-input {
            flex: 1;
            background: transparent;
            border: none;
            height: 32px;
            font-family: monospace;
            font-size: 0.9rem;
            color: #334155;
            text-transform: uppercase;
        }

        .hex-input:focus {
            outline: none;
        }

        @media (max-width: 768px) {
           .theme-selector {
             margin-right: 8px;
             padding-right: 8px;
           }
           
           .theme-dropdown {
               right: -10px; 
               /* Ensure it doesn't cross screen width */
               width: 220px;
               max-width: 90vw;
           }
        }
      `}</style>
    </div>
  );
};

export default ThemeSelector;
