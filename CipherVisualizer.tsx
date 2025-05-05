import React from 'react';
import { useAppContext } from '../context/AppContext';
import { getCipherMapping } from '../utils/cipherUtils';

const CipherVisualizer: React.FC = () => {
  const { state } = useAppContext();
  const mapping = getCipherMapping(state.selectedCipher);
  
  if (state.selectedCipher !== 'pigpen' && state.selectedCipher !== 'morse') {
    return null;
  }

  const renderPigpenGrid = () => {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    return (
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-6 md:grid-cols-9 gap-4 min-w-max mx-auto">
          {alphabet.map((letter) => (
            <div 
              key={letter}
              className="flex flex-col items-center justify-center p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm 
                         transition-all duration-300 hover:shadow-md hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <span className="text-xl mb-1 font-semibold text-indigo-600 dark:text-indigo-400">
                {mapping[letter]}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400 uppercase">
                {letter}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMorseTable = () => {
    return (
      <div className="w-full overflow-x-auto">
        <div className="grid grid-cols-5 md:grid-cols-9 gap-2 min-w-max">
          {Object.entries(mapping).map(([key, value]) => (
            <div 
              key={key}
              className="flex flex-col items-center p-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm
                         transition-all duration-200 hover:bg-indigo-50 dark:hover:bg-gray-700"
            >
              <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {key === ' ' ? 'space' : key}
              </span>
              <span className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-1">
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="w-full mb-6 animate-fadeIn">
      <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200">
        {state.selectedCipher === 'pigpen' ? 'Pigpen Cipher Key' : 'Morse Code Reference'}
      </h2>
      
      <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
        {state.selectedCipher === 'pigpen' ? renderPigpenGrid() : renderMorseTable()}
      </div>
    </div>
  );
};

export default CipherVisualizer;