import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType, ShadingType } from "docx";
import { saveAs } from "file-saver";

export const exportToDocx = async (resumeData) => {
    const { personal, education, experience, skills, projects, certifications, languages, theme } = resumeData;

    const sections = [];

    // Helper for Section Headers (Dynamic background)
    const createSectionHeader = (text) => {
        const color = theme?.color ? theme.color.replace('#', '') : "FFE4D1"; // Remove # for docx
        return new Paragraph({
            text: text,
            heading: HeadingLevel.HEADING_2,
            shading: {
                type: ShadingType.CLEAR,
                fill: color,
            },
            spacing: { before: 200, after: 100 },
        });
    };

    // 1. Header
    sections.push(
        new Paragraph({
            text: (personal.fullName || "Your Name").toUpperCase(),
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
        }),
        new Paragraph({
            text: (personal.jobTitle || "").toUpperCase(),
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
        }),
        new Paragraph({
            children: [
                new TextRun({ text: personal.phone ? `${personal.phone}  •  ` : "" }),
                new TextRun({ text: personal.email ? `${personal.email}  •  ` : "" }),
                new TextRun({ text: personal.linkedin ? `${personal.linkedin}  •  ` : "" }),
                new TextRun({ text: personal.location || "" }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
        })
    );

    // 2. Summary
    if (personal.summary) {
        sections.push(
            createSectionHeader("PROFESSIONAL SUMMARY"),
            new Paragraph({
                text: personal.summary,
                alignment: AlignmentType.JUSTIFIED,
                spacing: { after: 300 },
            })
        );
    }

    // 3. Skills
    if (skills.length > 0) {
        sections.push(createSectionHeader("SKILLS"));

        skills.forEach(s => {
            sections.push(
                new Paragraph({
                    text: s.name,
                    bullet: { level: 0 },
                    spacing: { after: 0 }, // Tight spacing for list
                })
            );
        });

        // Add some space after the list
        sections.push(new Paragraph({ spacing: { after: 200 } }));
    }

    // 4. Experience
    if (experience.length > 0) {
        sections.push(createSectionHeader("INTERNSHIP & WORK EXPERIENCE"));

        experience.forEach((exp) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.role, bold: true, size: 24 }), // 12pt
                    ],
                    spacing: { before: 100 },
                }),
                new Paragraph({
                    children: [
                        new TextRun({ text: exp.company, italics: true }),
                        new TextRun({ text: ` | ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`, bold: true }),
                    ],
                    spacing: { after: 100 },
                }),
                new Paragraph({
                    text: exp.description,
                    bullet: { level: 0 }, // Simple bullet
                    spacing: { after: 200 },
                })
            );
        });
    }

    // 5. Projects
    if (projects.length > 0) {
        sections.push(createSectionHeader("PROJECTS"));

        projects.forEach((proj) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: proj.name, bold: true, size: 24 }),
                        new TextRun({ text: proj.link ? ` (${proj.link})` : "" }),
                    ],
                    spacing: { before: 100 },
                }),
                new Paragraph({
                    text: proj.description,
                    spacing: { after: 200 },
                })
            );
        });
    }

    // 6. Education
    if (education.length > 0) {
        sections.push(createSectionHeader("EDUCATION"));

        education.forEach((edu) => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: edu.degree, bold: true }),
                        new TextRun({ text: edu.fieldOfStudy ? ` (${edu.fieldOfStudy}) ` : "" }),
                        new TextRun({ text: edu.board ? ` | ${edu.board}` : "" }),
                        new TextRun({ text: ` - ${edu.institution}${edu.location ? `, ${edu.location}` : ''}` }),
                    ],
                }),
                new Paragraph({
                    text: `${edu.startDate} - ${edu.endDate} ${edu.score ? `| Score: ${edu.score}` : ''}`,
                    spacing: { after: 200 },
                })
            );
        });
    }

    // 7. Certifications
    if (certifications && certifications.length > 0) {
        sections.push(createSectionHeader("CERTIFICATIONS & TRAININGS"));

        certifications.forEach(cert => {
            sections.push(
                new Paragraph({
                    children: [
                        new TextRun({ text: cert.name, bold: true }),
                        new TextRun({ text: `, ${cert.issuer} (${cert.date})` })
                    ],
                    bullet: { level: 0 },
                })
            );
        });
    }

    // 8. Languages
    if (languages && languages.length > 0) {
        sections.push(createSectionHeader("LANGUAGES KNOWN"));

        languages.forEach(l => {
            sections.push(
                new Paragraph({
                    text: `${l.name}${l.proficiency ? ` (${l.proficiency})` : ''}`,
                    bullet: { level: 0 },
                    spacing: { after: 0 },
                })
            );
        });

        sections.push(new Paragraph({ spacing: { after: 200 } }));
    }

    const getFontSize = () => {
        const font = theme?.font?.replace(/"/g, '') || "Calibri";
        if (font.includes('Times') || font.includes('Garamond') || font.includes('Georgia') || font.includes('Cambria')) {
            return 23; // 11.5pt
        }
        return 21; // 10.5pt
    };

    const doc = new Document({
        styles: {
            default: {
                document: {
                    run: {
                        font: theme?.font?.replace(/"/g, '') || "Calibri",
                        size: getFontSize(),
                        color: "222222",
                    },
                    paragraph: {
                        lineHeight: 280, // 1.4 equivalent
                    }
                },
            },
        },
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            width: 11906, // 210mm in twips
                            height: 16838, // 297mm in twips
                        },
                        margin: {
                            top: 567, // ~10mm
                            right: 567,
                            bottom: 567,
                            left: 567,
                        },
                    },
                },
                children: sections,
            },
        ],
    });

    const blob = await Packer.toBlob(doc);
    const fileName = `${personal.fullName ? personal.fullName.replace(/\s+/g, '_') : 'Resume'}_Resume_Resumify.docx`;
    saveAs(blob, fileName);
};
