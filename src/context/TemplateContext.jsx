import React, { createContext, useContext, useState, useEffect } from 'react';

const TemplateContext = createContext();

export const templates = {
  modern: {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean and contemporary design with subtle accents',
    colors: {
      primary: '#2563eb',
      secondary: '#64748b',
      accent: '#3b82f6',
      text: '#1e293b',
      textLight: '#64748b',
      background: '#ffffff',
      border: '#e2e8f0'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      headingWeight: '600',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'centered',
      sectionSpacing: 'mb-6',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b border-gray-300',
      layoutType: 'single-column'
    }
  },
  sidebar: {
    id: 'sidebar',
    name: 'Professional Sidebar',
    description: 'Two-column layout with dark header and sidebar design',
    colors: {
      primary: '#ffffff',
      secondary: '#e5e7eb',
      accent: '#374151',
      text: '#111827',
      textLight: '#6b7280',
      background: '#ffffff',
      border: '#d1d5db',
      headerBg: '#4b5563',
      sidebarBg: '#e5e7eb',
      sidebarText: '#374151'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      headingWeight: '700',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'left-aligned',
      sectionSpacing: 'mb-6',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b border-gray-300',
      layoutType: 'sidebar'
    }
  },
  classic: {
    id: 'classic',
    name: 'Classic Traditional',
    description: 'Timeless design perfect for conservative industries',
    colors: {
      primary: '#1f2937',
      secondary: '#6b7280',
      accent: '#374151',
      text: '#111827',
      textLight: '#6b7280',
      background: '#ffffff',
      border: '#d1d5db'
    },
    typography: {
      headingFont: 'Georgia',
      bodyFont: 'Georgia',
      headingWeight: '700',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-normal'
    },
    layout: {
      headerStyle: 'left-aligned',
      sectionSpacing: 'mb-5',
      itemSpacing: 'mb-3',
      borderStyle: 'border-b-2 border-gray-800',
      layoutType: 'single-column'
    }
  },
  creative: {
    id: 'creative',
    name: 'Creative Bold',
    description: 'Eye-catching design for creative professionals',
    colors: {
      primary: '#7c3aed',
      secondary: '#a855f7',
      accent: '#c084fc',
      text: '#1e1b4b',
      textLight: '#6366f1',
      background: '#ffffff',
      border: '#e0e7ff'
    },
    typography: {
      headingFont: 'Poppins',
      bodyFont: 'Inter',
      headingWeight: '700',
      bodyWeight: '400',
      headingSize: 'text-xl',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'centered',
      sectionSpacing: 'mb-7',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b-2 border-purple-300',
      layoutType: 'single-column'
    }
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal Clean',
    description: 'Ultra-clean design with maximum white space',
    colors: {
      primary: '#000000',
      secondary: '#525252',
      accent: '#737373',
      text: '#171717',
      textLight: '#737373',
      background: '#ffffff',
      border: '#e5e5e5'
    },
    typography: {
      headingFont: 'Inter',
      bodyFont: 'Inter',
      headingWeight: '500',
      bodyWeight: '300',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-loose'
    },
    layout: {
      headerStyle: 'left-aligned',
      sectionSpacing: 'mb-8',
      itemSpacing: 'mb-5',
      borderStyle: 'border-b border-gray-200',
      layoutType: 'single-column'
    }
  },
  executive: {
    id: 'executive',
    name: 'Executive Elite',
    description: 'Sophisticated design for senior-level positions',
    colors: {
      primary: '#1e40af',
      secondary: '#3730a3',
      accent: '#4f46e5',
      text: '#1e293b',
      textLight: '#475569',
      background: '#ffffff',
      border: '#cbd5e1'
    },
    typography: {
      headingFont: 'Playfair Display',
      bodyFont: 'Inter',
      headingWeight: '700',
      bodyWeight: '400',
      headingSize: 'text-xl',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'centered',
      sectionSpacing: 'mb-6',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b-2 border-blue-600',
      layoutType: 'single-column'
    }
  },
  tech: {
    id: 'tech',
    name: 'Tech Innovator',
    description: 'Modern design tailored for technology professionals',
    colors: {
      primary: '#059669',
      secondary: '#047857',
      accent: '#10b981',
      text: '#064e3b',
      textLight: '#065f46',
      background: '#ffffff',
      border: '#d1fae5'
    },
    typography: {
      headingFont: 'JetBrains Mono',
      bodyFont: 'Inter',
      headingWeight: '600',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'left-aligned',
      sectionSpacing: 'mb-6',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b border-emerald-300',
      layoutType: 'single-column'
    }
  },
  elegant: {
    id: 'elegant',
    name: 'Elegant Luxury',
    description: 'Refined design with premium aesthetics',
    colors: {
      primary: '#92400e',
      secondary: '#a16207',
      accent: '#d97706',
      text: '#451a03',
      textLight: '#78350f',
      background: '#ffffff',
      border: '#fde68a'
    },
    typography: {
      headingFont: 'Crimson Text',
      bodyFont: 'Inter',
      headingWeight: '600',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'centered',
      sectionSpacing: 'mb-6',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b border-amber-300',
      layoutType: 'single-column'
    }
  },
  corporate: {
    id: 'corporate',
    name: 'Corporate Professional',
    description: 'Business-focused design for corporate environments',
    colors: {
      primary: '#1f2937',
      secondary: '#374151',
      accent: '#4b5563',
      text: '#111827',
      textLight: '#6b7280',
      background: '#ffffff',
      border: '#d1d5db'
    },
    typography: {
      headingFont: 'Source Sans Pro',
      bodyFont: 'Source Sans Pro',
      headingWeight: '600',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-normal'
    },
    layout: {
      headerStyle: 'left-aligned',
      sectionSpacing: 'mb-5',
      itemSpacing: 'mb-3',
      borderStyle: 'border-b border-gray-400',
      layoutType: 'single-column'
    }
  },
  artistic: {
    id: 'artistic',
    name: 'Artistic Expression',
    description: 'Creative design for artists and designers',
    colors: {
      primary: '#dc2626',
      secondary: '#ea580c',
      accent: '#f59e0b',
      text: '#7f1d1d',
      textLight: '#b91c1c',
      background: '#ffffff',
      border: '#fecaca'
    },
    typography: {
      headingFont: 'Oswald',
      bodyFont: 'Inter',
      headingWeight: '600',
      bodyWeight: '400',
      headingSize: 'text-xl',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'centered',
      sectionSpacing: 'mb-7',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b-2 border-red-300',
      layoutType: 'single-column'
    }
  },
  academic: {
    id: 'academic',
    name: 'Academic Scholar',
    description: 'Professional design for academic and research positions',
    colors: {
      primary: '#1e3a8a',
      secondary: '#1e40af',
      accent: '#3b82f6',
      text: '#1e293b',
      textLight: '#475569',
      background: '#ffffff',
      border: '#dbeafe'
    },
    typography: {
      headingFont: 'Libre Baskerville',
      bodyFont: 'Inter',
      headingWeight: '700',
      bodyWeight: '400',
      headingSize: 'text-lg',
      bodySize: 'text-sm',
      lineHeight: 'leading-relaxed'
    },
    layout: {
      headerStyle: 'left-aligned',
      sectionSpacing: 'mb-6',
      itemSpacing: 'mb-4',
      borderStyle: 'border-b border-blue-300',
      layoutType: 'single-column'
    }
  }
};

