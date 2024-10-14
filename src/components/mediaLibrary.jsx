import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdminNavBar from './adminNavBar';

const MediaLibrary = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      console.log('Fetching images...'); // Debugging line
      try {
        const response = await axios.get('/api/media-library', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem('auth_token')}`, // Include the token in the headers
          },
        });// Adjust the endpoint as needed
        console.log('Response from API:', response.data); // Log the response
        setImages(response.data.images); // Assuming the response contains an array of image URLs
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages();
  }, []);

  console.log('Images state:', images); // Log the images state

  return (
    <div className="admin-dashboard">
      <AdminNavBar />
      <h2>Media Library</h2>
      <div className="image-grid">
        {images.map((image, index) => (
          <div key={index} className="image-item">
            <img src={`http://localhost:8000/${image}`} alt={`Uploaded ${index}`} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaLibrary;