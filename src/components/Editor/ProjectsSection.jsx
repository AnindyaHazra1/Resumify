import { FolderGit2, Trash2, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';

const ProjectsSection = () => {
    const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
    const { projects } = resumeData;

    const handleAdd = () => {
        addArrayItem('projects', {
            name: '',
            link: '',
            description: ''
        });
    };

    const handleChange = (id, e) => {
        const { name, value } = e.target;
        updateArrayItem('projects', id, { [name]: value });
    };

    return (
        <EditorSection title="Projects" icon={FolderGit2}>
            <div className="items-container">
                {projects.map((proj, index) => (
                    <div key={proj.id} className="item-card">
                        <div className="item-header">
                            <h4>Project {index + 1}</h4>
                            <button
                                className="btn-icon-danger"
                                onClick={() => removeArrayItem('projects', proj.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Project Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={proj.name}
                                    onChange={(e) => handleChange(proj.id, e)}
                                    placeholder="e.g. E-commerce App"
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Link / Repo</label>
                                <input
                                    type="url"
                                    name="link"
                                    value={proj.link}
                                    onChange={(e) => handleChange(proj.id, e)}
                                    placeholder="e.g. github.com/user/repo"
                                    className="input"
                                />
                            </div>

                            <div className="form-group full-width">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={proj.description}
                                    onChange={(e) => handleChange(proj.id, e)}
                                    placeholder="Describe your project, tech stack used, and key features..."
                                    rows="3"
                                    className="input textarea"
                                />
                            </div>
                        </div>
                    </div>
                ))}

                <button className="btn btn-ghost add-btn" onClick={handleAdd}>
                    <Plus size={16} />
                    Add Project
                </button>
            </div>

            <style jsx="true">{`
        /* Reuse styles */
        .items-container { display: flex; flex-direction: column; gap: 1.5rem; }
        .item-card { padding: 1.25rem; border: 1px solid hsl(var(--color-border)); border-radius: var(--radius-md); background: hsl(var(--color-background)); }
        .item-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .item-header h4 { font-size: 0.9rem; font-weight: 600; color: hsl(var(--color-primary)); margin: 0; }
        .btn-icon-danger { background: none; border: none; color: hsl(var(--color-text-muted)); cursor: pointer; padding: 4px; border-radius: 4px; transition: all 0.2s; }
        .btn-icon-danger:hover { color: #ef4444; background: #fee2e2; }
        .add-btn { width: 100%; border-style: dashed; border-color: hsl(var(--color-border)); }
        .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
        .full-width { grid-column: 1 / -1; }
        .form-group { display: flex; flex-direction: column; gap: 0.4rem; }
        label { font-size: 0.8rem; font-weight: 500; color: hsl(var(--color-text-muted)); }
        .input { padding: 0.6rem; border: 1px solid hsl(var(--color-border)); border-radius: var(--radius-md); font-size: 0.9rem; width: 100%; border-color: hsl(var(--color-border)); }
        .input:focus { outline: none; border-color: hsl(var(--color-primary)); box-shadow: 0 0 0 3px hsl(var(--color-primary) / 0.1); }
        .textarea { resize: vertical; font-family: inherit; }
      `}</style>
        </EditorSection>
    );
};

export default ProjectsSection;
