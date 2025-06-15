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