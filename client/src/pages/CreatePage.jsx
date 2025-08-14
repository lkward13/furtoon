import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { useAuth, getApiBaseUrl } from '../contexts/AuthContext';
import SaveImageButton from '../components/SaveImageButton';
import SocialShareButton from '../components/SocialShareButton';
import { setupLongPressToSave, isMobile } from '../utils/imageSave';

// Basic styles for starter pack (10 styles)
const BASIC_STYLES = [
  'Pixar Animation',
  'Disney Animation', 
  'Watercolor Painting',
  'Oil Painting',
  'Pencil Sketch',
  'Comic Book Art',
  'Studio Ghibli Animation',
  'Anime Portrait',
  'Fantasy Art',
  'Vector Art / Flat Illustration'
];

const styles = [
  // ✅ BASIC STYLES (Available for Starter Pack) - 10 styles
  'Pixar Animation',
  'Disney Animation',
  'Watercolor Painting',
  'Oil Painting',
  'Pencil Sketch',
  'Comic Book Art',
  'Studio Ghibli Animation',
  'Anime Portrait',
  'Fantasy Art',
  'Vector Art / Flat Illustration',
  
  // 🔒 PREMIUM STYLES (Pro/Ultimate Only) - 15 styles
  'DreamWorks Animation Style',
  'Looney Tunes / Classic Cartoon',
  'Scooby-Doo Mystery Ink Style',
  'Rick & Morty / Adult Swim Style',
  'Simpsons Style',
  '1930s Vintage Animation (Steamboat Willie)',
  'Charcoal Drawing',
  'Pastel Chalk Portrait',
  'Ink & Wash',
  'Gouache Painting',
  'Impressionist Painting (Monet-style)',
  'Pixel Art (8-bit / 16-bit)',
  '3D Sculpt / Claymation Look',
  'Cyberpunk City',
  'Renaissance Portrait',
];

