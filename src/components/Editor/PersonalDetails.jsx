import { User } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';

const PersonalDetails = () => {
  const { resumeData, updateSection } = useResume();
  const { personal } = resumeData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updateSection('personal', { ...personal, [name]: value });
  };

  return (
    <EditorSection title="Personal Details" icon={User} isOpen={true}>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={personal.fullName}
            onChange={handleChange}
            placeholder="e.g. John Doe"
            className="input"
          />
        </div>



        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={personal.email}
            onChange={handleChange}
            placeholder="e.g. john@example.com"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={personal.phone}
            onChange={handleChange}
            placeholder="e.g. +1 234 567 8900"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="location"
            value={personal.location || ''}
            onChange={handleChange}
            placeholder="City, State, Country"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>LinkedIn URL</label>
          <input
            type="url"
            name="linkedin"
            value={personal.linkedin}
            onChange={handleChange}
            placeholder="linkedin.com/in/johndoe"
            className="input"
          />
        </div>

        <div className="form-group">
          <label>Portfolio / Website</label>
          <input
            type="url"
            name="website"
            value={personal.website}
            onChange={handleChange}
            placeholder="johndoe.com"
            className="input"
          />
        </div>

        <div className="form-group full-width">
          <label>Professional Summary</label>
          <textarea
            name="summary"
            value={personal.summary}
            onChange={handleChange}
            placeholder="Briefly describe your professional background and key achievements..."
            rows="4"
            className="input textarea"
          />
        </div>
      </div>

      <style jsx="true">{`
        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .full-width {
          grid-column: 1 / -1;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        label {
          font-size: 0.875rem;
          font-weight: 500;
          color: hsl(var(--color-text-muted));
        }

        .input {
          padding: 0.75rem;
          border: 1px solid hsl(var(--color-border));
          border-radius: var(--radius-md);
          font-size: 0.95rem;
          color: hsl(var(--color-text-main));
          background: hsl(var(--color-background));
          transition: border-color 0.2s;
        }

        .input:focus {
          outline: none;
          border-color: hsl(var(--color-primary));
          box-shadow: 0 0 0 3px hsl(var(--color-primary) / 0.1);
        }

        .textarea {
          resize: vertical;
          min-height: 100px;
        }

        @media (max-width: 640px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </EditorSection>
  );
};

export default PersonalDetails;
