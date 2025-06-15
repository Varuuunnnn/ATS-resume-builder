import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import FormInput from './common/FormInput';
import AddForm from './common/AddForm';

const SkillsForm = () => {
  const { state, dispatch } = useResume();
  const [newSkill, setNewSkill] = useState({ name: '', category: '' });

  const handleAddSkill = () => {
    if (newSkill.name && newSkill.category) {
      dispatch({ type: 'ADD_SKILL', payload: newSkill });
      setNewSkill({ name: '', category: '' });
    }
  };

  const skillCategories = () => {
    const categories = new Map();
    state.skills.forEach(skill => {
      if (!categories.has(skill.category)) {
        categories.set(skill.category, []);
      }
      categories.get(skill.category).push(skill);
    });
    return Array.from(categories.entries());
  };

  const icon = (
    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

  return (
    <FormSection title="Skills" icon={icon}>
      <AddForm
        title="Add New Skill"
        onSubmit={handleAddSkill}
        onCancel={() => setNewSkill({ name: '', category: '' })}
        submitText="Add Skill"
      >
        <FormInput
          label="Skill Name"
          value={newSkill.name}
          onChange={(e) => setNewSkill(prev => ({ ...prev, name: e.target.value }))}
          placeholder="JavaScript"
        />
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <select
            value={newSkill.category}
            onChange={(e) => setNewSkill(prev => ({ ...prev, category: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          >
            <option value="">Select Category</option>
            <option value="Programming Languages">Programming Languages</option>
            <option value="Frameworks & Libraries">Frameworks & Libraries</option>
            <option value="Tools & Technologies">Tools & Technologies</option>
            <option value="Databases">Databases</option>
            <option value="Soft Skills">Soft Skills</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </AddForm>

      <div className="space-y-4">
        {skillCategories().map(([category, skills]) => (
          <div key={category} className="border border-gray-200 dark:border-gray-600 rounded-xl p-4 bg-gray-50 dark:bg-gray-700/50">
            <h3 className="font-medium text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              {category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill.id} className="inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-600 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium border border-gray-200 dark:border-gray-500">
                  {skill.name}
                  <button
                    onClick={() => dispatch({ type: 'REMOVE_SKILL', payload: skill.id })}
                    className="ml-1 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                    title="Remove skill"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </FormSection>
  );
};

export default SkillsForm;