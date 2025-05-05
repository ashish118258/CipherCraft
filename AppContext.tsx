import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AppState, CipherType } from '../types';
import { encryptText, decryptText } from '../utils/cipherUtils';

interface AppContextType {
  state: AppState;
  updateInputText: (text: string) => void;
  updateKey: (key: string) => void;
  selectCipher: (cipher: CipherType) => void;
  toggleMode: () => void;
  toggleTheme: () => void;
  processText: () => void;
  copyToClipboard: () => Promise<boolean>;
  clearText: () => void;
}

const defaultState: AppState = {
  selectedCipher: 'pigpen',
  inputText: '',
  outputText: '',
  key: '',
  mode: 'encrypt',
  theme: 'light',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(defaultState);

  const updateInputText = (text: string) => {
    setState((prev) => ({ ...prev, inputText: text }));
  };

  const updateKey = (key: string) => {
    setState((prev) => ({ ...prev, key }));
  };

  const selectCipher = (cipher: CipherType) => {
    setState((prev) => ({ ...prev, selectedCipher: cipher, key: '', outputText: '' }));
  };

  const toggleMode = () => {
    setState((prev) => ({ 
      ...prev, 
      mode: prev.mode === 'encrypt' ? 'decrypt' : 'encrypt',
      outputText: ''
    }));
  };

  const toggleTheme = () => {
    setState((prev) => ({ ...prev, theme: prev.theme === 'light' ? 'dark' : 'light' }));
  };

  const processText = () => {
    if (!state.inputText.trim()) return;

    const result = state.mode === 'encrypt' 
      ? encryptText(state.inputText, state.selectedCipher, state.key) 
      : decryptText(state.inputText, state.selectedCipher, state.key);

    setState((prev) => ({ ...prev, outputText: result }));
  };

  const copyToClipboard = async (): Promise<boolean> => {
    if (!state.outputText) return false;
    
    try {
      await navigator.clipboard.writeText(state.outputText);
      return true;
    } catch (error) {
      console.error('Failed to copy text: ', error);
      return false;
    }
  };

  const clearText = () => {
    setState((prev) => ({ ...prev, inputText: '', outputText: '' }));
  };

  return (
    <AppContext.Provider
      value={{
        state,
        updateInputText,
        updateKey,
        selectCipher,
        toggleMode,
        toggleTheme,
        processText,
        copyToClipboard,
        clearText,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};