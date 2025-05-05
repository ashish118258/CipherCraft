export type CipherType = 'pigpen' | 'caesar' | 'atbash' | 'vigenere' | 'morse';

export interface CipherOption {
  id: CipherType;
  name: string;
  description: string;
  requiresKey?: boolean;
}

export interface AppState {
  selectedCipher: CipherType;
  inputText: string;
  outputText: string;
  key: string;
  mode: 'encrypt' | 'decrypt';
  theme: 'light' | 'dark';
}