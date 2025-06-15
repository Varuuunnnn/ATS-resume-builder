import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import AddForm from './common/AddForm';

const CustomSectionsForm = () => {
  const { state, dispatch } = useResume();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newSection, setNewSection] = useState({
    title: '',
    type: 'list',
    content: { items: [''] }
  });

  const handleAddSection = () => {
    if (newSection.title) {
      dispatch({ type: 'ADD_CUSTOM_SECTION', payload: newSection });
      setNewSection({
        title: '',
        type: 'list',
        content: { items: [''] }
      });
      setShowAddForm(false);
    }
  };

  const handleTypeChange = (type) => {
    let content;
    switch (type) {
      case 'list':
        content = { items: [''] };
        break;
      case 'paragraph':
        content = { text: '' };
        break;
      case 'table':
        content = { headers: [''], rows: [['']] };
        break;
      default:
        content = { items: [''] };
    }
    setNewSection(prev => ({ ...prev, type, content }));
  };

  const updateSectionContent = (id, content) => {
    dispatch({ type: 'UPDATE_CUSTOM_SECTION', payload: { id, updates: { content } } });
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
    </svg>
  );

  return (
    <FormSection 
      title="Custom Sections" 
      icon={icon}
      showAddButton={true}
      onAddClick={() => setShowAddForm(!showAddForm)}
      showAddForm={showAddForm}
      addButtonText="+ Add Section"
    >
      {showAddForm && (
        <AddForm
          title="Add Custom Section"
          onSubmit={handleAddSection}
          onCancel={() => setShowAddForm(false)}
          submitText="Add Section"
        >
          <FormInput
            label="Section Title"
            value={newSection.title}
            onChange={(e) => setNewSection(prev => ({ ...prev, title: e.target.value }))}
            placeholder="e.g., Projects, Volunteer Work, Publications"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Section Type</label>
            <select
              value={newSection.type}
              onChange={(e) => handleTypeChange(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="list">List (bullet points)</option>
              <option value="paragraph">Paragraph (text block)</option>
              <option value="table">Table (structured data)</option>
            </select>
          </div>

          {newSection.type === 'list' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">List Items</label>
              {(newSection.content.items || ['']).map((item, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => {
                      const newItems = [...(newSection.content.items || [])];
                      newItems[index] = e.target.value;
                      setNewSection(prev => ({ ...prev, content: { ...prev.content, items: newItems } }));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="• List item"
                  />
                  {(newSection.content.items?.length || 0) > 1 && (
                    <button
                      onClick={() => {
                        const newItems = (newSection.content.items || []).filter((_, i) => i !== index);
                        setNewSection(prev => ({ ...prev, content: { ...prev.content, items: newItems } }));
                      }}
                      className="px-2 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
              <button
                onClick={() => setNewSection(prev => ({ 
                  ...prev, 
                  content: { ...prev.content, items: [...(prev.content.items || []), ''] } 
                }))}
                className="text-gray-600 hover:text-gray-800 dark:text-gray-400 text-sm flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add item
              </button>
            </div>
          )}

          {newSection.type === 'paragraph' && (
            <FormTextarea
              label="Content"
              value={newSection.content.text || ''}
              onChange={(e) => setNewSection(prev => ({ 
                ...prev, 
                content: { ...prev.content, text: e.target.value } 
              }))}
              placeholder="Enter your content here..."
              rows={4}
            />
          )}
        </AddForm>
      )}

      <div className="space-y-4">
        {state.customSections.sort((a, b) => a.order - b.order).map((section) => (
          <div key={section.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <FormInput
                  value={section.title}
                  onChange={(e) => dispatch({ type: 'UPDATE_CUSTOM_SECTION', payload: { id: section.id, updates: { title: e.target.value } } })}
                  placeholder="Section Title"
                  className="text-lg font-semibold bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 capitalize">
                  {section.type} section
                </p>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_CUSTOM_SECTION', payload: section.id })}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm p-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>

            {section.type === 'list' && (
              <div className="space-y-2">
                {(section.content.items || []).map((item, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const newItems = [...(section.content.items || [])];
                        newItems[index] = e.target.value;
                        updateSectionContent(section.id, { items: newItems });
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      placeholder="• List item"
                    />
                    {(section.content.items?.length || 0) > 1 && (
                      <button
                        onClick={() => {
                          const newItems = (section.content.items || []).filter((_, i) => i !== index);
                          updateSectionContent(section.id, { items: newItems });
                        }}
                        className="px-2 py-2 text-gray-600 hover:text-gray-800 dark:text-gray-400"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={() => {
                    const newItems = [...(section.content.items || []), ''];
                    updateSectionContent(section.id, { items: newItems });
                  }}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 text-sm flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add item
                </button>
              </div>
            )}

            {section.type === 'paragraph' && (
              <FormTextarea
                value={section.content.text || ''}
                onChange={(e) => updateSectionContent(section.id, { text: e.target.value })}
                placeholder="Enter your content here..."
                rows={4}
              />
            )}
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default CustomSectionsForm;