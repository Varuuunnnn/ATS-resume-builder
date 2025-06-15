import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import AddForm from './common/AddForm';

const PersonalInfoForm = () => {
  const { state, dispatch } = useResume();
  const [showAddWebsite, setShowAddWebsite] = useState(false);
  const [newWebsite, setNewWebsite] = useState({ label: '', url: '' });

  const handleInputChange = (field, value) => {
    dispatch({ type: 'UPDATE_PERSONAL_INFO', payload: { [field]: value } });
  };

  const handleAddWebsite = () => {
    if (newWebsite.label && newWebsite.url) {
      dispatch({ type: 'ADD_WEBSITE_LINK', payload: newWebsite });
      setNewWebsite({ label: '', url: '' });
      setShowAddWebsite(false);
    }
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  return (
    <FormSection title="Personal Information" icon={icon}>
      <div className="space-y-4">
        <FormInput
          label="Full Name"
          value={state.personalInfo.fullName}
          onChange={(e) => handleInputChange('fullName', e.target.value)}
          placeholder="John Doe"
          required
        />
        <FormInput
          label="Email"
          type="email"
          value={state.personalInfo.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="john@example.com"
          required
        />
        <FormInput
          label="Phone"
          type="tel"
          value={state.personalInfo.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          placeholder="(555) 123-4567"
          required
        />
        <FormInput
          label="Location"
          value={state.personalInfo.location}
          onChange={(e) => handleInputChange('location', e.target.value)}
          placeholder="City, State"
          required
        />

        <div>
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Website Links</label>
            <button
              onClick={() => setShowAddWebsite(!showAddWebsite)}
              className="text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              {showAddWebsite ? 'Cancel' : '+ Add Website'}
            </button>
          </div>

          {showAddWebsite && (
            <AddForm
              title="Add Website"
              onSubmit={handleAddWebsite}
              onCancel={() => setShowAddWebsite(false)}
              submitText="Add Website"
            >
              <FormInput
                label="Label"
                value={newWebsite.label}
                onChange={(e) => setNewWebsite(prev => ({ ...prev, label: e.target.value }))}
                placeholder="Portfolio, Blog, etc."
              />
              <FormInput
                label="URL"
                type="url"
                value={newWebsite.url}
                onChange={(e) => setNewWebsite(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com"
              />
            </AddForm>
          )}

          <div className="space-y-2">
            {state.personalInfo.websites.map((website) => (
              <div key={website.id} className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                <div className="space-y-2">
                  <FormInput
                    label="Label"
                    value={website.label}
                    onChange={(e) => dispatch({ type: 'UPDATE_WEBSITE_LINK', payload: { id: website.id, updates: { label: e.target.value } } })}
                    placeholder="Label"
                  />
                  <FormInput
                    label="URL"
                    type="url"
                    value={website.url}
                    onChange={(e) => dispatch({ type: 'UPDATE_WEBSITE_LINK', payload: { id: website.id, updates: { url: e.target.value } } })}
                    placeholder="URL"
                  />
                  <div className="flex justify-end">
                    <button
                      onClick={() => dispatch({ type: 'REMOVE_WEBSITE_LINK', payload: website.id })}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <FormInput
          label="LinkedIn"
          type="url"
          value={state.personalInfo.linkedin || ''}
          onChange={(e) => handleInputChange('linkedin', e.target.value)}
          placeholder="https://linkedin.com/in/yourprofile"
        />
        <FormInput
          label="GitHub"
          type="url"
          value={state.personalInfo.github || ''}
          onChange={(e) => handleInputChange('github', e.target.value)}
          placeholder="https://github.com/yourusername"
        />
      </div>
    </FormSection>
  );
};

export default PersonalInfoForm;