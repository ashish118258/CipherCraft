import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import { Copy, CheckCircle, RotateCw, X, ArrowRightLeft, Share2, Mail, MessageCircle, Facebook, Twitter, Linkedin, Link2 } from 'lucide-react';
import toast from 'react-hot-toast';

const InputOutput: React.FC = () => {
  const { 
    state, 
    updateInputText, 
    updateKey, 
    toggleMode, 
    processText, 
    copyToClipboard,
    clearText 
  } = useAppContext();
  
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.inputText) {
        processText();
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, [state.inputText, state.key, state.mode, state.selectedCipher]);
  
  const handleCopy = async () => {
    const success = await copyToClipboard();
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success('Copied to clipboard!');
    }
  };
  
  const handleProcessWithAnimation = () => {
    if (!state.inputText.trim()) return;
    
    setIsProcessing(true);
    setTimeout(() => {
      processText();
      setIsProcessing(false);
    }, 800);
  };

  const handleSendEmail = async () => {
    if (!state.outputText) return;

    try {
      const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(
        `${state.mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} Message using ${state.selectedCipher} Cipher`
      )}&body=${encodeURIComponent(state.outputText)}`;

      window.location.href = mailtoLink;
      toast.success('Email client opened successfully!');
      setShowShareOptions(false);
      setEmail('');
    } catch (error) {
      toast.error('Failed to open email client');
    }
  };

  const handleSocialShare = (platform: string) => {
    if (!state.outputText) return;

    const text = encodeURIComponent(state.outputText);
    const title = encodeURIComponent(`${state.mode === 'encrypt' ? 'Encrypted' : 'Decrypted'} Message`);
    
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://wa.me/?text=${text}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${text}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${text}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${title}&summary=${text}`;
        break;
      case 'telegram':
        url = `https://t.me/share/url?url=${window.location.href}&text=${text}`;
        break;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
      toast.success(`Opened ${platform} sharing!`);
      setShowShareOptions(false);
    }
  };
  
  const needsKey = ['caesar', 'vigenere'].includes(state.selectedCipher);
  
  return (
    <div className="w-full animate-fadeIn">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Input Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Input</h2>
            <button
              onClick={toggleMode}
              className="group flex items-center px-4 py-2 rounded-xl bg-gradient-to-r 
                       from-indigo-500/10 to-indigo-600/10 
                       dark:from-indigo-400/10 dark:to-indigo-500/10
                       hover:from-indigo-500/20 hover:to-indigo-600/20
                       text-indigo-700 dark:text-indigo-300
                       transition-all duration-300"
            >
              <ArrowRightLeft className="w-4 h-4 mr-2 group-hover:rotate-180 transition-transform duration-500" />
              {state.mode === 'encrypt' ? 'Mode: Encrypt' : 'Mode: Decrypt'}
            </button>
          </div>
          
          <textarea
            value={state.inputText}
            onChange={(e) => updateInputText(e.target.value)}
            placeholder={`Enter text to ${state.mode}...`}
            className="input-field h-40 p-4 mb-4"
          />
          
          {needsKey && (
            <div className="mb-4 animate-fadeIn">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {state.selectedCipher === 'caesar' ? 'Shift Value' : 'Key'}:
              </label>
              <input
                type={state.selectedCipher === 'caesar' ? 'number' : 'text'}
                value={state.key}
                onChange={(e) => updateKey(e.target.value)}
                placeholder={state.selectedCipher === 'caesar' ? 'Enter shift (e.g. 3)' : 'Enter key word'}
                className="input-field p-3"
                min={state.selectedCipher === 'caesar' ? 1 : undefined}
              />
            </div>
          )}
          
          <div className="flex gap-3">
            <button
              onClick={handleProcessWithAnimation}
              disabled={!state.inputText.trim()}
              className="btn btn-primary flex items-center"
            >
              <RotateCw className={`w-4 h-4 mr-2 ${isProcessing ? 'animate-spin' : ''}`} />
              Process
            </button>
            
            <button
              onClick={clearText}
              disabled={!state.inputText.trim()}
              className="btn btn-secondary flex items-center"
            >
              <X className="w-4 h-4 mr-2" />
              Clear
            </button>
          </div>
        </div>
        
        {/* Output Section */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Output</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setShowShareOptions(!showShareOptions)}
                disabled={!state.outputText}
                className="btn btn-secondary flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </button>
              <button
                onClick={handleCopy}
                disabled={!state.outputText}
                className={`btn flex items-center ${
                  copied
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                }`}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          {showShareOptions && (
            <div className="mb-4 space-y-3 animate-fadeIn bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter recipient's email"
                  className="input-field p-2 flex-1"
                />
                <button
                  onClick={handleSendEmail}
                  disabled={!email || !state.outputText}
                  className="btn btn-primary flex items-center whitespace-nowrap"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </button>
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleSocialShare('whatsapp')}
                  className="btn bg-green-500 hover:bg-green-600 text-white flex items-center justify-center"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  WhatsApp
                </button>
                
                <button
                  onClick={() => handleSocialShare('facebook')}
                  className="btn bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center"
                >
                  <Facebook className="w-4 h-4 mr-2" />
                  Facebook
                </button>
                
                <button
                  onClick={() => handleSocialShare('twitter')}
                  className="btn bg-sky-500 hover:bg-sky-600 text-white flex items-center justify-center"
                >
                  <Twitter className="w-4 h-4 mr-2" />
                  Twitter
                </button>
                
                <button
                  onClick={() => handleSocialShare('linkedin')}
                  className="btn bg-blue-700 hover:bg-blue-800 text-white flex items-center justify-center"
                >
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </button>
                
                <button
                  onClick={() => handleSocialShare('telegram')}
                  className="btn bg-blue-400 hover:bg-blue-500 text-white flex items-center justify-center col-span-2"
                >
                  <Link2 className="w-4 h-4 mr-2" />
                  Telegram
                </button>
              </div>
            </div>
          )}
          
          <div className={`input-field h-40 p-4 ${isProcessing ? 'animate-pulse' : ''}`}>
            {state.outputText || (
              <span className="text-gray-400 dark:text-gray-600 italic">
                {isProcessing ? 'Processing...' : 'Output will appear here'}
              </span>
            )}
          </div>
          
          {state.outputText && !isProcessing && (
            <div className="mt-4 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 
                          text-indigo-700 dark:text-indigo-300 animate-fadeIn">
              <p className="text-sm">
                {state.mode === 'encrypt' 
                  ? '🔒 Text encrypted successfully!' 
                  : '🔓 Text decrypted successfully!'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InputOutput;