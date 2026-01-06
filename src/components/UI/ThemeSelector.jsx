import { Palette, RotateCcw } from 'lucide-react';
import { useRef } from 'react';

const ThemeSelector = ({ currentColor, onThemeChange }) => {
  const inputRef = useRef(null);
  const DEFAULT_COLOR = '#ffe4d1';

  const handleCircleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="theme-selector">
      <div className="selector-group">
        <div
          className="color-trigger"
          onClick={handleCircleClick}
          title="Change Accent Color"
        >
          <div className="color-preview" style={{ backgroundColor: currentColor || DEFAULT_COLOR }}></div>
          <div className="icon-overlay">
            <Palette size={14} color={getContrastColor(currentColor || DEFAULT_COLOR)} />
          </div>
        </div>

        <input
          ref={inputRef}
          type="color"
          className="hidden-input"
          value={currentColor || DEFAULT_COLOR}
          onChange={(e) => onThemeChange(e.target.value)}
        />

        <button
          className="reset-btn"
          onClick={() => onThemeChange(DEFAULT_COLOR)}
          title="Reset to Default Peach"
          aria-label="Reset color"
        >
          <RotateCcw size={14} />
        </button>
      </div>

      <style jsx="true">{`
        .theme-selector {
          display: flex;
          align-items: center;
          margin-right: 12px;
          padding-right: 12px;
          border-right: 1px solid hsl(var(--color-border));
        }

        @media (max-width: 768px) {
           .theme-selector {
             margin-right: 8px;
             padding-right: 8px;
             /* Keep border for separation but reduce space */
           }
        }

        .selector-group {
          display: flex;
          align-items: center;
          gap: 8px;
          background: hsl(var(--color-surface));
          padding: 4px 6px;
          border-radius: 99px;
          border: 1px solid hsl(var(--color-border));
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .color-trigger {
          position: relative;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          cursor: pointer;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 2px solid white;
          box-shadow: 0 0 0 1px hsl(var(--color-border));
          overflow: hidden;
        }

        .color-trigger:hover {
          transform: scale(1.1);
        }

        .color-preview {
          width: 100%;
          height: 100%;
        }

        .icon-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.2s;
          background: rgba(0,0,0,0.1);
        }

        .color-trigger:hover .icon-overlay {
          opacity: 1;
        }

        .hidden-input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
          pointer-events: none;
        }

        .reset-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: none;
          background: transparent;
          color: hsl(var(--color-text-muted));
          cursor: pointer;
          transition: all 0.2s;
        }

        .reset-btn:hover {
          background: hsl(var(--color-background));
          color: hsl(var(--color-text-main));
          transform: rotate(-45deg);
        }
      `}</style>
    </div>
  );
};

// Helper to decide icon color (black or white) based on background
const getContrastColor = (hexColor) => {
  // Simple check: if undefined or short, default black
  if (!hexColor) return '#000';

  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);

  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
}

export default ThemeSelector;
