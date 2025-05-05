import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} CipherCraft. All rights reserved.
          </p>
          
          <div className="flex items-center mt-2 md:mt-0">
            <span className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for secure communications
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;