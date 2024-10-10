import React, { useState } from 'react';

const YouTubeModal = ({ isOpen, onSave, onClose }) => {
  const [url, setUrl] = useState('');

  const handleSave = () => {
    onSave(url);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Embed YouTube Video</h3>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter YouTube URL"
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Embed</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default YouTubeModal;