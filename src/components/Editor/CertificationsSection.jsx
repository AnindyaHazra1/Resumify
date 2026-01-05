import { Award, Trash2, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';

const CertificationsSection = () => {
    const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
    const { certifications } = resumeData;

    const handleAdd = () => {
        addArrayItem('certifications', {
            name: '',
            issuer: '',
            date: ''
        });
    };

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        updateArrayItem('certifications', id, { [name]: value });
    };

    return (
        <EditorSection title="Certifications" icon={Award}>
            <div className="items-container">
                {certifications.map((cert, index) => (
                    <div key={cert.id} className="item-card">
                        <div className="item-header">
                            <h4>Certification {index + 1}</h4>
                            <button
                                className="btn-icon-danger"
                                onClick={() => removeArrayItem('certifications', cert.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="form-group full-width">
                                <label>Certification Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={cert.name}
                                    onChange={(e) => handleChange(cert.id, e)}
                                    placeholder="e.g. AWS Certified Solutions Architect"
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Issuing Organization</label>
                                <input
                                    type="text"
                                    name="issuer"
                                    value={cert.issuer}
                                    onChange={(e) => handleChange(cert.id, e)}
                                    placeholder="e.g. Amazon Web Services"
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Date / Year</label>
                                <input
                                    type="text"
                                    name="date"
                                    value={cert.date}
                                    onChange={(e) => handleChange(cert.id, e)}
                                    placeholder="e.g. 2023"
                                    className="input"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button className="btn btn-secondary add-btn" onClick={handleAdd}>
                    <Plus size={16} />
                    Add Certification
                </button>
            </div>

            <style jsx="true">{`
        /* Reuse generic editor styles */
        .items-container { display: flex; flex-direction: column; gap: 1rem; }
        .item-card { padding: 1rem; background: hsl(var(--color-surface)); border: 1px solid hsl(var(--color-border)); border-radius: var(--radius-md); }
        .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; }
        .item-header h4 { font-size: 0.9rem; font-weight: 600; color: hsl(var(--color-primary)); margin: 0; }
        .btn-icon-danger { background: none; border: none; color: hsl(var(--color-text-muted)); cursor: pointer; padding: 4px; }
        .btn-icon-danger:hover { color: #ef4444; }
        .add-btn { width: 100%; justify-content: center; border-style: dashed; }
        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .full-width { grid-column: 1 / -1; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        label { font-size: 0.8rem; font-weight: 500; color: hsl(var(--color-text-muted)); }
      `}</style>
        </EditorSection>
    );
};

export default CertificationsSection;
