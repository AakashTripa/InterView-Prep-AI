import React from 'react';

const Modal = ({ children, isOpen, onClose, hideHeader, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-2xl overflow-hidden">
        {!hideHeader && (
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          </div>
        )}

        <button
          type="button"
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 bg-gray-100 hover:bg-red-100 rounded-full p-1 cursor-pointer"
          onClick={onClose}
        >
          <svg
            className="w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none" viewBox="0 0 24 24"
          >
            <path
              d="M6 18L18 6M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div className="p-5 max-h-[80vh] overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
