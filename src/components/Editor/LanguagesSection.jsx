import { Languages, X, Plus } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';
import EditorSection from './EditorSection';
import { useState } from 'react';

const LanguagesSection = () => {
    const { resumeData, addArrayItem, removeArrayItem } = useResume();
    const { languages } = resumeData;
    const [newLang, setNewLang] = useState('');
    const [proficiency, setProficiency] = useState('Professional Working Proficiency');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const COMMON_LANGUAGES = [
        "English", "Spanish", "French", "German", "Chinese", "Mandarin", "Japanese",
        "Hindi", "Bengali", "Marathi", "Telugu", "Tamil", "Gujarati", "Urdu",
        "Kannada", "Odia", "Malayalam", "Punjabi", "Assamese", "Maithili", "Santali",
        "Kashmiri", "Nepali", "Konkani", "Sindhi", "Dogri", "Manipuri", "Bodo", "Sanskrit",
        "Russian", "Portuguese", "Arabic", "Italian", "Korean", "Dutch", "Turkish",
        "Polish", "Swedish", "Norwegian", "Danish", "Finnish", "Greek"
    ];

    const PROFICIENCY_LEVELS = [
        "Professional Working Proficiency",
        "Limited Working Proficiency",
        "Elementary Proficiency"
    ];

    const handleAdd = () => {
        if (newLang.trim()) {
            addArrayItem('languages', {
                name: newLang.trim(),
                proficiency: proficiency
            });
            setNewLang('');
            setProficiency('Professional Working Proficiency');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleAdd();
        }
    };

    const handleInputChange = (e) => {
        setNewLang(e.target.value);
        setShowSuggestions(true);
    };

    const handleSelectSuggestion = (lang) => {
        setNewLang(lang);
        setShowSuggestions(false);
    };

    const filteredLanguages = COMMON_LANGUAGES.filter(lang =>
        lang.toLowerCase().includes(newLang.toLowerCase()) &&
        newLang.trim() !== '' &&
        lang.toLowerCase() !== newLang.toLowerCase()
    );

    return (
        <EditorSection title="Languages" icon={Languages}>
            <div className="skills-container">
                <div className="input-group" style={{ position: 'relative' }}>
                    <div style={{ flex: 1, position: 'relative' }}>
                        <input
                            type="text"
                            value={newLang}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => setShowSuggestions(true)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            placeholder="Language"
                            className="input"
                            style={{ width: '100%' }}
                        />
                        {showSuggestions && filteredLanguages.length > 0 && (
                            <ul className="suggestions-list">
                                {filteredLanguages.slice(0, 5).map((lang) => (
                                    <li
                                        key={lang}
                                        onMouseDown={(e) => { e.preventDefault(); handleSelectSuggestion(lang); }}
                                    >
                                        {lang}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <select
                        value={proficiency}
                        onChange={(e) => setProficiency(e.target.value)}
                        className="input"
                        style={{ flex: 1, cursor: 'pointer' }}
                    >
                        {PROFICIENCY_LEVELS.map((level) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                    <button className="btn btn-primary" onClick={handleAdd}>
                        <Plus size={18} />
                    </button>
                </div>

                <div className="skills-list">
                    {languages.map((lang) => (
                        <div key={lang.id} className="skill-tag">
                            <span>{lang.name} <span style={{ opacity: 0.7, fontSize: '0.85em' }}>({lang.proficiency})</span></span>
                            <button
                                className="remove-skill"
                                onClick={() => removeArrayItem('languages', lang.id)}
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ))}
                    {languages.length === 0 && (
                        <p className="no-skills">No languages added yet.</p>
                    )}
                </div>
            </div>

            <style jsx="true">{`
        .skills-container { display: flex; flex-direction: column; gap: 1rem; }
        .input-group { display: flex; gap: 0.5rem; align-items: flex-start; }
        .skills-list { display: flex; flex-wrap: wrap; gap: 0.5rem; }
        .skill-tag { display: inline-flex; align-items: center; gap: 0.5rem; background: hsl(var(--color-surface)); border: 1px solid hsl(var(--color-border)); padding: 0.4rem 0.8rem; border-radius: 2rem; font-size: 0.9rem; }
        .remove-skill { border: none; background: none; color: hsl(var(--color-text-muted)); cursor: pointer; display: flex; }
        .remove-skill:hover { color: #ef4444; }
        .no-skills { font-size: 0.85rem; color: hsl(var(--color-text-muted)); font-style: italic; }
        
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

export default LanguagesSection;
