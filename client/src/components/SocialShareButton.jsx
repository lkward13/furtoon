import React, { useState } from 'react';
import { isMobile } from '../utils/imageSave';

const SocialShareButton = ({ 
  imageBase64, 
  filename,
  shareText = "Check out my amazing AI-generated pet portrait from FurToon! 🎨",
  shareUrl = "https://furtoonai.com",
  className = ''
}) => {
  const [showOptions, setShowOptions] = useState(false);
  const [feedback, setFeedback] = useState('');

  // Convert base64 to blob for sharing
  const getImageBlob = () => {
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    return new Blob([byteArray], { type: 'image/png' });
  };

  // Native Web Share API (works great on mobile)
  const shareNative = async () => {
    if (navigator.share) {
      try {
        const blob = getImageBlob();
        const file = new File([blob], filename, { type: 'image/png' });
        
        const shareData = {
          title: 'My FurToon AI Art',
          text: shareText,
          url: shareUrl
        };

        // Try to share with image if supported
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          shareData.files = [file];
        }

        await navigator.share(shareData);
        setFeedback('Shared successfully! 📱');
      } catch (error) {
        if (error.name !== 'AbortError') {
          setFeedback('Share cancelled or failed');
        }
      }
    }
  };

  // Platform-specific sharing
  const shareFacebook = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareTwitter = () => {
    const text = encodeURIComponent(shareText);
    const url = encodeURIComponent(shareUrl);
    window.open(
      `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareInstagram = () => {
    // Instagram doesn't have a direct web sharing API
    // We'll provide instructions or open the app if on mobile
    if (isMobile()) {
      // Try to open Instagram app
      const instagramUrl = 'instagram://camera';
      window.location.href = instagramUrl;
      
      // Fallback to web after a delay
      setTimeout(() => {
        setFeedback('💡 Save the image first, then open Instagram to post!');
        setTimeout(() => setFeedback(''), 4000);
      }, 1000);
    } else {
      setFeedback('💡 Save the image and upload it to Instagram on your phone!');
      setTimeout(() => setFeedback(''), 4000);
    }
  };

  const shareTikTok = () => {
    // TikTok doesn't have a direct web sharing API for images
    if (isMobile()) {
      // Try to open TikTok app
      const tiktokUrl = 'tiktok://';
      window.location.href = tiktokUrl;
      
      setTimeout(() => {
        setFeedback('💡 Save the image first, then create a TikTok with it!');
        setTimeout(() => setFeedback(''), 4000);
      }, 1000);
    } else {
      setFeedback('💡 Save the image and upload it to TikTok on your phone!');
      setTimeout(() => setFeedback(''), 4000);
    }
  };

  const copyImageAndText = async () => {
    try {
      const blob = getImageBlob();
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob,
          'text/plain': new Blob([shareText], { type: 'text/plain' })
        })
      ]);
      setFeedback('Image and text copied! 📋');
    } catch (error) {
      // Fallback to just copying text
      try {
        await navigator.clipboard.writeText(shareText + ' ' + shareUrl);
        setFeedback('Text copied! (Save image separately)');
      } catch (err) {
        setFeedback('Could not copy to clipboard');
      }
    }
    setTimeout(() => setFeedback(''), 3000);
  };

  const platforms = [
    {
      name: 'Facebook',
      icon: '📘',
      action: shareFacebook,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: '🐦',
      action: shareTwitter,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Instagram',
      icon: '📸',
      action: shareInstagram,
      color: 'bg-pink-500 hover:bg-pink-600'
    },
    {
      name: 'TikTok',
      icon: '🎵',
      action: shareTikTok,
      color: 'bg-black hover:bg-gray-800'
    }
  ];

  return (
    <div className={`relative ${className}`}>
      {/* Main Share Button */}
      <button
        onClick={() => {
          if (navigator.share && isMobile()) {
            shareNative();
          } else {
            setShowOptions(!showOptions);
          }
        }}
        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
      >
        <span>🔗</span>
        <span>Share</span>
      </button>

      {/* Platform Options */}
      {showOptions && (
        <div className="absolute top-full mt-2 right-0 bg-white border border-slate-200 rounded-xl shadow-lg p-3 z-10 min-w-[200px]">
          <div className="text-sm font-semibold text-slate-700 mb-3">Share to:</div>
          
          {/* Platform buttons grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            {platforms.map((platform) => (
              <button
                key={platform.name}
                onClick={() => {
                  platform.action();
                  setShowOptions(false);
                }}
                className={`${platform.color} text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors flex items-center justify-center gap-1`}
              >
                <span>{platform.icon}</span>
                <span>{platform.name}</span>
              </button>
            ))}
          </div>

          {/* Additional options */}
          <div className="border-t border-slate-200 pt-2">
            {navigator.clipboard && (
              <button
                onClick={copyImageAndText}
                className="w-full text-left px-2 py-2 text-slate-700 hover:bg-slate-50 rounded text-sm flex items-center gap-2"
              >
                <span>📋</span>
                <span>Copy image & text</span>
              </button>
            )}
            
            {navigator.share && !isMobile() && (
              <button
                onClick={shareNative}
                className="w-full text-left px-2 py-2 text-slate-700 hover:bg-slate-50 rounded text-sm flex items-center gap-2"
              >
                <span>📱</span>
                <span>Native share</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Feedback message */}
      {feedback && (
        <div className="absolute top-full mt-2 left-0 right-0 bg-slate-800 text-white text-sm py-2 px-3 rounded-lg z-20 text-center">
          {feedback}
        </div>
      )}

      {/* Click outside to close */}
      {showOptions && (
        <div
          className="fixed inset-0 z-0"
          onClick={() => setShowOptions(false)}
        />
      )}
    </div>
  );
};

export default SocialShareButton;
