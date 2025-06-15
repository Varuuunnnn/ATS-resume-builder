import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import AddForm from './common/AddForm';

const EducationForm = () => {
  const { state, dispatch } = useResume();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    field: '',
    location: '',
    startDate: '',
    endDate: '',
    gpa: ''
  });

  const handleAddEducation = () => {
    if (newEducation.institution && newEducation.degree) {
      dispatch({ type: 'ADD_EDUCATION', payload: newEducation });
      setNewEducation({
        institution: '',
        degree: '',
        field: '',
        location: '',
        startDate: '',
        endDate: '',
        gpa: ''
      });
      setShowAddForm(false);
    }
  };

  const updateEducation = (id, field, value) => {
    dispatch({ type: 'UPDATE_EDUCATION', payload: { id, updates: { [field]: value } } });
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    </svg>
  );

  return (
    <FormSection 
      title="Education" 
      icon={icon}
      showAddButton={true}
      onAddClick={() => setShowAddForm(!showAddForm)}
      showAddForm={showAddForm}
    >
      {showAddForm && (
        <AddForm
          title="Add Education"
          onSubmit={handleAddEducation}
          onCancel={() => setShowAddForm(false)}
          submitText="Add Education"
        >
          <FormInput
            label="Institution"
            value={newEducation.institution}
            onChange={(e) => setNewEducation(prev => ({ ...prev, institution: e.target.value }))}
            placeholder="University Name"
            required
            enableRichText
          />
          <FormInput
            label="Degree"
            value={newEducation.degree}
            onChange={(e) => setNewEducation(prev => ({ ...prev, degree: e.target.value }))}
            placeholder="Bachelor of Science"
            required
            enableRichText
          />
          <FormInput
            label="Field of Study"
            value={newEducation.field}
            onChange={(e) => setNewEducation(prev => ({ ...prev, field: e.target.value }))}
            placeholder="Computer Science"
            enableRichText
          />
          <FormInput
            label="Location"
            value={newEducation.location}
            onChange={(e) => setNewEducation(prev => ({ ...prev, location: e.target.value }))}
            placeholder="City, State"
          />
          <FormInput
            label="GPA"
            value={newEducation.gpa}
            onChange={(e) => setNewEducation(prev => ({ ...prev, gpa: e.target.value }))}
            placeholder="3.8/4.0"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput
              label="Start Date (YYYY-MM)"
              type="month"
              value={newEducation.startDate}
              onChange={(e) => setNewEducation(prev => ({ ...prev, startDate: e.target.value }))}
              placeholder="2019-08"
            />
            <FormInput
              label="End Date (YYYY-MM)"
              type="month"
              value={newEducation.endDate}
              onChange={(e) => setNewEducation(prev => ({ ...prev, endDate: e.target.value }))}
              placeholder="2023-05"
            />
          </div>
        </AddForm>
      )}

      <div className="space-y-4">
        {state.education.map((education) => (
          <div key={education.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start">
              <div className="flex-1 space-y-3">
                <FormInput
                  value={education.degree}
                  onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
                  placeholder="Degree"
                  className="text-lg font-semibold bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                  enableRichText
                />
                <FormInput
                  value={education.field}
                  onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
                  placeholder="Field of Study"
                  className="text-sm bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                  enableRichText
                />
                <FormInput
                  value={education.institution}
                  onChange={(e) => updateEducation(education.id, 'institution', e.target.value)}
                  placeholder="Institution"
                  className="font-medium bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                  enableRichText
                />
                <FormInput
                  value={education.location}
                  onChange={(e) => updateEducation(education.id, 'location', e.target.value)}
                  placeholder="Location"
                  className="text-sm bg-transparent border-none focus:ring-2 focus:ring-gray-500 rounded px-2 py-1"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FormInput
                    label="Start Date (YYYY-MM)"
                    type="month"
                    value={education.startDate}
                    onChange={(e) => updateEducation(education.id, 'startDate', e.target.value)}
                    placeholder="2019-08"
                  />
                  <FormInput
                    label="End Date (YYYY-MM)"
                    type="month"
                    value={education.endDate}
                    onChange={(e) => updateEducation(education.id, 'endDate', e.target.value)}
                    placeholder="2023-05"
                  />
                  <FormInput
                    label="GPA"
                    value={education.gpa}
                    onChange={(e) => updateEducation(education.id, 'gpa', e.target.value)}
                    placeholder="3.8/4.0"
                  />
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_EDUCATION', payload: education.id })}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm p-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default EducationForm;