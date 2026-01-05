import { GraduationCap, Trash2, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';

const EducationSection = () => {
  const { resumeData, addArrayItem, updateArrayItem, removeArrayItem } = useResume();
  const { education } = resumeData;

  const handleAdd = () => {
    addArrayItem('education', {
      institution: '',
      location: '',
      board: '',
      degree: '',
      fieldOfStudy: '',
      startDate: '',
      endDate: '',
      score: ''
    });
  };

  const handleChange = (id, e) => {
    const { name, value } = e.target;
    updateArrayItem('education', id, { [name]: value });
  };

  return (
    <EditorSection title="Education" icon={GraduationCap}>
      <div className="items-container">
        {education.map((edu, index) => (
          <div key={edu.id} className="item-card">
            <div className="item-header">
              <h4>Education {index + 1}</h4>
              <button
                className="btn-icon-danger"
                onClick={() => removeArrayItem('education', edu.id)}
                title="Remove education"
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="form-grid">
              <div className="form-group full-width">
                <label>Institution / University</label>
                <input
                  type="text"
                  name="institution"
                  value={edu.institution}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g. Harvard University"
                  className="input"
                />
              </div>

              <div className="form-group full-width">
                <label>Location</label>
                <input
                  type="text"
                  name="location"
                  value={edu.location || ''}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g. Durgapur, West Bengal"
                  className="input"
                />
              </div>

              <div className="form-group full-width">
                <label>Board / University / Affiliation</label>
                <input
                  type="text"
                  name="board"
                  value={edu.board || ''}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g. CBSE / ICSE / MAKAUT"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Degree</label>
                <input
                  type="text"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g. Bachelor of Science"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Field of Study</label>
                <input
                  type="text"
                  name="fieldOfStudy"
                  value={edu.fieldOfStudy}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g. Computer Science"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Start Date</label>
                <input
                  type="text"
                  name="startDate"
                  value={edu.startDate}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="MM/YYYY"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>End Date (or Expected)</label>
                <input
                  type="text"
                  name="endDate"
                  value={edu.endDate}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="MM/YYYY"
                  className="input"
                />
              </div>

              <div className="form-group">
                <label>Grade / CGPA</label>
                <input
                  type="text"
                  name="score"
                  value={edu.score}
                  onChange={(e) => handleChange(edu.id, e)}
                  placeholder="e.g. 3.8/4.0"
                  className="input"
                />
              </div>
            </div>
          </div>
        ))}

        <button className="btn btn-ghost add-btn" onClick={handleAdd}>
          <Plus size={16} />
          Add Education
        </button>
      </div>

      <style jsx="true">{`
        .items-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .item-card {
          padding: 1.25rem;
          border: 1px solid hsl(var(--color-border));
          border-radius: var(--radius-md);
          background: hsl(var(--color-background));
        }

        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .item-header h4 {
          font-size: 0.9rem;
          font-weight: 600;
          color: hsl(var(--color-primary));
          margin: 0;
        }

        .btn-icon-danger {
          background: none;
          border: none;
          color: hsl(var(--color-text-muted));
          cursor: pointer;
          padding: 4px;
          border-radius: 4px;
          transition: all 0.2s;
        }

        .btn-icon-danger:hover {
          color: #ef4444;
          background: #fee2e2;
        }

        .add-btn {
          width: 100%;
          border-style: dashed;
          border-color: hsl(var(--color-border));
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        label {
          font-size: 0.8rem;
          font-weight: 500;
          color: hsl(var(--color-text-muted));
        }

        .input {
          padding: 0.6rem;
          border: 1px solid hsl(var(--color-border));
          border-radius: var(--radius-md);
          font-size: 0.9rem;
          width: 100%;
        }
      `}</style>
    </EditorSection>
  );
};

export default EducationSection;
