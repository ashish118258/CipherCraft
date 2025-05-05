import React from 'react';
import { Shield, ShieldQuestion } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const Header: React.FC = () => {
  return (
    <header className="py-4 px-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Shield className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">CipherCraft</h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">Encryption & Decryption Tool</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <a 
            href="#" 
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
          >
            <ShieldQuestion className="w-4 h-4 mr-1" />
            About Ciphers
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;