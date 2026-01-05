import { Download, RotateCcw, FileDown } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import { useState } from 'react';
import ConfirmModal from '../UI/ConfirmModal';
import ThemeSelector from '../UI/ThemeSelector';
import FontSelector from '../UI/FontSelector';
import Logo from '../../assets/logo.png'; // Import the logo

const AppLayout = ({ editor, preview }) => {
  const { resetResume, resumeData, handleThemeChange, handleFontChange } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleExportPDF = () => {
    const originalTitle = document.title;
    const name = resumeData.personal?.fullName?.replace(/\s+/g, '_') || 'Resume';
    document.title = `${name}_Resume_Resumify`;
    window.print();
    // Restore title after print dialog closes (print is blocking in most browsers)
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
            <FontSelector
              currentFont={resumeData.theme?.font}
              onFontChange={handleFontChange}
            />
            <ThemeSelector
              currentColor={resumeData.theme?.color}
              onThemeChange={handleThemeChange}
            />
            <button className="btn btn-danger" onClick={() => setIsResetModalOpen(true)}>
              <RotateCcw size={16} />
              <span className="btn-text">Reset</span>
            </button>
            <div className="divider"></div>
            <button className="btn btn-secondary" onClick={handleExportDOCX} disabled={isExporting}>
              <FileDown size={16} />
              {isExporting ? 'Generating...' : 'Word'}
            </button>
            <button className="btn btn-primary" onClick={handleExportPDF}>
              <Download size={16} />
              PDF
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Split */}
      <main className="main-content">
        <div className="split-container">
          <div className="editor-pane">
            <div className="pane-content">
              <h2 className="editor-title">Build Your Resume</h2>
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
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(12px);
          height: 70px;
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
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .brand-logo {
            width: 36px; /* Slightly larger for image */
            height: 36px;
            /* Removed background and box-shadow to let the logo shine */
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .brand h1 {
          font-family: 'Outfit', sans-serif;
          font-size: 1.5rem;
          font-weight: 700;
          /* Sophisticated gradient: Dark Slate to Vibrant Blue */
          background: linear-gradient(120deg, #1e293b 0%, #2563eb 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(59, 130, 246, 0.1); /* Subtle glow */
        }

        .actions {
          display: flex;
          align-items: center;
          gap: 0.75rem;
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
        }

        .split-container {
          display: flex;
          height: 100%;
          max-width: 1920px;
          margin: 0 auto;
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

        @media (max-width: 1024px) {
          .split-container {
            flex-direction: column;
          }
          
          .editor-pane {
             max-width: 100%;
             border-right: none;
             border-bottom: 1px solid hsl(var(--color-border));
          }
        }
      `}</style>
    </div>
  );
};

export default AppLayout;
