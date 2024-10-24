import { useState, useEffect } from 'react';
import { FcGallery } from "react-icons/fc";
import { IoSend } from "react-icons/io5";
import PropTypes from 'prop-types';
import { IoMdCloseCircleOutline } from "react-icons/io";

const Drag_Drop = ({ handleClick }) => {
  const [images, setImages] = useState([]);
  const [dragging, setDragging] = useState(false);

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
    <>
      <div
        className={` w-[80%] lg:w-[40vw] h-[60vh] p-4 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 ${
          dragging ? 'bg-gray-100' : ''
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FcGallery className="text-gray-500 font-bold text-4xl" />
        <p className="text-gray-600">Drag and drop images here or click to upload</p>
        <input
          type="file"
          multiple // Allow multiple file uploads
          accept="image/*"
          className="hidden"
          id="image-input"
          onChange={handleImageChange}
        />
        <label
          htmlFor="image-input"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
        >
          Upload Images
        </label>
      </div>

      <div className="w-full h-fit flex flex-col items-center justify-center">
        <div className="flex flex-wrap justify-center m-4">
          {images.map((image, index) => (
            <div key={index} className="relative m-2">
              <img
                src={URL.createObjectURL(image)}
                alt="uploaded image"
                className="w-80 h-fit object-fit text-blackMain"
              />
              <button
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded cursor-pointer text-redMain"
                onClick={() => handleRemoveImage(index)}
              >
                <IoMdCloseCircleOutline className="text-xl" />
              </button>
            </div>
          ))}
        </div>
        {images.length === 0 ? (
          <p className="py-2 px-4 text-whiteMain bg-redMain/50 font-bold text-base cursor-not-allowed uppercase rounded-lg">
            Please Upload an image
          </p>
        ) : (
          <button
            className="flex items-center justify-center text-2xl font-bold bg-greenMain text-whiteMain h-full p-5 rounded-full"
            onClick={() => handleClick(images)}
          >
            <IoSend />
          </button>
        )}
      </div>
    </>
  );
};

// Add prop-types validation
Drag_Drop.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default Drag_Drop;
