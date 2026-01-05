import { Wrench, X, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';
import { useState } from 'react';

const SkillsSection = () => {
  const { resumeData, addArrayItem, removeArrayItem } = useResume();
  const { skills } = resumeData;
  const [newSkill, setNewSkill] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const COMMON_SKILLS = [
    // Tech Skills
    "JavaScript", "Python", "Java", "React", "Node.js", "C++", "C#", "SQL", "Git", "Docker",
    "AWS", "TypeScript", "HTML5", "CSS3", "Angular", "Vue.js", "MongoDB", "PostgreSQL",
    "Machine Learning", "Data Analysis", "Figma", "Photoshop", "Excel",
    // Soft Skills / Non-Tech
    "Communication", "Leadership", "Teamwork", "Problem Solving", "Time Management",
    "Critical Thinking", "Adaptability", "Creativity", "Emotional Intelligence",
    "Interpersonal Skills", "Work Ethic", "Attention to Detail", "Public Speaking",
    "Negotiation", "Conflict Resolution", "Decision Making", "Mentoring", "Sales",
    "Marketing", "Content Writing", "Strategic Planning", "Customer Service"
  ];

  const handleAddKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (newSkill.trim()) {
      addArrayItem('skills', { name: newSkill.trim() });
      setNewSkill('');
    }
  };

  const handleInputChange = (e) => {
    setNewSkill(e.target.value);
    setShowSuggestions(true);
  };

  const handleSelectSuggestion = (skill) => {
    setNewSkill(skill);
    setShowSuggestions(false);
  };

  const filteredSkills = COMMON_SKILLS.filter(skill =>
    skill.toLowerCase().includes(newSkill.toLowerCase()) &&
    newSkill.trim() !== '' &&
    skill.toLowerCase() !== newSkill.toLowerCase()
  );

  return (
    <EditorSection title="Skills" icon={Wrench}>
      <div className="skills-container">
        <div className="input-group" style={{ position: 'relative' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              type="text"
              value={newSkill}
              onChange={handleInputChange}
              onKeyDown={handleAddKey}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Add a skill (e.g. React, Python)"
              className="input skill-input"
              style={{ width: '100%' }}
            />
            {showSuggestions && filteredSkills.length > 0 && (
              <ul className="suggestions-list">
                {filteredSkills.slice(0, 5).map(skill => (
                  <li
                    key={skill}
                    onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(skill); }}
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <button className="btn btn-primary" onClick={handleAdd}>
            <Plus size={18} />
          </button>
        </div>

        <div className="skills-list">
          {skills.map((skill) => (
            <div key={skill.id} className="skill-tag">
              <span>{skill.name}</span>
              <button
                className="remove-skill"
                onClick={() => removeArrayItem('skills', skill.id)}
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {skills.length === 0 && (
            <p className="no-skills">No skills added yet.</p>
          )}
        </div>
      </div>

      <style jsx="true">{`
        .skills-container {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .input-group {
          display: flex;
          gap: 0.5rem;
          align-items: flex-start;
        }
        
        .skill-input {
           flex: 1;
        }

        .skills-list {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .skill-tag {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: hsl(var(--color-surface));
          border: 1px solid hsl(var(--color-primary) / 0.2);
          color: hsl(var(--color-primary-dark));
          padding: 0.4rem 0.8rem;
          border-radius: 2rem;
          font-size: 0.9rem;
          font-weight: 500;
        }

        .remove-skill {
          background: none;
          border: none;
          color: hsl(var(--color-primary));
          cursor: pointer;
          display: flex;
          align-items: center;
          opacity: 0.6;
          transition: opacity 0.2s;
        }

        .remove-skill:hover {
          opacity: 1;
        }

        .no-skills {
          font-size: 0.9rem;
          color: hsl(var(--color-text-muted));
          font-style: italic;
        }
        
        .input {
          padding: 0.6rem;
          border: 1px solid hsl(var(--color-border));
          border-radius: var(--radius-md);
          font-size: 0.9rem;
        }
        .input:focus {
           outline: none;
           border-color: hsl(var(--color-primary));
        }

        .suggestions-list {
            position: absolute;
            top: calc(100% + 8px);
            left: 0;
            right: 0;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(0,0,0,0.08);
            border-radius: 12px;
            box-shadow: 
                0 4px 6px -1px rgba(0, 0, 0, 0.1), 
                0 2px 4px -1px rgba(0, 0, 0, 0.06),
                0 10px 15px -3px rgba(0, 0, 0, 0.1);
            margin-top: 0;
            padding: 6px;
            z-index: 100;
            max-height: 240px;
            overflow-y: auto;
            list-style: none;
            animation: slideDown 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            transform-origin: top center;
        }

        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-8px) scale(0.98);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .suggestions-list li {
            padding: 10px 16px;
            font-size: 0.95rem;
            cursor: pointer;
            border-radius: 8px;
            color: #1a1a1a;
            transition: all 0.15s ease;
            display: flex;
            align-items: center;
            gap: 8px;
            font-weight: 500;
        }
        
        .suggestions-list li:hover {
            background: linear-gradient(to right, hsl(var(--color-primary) / 0.1), transparent);
            color: hsl(var(--color-primary));
            padding-left: 20px; /* Slight movement effect */
        }
        
        /* Custom scrollbar */
        .suggestions-list::-webkit-scrollbar { width: 6px; }
        .suggestions-list::-webkit-scrollbar-track { background: transparent; }
        .suggestions-list::-webkit-scrollbar-thumb { 
            background-color: rgba(0,0,0,0.1); 
            border-radius: 20px; 
            border: 2px solid transparent; 
            background-clip: content-box; 
        }
        .suggestions-list::-webkit-scrollbar-thumb:hover { background-color: rgba(0,0,0,0.2); }
      `}</style>
    </EditorSection>
  );
};

export default SkillsSection;
