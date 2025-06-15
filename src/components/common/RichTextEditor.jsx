import React from 'react';

const RichTextEditor = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  rows = 3,
  className = '',
  ...props 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 resize-none ${className}`}
        placeholder={placeholder}
        {...props}
      />
      <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Use **text** to make text bold in the preview.
      </div>
    </div>
  );
};

export default RichTextEditor;