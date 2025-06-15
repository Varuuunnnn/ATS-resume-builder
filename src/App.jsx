import React, { useState, useEffect } from 'react';
import PersonalInfoForm from './components/PersonalInfoForm';
import SummaryForm from './components/SummaryForm';
import WorkExperienceForm from './components/WorkExperienceForm';
import EducationForm from './components/EducationForm';
import SkillsForm from './components/SkillsForm';
import AchievementsForm from './components/AchievementsForm';
import AwardsForm from './components/AwardsForm';
import CertificationsForm from './components/CertificationsForm';
import CustomSectionsForm from './components/CustomSectionsForm';
import ResumePreview from './components/ResumePreview';
import ExportButtons from './components/ExportButtons';
import ThemeToggle from './components/ThemeToggle';
import { ResumeProvider } from './context/ResumeContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: '👤', color: 'from-gray-600 to-gray-700' },
    { id: 'summary', label: 'Summary', icon: '📝', color: 'from-gray-600 to-gray-700' },
    { id: 'experience', label: 'Experience', icon: '💼', color: 'from-gray-600 to-gray-700' },
    { id: 'education', label: 'Education', icon: '🎓', color: 'from-gray-600 to-gray-700' },
    { id: 'skills', label: 'Skills', icon: '🔧', color: 'from-gray-600 to-gray-700' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', color: 'from-gray-600 to-gray-700' },
    { id: 'awards', label: 'Awards', icon: '🏅', color: 'from-gray-600 to-gray-700' },
    { id: 'certifications', label: 'Certifications', icon: '📜', color: 'from-gray-600 to-gray-700' },
    { id: 'custom', label: 'Custom Sections', icon: '⚙️', color: 'from-gray-600 to-gray-700' },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return <PersonalInfoForm />;
      case 'summary':
        return <SummaryForm />;
      case 'experience':
        return <WorkExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'achievements':
        return <AchievementsForm />;
      case 'awards':
        return <AwardsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'custom':
        return <CustomSectionsForm />;
      default:
        return <PersonalInfoForm />;
    }
  };

  return (
    <ThemeProvider>
      <ResumeProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all duration-300">
          <header className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center py-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 dark:from-gray-300 dark:to-gray-100 bg-clip-text text-transparent">
                      ATS Resume Builder
                    </h1>
                    <span className="text-sm text-gray-500 dark:text-gray-400">Professional • ATS-Optimized • Modern</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="hidden md:block">
                    <p className="text-sm text-gray-600 dark:text-gray-300">Build your perfect resume with real-time preview</p>
                  </div>
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </header>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Forms (1/3 width on lg screens) */}
              <div className="lg:col-span-1 space-y-6">
                {/* Tab Navigation */}
                <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200/50 dark:border-gray-700/50 p-2">
                  <nav className="flex flex-col space-y-1" aria-label="Tabs">
                    {tabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`${
                          activeTab === tab.id
                            ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                            : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700/50'
                        } py-3 px-4 text-sm font-medium rounded-xl transition-all duration-300 flex items-center gap-3 relative overflow-hidden`}
                      >
                        <span className="text-lg">{tab.icon}</span>
                        <span className="font-semibold">{tab.label}</span>
                        {activeTab === tab.id && (
                          <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                        )}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="fade-in">
                  {renderTabContent()}
                </div>
              </div>

              {/* Right Side - Preview (2/3 width on lg screens) */}
              <div className="lg:col-span-2">
                <div className="lg:sticky lg:top-24 lg:h-fit">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-4 lg:p-6 shadow-xl border border-gray-200/50 dark:border-gray-700/50">
                    <div className="flex justify-between items-center mb-4 lg:mb-6">
                      <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        Live Preview
                      </h2>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Auto-updating
                      </div>
                    </div>
                    
                    <ExportButtons />
                    
                    {/* Better scaling for larger preview area */}
                    <div className="transform scale-60 origin-top-left sm:scale-70 md:scale-80 lg:scale-90 xl:scale-100 transition-transform duration-300">
                      <ResumePreview />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-t border-gray-200/50 dark:border-gray-700/50 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
              <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                <p className="flex items-center justify-center gap-2">
                  <span>Built with</span>
                  <span className="text-red-500">♥</span>
                  <span>using React, Tailwind CSS, and modern web technologies</span>
                </p>
                <p className="mt-1">ATS-optimized formatting ensures your resume passes applicant tracking systems</p>
              </div>
            </div>
          </footer>
        </div>
      </ResumeProvider>
    </ThemeProvider>
  );
}

export default App;