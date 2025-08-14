import React, { useState, useRef } from 'react';
import axios from 'axios';
import { getApiBaseUrl } from '../contexts/AuthContext';

const styles = [
  // Animation Styles
  'Pixar Animation',
  'Disney Animation',
  'Studio Ghibli Animation',
  'DreamWorks Animation Style',
  'Looney Tunes / Classic Cartoon',
  'Scooby-Doo Mystery Ink Style',
  'Rick & Morty / Adult Swim Style',
  'Simpsons Style',
  '1930s Vintage Animation (Steamboat Willie)',
  'Comic Book Art',
  'Anime Portrait',
  
  // Traditional & Fine Art
  'Watercolor Painting',
  'Oil Painting',
  'Pencil Sketch',
  'Charcoal Drawing',
  'Pastel Chalk Portrait',
  'Ink & Wash',
  'Gouache Painting',
  'Impressionist Painting (Monet-style)',
  
  // Modern Digital Styles
  'Vector Art / Flat Illustration',
  'Pixel Art (8-bit / 16-bit)',
  '3D Sculpt / Claymation Look',
  
  // Fantasy & Sci-Fi
  'Cyberpunk City',
  'Fantasy Art',
];

const UploadPage = () => {
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

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    handleFile(file);
  };

  const handleFile = (file) => {
    setImageBase64(null);
    setError(null);
    
    if (!file) return;
    
    if (!file.type.includes('image')) {
      setError('Please select an image file');
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError('Image must be less than 10MB');
      return;
    }
    
    setImageFile(file);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setUploadedImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
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

    try {
      const formData = new FormData();
      formData.append('imageFile', imageFile);
      formData.append('style', isCustomMode ? customPrompt.trim() : style);

      const response = await axios.post(`${getApiBaseUrl()}/images/generate`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImageBase64(`data:image/png;base64,${response.data.imageBase64}`);
    } catch (err) {
      console.error('Error generating image:', err);
      setError(err.response?.data?.detail || 'Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (!imageBase64) return;

    const link = document.createElement('a');
    link.href = imageBase64;
    link.download = `furtoon-${style.toLowerCase().replace(/\\s+/g, '-')}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReset = () => {
    setImageFile(null);
    setUploadedImagePreview(null);
    setImageBase64(null);
    setError(null);
    setStyle(styles[0]);
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
                  <div className="upload-content">
                    <div className="upload-icon">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                    </div>
                    <div className="upload-text">
                      <p className="upload-main-text">
                        Drop photo here or click to browse
                      </p>
                      <p className="upload-sub-text">
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
                  style={{ display: 'none' }}
                />
              </div>
            </div>

            {/* Style Selection */}
            <div className="form-section">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <label className="form-label" style={{ margin: 0 }}>
                  Choose Style
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsCustomMode(!isCustomMode);
                    setError(null);
                  }}
                  style={{
                    backgroundColor: isCustomMode ? '#3b82f6' : 'transparent',
                    color: isCustomMode ? 'white' : '#3b82f6',
                    border: '2px solid #3b82f6',
                    padding: '8px 16px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-in-out'
                  }}
                >
                  {isCustomMode ? '← Back to Styles' : 'Custom Scene'}
                </button>
              </div>
              
              {!isCustomMode ? (
                <div className="style-grid">
                  {styles.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setStyle(s)}
                      className={`style-button ${style === s ? 'selected' : ''}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              ) : (
                <div style={{ marginTop: '16px' }}>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px'
                  }}>
                    Describe your custom scene
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., Put my dog on a skateboard in a skate park, or my cat wearing a chef's hat cooking in a kitchen..."
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '12px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'inherit',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'border-color 0.2s ease-in-out'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                    onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
                  />
                  <p style={{
                    fontSize: '12px',
                    color: '#6b7280',
                    marginTop: '6px',
                    lineHeight: '1.4'
                  }}>
                    💡 <strong>Tips:</strong> Be specific! Describe the setting, props, clothing, or scenario you want. 
                    The more detailed, the better the result.
                  </p>
                </div>
              )}
            </div>

            {/* Generate Button */}
            <button
              type="submit"
              disabled={!imageFile || loading || (isCustomMode && !customPrompt.trim()) || (!isCustomMode && !style)}
              className="generate-button"
            >
              {loading ? 'Generating...' : 'Generate Portrait'}
            </button>
          </form>

          {/* Loading State */}
          {loading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <div className="loading-spinner"></div>
              <p className="loading-text">Creating your masterpiece...</p>
              <p className="loading-subtext">This can take up to 30 seconds</p>
            </div>
          )}

          {/* Result Section */}
          {imageBase64 && (
            <div className="result-section">
              <h2 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: '#111827' }}>
                Your FurToon is Ready!
              </h2>
              <img
                src={imageBase64}
                alt={`Generated ${style}`}
                className="result-image"
              />
              <div className="result-buttons">
                <button
                  onClick={handleDownload}
                  className="result-button primary"
                >
                  Download PNG
                </button>
                <button
                  onClick={handleReset}
                  className="result-button secondary"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
        </div>

        {/* Privacy Notice */}
        <div className="privacy-notice">
          <p className="privacy-text">
            🔒 Your photos are processed securely and automatically deleted within 24 hours. 
            We never store or share your personal images.
          </p>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;