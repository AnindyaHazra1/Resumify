import { createContext, useContext, useState, useEffect } from 'react';

const ResumeContext = createContext(null);

const INITIAL_DATA = {
  personal: {
    fullName: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    website: '',
    location: '',
    summary: '',
  },
  theme: {
    color: '#ffe4d1',
    font: 'Calibri',
  },
  education: [],
  experience: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
};

export const ResumeProvider = ({ children }) => {
  // Load from local storage or use initial data
  const [resumeData, setResumeData] = useState(() => {
    const saved = localStorage.getItem('ats-resume-data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Merge to ensure new fields like languages/certifications exist
        return { ...INITIAL_DATA, ...parsed };
      } catch (e) {
        console.error("Failed to parse resume data", e);
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  const [activeSection, setActiveSection] = useState('personal');

  // Persist to local storage
  useEffect(() => {
    localStorage.setItem('ats-resume-data', JSON.stringify(resumeData));
  }, [resumeData]);

  const updateSection = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  const addArrayItem = (section, item) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...prev[section], { ...item, id: crypto.randomUUID() }]
    }));
  };

  const updateArrayItem = (section, id, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, ...data } : item)
    }));
  };

  const removeArrayItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: prev[section].filter(item => item.id !== id)
    }));
  };

  const resetResume = () => {
    setResumeData(INITIAL_DATA);
    localStorage.removeItem('ats-resume-data');
  };

  const handleThemeChange = (color) => {
    setResumeData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        color
      }
    }));
  };

  const handleFontChange = (font) => {
    setResumeData(prev => ({
      ...prev,
      theme: {
        ...prev.theme,
        font
      }
    }));
  };

  return (
    <ResumeContext.Provider value={{
      resumeData,
      updateSection,
      addArrayItem,
      updateArrayItem,
      removeArrayItem,
      resetResume,
      handleThemeChange,
      handleFontChange,
      activeSection,
      setActiveSection
    }}>
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
