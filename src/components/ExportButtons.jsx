import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType } from 'docx';
import { saveAs } from 'file-saver';
import { useResume } from '../context/ResumeContext';

const ExportButtons = () => {
  const { state } = useResume();
  const [isExporting, setIsExporting] = useState(false);
  const [exportType, setExportType] = useState(null);

  const exportToPDF = async () => {
    setIsExporting(true);
    setExportType('pdf');
    
    const element = document.querySelector('.resume-preview');
    if (!element) {
      setIsExporting(false);
      setExportType(null);
      return;
    }

    const options = {
      margin: 0.5,
      filename: `${state.personalInfo.fullName || 'Resume'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        letterRendering: true
      },
      jsPDF: { 
        unit: 'in', 
        format: 'letter', 
        orientation: 'portrait' 
      }
    };

    try {
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  const exportToDOCX = async () => {
    setIsExporting(true);
    setExportType('docx');
    
    try {
      const doc = new Document({
        sections: [{
          properties: {},
          children: [
            // Header
            new Paragraph({
              text: state.personalInfo.fullName || 'Your Name',
              heading: HeadingLevel.HEADING_1,
              alignment: AlignmentType.CENTER,
            }),
            new Paragraph({
              children: [
                new TextRun({
                  text: [
                    state.personalInfo.email,
                    state.personalInfo.phone,
                    state.personalInfo.location
                  ].filter(Boolean).join(' • '),
                  size: 20,
                }),
              ],
              alignment: AlignmentType.CENTER,
            }),
            // Website links
            ...(state.personalInfo.websites.length > 0 || state.personalInfo.linkedin || state.personalInfo.github ? [
              new Paragraph({
                children: [
                  new TextRun({
                    text: [
                      ...state.personalInfo.websites.map(w => w.label),
                      state.personalInfo.linkedin ? 'LinkedIn' : null,
                      state.personalInfo.github ? 'GitHub' : null
                    ].filter(Boolean).join(' • '),
                    size: 20,
                  }),
                ],
                alignment: AlignmentType.CENTER,
              })
            ] : []),
            
            // Summary
            ...(state.summary ? [
              new Paragraph({ text: '' }),
              new Paragraph({
                text: 'PROFESSIONAL SUMMARY',
                heading: HeadingLevel.HEADING_2,
              }),
              new Paragraph({
                text: state.summary,
              }),
            ] : []),

            // Work Experience
            ...(state.workExperience.length > 0 ? [
              new Paragraph({ text: '' }),
              new Paragraph({
                text: 'PROFESSIONAL EXPERIENCE',
                heading: HeadingLevel.HEADING_2,
              }),
              ...state.workExperience.flatMap(exp => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: exp.position,
                      bold: true,
                    }),
                    new TextRun({
                      text: ` - ${exp.company}`,
                    }),
                    ...(exp.location ? [new TextRun({ text: ` • ${exp.location}` })] : []),
                  ],
                }),
                new Paragraph({
                  text: `${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}`,
                  italics: true,
                }),
                // Responsibilities
                ...exp.description.filter(desc => desc.trim()).map(desc => 
                  new Paragraph({
                    text: `• ${desc}`,
                  })
                ),
                // Achievements
                ...exp.achievements.filter(achievement => achievement.trim()).map(achievement => 
                  new Paragraph({
                    text: `• ${achievement}`,
                  })
                ),
                // Technologies
                ...(exp.technologies.length > 0 ? [
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: 'Technologies: ',
                        bold: true,
                      }),
                      new TextRun({
                        text: exp.technologies.join(', '),
                      }),
                    ],
                  })
                ] : []),
                new Paragraph({ text: '' }),
              ])
            ] : []),

            // Education
            ...(state.education.length > 0 ? [
              new Paragraph({
                text: 'EDUCATION',
                heading: HeadingLevel.HEADING_2,
              }),
              ...state.education.flatMap(edu => [
                new Paragraph({
                  children: [
                    new TextRun({
                      text: `${edu.degree}${edu.field ? ` in ${edu.field}` : ''}`,
                      bold: true,
                    }),
                  ],
                }),
                new Paragraph({
                  text: `${edu.institution}${edu.location ? ` • ${edu.location}` : ''}`,
                }),
                new Paragraph({
                  text: `${edu.startDate} - ${edu.endDate}${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}`,
                  italics: true,
                }),
                new Paragraph({ text: '' }),
              ])
            ] : []),

            // Skills
            ...(state.skills.length > 0 ? [
              new Paragraph({
                text: 'SKILLS',
                heading: HeadingLevel.HEADING_2,
              }),
              ...(() => {
                const skillsByCategory = new Map();
                state.skills.forEach(skill => {
                  if (!skillsByCategory.has(skill.category)) {
                    skillsByCategory.set(skill.category, []);
                  }
                  skillsByCategory.get(skill.category).push(skill.name);
                });
                
                return Array.from(skillsByCategory.entries()).map(([category, skills]) =>
                  new Paragraph({
                    children: [
                      new TextRun({
                        text: `${category}: `,
                        bold: true,
                      }),
                      new TextRun({
                        text: skills.join(', '),
                      }),
                    ],
                  })
                );
              })()
            ] : []),
          ],
        }],
      });

      const buffer = await Packer.toBuffer(doc);
      const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      saveAs(blob, `${state.personalInfo.fullName || 'Resume'}.docx`);
    } catch (error) {
      console.error('Error generating DOCX:', error);
      alert('Error generating DOCX. Please try again.');
    } finally {
      setIsExporting(false);
      setExportType(null);
    }
  };

  return (
    <div className="flex gap-4 justify-center mb-6">
      <button
        onClick={exportToPDF}
        disabled={isExporting}
        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
      >
        {isExporting && exportType === 'pdf' ? (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        <span className="font-semibold">
          {isExporting && exportType === 'pdf' ? 'Exporting...' : 'Export PDF'}
        </span>
      </button>
      <button
        onClick={exportToDOCX}
        disabled={isExporting}
        className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none disabled:cursor-not-allowed"
      >
        {isExporting && exportType === 'docx' ? (
          <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        )}
        <span className="font-semibold">
          {isExporting && exportType === 'docx' ? 'Exporting...' : 'Export DOCX'}
        </span>
      </button>
    </div>
  );
};

export default ExportButtons;