const CreatePage = () => {
  const { token, user, isAdmin, refreshUser } = useAuth();
  
  // Helper functions
  const getUserTier = () => {
    if (isAdmin()) return 'ultimate';
    if (!user) return 'starter';
    if (user.total_credits_purchased >= 50) return 'ultimate';
    if (user.total_credits_purchased >= 20) return 'pro';
    return 'starter';
  };
  
  const isStyleAvailable = (styleName) => {
    if (isAdmin()) return true;
    const tier = getUserTier();
    if (tier === 'starter') {
      return BASIC_STYLES.includes(styleName);
    }
    return true; // Pro and Ultimate have access to all styles
  };
  
  const canUseCustomScene = () => {
    return isAdmin() || getUserTier() !== 'starter';
  };
  
  const [style, setStyle] = useState(styles[0]);
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [uploadedImagePreview, setUploadedImagePreview] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customPrompt, setCustomPrompt] = useState('');

  const inputRef = useRef(null);
  const generatedImageRef = useRef(null);

  // Setup mobile long-press to save when image is generated
  useEffect(() => {
    if (imageBase64 && generatedImageRef.current && isMobile()) {
      const cleanup = setupLongPressToSave(
        generatedImageRef.current, 
        imageBase64, 
        `furtoon-${style || 'artwork'}-${Date.now()}.png`
      );
      return cleanup;
    }
  }, [imageBase64, style]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setImageBase64(null);
    setError(null);
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        setImageFile(null);
        setUploadedImagePreview(null);
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setUploadedImagePreview(null);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    handleFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      setError('Please upload a photo.');
      return;
    }
    
    if (!isCustomMode && !style) {
      setError('Please select a style.');
      return;
    }
    
    if (isCustomMode && !customPrompt.trim()) {
      setError('Please describe your custom scene.');
      return;
    }

    setLoading(true);
    setError(null);
    setImageBase64(null);

    const formData = new FormData();
    formData.append('imageFile', imageFile);
    formData.append('style', isCustomMode ? customPrompt.trim() : style);

    try {
      const response = await axios.post(
        `${getApiBaseUrl()}/images/generate`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );
      setImageBase64(`data:image/png;base64,${response.data.result_base64}`);
      // Refresh user data to update credit balance
      await refreshUser();
    } catch (err) {
      console.error('Error generating image:', err);
      setError(
        err.response?.data?.detail ||
          'Failed to generate image. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };



  const handleReset = () => {
    setImageFile(null);
    setUploadedImagePreview(null);
    setImageBase64(null);
    setStyle(styles[0]);
    setError(null);
    setIsCustomMode(false);
    setCustomPrompt('');
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-6">
            Create Your Pet's 
            <span className="gradient-text block mt-2">
              Masterpiece
            </span>
          </h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Transform your pet photo into stunning artwork. Choose from 25+ art styles 
            or create custom scenes like "my dog on a skateboard" or "my cat in a chef's hat."
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Upload Section */}
            <div>
              <label className="block text-lg font-semibold text-slate-900 mb-4">
                Upload Photo
              </label>
              <div
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all min-h-[120px] flex items-center justify-center ${
                  isDragOver 
                    ? 'border-blue-400 bg-blue-50' 
                    : 'border-slate-300 hover:border-slate-400'
                }`}
                onClick={() => inputRef.current?.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {uploadedImagePreview ? (
                  <div className="flex items-center gap-4">
                    <img
                      src={uploadedImagePreview}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="text-left">
                      <p className="font-semibold text-slate-900">Photo uploaded</p>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          inputRef.current?.click();
                        }}
                        className="text-blue-600 hover:text-blue-800 underline text-sm"
                      >
                        Change photo
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 text-slate-400">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" className="w-full h-full">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-slate-900">
                        Drop photo here or click to browse
                      </p>
                      <p className="text-sm text-slate-500">
                        PNG or JPG, up to 10MB
                      </p>
                    </div>
                  </div>
                )}
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/png,image/jpeg"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Style Selection */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <div>
                  <label className="block text-lg font-semibold text-slate-900">
                    Choose Style
                  </label>
                  {getUserTier() === 'starter' && (
                    <p className="text-sm text-slate-600 mt-1">
                      Starter Pack: 10 basic styles • <a href="/pricing" className="text-blue-600 hover:underline">Upgrade for all 25 styles + Custom Scenes</a>
                    </p>
                  )}
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      if (canUseCustomScene()) {
                        setIsCustomMode(!isCustomMode);
                        setError(null);
                      }
                    }}
                    disabled={!canUseCustomScene()}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      !canUseCustomScene()
                        ? 'border-2 border-slate-300 text-slate-400 cursor-not-allowed opacity-60'
                        : isCustomMode
                        ? 'bg-blue-600 text-white'
                        : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                    }`}
                  >
                    {isCustomMode ? '← Back to Styles' : 'Custom Scene'}
                  </button>
                  {!canUseCustomScene() && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                      <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                        UPGRADE
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {!isCustomMode ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {styles.map((s) => {
                    const available = isStyleAvailable(s);
                    return (
                      <div key={s} className="relative">
                        <button
                          type="button"
                          onClick={() => available && setStyle(s)}
                          disabled={!available}
                          className={`w-full h-20 p-4 rounded-lg border-2 text-sm font-medium transition-all flex items-center justify-center text-center leading-tight ${
                            !available
                              ? 'border-slate-200 bg-slate-50 text-slate-400 cursor-not-allowed opacity-60'
                              : style === s
                              ? 'border-blue-600 bg-blue-50 text-blue-800'
                              : 'border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          {s}
                        </button>
                        {!available && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg">
                            <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                              UPGRADE
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Describe your custom scene
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Put my dog on a skateboard in a skate park, or my cat wearing a chef's hat cooking in a kitchen..."
                    className="w-full p-3 border-2 border-slate-200 rounded-lg focus:border-blue-600 focus:outline-none resize-vertical min-h-[100px]"
                  />
                  <p className="text-sm text-slate-500 mt-2">
                    💡 <strong>Tips:</strong> Be specific! Describe the setting, props, clothing, or scenario you want. 
                    The more detailed, the better the result.
                  </p>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={!imageFile || loading || (isCustomMode && !customPrompt.trim()) || (!isCustomMode && !style)}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all ${
                  (!imageFile || loading || (isCustomMode && !customPrompt.trim()) || (!isCustomMode && !style))
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {loading ? 'Generating...' : 'Generate Portrait'}
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-lg font-semibold text-slate-900">Creating your masterpiece...</p>
                <p className="text-slate-600">This can take up to 30 seconds</p>
              </div>
            )}
          </form>
        </div>

        {/* Result Section */}
        {imageBase64 && (
          <div className="mt-12 text-center">
            <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Your FurToon is Ready! 🎨
              </h2>
              <img
                ref={generatedImageRef}
                src={imageBase64}
                alt={`Generated ${style}`}
                className="max-w-full h-auto rounded-xl shadow-lg mx-auto mb-6 select-none"
              />
              
              {/* Mobile instruction for new users */}
              {isMobile() && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-6 text-sm text-blue-800">
                  💡 <strong>Mobile tip:</strong> Long-press the image above to save to your camera roll!
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="flex gap-3">
                  <SaveImageButton
                    imageBase64={imageBase64}
                    filename={`furtoon-${style || 'artwork'}-${Date.now()}.png`}
                    variant="primary"
                  />
                  <SocialShareButton
                    imageBase64={imageBase64}
                    filename={`furtoon-${style || 'artwork'}-${Date.now()}.png`}
                    shareText={`Check out my ${style || 'AI'} pet portrait from FurToon! 🎨 Transform your pet into amazing artwork at`}
                    shareUrl="https://furtoonai.com"
                  />
                </div>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-600 text-white font-semibold rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Create Another
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Privacy Notice */}
        <div className="text-center mt-12">
          <p className="text-sm text-slate-600 max-w-2xl mx-auto">
            🔒 Your photos are processed securely and automatically deleted within 24 hours. 
            We never store or share your personal images.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreatePage;
