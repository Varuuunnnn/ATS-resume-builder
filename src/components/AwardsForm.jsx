import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import AddForm from './common/AddForm';

const AwardsForm = () => {
  const { state, dispatch } = useResume();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAward, setNewAward] = useState({
    description: '',
    date: ''
  });

  const handleAddAward = () => {
    if (newAward.description) {
      dispatch({ type: 'ADD_AWARD', payload: newAward });
      setNewAward({
        description: '',
        date: ''
      });
      setShowAddForm(false);
    }
  };

  const updateAward = (id, field, value) => {
    dispatch({ type: 'UPDATE_AWARD', payload: { id, updates: { [field]: value } } });
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
    </svg>
  );

  return (
    <FormSection 
      title="Awards" 
      icon={icon}
      showAddButton={true}
      onAddClick={() => setShowAddForm(!showAddForm)}
      showAddForm={showAddForm}
    >
      {showAddForm && (
        <AddForm
          title="Add Award"
          onSubmit={handleAddAward}
          onCancel={() => setShowAddForm(false)}
          submitText="Add Award"
        >
          <FormTextarea
            label="Description"
            value={newAward.description}
            onChange={(e) => setNewAward(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe the award in one line"
            rows={2}
          />
          <FormInput
            label="Date (YYYY-MM)"
            type="month"
            value={newAward.date}
            onChange={(e) => setNewAward(prev => ({ ...prev, date: e.target.value }))}
            placeholder="2024-06"
          />
        </AddForm>
      )}

      <div className="space-y-4">
        {state.awards.map((award) => (
          <div key={award.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <FormInput
                  label="Date (YYYY-MM)"
                  type="month"
                  value={award.date}
                  onChange={(e) => updateAward(award.id, 'date', e.target.value)}
                  placeholder="2024-06"
                />
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_AWARD', payload: award.id })}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm p-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <FormTextarea
              label="Description"
              value={award.description || ''}
              onChange={(e) => updateAward(award.id, 'description', e.target.value)}
              placeholder="Describe the award"
              rows={2}
            />
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default AwardsForm;