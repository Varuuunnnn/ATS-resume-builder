import React, { useState } from 'react';
import { useResume } from '../context/ResumeContext';
import FormSection from './common/FormSection';
import RichTextEditor from './common/RichTextEditor';

const SummaryForm = () => {
  const { state, dispatch } = useResume();
  const [charCount, setCharCount] = useState(state.summary.length);

  const handleSummaryChange = (e) => {
    const value = e.target.value;
    setCharCount(value.length);
    dispatch({ type: 'UPDATE_SUMMARY', payload: value });
  };

  const maxChars = 500;
  const isNearLimit = charCount > maxChars * 0.8;
  const isOverLimit = charCount > maxChars;

  const icon = (
    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  );

  return (
    <FormSection title="Professional Summary" icon={icon}>
      <div>
        <RichTextEditor
          label="Summary"
          value={state.summary}
          onChange={handleSummaryChange}
          rows={5}
          placeholder="Write a compelling professional summary that highlights your key qualifications, experience, and career objectives..."
          className={`${
            isOverLimit ? 'border-red-500 focus:ring-red-500' : isNearLimit ? 'border-yellow-500 focus:ring-yellow-500' : ''
          }`}
          maxLength={maxChars}
        />
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Write 2-3 sentences highlighting your experience, key skills, and career goals. Use **text** for bold formatting.
            </p>
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${
            isOverLimit ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : isNearLimit ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300' : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
          }`}>
            {charCount}/{maxChars}
          </span>
        </div>
      </div>
    </FormSection>
  );
};

export default SummaryForm;