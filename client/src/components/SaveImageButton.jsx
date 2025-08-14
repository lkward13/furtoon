import React, { useState } from 'react';
import { saveImageToDevice, copyImageToClipboard, isMobile } from '../utils/imageSave';

const SaveImageButton = ({ 
  imageBase64, 
  filename, 
  className = '',
  variant = 'primary' // 'primary', 'secondary', 'minimal'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleSave = async () => {
    setIsLoading(true);
    setFeedback('');
    
    try {
      const result = await saveImageToDevice(imageBase64, filename);
      
      if (result.success) {
        if (result.method === 'share') {
          setFeedback('Shared successfully! 📱');
        } else {
          setFeedback(isMobile() ? 'Tap and hold the image to save to camera roll' : 'Downloaded! 💾');
        }
      } else {
        setFeedback('Could not save. Try long-pressing the image.');
      }
    } catch (error) {
      setFeedback('Could not save. Try long-pressing the image.');
    } finally {
      setIsLoading(false);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const handleCopy = async () => {
    setIsLoading(true);
    const result = await copyImageToClipboard(imageBase64);
    
    if (result.success) {
      setFeedback('Copied to clipboard! 📋');
    } else {
      setFeedback('Could not copy to clipboard');
    }
    
    setIsLoading(false);
    setShowOptions(false);
    setTimeout(() => setFeedback(''), 3000);
  };

  const baseClasses = "font-semibold rounded-lg transition-all duration-200 flex items-center justify-center gap-2";
  
  const variantClasses = {
    primary: "px-6 py-3 bg-green-600 text-white hover:bg-green-700 active:bg-green-800",
    secondary: "px-4 py-2 bg-slate-600 text-white hover:bg-slate-700 active:bg-slate-800",
    minimal: "px-3 py-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 active:bg-blue-100"
  };

  return (
    <div className="relative">
      {/* Main Save Button */}
      <div className="flex gap-2">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className={`${baseClasses} ${variantClasses[variant]} ${className} ${isLoading ? 'opacity-70' : ''}`}
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>💾</span>
              <span>{isMobile() ? 'Save' : 'Download'}</span>
            </>
          )}
        </button>

        {/* Options dropdown button - only show on desktop or if clipboard is supported */}
        {(!isMobile() || navigator.clipboard) && (
          <button
            onClick={() => setShowOptions(!showOptions)}
            className={`${baseClasses} ${variantClasses[variant]} px-3`}
            title="More save options"
          >
            ⋮
          </button>
        )}
      </div>

      {/* Options dropdown */}
      {showOptions && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-slate-200 rounded-lg shadow-lg py-2 z-10 min-w-[160px]">
          {navigator.clipboard && (
            <button
              onClick={handleCopy}
              className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
            >
              <span>📋</span>
              <span>Copy to clipboard</span>
            </button>
          )}
          <button
            onClick={() => {
              const link = document.createElement('a');
              link.href = imageBase64;
              link.download = filename;
              link.click();
              setShowOptions(false);
            }}
            className="w-full px-4 py-2 text-left text-slate-700 hover:bg-slate-50 flex items-center gap-2"
          >
            <span>⬇️</span>
            <span>Force download</span>
          </button>
        </div>
      )}

      {/* Feedback message */}
      {feedback && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-slate-800 text-white text-sm py-2 px-3 rounded-lg z-20">
          {feedback}
        </div>
      )}

      {/* Mobile instructions overlay */}
      {isMobile() && feedback.includes('long-pressing') && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm text-center">
            <h3 className="font-bold text-lg mb-3">💡 How to Save on Mobile</h3>
            <p className="text-slate-600 mb-4">
              <strong>Long press</strong> (hold down) on the image above, then select 
              <strong> "Save to Camera Roll"</strong> or <strong>"Download Image"</strong> from the menu.
            </p>
            <button
              onClick={() => setFeedback('')}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SaveImageButton;
