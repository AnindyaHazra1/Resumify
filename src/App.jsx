import { ResumeProvider } from './context/ResumeContext';
import AppLayout from './components/Layout/AppLayout';
import PersonalDetails from './components/Editor/PersonalDetails';
import EducationSection from './components/Editor/EducationSection';
import ExperienceSection from './components/Editor/ExperienceSection';
import SkillsSection from './components/Editor/SkillsSection';
import ProjectsSection from './components/Editor/ProjectsSection';
import CertificationsSection from './components/Editor/CertificationsSection';
import LanguagesSection from './components/Editor/LanguagesSection';
import ResumePreview from './components/Preview/ResumePreview';

function App() {
  return (
    <ResumeProvider>
      <AppLayout
        editor={
          <div className="editor-container">
            <PersonalDetails />
            <EducationSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <CertificationsSection />
            <LanguagesSection />
            {/* Other sections will go here */}
          </div>
        }
        preview={
          <div className="preview-container-wrapper" style={{ width: '100%', height: '100%', overflow: 'auto' }}>
            <ResumePreview />
          </div>
        }
      />
    </ResumeProvider>
  );
}

export default App;
