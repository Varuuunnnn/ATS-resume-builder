import React from 'react';
import RichTextInput from './RichTextInput';

const FormInput = ({ 
  label, 
  type = 'text', 
  value, 
  onChange, 
  placeholder, 
  required = false,
  className = '',
  enableRichText = false,
  ...props 
}) => {
  if (enableRichText && type === 'text') {
    return (
      <RichTextInput
        label={label}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label} {required && '*'}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${className}`}
        placeholder={placeholder}
        {...props}
      />
      {enableRichText && (
        <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Use **text** to make text bold in the preview.
        </div>
      )}
    </div>
  );
};

export default FormInput;