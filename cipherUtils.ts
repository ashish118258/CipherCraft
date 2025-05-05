import { CipherType, CipherOption } from '../types';

// Pigpen cipher mapping
const pigpenMapping: Record<string, string> = {
  'a': '⌞', 'b': '⌜', 'c': '⌝', 'd': '⌟',
  'e': '⊔', 'f': '⊏', 'g': '⊐', 'h': '⊓',
  'i': '◠', 'j': '◡', 'k': '⊣', 'l': '⊢',
  'm': '⊤', 'n': '⊥', 'o': '∧', 'p': '∨',
  'q': '∠', 'r': '⌕', 's': '◇', 't': '○',
  'u': '◆', 'v': '●', 'w': '□', 'x': '■',
  'y': '△', 'z': '▲'
};

// Caesar cipher function
const caesarCipher = (text: string, shift: number, decrypt = false): string => {
  const actualShift = decrypt ? (26 - (shift % 26)) % 26 : shift % 26;
  
  return text
    .split('')
    .map(char => {
      if (!/[a-zA-Z]/.test(char)) return char;
      
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const base = isUpperCase ? 65 : 97;
      
      return String.fromCharCode(((code - base + actualShift) % 26) + base);
    })
    .join('');
};

// Atbash cipher function
const atbashCipher = (text: string): string => {
  return text
    .split('')
    .map(char => {
      if (!/[a-zA-Z]/.test(char)) return char;
      
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const base = isUpperCase ? 65 : 97;
      
      return String.fromCharCode(25 - (code - base) + base);
    })
    .join('');
};

// Vigenère cipher function
const vigenereCipher = (text: string, key: string, decrypt = false): string => {
  if (!key || !key.trim()) {
    return text;
  }
  
  const processedKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!processedKey) {
    return text;
  }
  
  return text
    .split('')
    .map((char, index) => {
      if (!/[a-zA-Z]/.test(char)) return char;
      
      const code = char.charCodeAt(0);
      const isUpperCase = code >= 65 && code <= 90;
      const base = isUpperCase ? 65 : 97;
      
      const keyChar = processedKey[index % processedKey.length];
      const keyShift = keyChar.charCodeAt(0) - 97;
      
      if (decrypt) {
        return String.fromCharCode(((code - base - keyShift + 26) % 26) + base);
      } else {
        return String.fromCharCode(((code - base + keyShift) % 26) + base);
      }
    })
    .join('');
};

// Morse code mapping
const morseMapping: Record<string, string> = {
  'a': '.-', 'b': '-...', 'c': '-.-.', 'd': '-..', 'e': '.', 'f': '..-.', 
  'g': '--.', 'h': '....', 'i': '..', 'j': '.---', 'k': '-.-', 'l': '.-..', 
  'm': '--', 'n': '-.', 'o': '---', 'p': '.--.', 'q': '--.-', 'r': '.-.', 
  's': '...', 't': '-', 'u': '..-', 'v': '...-', 'w': '.--', 'x': '-..-', 
  'y': '-.--', 'z': '--..', '1': '.----', '2': '..---', '3': '...--', 
  '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
  '9': '----.', '0': '-----', ' ': '/'
};

const reverseMorseMapping: Record<string, string> = Object.entries(morseMapping).reduce(
  (acc, [key, value]) => ({ ...acc, [value]: key }), {}
);

// Morse code functions
const morseEncode = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map(char => morseMapping[char] || char)
    .join(' ');
};

const morseDecode = (text: string): string => {
  return text
    .split(' ')
    .map(code => reverseMorseMapping[code] || code)
    .join('');
};

// Pigpen cipher functions
const pigpenEncode = (text: string): string => {
  return text
    .toLowerCase()
    .split('')
    .map(char => {
      if (/[a-z]/.test(char)) {
        return pigpenMapping[char] || char;
      }
      return char;
    })
    .join('');
};

const pigpenDecode = (text: string): string => {
  const reversePigpenMapping = Object.entries(pigpenMapping).reduce(
    (acc, [key, value]) => ({ ...acc, [value]: key }), {}
  );
  
  return text
    .split('')
    .map(char => reversePigpenMapping[char] || char)
    .join('');
};

// Main encryption function
export const encryptText = (text: string, cipher: CipherType, key: string = ''): string => {
  switch (cipher) {
    case 'pigpen':
      return pigpenEncode(text);
    case 'caesar':
      const shift = parseInt(key) || 3; // Default to 3 if key is not a valid number
      return caesarCipher(text, shift);
    case 'atbash':
      return atbashCipher(text);
    case 'vigenere':
      return vigenereCipher(text, key);
    case 'morse':
      return morseEncode(text);
    default:
      return text;
  }
};

// Main decryption function
export const decryptText = (text: string, cipher: CipherType, key: string = ''): string => {
  switch (cipher) {
    case 'pigpen':
      return pigpenDecode(text);
    case 'caesar':
      const shift = parseInt(key) || 3; // Default to 3 if key is not a valid number
      return caesarCipher(text, shift, true);
    case 'atbash':
      return atbashCipher(text); // Atbash is its own inverse
    case 'vigenere':
      return vigenereCipher(text, key, true);
    case 'morse':
      return morseDecode(text);
    default:
      return text;
  }
};

// Cipher options with descriptions
export const cipherOptions: CipherOption[] = [
  {
    id: 'pigpen',
    name: 'Pigpen Cipher',
    description: 'A geometric simple substitution cipher that maps letters to symbols based on a grid pattern.'
  },
  {
    id: 'caesar',
    name: 'Caesar Cipher',
    description: 'A substitution cipher where each letter is shifted by a fixed number of positions.',
    requiresKey: true
  },
  {
    id: 'atbash',
    name: 'Atbash Cipher',
    description: 'A substitution cipher where each letter is mapped to its reverse in the alphabet.'
  },
  {
    id: 'vigenere',
    name: 'Vigenère Cipher',
    description: 'A method of encrypting text using a series of interwoven Caesar ciphers.',
    requiresKey: true
  },
  {
    id: 'morse',
    name: 'Morse Code',
    description: 'A method that encodes text as standardized sequences of dots and dashes.'
  }
];

// Get mapping for visualization
export const getCipherMapping = (cipher: CipherType): Record<string, string> => {
  switch (cipher) {
    case 'pigpen':
      return pigpenMapping;
    case 'morse':
      return morseMapping;
    default:
      return {};
  }
};