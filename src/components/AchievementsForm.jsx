import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import FormTextarea from './common/FormTextarea';
import AddForm from './common/AddForm';

const AchievementsForm = () => {
  const { state, dispatch } = useResume();
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAchievement, setNewAchievement] = useState({
    description: '',
    date: ''
  });

  const handleAddAchievement = () => {
    if (newAchievement.description) {
      dispatch({ type: 'ADD_ACHIEVEMENT', payload: newAchievement });
      setNewAchievement({
        description: '',
        date: ''
      });
      setShowAddForm(false);
    }
  };

  const updateAchievement = (id, field, value) => {
    dispatch({ type: 'UPDATE_ACHIEVEMENT', payload: { id, updates: { [field]: value } } });
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  );

  return (
    <FormSection 
      title="Achievements" 
      icon={icon}
      showAddButton={true}
      onAddClick={() => setShowAddForm(!showAddForm)}
      showAddForm={showAddForm}
    >
      {showAddForm && (
        <AddForm
          title="Add Achievement"
          onSubmit={handleAddAchievement}
          onCancel={() => setShowAddForm(false)}
          submitText="Add Achievement"
        >
          <FormTextarea
            label="Description"
            value={newAchievement.description}
            onChange={(e) => setNewAchievement(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Describe your achievement in one line"
            rows={2}
          />
          <FormInput
            label="Date (YYYY-MM)"
            type="month"
            value={newAchievement.date}
            onChange={(e) => setNewAchievement(prev => ({ ...prev, date: e.target.value }))}
            placeholder="2024-03"
          />
        </AddForm>
      )}

      <div className="space-y-4">
        {state.achievements.map((achievement) => (
          <div key={achievement.id} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <div className="flex justify-between items-start mb-3">
              <div className="flex-1">
                <FormInput
                  label="Date (YYYY-MM)"
                  type="month"
                  value={achievement.date}
                  onChange={(e) => updateAchievement(achievement.id, 'date', e.target.value)}
                  placeholder="2024-03"
                />
              </div>
              <button
                onClick={() => dispatch({ type: 'REMOVE_ACHIEVEMENT', payload: achievement.id })}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-sm p-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
            
            <FormTextarea
              label="Description"
              value={achievement.description}
              onChange={(e) => updateAchievement(achievement.id, 'description', e.target.value)}
              placeholder="Describe your achievement"
              rows={2}
            />
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default AchievementsForm;