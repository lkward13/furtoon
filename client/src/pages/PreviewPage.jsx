import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

const PreviewPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const imageUrl = location.state?.imageUrl; // Get image URL from navigation state

  // Handle case where user lands here directly without an image URL
  if (!imageUrl) {
    return (
      <div>
        <h2>No Image to Preview</h2>
        <p>Please generate an image first.</p>
        <Link to="/upload">Go back to Upload</Link>
      </div>
    );
  }

  // TODO: Implement Regenerate logic (potentially navigate back to upload with state?)
  const handleRegenerate = () => {
    console.log("Regenerate clicked - implement logic");
    // Option: Navigate back to upload, possibly passing previous prompt/style
    navigate('/upload'); 
  };

  const handleCheckout = () => {
    console.log("Proceed to checkout clicked - implement logic");
    // TODO: Pass necessary info (imageUrl, user details?) to checkout
    navigate('/checkout', { state: { imageUrl: imageUrl } }); 
  };

  return (
    <div>
      <h2>Preview Your Portrait</h2>
      <img 
        src={imageUrl} 
        alt="Generated pet portrait preview" 
        style={{ maxWidth: '1024px', height: 'auto', display: 'block', margin: '20px auto' }} 
      />
      <div>
        <button onClick={handleRegenerate} style={{ marginRight: '10px' }}>Generate New</button>
        <button onClick={handleCheckout}>Looks Good! Proceed to Checkout</button>
      </div>
    </div>
  );
};

export default PreviewPage; 