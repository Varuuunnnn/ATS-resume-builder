import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import AddForm from './common/AddForm';

const WorkExperienceForm = () => {
  const { state, dispatch } = useResume();
  const [showAddForm, setShowAddForm] = useState(false);
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [newExperience, setNewExperience] = useState({
    company: '',
    position: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: [''],
    achievements: [''],
    technologies: []
  });

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      dispatch({
        type: 'ADD_WORK_EXPERIENCE',
        payload: {
          ...newExperience,
          description: newExperience.description.filter(d => d.trim() !== ''),
          achievements: newExperience.achievements.filter(a => a.trim() !== ''),
          technologies: newExperience.technologies.filter(t => t.trim() !== '')
        }
      });
      setNewExperience({
        company: '',
        position: '',
        location: '',
        startDate: '',
        endDate: '',
        current: false,
        description: [''],
        achievements: [''],
        technologies: []
      });
      setShowAddForm(false);
    }
  };

  const updateExperience = (id, field, value) => {
    dispatch({ type: 'UPDATE_WORK_EXPERIENCE', payload: { id, updates: { [field]: value } } });
  };

  const addTechnology = (id, tech) => {
    if (tech.trim()) {
      const exp = state.workExperience.find(e => e.id === id);
      if (exp) {
        updateExperience(id, 'technologies', [...exp.technologies, tech.trim()]);
      }
    }
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6.5" />
    </svg>
  );

  return (
    <FormSection 
      title="Work Experience" 
      icon={icon}
      showAddButton={true}
      onAddClick={() => setShowAddForm(!showAddForm)}
      showAddForm={showAddForm}
    >
      {showAddForm && (
        <AddForm
          title="Add New Experience"
          onSubmit={handleAddExperience}
          onCancel={() => setShowAddForm(false)}
          submitText="Add Experience"
        >
          <FormInput
            label="Company"
            value={newExperience.company}
            onChange={(e) => setNewExperience(prev => ({ ...prev, company: e.target.value }))}
            placeholder="Company Name"
            required
            enableRichText
          />
          <FormInput
            label="Position"
            value={newExperience.position}
            onChange={(e) => setNewExperience(prev => ({ ...prev, position: e.target.value }))}
            placeholder="Job Title"
            required
            enableRichText
          />
          <FormInput
            label="Location"
            value={newExperience.location}
            onChange={(e) => setNewExperience(prev => ({ ...prev, location: e.target.value }))}
            placeholder="City, State"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Start Date (YYYY-MM)"
              type="month"
              value={newExperience.startDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, startDate: e.target.value }))}
              placeholder="2023-01"
            />
            <FormInput
              label="End Date (YYYY-MM)"
              type="month"
              value={newExperience.endDate}
              onChange={(e) => setNewExperience(prev => ({ ...prev, endDate: e.target.value }))}
              placeholder="2024-12"
              disabled={newExperience.current}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="current-job"
              checked={newExperience.current}
              onChange={(e) => setNewExperience(prev => ({ ...prev, current: e.target.checked, endDate: e.target.checked ? '' : prev.endDate }))}
              className="mr-2 w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
            />
            <label htmlFor="current-job" className="text-sm text-gray-700 dark:text-gray-300">Current Position</label>
          </div>
        </AddForm>
      )}

      <div className="space-y-4">
        {state.workExperience.map((experience) => (
          <div key={experience.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <FormInput
                  value={experience.position}
                  onChange={(e) => updateExperience(experience.id, 'position', e.target.value)}
                  placeholder="Position"
                  className="text-lg font-semibold bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                  enableRichText
                />
                <FormInput
                  value={experience.company}
                  onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
                  placeholder="Company"
                  className="text-lg font-medium bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                  enableRichText
                />
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedExperience(expandedExperience === experience.id ? null : experience.id)}
                  className="text-gray-600 hover:text-gray-800 dark:text-gray-400 text-sm p-2"
                >
                  <svg className={`w-4 h-4 transition-transform ${expandedExperience === experience.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => dispatch({ type: 'REMOVE_WORK_EXPERIENCE', payload: experience.id })}
                  className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm p-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>

            {expandedExperience === experience.id && (
              <div className="mt-4 space-y-4 border-t border-gray-200 dark:border-gray-600 pt-4">
                <FormInput
                  label="Location"
                  value={experience.location}
                  onChange={(e) => updateExperience(experience.id, 'location', e.target.value)}
                  placeholder="City, State"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormInput
                    label="Start Date (YYYY-MM)"
                    type="month"
                    value={experience.startDate}
                    onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
                    placeholder="2023-01"
                  />
                  <FormInput
                    label="End Date (YYYY-MM)"
                    type="month"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                    placeholder="2024-12"
                    disabled={experience.current}
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={experience.current}
                    onChange={(e) => updateExperience(experience.id, 'current', e.target.checked)}
                    className="mr-2 w-4 h-4 text-gray-600 bg-gray-100 border-gray-300 rounded focus:ring-gray-500"
                  />
                  <label className="text-sm text-gray-700 dark:text-gray-300">Current Position</label>
                </div>
                <FormTextarea
                  label="Job Description"
                  value={experience.description.join('\n')}
                  onChange={(e) => updateExperience(experience.id, 'description', e.target.value.split('\n'))}
                  placeholder="• Describe your responsibilities and tasks"
                  rows={4}
                />
                <FormTextarea
                  label="Key Achievements"
                  value={experience.achievements.join('\n')}
                  onChange={(e) => updateExperience(experience.id, 'achievements', e.target.value.split('\n'))}
                  placeholder="• List your quantifiable achievements"
                  rows={3}
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Technologies Used</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {experience.technologies.map((tech, index) => (
                      <span key={index} className="inline-flex items-center gap-1 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm">
                        {tech}
                        <button
                          onClick={() => {
                            const newTechnologies = experience.technologies.filter((_, i) => i !== index);
                            updateExperience(experience.id, 'technologies', newTechnologies);
                          }}
                          className="ml-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    placeholder="Add technology (press Enter)"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        addTechnology(experience.id, e.target.value);
                        e.target.value = '';
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default WorkExperienceForm;