import React, { useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import CipherSelector from './components/CipherSelector';
import CipherVisualizer from './components/CipherVisualizer';
import InputOutput from './components/InputOutput';
import Footer from './components/Footer';

const MainApp: React.FC = () => {
  const { state } = useAppContext();
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.theme === 'dark');
  }, [state.theme]);
  
  return (
    <div className={`min-h-screen flex flex-col ${state.theme === 'dark' ? 'dark' : ''}`}>
      <Toaster position="top-right" />
      <Header />
      
      <main className="flex-1 py-8 px-6 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto max-w-6xl">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Encrypt & Decrypt Messages
            </h1>
            
            <CipherSelector />
            <CipherVisualizer />
            <InputOutput />
          </div>
          
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-indigo-900 dark:text-indigo-300 mb-3">
              About {state.selectedCipher.charAt(0).toUpperCase() + state.selectedCipher.slice(1)} Cipher
            </h2>
            <p className="text-indigo-700 dark:text-indigo-400">
              {state.selectedCipher === 'pigpen' && 
                "The Pigpen cipher (also called the masonic cipher or Freemason's cipher) is a geometric simple substitution cipher that maps letters to symbols based on a grid pattern. It's been used by Freemasons since at least the 18th century."}
              {state.selectedCipher === 'caesar' && 
                "The Caesar cipher is one of the simplest and most widely known encryption techniques. Each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet. The method is named after Julius Caesar, who used it in his private correspondence."}
              {state.selectedCipher === 'atbash' && 
                "The Atbash cipher is a substitution cipher where each letter is mapped to its reverse in the alphabet. Originally used for the Hebrew alphabet, it can be applied to any alphabet. It is its own inverse - encrypting and decrypting are the same operation."}
              {state.selectedCipher === 'vigenere' && 
                "The Vigenère cipher is a method of encrypting alphabetic text by using a series of interwoven Caesar ciphers, based on the letters of a keyword. It was invented by Giovan Battista Bellaso in 1553, but was later misattributed to Blaise de Vigenère."}
              {state.selectedCipher === 'morse' && 
                "Morse code is a method of transmitting text information as a series of on-off tones, lights, or clicks. It is named after Samuel Morse, an inventor of the telegraph. International Morse Code encodes the 26 Latin letters A through Z, one non-Latin letter, the Arabic numerals, and a small set of punctuation and procedural signals."}
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}

export default App;