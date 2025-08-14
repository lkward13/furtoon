/**
 * Mobile-friendly image save utilities
 */

/**
 * Check if device is mobile
 */
export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

/**
 * Check if device supports the Web Share API
 */
export const supportsWebShare = () => {
  return navigator.share && navigator.canShare;
};

/**
 * Enhanced image save functionality that works well on mobile
 */
export const saveImageToDevice = async (imageBase64, filename = 'furtoon-artwork.png') => {
  try {
    // Convert base64 to blob
    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    // For mobile devices, try Web Share API first (works on iOS Safari)
    if (isMobile() && supportsWebShare()) {
      const file = new File([blob], filename, { type: 'image/png' });
      
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'My FurToon Artwork',
          text: 'Check out my AI-generated pet portrait!',
          files: [file]
        });
        return { success: true, method: 'share' };
      }
    }

    // Fallback: Traditional download
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    
    // For mobile browsers, open in new tab if download doesn't work
    if (isMobile()) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Clean up
    setTimeout(() => URL.revokeObjectURL(url), 100);
    
    return { success: true, method: 'download' };
    
  } catch (error) {
    console.error('Error saving image:', error);
    return { success: false, error: error.message };
  }
};

/**
 * Long press handler for mobile image saving
 */
export const setupLongPressToSave = (imageElement, imageBase64, filename) => {
  if (!isMobile() || !imageElement) return;

  let pressTimer = null;
  
  const startPress = (e) => {
    pressTimer = setTimeout(() => {
      // Show custom context menu or save dialog
      e.preventDefault();
      saveImageToDevice(imageBase64, filename);
    }, 800); // 800ms long press
  };
  
  const endPress = () => {
    clearTimeout(pressTimer);
  };
  
  imageElement.addEventListener('touchstart', startPress);
  imageElement.addEventListener('touchend', endPress);
  imageElement.addEventListener('touchmove', endPress);
  
  // Cleanup function
  return () => {
    imageElement.removeEventListener('touchstart', startPress);
    imageElement.removeEventListener('touchend', endPress);
    imageElement.removeEventListener('touchmove', endPress);
  };
};

/**
 * Copy image to clipboard (works on some mobile browsers)
 */
export const copyImageToClipboard = async (imageBase64) => {
  try {
    if (!navigator.clipboard || !navigator.clipboard.write) {
      throw new Error('Clipboard API not supported');
    }

    const base64Data = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');
    const byteCharacters = atob(base64Data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'image/png' });

    await navigator.clipboard.write([
      new ClipboardItem({
        'image/png': blob
      })
    ]);

    return { success: true };
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return { success: false, error: error.message };
  }
};
