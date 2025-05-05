import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Moon, Sun } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { state, toggleTheme } = useAppContext();
  
  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full transition-colors duration-200 
                text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      aria-label={state.theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {state.theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;