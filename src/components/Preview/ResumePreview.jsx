import { useResume } from '../../context/ResumeContext';
import { forwardRef } from 'react';

const ResumePreview = forwardRef((props, ref) => {
    const { resumeData } = useResume();
    const { personal, education, experience, skills, projects, certifications, languages } = resumeData;

    const hasData = (section) => section && section.length > 0;

    // Helper to darken a hex color by a percentage (0-100)
    const darkenColor = (hex, percent) => {
        if (!hex) return '#ea580c'; // default orange

        let color = hex.replace(/^#/, '');
        if (color.length === 3) color = color.split('').map(c => c + c).join('');

        const num = parseInt(color, 16);
        let r = (num >> 16) + Math.round(-2.55 * percent); // -2.55 * percent to darken
        let g = ((num >> 8) & 0x00FF) + Math.round(-2.55 * percent);
        let b = (num & 0x0000FF) + Math.round(-2.55 * percent);

        return '#' + (
            0x1000000 +
            (r < 0 ? 0 : r > 255 ? 255 : r) * 0x10000 +
            (g < 0 ? 0 : g > 255 ? 255 : g) * 0x100 +
            (b < 0 ? 0 : b > 255 ? 255 : b)
        ).toString(16).slice(1);
    };

    // Calculate a darker accent color for the dots based on the selected theme (approx 35% darker)
    // If default peach (#ffe4d1) is selected, this naturally becomes a nice brownish-orange.
    const dotColor = darkenColor(resumeData.theme?.color, 35);

    // Adjust base font size for specific fonts that appear smaller (e.g., Times New Roman)
    const getFontSize = () => {
        const font = resumeData.theme?.font || 'Calibri';
        // Serif fonts usually need to be larger to match the readability of Sans-Serif
        if (font.includes('Times') || font.includes('Garamond') || font.includes('Georgia') || font.includes('Cambria')) {
            return '11.5pt';
        }
        return '10.5pt';
    };

    return (
        <div className="resume-preview-container">
            <div className="a4-page" ref={ref}>
                {/* Table structure ensures header/footer spacing repeats on every print page */}
                <table className="print-table">
                    <thead>
                        <tr>
                            <td>
                                <div className="page-header-space"></div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <div className="page-content">
                                    {/* Header */}
                                    <header className="resume-header">
                                        <h1 className="name">{personal.fullName || 'YOUR NAME'}</h1>
                                        {personal.jobTitle && <p className="job-title">{personal.jobTitle}</p>}
                                        <div className="contact-info">
                                            {[
                                                personal.phone,
                                                personal.email,
                                                personal.linkedin?.replace(/^https?:\/\//, ''),
                                                personal.location
                                            ].filter(Boolean).flatMap((item, index, array) => [
                                                <span key={`item-${index}`}>{item}</span>,
                                                index < array.length - 1 && (
                                                    <span key={`dot-${index}`} className="dot" style={{ color: dotColor }}>
                                                        <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <circle cx="3" cy="3" r="3" fill="currentColor" />
                                                        </svg>
                                                    </span>
                                                )
                                            ]).filter(Boolean)}
                                        </div>
                                        <hr className="header-line" />
                                    </header>

                                    {/* Summary */}
                                    {personal.summary && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>PROFESSIONAL SUMMARY</h2>
                                            <p className="summary-text">{personal.summary}</p>
                                        </section>
                                    )}

                                    {/* Skills */}
                                    {hasData(skills) && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>SKILLS</h2>
                                            <div className="skills-content">
                                                <ul className="bullet-list">
                                                    {skills.map(s => (
                                                        <li key={s.id}>{s.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </section>
                                    )}

                                    {/* Experience */}
                                    {hasData(experience) && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>INTERNSHIP & WORK EXPERIENCE</h2>
                                            <div className="section-content">
                                                {experience.map((exp) => (
                                                    <div key={exp.id} className="experience-item">
                                                        <div className="exp-left">
                                                            <span className="exp-date">
                                                                {exp.startDate} {exp.endDate ? `- ${exp.endDate}` : ''}
                                                            </span>
                                                        </div>
                                                        <div className="exp-right">
                                                            <div className="exp-header">
                                                                <h3 className="role">{exp.role}</h3>
                                                                <p className="company">{exp.company}{exp.location ? `, ${exp.location}` : ''}</p>
                                                            </div>
                                                            {exp.description && (
                                                                <div className="item-description">
                                                                    <ul className="bullet-list">
                                                                        {exp.description.split('\n').map((line, i) => (
                                                                            <li key={i}>{line.replace(/^[•-]\s*/, '')}</li>
                                                                        ))}
                                                                    </ul>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Education */}
                                    {hasData(education) && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>EDUCATION</h2>
                                            <div className="section-content">
                                                {education.map((edu) => (
                                                    <div key={edu.id} className="education-item">
                                                        <div className="exp-left">
                                                            <span className="exp-date">
                                                                {edu.startDate} - {edu.endDate}
                                                            </span>
                                                        </div>
                                                        <div className="exp-right">
                                                            <h3 className="degree">
                                                                {edu.degree}
                                                                {edu.fieldOfStudy ? ` (${edu.fieldOfStudy})` : ''}
                                                                {edu.board ? ` | ${edu.board}` : ''}
                                                            </h3>
                                                            <p className="school">{edu.institution}{edu.location ? `, ${edu.location}` : ''}</p>
                                                            {edu.score && <p className="score">CGPA/Percentage: {edu.score}</p>}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Projects */}
                                    {hasData(projects) && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>PROJECTS</h2>
                                            <div className="section-content">
                                                {projects.map((proj) => (
                                                    <div key={proj.id} className="project-item">
                                                        <h3 className="project-name">
                                                            {proj.name}
                                                            {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" className="project-link"> | Link ↗</a>}
                                                        </h3>
                                                        <p className="project-description">{proj.description}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </section>
                                    )}

                                    {/* Certifications */}
                                    {hasData(certifications) && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>CERTIFICATIONS & TRAININGS</h2>
                                            <ul className="bullet-list">
                                                {certifications.map(cert => (
                                                    <li key={cert.id}>
                                                        <strong>{cert.name}</strong>, {cert.issuer}, {cert.date}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}

                                    {/* Languages */}
                                    {hasData(languages) && (
                                        <section className="resume-section">
                                            <h2 className="section-title" style={{ backgroundColor: resumeData.theme?.color || '#ffe4d1' }}>LANGUAGES KNOWN</h2>
                                            <ul className="bullet-list">
                                                {languages.map(l => (
                                                    <li key={l.id}>{l.name}{l.proficiency ? ` (${l.proficiency})` : ''}</li>
                                                ))}
                                            </ul>
                                        </section>
                                    )}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                <div className="page-footer-space"></div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <style jsx="true">{`
        .resume-preview-container {
          display: flex;
          justify-content: center;
        }

        .a4-page {
            width: 210mm;
            min-height: 297mm;
            padding: 10mm 12mm; /* Reduced padding to fit more content */
            background: white;
            font-family: ${resumeData.theme?.font || 'Calibri'}, 'Arial', sans-serif;
            color: #222;
            font-size: ${getFontSize()};
            line-height: 1.4;
            box-sizing: border-box;
        }

        .print-table {
            width: 100%;
        }

        .page-header-space {
            height: 0; /* Hidden in web view */
        }
        
        .page-footer-space {
            height: 0;
        }

        /* Reset default margins for all elements inside preview to control spacing precisely */
        .a4-page p, .a4-page ul, .a4-page h1, .a4-page h2, .a4-page h3, .a4-page h4, .a4-page h5, .a4-page h6,
        .section-content, .skills-content, .item-description {
            margin: 0;
            padding: 0;
        }

        /* Header */
        .resume-header {
            text-align: center;
            margin-bottom: 0.8rem; /* Compact header margin */
        }


        .name {
            font-size: 24pt;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.1rem;
        }

        .job-title {
            font-size: 11pt;
            text-transform: uppercase;
            color: #444;
            margin-bottom: 0.4rem;
            font-weight: 500;
        }
        
        .header-line {
            border: 0;
            border-top: 1px solid #ccc;
            margin: 0.3rem 0;
            width: 100%;
        }

        .contact-info {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;
            color: #555;
            flex-wrap: wrap; /* Prevent overflow */
        }
        
        .dot {
             display: flex;
             align-items: center;
             justify-content: center;
             height: 100%;
        }

        /* Sections */
        .resume-section {
          margin-bottom: 0.6rem;
        }

        .a4-page .section-title {
          font-size: 11pt;
          font-weight: 700;
          text-transform: uppercase;
          background-color: #ffe4d1; /* Peach color */
          padding: 4px 8px;
          margin-bottom: 0.5rem;
          letter-spacing: 0.5px;
          color: #000;
        }

        /* Lists */
        .a4-page .bullet-list {
            list-style-type: disc;
            padding-left: 1.2rem;
            margin: 0;
        }
        
        .a4-page .bullet-list li {
            margin-bottom: 0.1rem;
        }

        /* Experience Layout */
        .experience-item, .education-item {
             display: flex;
             margin-bottom: 0.5rem;
        }

        .experience-item:last-child, .education-item:last-child {
            margin-bottom: 0;
        }
        
        .exp-left {
            width: 120px;
            flex-shrink: 0;
            padding-right: 1rem;
            font-size: 10pt;
            color: #444;
            font-weight: 500;
        }
        
        .exp-right {
            flex: 1;
        }
        
        .role, .degree {
            font-weight: 600;
            font-size: 11pt;
            margin: 0;
        }
        
        .company, .school {
            font-weight: 400;
            font-style: italic;
            margin-bottom: 0.1rem;
        }
        
        .score {
            font-size: 0.95em;
            font-weight: 600;
        }

        /* Projects */
        .project-item {
            margin-bottom: 0.4rem;
        }

        .project-item:last-child {
            margin-bottom: 0;
        }
        
        .project-name {
            font-size: 11pt;
            font-weight: 700;
            margin: 0 0 0.1rem 0;
        }
        
        .project-link {
            font-size: 0.8em;
            font-weight: normal;
            color: #2563eb;
            text-decoration: none;
        }
        
        .summary-text {
            text-align: justify;
        }
      `}</style>
            <style jsx global="true">{`
        @media print {
            @page {
                size: A4;
                margin: 0 !important; /* Forces disable of browser headers/footers */
            }
            
            html, body {
                width: 210mm;
                height: 297mm;
                margin: 0 !important;
                padding: 0 !important;
                background: white;
            }
            
            /* Hide UI Elements */
            .app-header, 
            .editor-pane, 
            .btn,
            .actions,
            .divider,
            .add-btn,
            .btn-icon-danger {
                display: none !important;
            }

            /* Adjust Layout Containers for Print */
            .app-layout,
            .main-content,
            .split-container,
            .preview-pane,
            .preview-wrapper,
            .resume-preview-container {
                display: block !important;
                width: 100% !important;
                height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                overflow: visible !important;
                background: white !important;
                border: none !important;
                box-shadow: none !important;
            }

            /* Table Layout for Print Spacing */
            .print-table {
                width: 100% !important;
            }
            
            /* Spacers repeat on every page! */
            .page-header-space {
                height: 8mm !important; /* Minimized Top Margin */
                display: block !important;
            }
            
            .page-footer-space {
                height: 8mm !important; /* Minimized Bottom Margin */
                display: block !important;
            }

            /* Resume Page Styles */
            .a4-page {
                box-shadow: none !important;
                margin: 0 !important;
                width: 100% !important;
                min-height: 297mm !important;
                /* Remove container padding, rely on the table spacers */
                padding: 0 12mm !important; 
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }

            thead {
                display: table-header-group !important; /* This is CRITICAL for repeating headers */
            }

            tfoot {
                display: table-footer-group !important; /* This is CRITICAL for repeating footers */
            }

            .section-title {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
            }
            
            /* Content Break Rules */
            .resume-section, 
            .experience-item, 
            .education-item, 
            .project-item {
                break-inside: avoid;
                page-break-inside: avoid;
            }
            
            .experience-item, .education-item, .project-item {
                 margin-bottom: 0.5rem; /* Tighter item spacing */
            }
        }
      `}</style>
        </div>
    );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;
