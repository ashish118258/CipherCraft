import React from 'react';
import { useAppContext } from '../context/AppContext';
import { cipherOptions } from '../utils/cipherUtils';
import { LockKeyhole, Fingerprint, Hash, KeyRound, Radio } from 'lucide-react';

const CipherSelector: React.FC = () => {
  const { state, selectCipher } = useAppContext();

  const getIconForCipher = (cipherId: string) => {
    switch (cipherId) {
      case 'pigpen':
        return <Fingerprint className="w-6 h-6" />;
      case 'caesar':
        return <KeyRound className="w-6 h-6" />;
      case 'atbash':
        return <Hash className="w-6 h-6" />;
      case 'vigenere':
        return <LockKeyhole className="w-6 h-6" />;
      case 'morse':
        return <Radio className="w-6 h-6" />;
      default:
        return <Fingerprint className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full mb-8 animate-fadeIn">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
        Select Cipher Method
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {cipherOptions.map((cipher) => (
          <button
            key={cipher.id}
            onClick={() => selectCipher(cipher.id)}
            className={`cipher-button ${state.selectedCipher === cipher.id ? 'active' : ''}`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`transition-transform duration-300 ${
                state.selectedCipher === cipher.id ? 'scale-110' : ''
              }`}>
                {getIconForCipher(cipher.id)}
              </div>
              <h3 className="font-medium text-sm">{cipher.name}</h3>
            </div>
            
            {state.selectedCipher === cipher.id && (
              <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                <div className="w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full animate-bounce-subtle" />
              </div>
            )}
          </button>
        ))}
      </div>
      
      {cipherOptions.find(c => c.id === state.selectedCipher)?.description && (
        <p className="mt-4 text-sm text-gray-600 dark:text-gray-400 animate-slideIn">
          {cipherOptions.find(c => c.id === state.selectedCipher)?.description}
        </p>
      )}
    </div>
  );
};

export default CipherSelector;