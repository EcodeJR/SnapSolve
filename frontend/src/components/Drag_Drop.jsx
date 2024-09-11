import { useState } from 'react';
import { TiCamera } from "react-icons/ti";

const Drag_Drop = () => {
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
    setImages((prevImages) => prevImages.filter((image, i) => i !== index));
  };

  return (
    <div
      className={`w-[70%] h-[60%] p-4 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 ${
        dragging ? 'bg-gray-100' : ''
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* <Camera size={48} color="gray" /> */}
      <TiCamera className="text-gray-500 font-bold text-4xl" />
      <p className="text-gray-600">Drag and drop images here or click to upload</p>
      <input
        type="file"
        multiple
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
      {/* <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer mt-2"
        onClick={() => document.getElementById('image-input').click()}
      >
        Add Image
      </button> */}
      <div className="flex flex-wrap justify-center mt-4">
        {images.map((image, index) => (
          <div key={index} className="relative m-2">
            <img
              src={URL.createObjectURL(image)}
              alt="uploaded image"
              className="w-full h-48 object-fit"
            />
            <button
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded cursor-pointer"
              onClick={() => handleRemoveImage(index)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Drag_Drop;