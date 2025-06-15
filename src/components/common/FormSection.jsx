import React from 'react';

const FormSection = ({ 
  title, 
  icon, 
  children, 
  showAddButton = false, 
  onAddClick, 
  addButtonText = '+ Add',
  showAddForm = false 
}) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 transition-all duration-300 hover:shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-gray-600 to-gray-700 rounded-lg flex items-center justify-center">
            {icon}
          </div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h2>
        </div>
        {showAddButton && (
          <button
            onClick={onAddClick}
            className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-3 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            {showAddForm ? 'Cancel' : addButtonText}
          </button>
        )}
      </div>
      {children}
    </div>
  );
};

export default FormSection;