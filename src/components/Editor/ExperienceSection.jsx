import { Briefcase, Trash2, Plus, Sparkles, Loader2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';
import { getAISuggestions } from '../../utils/ai-suggestion-service';
import { useState } from 'react';
import AIPromptModal from '../UI/AIPromptModal';

const ExperienceSection = () => {
    const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
    const { experience } = resumeData;
    const [generatingId, setGeneratingId] = useState(null);

    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activePromptData, setActivePromptData] = useState({ id: null, role: '' });

    const handleAdd = () => {
        addArrayItem('experience', {
            company: '',
            role: '',
            startDate: '',
            endDate: '',
            current: false,
            location: '',
            description: ''
        });
    };

    const handleChange = (id, e) => {
        const { name, value, type, checked } = e.target;
        updateArrayItem('experience', id, {
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSuggestClick = (id, role) => {
        if (!role) {
            alert("Please enter a Role / Job Title first so the AI can give relevant suggestions.");
            return;
        }

        setActivePromptData({ id, role });
        setIsModalOpen(true);
    };

    const handleGenerateContext = async (userContext) => {
        const { id, role } = activePromptData;

        // Close modal immediately
        setIsModalOpen(false);

        // Start generation
        setGeneratingId(id);

        try {
            const suggestions = await getAISuggestions(role, userContext);
            if (suggestions && suggestions.length > 0) {
                const currentExp = experience.find(e => e.id === id);
                const currentDesc = currentExp?.description || '';

                // Append suggestions. If field is not empty, add a newline.
                const newContent = suggestions.join('\n');
                const uniqueContent = currentDesc
                    ? `${currentDesc}\n${newContent}`
                    : newContent;

                updateArrayItem('experience', id, {
                    description: uniqueContent
                });
            }
        } catch (error) {
            console.error("AI Suggestion Error:", error);
        } finally {
            setGeneratingId(null);
        }
    };

    return (
        <EditorSection title="Experience" icon={Briefcase}>
            <div className="items-container">
                {experience.map((exp, index) => (
                    <div key={exp.id} className="item-card">
                        <div className="item-header">
                            <h4>Position {index + 1}</h4>
                            <button
                                className="btn-icon-danger"
                                onClick={() => removeArrayItem('experience', exp.id)}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>

                        <div className="form-grid">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    value={exp.company}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    placeholder="e.g. Google"
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Role / Job Title</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={exp.role}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    placeholder="e.g. Senior Developer"
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label>Start Date</label>
                                <input
                                    type="text"
                                    name="startDate"
                                    value={exp.startDate}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    placeholder="MM/YYYY"
                                    className="input"
                                />
                            </div>

                            <div className="form-group">
                                <label>End Date</label>
                                <input
                                    type="text"
                                    name="endDate"
                                    value={exp.endDate}
                                    disabled={exp.current}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    placeholder={exp.current ? "Present" : "MM/YYYY"}
                                    className="input"
                                />
                            </div>

                            <div className="form-group checkbox-group">
                                <input
                                    type="checkbox"
                                    name="current"
                                    checked={exp.current}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    id={`current-${exp.id}`}
                                />
                                <label htmlFor={`current-${exp.id}`}>I currently work here</label>
                            </div>

                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={exp.location}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    placeholder="e.g. New York, NY"
                                    className="input"
                                />
                            </div>

                            <div className="form-group full-width">
                                <div className="label-with-action">
                                    <label>Description (Bullet Points)</label>
                                    <button
                                        className="btn-xs-magic"
                                        onClick={() => handleSuggestClick(exp.id, exp.role)}
                                        disabled={generatingId === exp.id}
                                        title="Get AI Suggestions"
                                    >
                                        {generatingId === exp.id ? (
                                            <>
                                                <Loader2 size={12} className="spin" /> Thinking...
                                            </>
                                        ) : (
                                            <>
                                                <Sparkles size={12} /> AI Suggest
                                            </>
                                        )}
                                    </button>
                                </div>
                                <textarea
                                    name="description"
                                    value={exp.description}
                                    onChange={(e) => handleChange(exp.id, e)}
                                    placeholder="• Developed new feature X...&#10;• Improved performance by Y%..."
                                    rows="5"
                                    className="input textarea"
                                />
                                <small className="hint">Use • for bullet points (Alt+7 or copying)</small>
                            </div>
                        </div>
                    </div>
                ))}

                <button className="btn btn-ghost add-btn" onClick={handleAdd}>
                    <Plus size={16} />
                    Add Experience
                </button>
            </div>

            <AIPromptModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onGenerate={handleGenerateContext}
                role={activePromptData.role}
            />

            <style jsx="true">{`
        /* Reuse styles from EducationSection */
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
        .checkbox-group { flex-direction: row; align-items: center; gap: 0.5rem; }
        .hint { font-size: 0.75rem; color: hsl(var(--color-text-muted)); }
        
        .label-with-action {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 6px;
        }

        .btn-xs-magic {
           background: linear-gradient(135deg, #6366f1, #8b5cf6);
           border: none;
           color: white;
           padding: 4px 10px;
           border-radius: 12px;
           font-size: 0.75rem;
           font-weight: 500;
           display: flex;
           align-items: center;
           gap: 6px;
           cursor: pointer;
           transition: all 0.2s;
           box-shadow: 0 2px 4px rgba(99, 102, 241, 0.3);
        }
        
        .btn-xs-magic:hover {
            transform: translateY(-1px);
            box-shadow: 0 4px 6px rgba(99, 102, 241, 0.4);
        }
        
        .btn-xs-magic:active {
            transform: translateY(0);
        }
        
        .spin {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
      `}</style>
        </EditorSection>
    );
};

export default ExperienceSection;
