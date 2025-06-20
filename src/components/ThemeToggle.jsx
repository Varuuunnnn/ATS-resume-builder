import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-14 h-8 bg-gray-200 dark:bg-gray-700 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 hover:bg-gray-300 dark:hover:bg-gray-600"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Track background with gradient */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 dark:opacity-100 transition-opacity duration-300"></div>
      
      {/* Toggle circle */}
      <div
        className={`relative z-10 w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-lg transform transition-all duration-300 flex items-center justify-center ${
          theme === 'dark' ? 'translate-x-3' : '-translate-x-3'
        }`}
      >
        {/* Sun icon for light mode */}
        <svg 
          className={`w-3.5 h-3.5 text-yellow-500 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
          }`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fillRule="evenodd" 
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" 
            clipRule="evenodd" 
          />
        </svg>
        
        {/* Moon icon for dark mode */}
        <svg 
          className={`absolute w-3.5 h-3.5 text-blue-400 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
          }`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      
      {/* Light mode label */}
      <span 
        className={`absolute left-2 text-xs font-medium text-gray-600 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-0' : 'opacity-100'
        }`}
      >
        ☀️
      </span>
      
      {/* Dark mode label */}
      <span 
        className={`absolute right-2 text-xs font-medium text-gray-300 transition-opacity duration-300 ${
          theme === 'dark' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        🌙
      </span>
    </button>
  );
};

export default ThemeToggle;