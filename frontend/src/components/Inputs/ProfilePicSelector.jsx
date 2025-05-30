import React, { useRef, useState } from 'react';
import { LuUser, LuUpload, LuTrash } from 'react-icons/lu';

const ProfilePicSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImage(file);
      setPreviewUrl(objectUrl);
      if (setPreview) setPreview(objectUrl);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  const finalPreview = preview || previewUrl;

  return (
    <div className="flex justify-center mb-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {finalPreview ? (
        <div className="relative">
          <img
            src={finalPreview}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      ) : (
        <div
          className="w-20 h-20 flex items-center justify-center bg-orange-50 rounded-full relative cursor-pointer"
          onClick={onChooseFile}
        >
          <LuUser className="text-4xl text-orange-500" />
          <button
            type="button"
            className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full absolute -bottom-1 -right-1 cursor-pointer"
          >
            <LuUpload />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePicSelector;