export const TemplateProvider = ({ children }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(() => {
    try {
      return localStorage.getItem('selectedTemplate') || 'modern';
    } catch {
      return 'modern';
    }
  });

  const [customTypography, setCustomTypography] = useState(() => {
    try {
      const saved = localStorage.getItem('customTypography');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [customColors, setCustomColors] = useState(() => {
    try {
      const saved = localStorage.getItem('customColors');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('selectedTemplate', selectedTemplate);
    } catch (error) {
      console.error('Failed to save template:', error);
    }
  }, [selectedTemplate]);

  useEffect(() => {
    try {
      if (customTypography) {
        localStorage.setItem('customTypography', JSON.stringify(customTypography));
      } else {
        localStorage.removeItem('customTypography');
      }
    } catch (error) {
      console.error('Failed to save typography:', error);
    }
  }, [customTypography]);

  useEffect(() => {
    try {
      if (customColors) {
        localStorage.setItem('customColors', JSON.stringify(customColors));
      } else {
        localStorage.removeItem('customColors');
      }
    } catch (error) {
      console.error('Failed to save colors:', error);
    }
  }, [customColors]);

  const getCurrentTemplate = () => {
    const baseTemplate = templates[selectedTemplate] || templates.modern;
    return {
      ...baseTemplate,
      typography: customTypography || baseTemplate.typography,
      colors: customColors || baseTemplate.colors
    };
  };

  const updateTypography = (typography) => {
    setCustomTypography(typography);
  };

  const updateColors = (colors) => {
    setCustomColors(colors);
  };

  const resetCustomizations = () => {
    setCustomTypography(null);
    setCustomColors(null);
  };

  return (
    <TemplateContext.Provider value={{
      templates,
      selectedTemplate,
      setSelectedTemplate,
      getCurrentTemplate,
      customTypography,
      customColors,
      updateTypography,
      updateColors,
      resetCustomizations
    }}>
      {children}
    </TemplateContext.Provider>
  );
};

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};