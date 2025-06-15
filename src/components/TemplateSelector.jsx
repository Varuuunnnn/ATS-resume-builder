import React, { useState } from 'react';
import { useTemplate } from '../context/TemplateContext';
import FormSection from './common/FormSection';

const TemplateSelector = () => {
  const { 
    templates, 
    selectedTemplate, 
    setSelectedTemplate, 
    getCurrentTemplate,
    updateTypography,
    updateColors,
    resetCustomizations,
    customTypography,
    customColors
  } = useTemplate();
  
  const [showCustomization, setShowCustomization] = useState(false);
  const [activeCustomTab, setActiveCustomTab] = useState('typography');

  const currentTemplate = getCurrentTemplate();

  const handleTemplateChange = (templateId) => {
    setSelectedTemplate(templateId);
    resetCustomizations();
  };

  const handleTypographyChange = (field, value) => {
    const newTypography = {
      ...currentTemplate.typography,
      [field]: value
    };
    updateTypography(newTypography);
  };

  const handleColorChange = (field, value) => {
    const newColors = {
      ...currentTemplate.colors,
      [field]: value
    };
    updateColors(newColors);
  };

  const fontOptions = [
    'Inter', 'Georgia', 'Poppins', 'Playfair Display', 'JetBrains Mono',
    'Crimson Text', 'Source Sans Pro', 'Oswald', 'Libre Baskerville',
    'Roboto', 'Open Sans', 'Lato', 'Montserrat', 'Merriweather'
  ];

  const weightOptions = [
    { value: '300', label: 'Light' },
    { value: '400', label: 'Regular' },
    { value: '500', label: 'Medium' },
    { value: '600', label: 'Semi Bold' },
    { value: '700', label: 'Bold' }
  ];

  const sizeOptions = [
    { value: 'text-xs', label: 'Extra Small' },
    { value: 'text-sm', label: 'Small' },
    { value: 'text-base', label: 'Base' },
    { value: 'text-lg', label: 'Large' },
    { value: 'text-xl', label: 'Extra Large' },
    { value: 'text-2xl', label: '2X Large' }
  ];

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
    </svg>
  );

  return (
    <FormSection title="Template & Design" icon={icon}>
      <div className="space-y-6">
        {/* Template Selection */}
        <div>
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Choose Template</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.values(templates).map((template) => (
              <div
                key={template.id}
                onClick={() => handleTemplateChange(template.id)}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  selectedTemplate === template.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900 dark:text-white">{template.name}</h4>
                  {selectedTemplate === template.id && (
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">{template.description}</p>
                <div className="flex gap-2 mt-3">
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: template.colors.primary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: template.colors.secondary }}
                  />
                  <div 
                    className="w-4 h-4 rounded-full border"
                    style={{ backgroundColor: template.colors.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Customization Toggle */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-600">
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Advanced Customization</h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">Customize typography and colors</p>
          </div>
          <button
            onClick={() => setShowCustomization(!showCustomization)}
            className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm"
          >
            {showCustomization ? 'Hide' : 'Customize'}
          </button>
        </div>

        {/* Customization Panel */}
        {showCustomization && (
          <div className="border border-gray-200 dark:border-gray-600 rounded-lg p-4 bg-gray-50 dark:bg-gray-700/30">
            {/* Customization Tabs */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setActiveCustomTab('typography')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCustomTab === 'typography'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                Typography
              </button>
              <button
                onClick={() => setActiveCustomTab('colors')}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCustomTab === 'colors'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-500'
                }`}
              >
                Colors
              </button>
            </div>

            {/* Typography Customization */}
            {activeCustomTab === 'typography' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Heading Font
                    </label>
                    <select
                      value={currentTemplate.typography.headingFont}
                      onChange={(e) => handleTypographyChange('headingFont', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Body Font
                    </label>
                    <select
                      value={currentTemplate.typography.bodyFont}
                      onChange={(e) => handleTypographyChange('bodyFont', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {fontOptions.map(font => (
                        <option key={font} value={font}>{font}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Heading Weight
                    </label>
                    <select
                      value={currentTemplate.typography.headingWeight}
                      onChange={(e) => handleTypographyChange('headingWeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {weightOptions.map(weight => (
                        <option key={weight.value} value={weight.value}>{weight.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Body Weight
                    </label>
                    <select
                      value={currentTemplate.typography.bodyWeight}
                      onChange={(e) => handleTypographyChange('bodyWeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {weightOptions.map(weight => (
                        <option key={weight.value} value={weight.value}>{weight.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Heading Size
                    </label>
                    <select
                      value={currentTemplate.typography.headingSize}
                      onChange={(e) => handleTypographyChange('headingSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {sizeOptions.map(size => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Body Size
                    </label>
                    <select
                      value={currentTemplate.typography.bodySize}
                      onChange={(e) => handleTypographyChange('bodySize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                    >
                      {sizeOptions.map(size => (
                        <option key={size.value} value={size.value}>{size.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Color Customization */}
            {activeCustomTab === 'colors' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(currentTemplate.colors).map(([key, value]) => (
                    <div key={key}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="color"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="w-12 h-8 border border-gray-300 dark:border-gray-600 rounded cursor-pointer"
                        />
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handleColorChange(key, e.target.value)}
                          className="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-xs bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          placeholder="#000000"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset Button */}
            {(customTypography || customColors) && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                <button
                  onClick={resetCustomizations}
                  className="text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
                >
                  Reset to Template Defaults
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </FormSection>
  );
};

export default TemplateSelector;