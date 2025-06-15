import React from 'react';

const AddForm = ({ title, children, onSubmit, onCancel, submitText = 'Add' }) => {
  return (
    <div className="mb-6 p-4 border border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/30">
      <h3 className="font-medium text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
      <div className="flex gap-2 mt-6">
        <button
          onClick={onSubmit}
          className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          {submitText}
        </button>
        <button
          onClick={onCancel}
          className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-2 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddForm;