import { useState, useEffect } from 'react';
import { FcGallery } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import PropTypes from 'prop-types';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoCamera } from "react-icons/io5";
import CameraCapture from './CameraCapture';

const Drag_Drop = ({ handleClick, darkMode }) => {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);
  const [showCamera, setShowCamera] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    const newImages = [];
    for (const file of files) {
      newImages.push(file);
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleImageChange = (e) => {
    const newImages = [];
    for (const file of e.target.files) {
      newImages.push(file);
    }
    setImages((prevImages) => [...prevImages, ...newImages]);
  };

  const handleRemoveImage = (index) => {
    setImages((prevImages) => prevImages.filter((img, i) => i !== index));
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      images.forEach(image => URL.revokeObjectURL(image));
    };
  }, [images]);

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      <div
        className={`relative w-full aspect-video rounded-2xl transition-all duration-300 
        ${dragging 
          ? 'bg-blue-50 border-blue-400' 
          : 'bg-gray-50 border-gray-200 hover:border-blue-300 hover:bg-blue-50/50'
        } border-2 border-dashed
         ${darkMode ? 'bg-gray-800 border-gray-700 hover:bg-gray-700' : 'bg-white'
         }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6">
          <FcGallery className="text-6xl mb-4" />
          <p className={`text-center mb-4 text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'
         }`}>
            Drag and drop an image here or
          </p>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="image-input"
            onChange={handleImageChange}
          />
          <label
            htmlFor="image-input"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-xl
            transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer"
          >
            Choose Image
          </label>
          <button
            onClick={() => setShowCamera(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-xl
            transition-all duration-300 hover:shadow-lg hover:scale-105 flex items-center gap-2 my-3"
        >
            <IoCamera className="text-xl" />
            Take Photo
        </button>
        </div>
      </div>

      <div className="mt-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group rounded-xl overflow-hidden shadow-md">
              <img
                src={URL.createObjectURL(image)}
                alt="uploaded image"
                className="w-full mx-auto h-64 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-100 lg:opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleRemoveImage(index)}
                  className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full 
                  transition-all duration-300 hover:scale-110"
                  aria-label="Remove image"
                >
                  <IoMdCloseCircleOutline className="text-2xl" />
                </button>
              </div>
            </div>
          ))}
        </div>

    {/* Add at the end of the component */}
    {showCamera && (
        <CameraCapture
            onCapture={(images) => {
                setImages(prev => [...prev, ...images]);
                setShowCamera(false);
            }}
            onClose={() => setShowCamera(false)}
            darkMode={darkMode}
        />
    )}
        <div className="flex justify-center">
          {images.length === 0 ? (
            <div className="px-6 py-3 bg-gray-100 text-gray-500 rounded-xl font-medium">
              Upload an image to continue
            </div>
          ) : (
            <button
              onClick={() => handleClick(images)}
              className="flex items-center gap-2 px-8 py-4 bg-green-500 hover:bg-green-600 
              text-white rounded-xl transition-all duration-300 hover:shadow-lg hover:scale-105"
            >
              <span className="font-medium">Send Image</span>
              <IoSend className="text-xl" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Add prop-types validation
Drag_Drop.propTypes = {
  handleClick: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
};

export default Drag_Drop;
