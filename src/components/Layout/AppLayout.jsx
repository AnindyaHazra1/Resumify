import { Download, RotateCcw, FileDown, Edit3, Eye } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useState } from 'react';
import ConfirmModal from '../UI/ConfirmModal';
import ThemeSelector from '../UI/ThemeSelector';
import FontSelector from '../UI/FontSelector';
import Logo from '../../assets/logo.png';

const AppLayout = ({ editor, preview }) => {
  const { resetResume, resumeData, handleThemeChange, handleFontChange } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState('editor'); // 'editor' or 'preview'

  const handleExportPDF = () => {
    const originalTitle = document.title;
    const name = resumeData.personal?.fullName?.replace(/\s+/g, '_') || 'Resume';
    document.title = `${name}_Resume_Resumify`;
    window.print();
    document.title = originalTitle;
  };

  const handleExportDOCX = async () => {
    setIsExporting(true);
    try {
      const { exportToDocx } = await import('../../utils/docxExport');
      await exportToDocx(resumeData);
    } catch (error) {
      console.error("Export failed", error);
      alert("Failed to export DOCX");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <header className="app-header">
        <div className="container header-content">
          <div className="brand">
            <div className="brand-logo">
              <img src={Logo} alt="Resumify Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <h1>Resumify</h1>
          </div>
          <div className="actions">
            <div className="desktop-actions">
              <FontSelector
                currentFont={resumeData.theme?.font}
                onFontChange={handleFontChange}
              />
              <ThemeSelector
                currentColor={resumeData.theme?.color}
                onThemeChange={handleThemeChange}
              />
            </div>

            <button className="btn btn-danger icon-only-mobile" onClick={() => setIsResetModalOpen(true)} title="Reset">
              <RotateCcw size={18} />
              <span className="btn-text">Reset</span>
            </button>
            <div className="divider"></div>
            <button className="btn btn-secondary icon-only-mobile" onClick={handleExportDOCX} disabled={isExporting} title="Export Word">
              <FileDown size={18} />
              <span className="btn-text">{isExporting ? '...' : 'Word'}</span>
            </button>
            <button className="btn btn-primary icon-only-mobile" onClick={handleExportPDF} title="Export PDF">
              <Download size={18} />
              <span className="btn-text">PDF</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="main-content">
        {/* Mobile Tab Switcher */}
        <div className="mobile-tabs">
          <button
            className={`tab-btn ${activeMobileTab === 'editor' ? 'active' : ''}`}
            onClick={() => setActiveMobileTab('editor')}
          >
            <Edit3 size={16} /> Editor
          </button>
          <button
            className={`tab-btn ${activeMobileTab === 'preview' ? 'active' : ''}`}
            onClick={() => setActiveMobileTab('preview')}
          >
            <Eye size={16} /> Preview
          </button>
        </div>

        <div className={`split-container mobile-tab-${activeMobileTab}`}>
          <div className="editor-pane">
            <div className="pane-content">
              <div className="editor-header-mobile">
                <h2 className="editor-title">Build Your Resume</h2>
                <div className="mobile-settings-row">
                  {/* Fallback settings for mobile if they don't fit in header */}
                  <FontSelector
                    currentFont={resumeData.theme?.font}
                    onFontChange={handleFontChange}
                  />
                  <ThemeSelector
                    currentColor={resumeData.theme?.color}
                    onThemeChange={handleThemeChange}
                  />
                </div>
              </div>

              <p className="editor-subtitle">Fill in your details below. The preview updates automatically.</p>
              <div className="editor-forms">
                {editor}
              </div>
            </div>
          </div>
          <div className="preview-pane">
            <div className="preview-wrapper">
              {preview}
            </div>
          </div>
        </div>
      </main>

      <ConfirmModal
        isOpen={isResetModalOpen}
        onClose={() => setIsResetModalOpen(false)}
        onConfirm={resetResume}
        title="Reset Resume Data?"
        message="This will delete all your entered details and reset the resume to its default state. This action cannot be undone."
        confirmText="Yes, Reset"
        isDanger={true}
      />

      <style jsx="true">{`
        .app-layout {
          display: flex;
          flex-direction: column;
          height: 100vh;
          background: hsl(var(--color-background));
        }

        .app-header {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          height: 64px;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 50;
          border-bottom: 1px solid hsl(var(--color-border));
        }

        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          padding: 0 1.5rem;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .brand-logo {
            width: 32px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .brand h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.35rem;
          font-weight: 700;
          background: linear-gradient(120deg, #1e293b 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .desktop-actions {
          display: flex;
          gap: 0.5rem;
          margin-right: 0.5rem;
        }
        
        .divider {
            width: 1px;
            height: 24px;
            background: hsl(var(--color-border));
            margin: 0 0.25rem;
        }
        
        .btn-text {
            font-size: 0.85rem;
        }

        .main-content {
          flex: 1;
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .mobile-tabs {
          display: none;
          background: white;
          border-bottom: 1px solid hsl(var(--color-border));
          padding: 0.5rem 1rem;
          gap: 1rem;
          justify-content: center;
        }

        .tab-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.5rem;
          border-radius: var(--radius-md);
          font-weight: 600;
          font-size: 0.9rem;
          color: hsl(var(--color-text-muted));
          background: transparent;
          border: 1px solid transparent;
          transition: all 0.2s;
        }

        .tab-btn.active {
          background: hsl(var(--color-primary-light));
          color: hsl(var(--color-primary));
          border-color: hsl(var(--color-primary) / 0.2);
        }

        .split-container {
          display: flex;
          height: 100%;
          max-width: 1920px;
          margin: 0 auto;
          width: 100%;
        }

        .editor-pane {
          flex: 1;
          max-width: 600px;
          overflow-y: auto;
          background: hsl(var(--color-surface));
          border-right: 1px solid hsl(var(--color-border));
        }
        
        .pane-content {
           padding: 3rem 2.5rem;
        }
        
        .editor-title {
            font-size: 1.75rem;
            font-weight: 700;
            color: hsl(var(--color-text-main));
            margin-bottom: 0.5rem;
            letter-spacing: -0.02em;
        }
        
        .editor-subtitle {
            color: hsl(var(--color-text-muted));
            margin-bottom: 2.5rem;
        }
        
        .editor-forms {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .preview-pane {
          flex: 1.5;
          overflow-y: auto;
          background: hsl(var(--color-background));
          display: flex;
          justify-content: center;
          padding: 3rem;
        }
        
        .preview-wrapper {
            box-shadow: var(--shadow-print);
            margin-bottom: 3rem;
        }

        .mobile-settings-row {
          display: none;
        }

        /* Responsive Styles */
        @media (max-width: 1024px) {
          .preview-pane {
            padding: 2rem;
            align-items: flex-start; /* Better scrolling on tablets */
          }
        }

        @media (max-width: 768px) {
          .app-header {
            height: 56px;
            padding: 0;
          }
          
          .header-content {
            padding: 0 1rem;
          }

          .brand h1 {
            font-size: 1.2rem;
            display: none; /* Hide text on very small screens if needed, or keep short */
          }

          .brand-logo { 
             margin-right: 0; 
          }

          /* Hide Desktop Actions in Header */
          .desktop-actions {
            display: none;
          }

          /* Show Mobile Settings inside Editor */
          .mobile-settings-row {
            display: flex;
            gap: 0.5rem;
            margin-top: 0.5rem;
            margin-bottom: 1rem;
          }

          /* Icon Only Buttons */
          .icon-only-mobile {
            padding: 0.5rem;
          }
          .icon-only-mobile .btn-text {
            display: none;
          }
          
          .divider {
            display: none;
          }

          /* Tab System */
          .mobile-tabs {
            display: flex;
          }

          .split-container {
             flex-direction: column;
          }

          /* Hide panes based on tab */
          .mobile-tab-editor .preview-pane {
             display: none;
          }
          .mobile-tab-editor .editor-pane {
             display: block;
             width: 100%;
             border-right: none;
             max-width: 100%;
          }
          
          .mobile-tab-preview .editor-pane {
             display: none;
          }
          .mobile-tab-preview .preview-pane {
             display: flex;
             width: 100%;
             padding: 1rem 0; /* Reduce padding to give more width to scale */
             align-items: flex-start;
             justify-content: center; /* Center the preview */
             overflow-x: hidden;
          }
           
          .pane-content {
             padding: 1.5rem 1rem 8rem 1rem;
          }
          
          .preview-wrapper {
            transform: scale(0.45); /* Smaller scale for phones */
            transform-origin: top center;
            margin-bottom: -40%; /* Compensate for whitespace created by scaling down */
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
           .preview-wrapper {
             transform: scale(0.65);
           }
        }
        
        @media (min-width: 769px) {
           .brand h1 { display: block; }
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
