import React from 'react';
import { useResume } from '../context/ResumeContext';
import { useTemplate } from '../context/TemplateContext';

const ResumePreview = () => {
  const { state } = useResume();
  const { getCurrentTemplate } = useTemplate();
  const template = getCurrentTemplate();

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + '-01');
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  const skillsByCategory = () => {
    const categories = new Map();
    state.skills.forEach(skill => {
      if (!categories.has(skill.category)) {
        categories.set(skill.category, []);
      }
      categories.get(skill.category).push(skill.name);
    });
    return Array.from(categories.entries());
  };

  const renderRichText = (text) => {
    if (!text) return '';
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const getHeaderAlignment = () => {
    return template.layout.headerStyle === 'centered' ? 'text-center' : 'text-left';
  };

  const getHeaderJustification = () => {
    return template.layout.headerStyle === 'centered' ? 'justify-center' : 'justify-start';
  };

  // Load Google Fonts dynamically
  React.useEffect(() => {
    const fonts = [template.typography.headingFont, template.typography.bodyFont];
    const uniqueFonts = [...new Set(fonts)];
    
    uniqueFonts.forEach(font => {
      if (font && !document.querySelector(`link[href*="${font.replace(/\s+/g, '+')}"]`)) {
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${font.replace(/\s+/g, '+')}:wght@300;400;500;600;700&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
      }
    });
  }, [template.typography.headingFont, template.typography.bodyFont]);

  const templateStyles = {
    '--heading-font': template.typography.headingFont,
    '--body-font': template.typography.bodyFont,
    '--primary-color': template.colors.primary,
    '--secondary-color': template.colors.secondary,
    '--accent-color': template.colors.accent,
    '--text-color': template.colors.text,
    '--text-light-color': template.colors.textLight,
    '--background-color': template.colors.background,
    '--border-color': template.colors.border
  };

  // Sidebar Layout
  if (template.layout.layoutType === 'sidebar') {
    return (
      <div 
        className="resume-preview bg-white shadow-lg rounded-lg overflow-hidden max-w-2xl mx-auto transition-all duration-300" 
        style={{ 
          minHeight: '11in',
          fontFamily: `var(--body-font), system-ui, sans-serif`,
          ...templateStyles
        }}
      >
        {/* Header */}
        <header 
          className="px-8 py-6"
          style={{ backgroundColor: template.colors.headerBg || '#4b5563' }}
        >
          <h1 
            className="text-2xl font-bold mb-2"
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
            }}
          >
            {state.personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: template.colors.secondary,
              fontWeight: '500'
            }}
          >
            {state.workExperience[0]?.position || 'PROFESSIONAL TITLE'}
          </p>
        </header>

        {/* Two Column Layout */}
        <div className="flex">
          {/* Sidebar */}
          <aside 
            className="w-1/3 p-6"
            style={{ 
              backgroundColor: template.colors.sidebarBg || '#e5e7eb',
              color: template.colors.sidebarText || '#374151'
            }}
          >
            {/* Contact */}
            <section className="mb-6">
              <h2 
                className="text-sm font-bold mb-3 uppercase tracking-wide"
                style={{ 
                  fontFamily: `var(--heading-font), system-ui, sans-serif`,
                  color: template.colors.sidebarText || '#374151'
                }}
              >
                Contact
              </h2>
              <div className="space-y-2 text-xs">
                {state.personalInfo.phone && (
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{state.personalInfo.phone}</span>
                  </div>
                )}
                {state.personalInfo.email && (
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span className="break-all">{state.personalInfo.email}</span>
                  </div>
                )}
                {state.personalInfo.location && (
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{state.personalInfo.location}</span>
                  </div>
                )}
                {state.personalInfo.websites.map((website) => (
                  <div key={website.id} className="flex items-center gap-2">
                    <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z" clipRule="evenodd" />
                    </svg>
                    <span className="break-all text-xs" dangerouslySetInnerHTML={{ __html: renderRichText(website.label) }} />
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            {state.skills.length > 0 && (
              <section className="mb-6">
                <h2 
                  className="text-sm font-bold mb-3 uppercase tracking-wide"
                  style={{ 
                    fontFamily: `var(--heading-font), system-ui, sans-serif`,
                    color: template.colors.sidebarText || '#374151'
                  }}
                >
                  Skills
                </h2>
                <div className="space-y-3">
                  {skillsByCategory().map(([category, skills]) => (
                    <div key={category}>
                      <h3 className="text-xs font-semibold mb-1">{category}</h3>
                      <ul className="text-xs space-y-1">
                        {skills.map((skill, index) => (
                          <li key={index} className="flex items-center gap-1">
                            <span className="w-1 h-1 bg-current rounded-full flex-shrink-0"></span>
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages (if any custom sections exist) */}
            {state.customSections.some(section => section.title.toLowerCase().includes('language')) && (
              <section className="mb-6">
                <h2 
                  className="text-sm font-bold mb-3 uppercase tracking-wide"
                  style={{ 
                    fontFamily: `var(--heading-font), system-ui, sans-serif`,
                    color: template.colors.sidebarText || '#374151'
                  }}
                >
                  Languages
                </h2>
                <div className="space-y-2 text-xs">
                  {state.customSections
                    .filter(section => section.title.toLowerCase().includes('language'))
                    .map(section => (
                      <div key={section.id}>
                        {section.type === 'list' && section.content.items && 
                          section.content.items.map((item, index) => 
                            item.trim() && (
                              <div key={index} className="flex items-center gap-1">
                                <span className="w-1 h-1 bg-current rounded-full flex-shrink-0"></span>
                                <span dangerouslySetInnerHTML={{ __html: renderRichText(item) }} />
                              </div>
                            )
                          )
                        }
                      </div>
                    ))
                  }
                </div>
              </section>
            )}
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6" style={{ color: template.colors.text }}>
            {/* Profile/Summary */}
            {state.summary && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: template.colors.accent }}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ 
                      fontFamily: `var(--heading-font), system-ui, sans-serif`,
                      color: template.colors.text
                    }}
                  >
                    Profile
                  </h2>
                </div>
                <div 
                  className="text-xs leading-relaxed pl-8"
                  style={{ color: template.colors.text }}
                  dangerouslySetInnerHTML={{ __html: renderRichText(state.summary) }} 
                />
              </section>
            )}

            {/* Work Experience */}
            {state.workExperience.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: template.colors.accent }}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                      <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z" />
                    </svg>
                  </div>
                  <h2 
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ 
                      fontFamily: `var(--heading-font), system-ui, sans-serif`,
                      color: template.colors.text
                    }}
                  >
                    Work Experience
                  </h2>
                </div>
                <div className="pl-8 space-y-4">
                  {state.workExperience.map((experience) => (
                    <div key={experience.id}>
                      <div className="mb-2">
                        <h3 
                          className="text-sm font-bold"
                          style={{ color: template.colors.text }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(experience.company) }} 
                        />
                        <p 
                          className="text-xs font-medium"
                          style={{ color: template.colors.textLight }}
                          dangerouslySetInnerHTML={{ __html: renderRichText(experience.position) }} 
                        />
                        <p 
                          className="text-xs"
                          style={{ color: template.colors.textLight }}
                        >
                          {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                        </p>
                      </div>
                      
                      {experience.description.length > 0 && experience.description.some(desc => desc.trim()) && (
                        <ul className="text-xs space-y-1 mb-2">
                          {experience.description.map((desc, index) => 
                            desc.trim() && (
                              <li key={index} className="flex items-start gap-2">
                                <span className="w-1 h-1 bg-current rounded-full flex-shrink-0 mt-2"></span>
                                <span dangerouslySetInnerHTML={{ __html: renderRichText(desc) }} />
                              </li>
                            )
                          )}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {state.education.length > 0 && (
              <section className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div 
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: template.colors.accent }}
                  >
                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                    </svg>
                  </div>
                  <h2 
                    className="text-sm font-bold uppercase tracking-wide"
                    style={{ 
                      fontFamily: `var(--heading-font), system-ui, sans-serif`,
                      color: template.colors.text
                    }}
                  >
                    Education
                  </h2>
                </div>
                <div className="pl-8 space-y-3">
                  {state.education.map((education) => (
                    <div key={education.id}>
                      <h3 
                        className="text-sm font-bold"
                        style={{ color: template.colors.text }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: renderRichText(education.degree) }} />
                        {education.field && (
                          <span> in <span dangerouslySetInnerHTML={{ __html: renderRichText(education.field) }} /></span>
                        )}
                      </h3>
                      <p 
                        className="text-xs"
                        style={{ color: template.colors.textLight }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: renderRichText(education.institution) }} />
                      </p>
                      <p 
                        className="text-xs"
                        style={{ color: template.colors.textLight }}
                      >
                        {formatDate(education.startDate)} - {formatDate(education.endDate)}
                        {education.gpa && ` • GPA: ${education.gpa}`}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Other sections (achievements, awards, certifications, custom) */}
            {(state.achievements.length > 0 || state.awards.length > 0 || state.certifications.length > 0) && (
              <section>
                {state.achievements.length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wide mb-2" style={{ color: template.colors.text }}>
                      Achievements
                    </h3>
                    <div className="space-y-1">
                      {state.achievements.map((achievement) => (
                        <div key={achievement.id} className="text-xs flex justify-between">
                          <span dangerouslySetInnerHTML={{ __html: renderRichText(achievement.description) }} />
                          <span className="text-xs ml-2" style={{ color: template.colors.textLight }}>
                            {formatDate(achievement.date)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            )}
          </main>
        </div>
      </div>
    );
  }

  // Default Single Column Layout
  return (
    <div 
      className="resume-preview bg-white shadow-lg rounded-lg p-8 max-w-2xl mx-auto transition-all duration-300" 
      style={{ 
        minHeight: '11in',
        fontFamily: `var(--body-font), system-ui, sans-serif`,
        color: template.colors.text,
        backgroundColor: template.colors.background,
        ...templateStyles
      }}
    >
      {/* Header */}
      <header className={`${template.layout.sectionSpacing} pb-4 ${template.layout.borderStyle}`}>
        <div className={getHeaderAlignment()}>
          <h1 
            className={`${template.typography.headingSize} font-bold mb-2`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              fontSize: template.typography.headingSize === 'text-lg' ? '1.5rem' : 
                       template.typography.headingSize === 'text-xl' ? '1.75rem' : 
                       template.typography.headingSize === 'text-2xl' ? '2rem' : '1.5rem'
            }}
          >
            {state.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className={`flex flex-wrap gap-4 ${template.typography.bodySize} ${getHeaderJustification()}`} style={{ color: template.colors.textLight }}>
            {state.personalInfo.email && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                {state.personalInfo.email}
              </span>
            )}
            {state.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                {state.personalInfo.phone}
              </span>
            )}
            {state.personalInfo.location && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {state.personalInfo.location}
              </span>
            )}
          </div>
          <div className={`flex flex-wrap gap-4 ${template.typography.bodySize} mt-2 ${getHeaderJustification()}`} style={{ color: template.colors.textLight }}>
            {state.personalInfo.websites.map((website) => (
              <a key={website.id} href={website.url} className="flex items-center gap-1 hover:underline" style={{ color: template.colors.accent }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <span dangerouslySetInnerHTML={{ __html: renderRichText(website.label) }} />
              </a>
            ))}
            {state.personalInfo.linkedin && (
              <a href={state.personalInfo.linkedin} className="hover:underline" style={{ color: template.colors.accent }}>LinkedIn</a>
            )}
            {state.personalInfo.github && (
              <a href={state.personalInfo.github} className="hover:underline" style={{ color: template.colors.accent }}>GitHub</a>
            )}
          </div>
        </div>
      </header>

      {/* Summary */}
      {state.summary && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-2 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <div 
            className={`${template.typography.lineHeight} ${template.typography.bodySize}`}
            style={{ 
              color: template.colors.text,
              fontWeight: template.typography.bodyWeight
            }}
            dangerouslySetInnerHTML={{ __html: renderRichText(state.summary) }} 
          />
        </section>
      )}

      {/* Work Experience */}
      {state.workExperience.length > 0 && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          {state.workExperience.map((experience) => (
            <div key={experience.id} className={template.layout.itemSpacing}>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 
                    className="font-semibold"
                    style={{ 
                      color: template.colors.text,
                      fontWeight: template.typography.headingWeight
                    }}
                    dangerouslySetInnerHTML={{ __html: renderRichText(experience.position) }} 
                  />
                  <p 
                    className="font-medium"
                    style={{ color: template.colors.textLight }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: renderRichText(experience.company) }} />
                    {experience.location && ` • ${experience.location}`}
                  </p>
                </div>
                <p 
                  className={`${template.typography.bodySize} text-right`}
                  style={{ color: template.colors.textLight }}
                >
                  {formatDate(experience.startDate)} - {experience.current ? 'Present' : formatDate(experience.endDate)}
                </p>
              </div>
              
              {experience.description.length > 0 && experience.description.some(desc => desc.trim()) && (
                <ul 
                  className={`list-disc list-inside ml-4 space-y-1 mb-2 ${template.typography.bodySize} ${template.typography.lineHeight}`}
                  style={{ color: template.colors.text }}
                >
                  {experience.description.map((desc, index) => 
                    desc.trim() && (
                      <li key={index}>
                        <span dangerouslySetInnerHTML={{ __html: renderRichText(desc) }} />
                      </li>
                    )
                  )}
                </ul>
              )}
              
              {experience.achievements.length > 0 && experience.achievements.some(achievement => achievement.trim()) && (
                <div className="mb-2">
                  <p 
                    className={`${template.typography.bodySize} font-medium mb-1`}
                    style={{ color: template.colors.secondary }}
                  >
                    Key Achievements:
                  </p>
                  <ul 
                    className={`list-disc list-inside ml-4 space-y-1 ${template.typography.bodySize} ${template.typography.lineHeight}`}
                    style={{ color: template.colors.text }}
                  >
                    {experience.achievements.map((achievement, index) => 
                      achievement.trim() && (
                        <li key={index}>
                          <span dangerouslySetInnerHTML={{ __html: renderRichText(achievement) }} />
                        </li>
                      )
                    )}
                  </ul>
                </div>
              )}
              
              {experience.technologies.length > 0 && (
                <div className="mt-2">
                  <p 
                    className={template.typography.bodySize}
                    style={{ color: template.colors.textLight }}
                  >
                    <span className="font-medium">Technologies:</span> {experience.technologies.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Education */}
      {state.education.length > 0 && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            EDUCATION
          </h2>
          {state.education.map((education) => (
            <div key={education.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 
                    className="font-semibold"
                    style={{ color: template.colors.text }}
                  >
                    <span dangerouslySetInnerHTML={{ __html: renderRichText(education.degree) }} />
                    {education.field && (
                      <span> in <span dangerouslySetInnerHTML={{ __html: renderRichText(education.field) }} /></span>
                    )}
                  </h3>
                  <p style={{ color: template.colors.textLight }}>
                    <span dangerouslySetInnerHTML={{ __html: renderRichText(education.institution) }} />
                    {education.location && ` • ${education.location}`}
                  </p>
                  {education.gpa && (
                    <p 
                      className={template.typography.bodySize}
                      style={{ color: template.colors.textLight }}
                    >
                      GPA: {education.gpa}
                    </p>
                  )}
                </div>
                <p 
                  className={`${template.typography.bodySize} text-right`}
                  style={{ color: template.colors.textLight }}
                >
                  {formatDate(education.startDate)} - {formatDate(education.endDate)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {state.skills.length > 0 && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            SKILLS
          </h2>
          {skillsByCategory().map(([category, skills]) => (
            <div key={category} className="mb-2">
              <p 
                className={template.typography.bodySize}
                style={{ color: template.colors.text }}
              >
                <span className="font-medium">{category}:</span> {skills.join(', ')}
              </p>
            </div>
          ))}
        </section>
      )}

      {/* Achievements */}
      {state.achievements.length > 0 && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            ACHIEVEMENTS
          </h2>
          {state.achievements.map((achievement) => (
            <div key={achievement.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div 
                  className={`flex-1 ${template.typography.lineHeight} ${template.typography.bodySize}`}
                  style={{ color: template.colors.text }}
                  dangerouslySetInnerHTML={{ __html: renderRichText(achievement.description) }} 
                />
                <p 
                  className={`${template.typography.bodySize} ml-4`}
                  style={{ color: template.colors.textLight }}
                >
                  {formatDate(achievement.date)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Awards */}
      {state.awards.length > 0 && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            AWARDS
          </h2>
          {state.awards.map((award) => (
            <div key={award.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div 
                  className={`flex-1 ${template.typography.lineHeight} ${template.typography.bodySize}`}
                  style={{ color: template.colors.text }}
                  dangerouslySetInnerHTML={{ __html: renderRichText(award.description) }} 
                />
                <p 
                  className={`${template.typography.bodySize} ml-4`}
                  style={{ color: template.colors.textLight }}
                >
                  {formatDate(award.date)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Certifications */}
      {state.certifications.length > 0 && (
        <section className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            CERTIFICATIONS
          </h2>
          {state.certifications.map((certification) => (
            <div key={certification.id} className="mb-3">
              <div className="flex justify-between items-start">
                <div 
                  className={`flex-1 ${template.typography.lineHeight} ${template.typography.bodySize}`}
                  style={{ color: template.colors.text }}
                  dangerouslySetInnerHTML={{ __html: renderRichText(certification.description) }} 
                />
                <p 
                  className={`${template.typography.bodySize} ml-4`}
                  style={{ color: template.colors.textLight }}
                >
                  {formatDate(certification.date)}
                </p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Custom Sections */}
      {state.customSections.sort((a, b) => a.order - b.order).map((section) => (
        <section key={section.id} className={template.layout.sectionSpacing}>
          <h2 
            className={`${template.typography.headingSize} font-semibold mb-3 pb-1`}
            style={{ 
              fontFamily: `var(--heading-font), system-ui, sans-serif`,
              fontWeight: template.typography.headingWeight,
              color: template.colors.primary,
              borderBottom: `1px solid ${template.colors.border}`
            }}
          >
            {section.title.toUpperCase()}
          </h2>
          
          {section.type === 'list' && section.content.items && (
            <ul 
              className={`list-disc list-inside ml-4 space-y-1 ${template.typography.bodySize} ${template.typography.lineHeight}`}
              style={{ color: template.colors.text }}
            >
              {section.content.items.map((item, index) => 
                item.trim() && (
                  <li key={index}>
                    <span dangerouslySetInnerHTML={{ __html: renderRichText(item) }} />
                  </li>
                )
              )}
            </ul>
          )}
          
          {section.type === 'paragraph' && section.content.text && (
            <div 
              className={`${template.typography.lineHeight} ${template.typography.bodySize}`}
              style={{ color: template.colors.text }}
              dangerouslySetInnerHTML={{ __html: renderRichText(section.content.text) }} 
            />
          )}
          
          {section.type === 'table' && section.content.headers && section.content.rows && (
            <div className="overflow-x-auto">
              <table className={`w-full ${template.typography.bodySize}`} style={{ color: template.colors.text }}>
                <thead>
                  <tr style={{ borderBottom: `1px solid ${template.colors.border}` }}>
                    {section.content.headers.map((header, index) => (
                      <th 
                        key={index} 
                        className="text-left py-2 px-3 font-medium"
                        style={{ color: template.colors.primary }}
                      >
                        <span dangerouslySetInnerHTML={{ __html: renderRichText(header) }} />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.content.rows.map((row, rowIndex) => (
                    <tr key={rowIndex} style={{ borderBottom: `1px solid ${template.colors.border}` }}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex} className="py-2 px-3">
                          <span dangerouslySetInnerHTML={{ __html: renderRichText(cell) }} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
    </div>
  );
};

export default ResumePreview;