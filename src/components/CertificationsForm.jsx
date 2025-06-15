import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import AddForm from './common/AddForm';

const CertificationsForm = () => {
  const { state, dispatch } = useResume();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCertification, setNewCertification] = useState({
    description: '',
    date: ''
  });

  const handleAddCertification = () => {
    if (newCertification.description) {
      dispatch({ type: 'ADD_CERTIFICATION', payload: newCertification });
      setNewCertification({
        description: '',
        date: ''
      });
      setShowAddForm(false);
    }
  };

  const updateCertification = (id, field, value) => {
    dispatch({ type: 'UPDATE_CERTIFICATION', payload: { id, updates: { [field]: value } } });
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  );

  return (
    <FormSection 
      title="Certifications" 
      icon={icon}
      showAddButton={true}
      onAddClick={() => setShowAddForm(!showAddForm)}
      showAddForm={showAddForm}
    >
      {showAddForm && (
        <AddForm
          title="Add Certification"
          onSubmit={handleAddCertification}
          onCancel={() => setShowAddForm(false)}
          submitText="Add Certification"
        >
          <FormTextarea
            label="Description"
            value={newCertification.description}
            onChange={(e) => setNewCertification(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the certification in one line"
            rows={2}
          />
          <FormInput
            label="Date (YYYY-MM)"
            type="month"
            value={newCertification.date}
            onChange={(e) => setNewCertification(prev => ({ ...prev, date: e.target.value }))}
            placeholder="2024-09"
          />
        </AddForm>
      )}

      <div className="space-y-4">
        {state.certifications.map((certification) => (
          <div key={certification.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <FormInput
                  label="Date (YYYY-MM)"
                  type="month"
                  value={certification.date}
                  onChange={(e) => updateCertification(certification.id, 'date', e.target.value)}
                  placeholder="2024-09"
                />
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_CERTIFICATION', payload: certification.id })}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm p-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <FormTextarea
              label="Description"
              value={certification.description || ''}
              onChange={(e) => updateCertification(certification.id, 'description', e.target.value)}
              placeholder="Describe the certification"
              rows={2}
            />
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default CertificationsForm;