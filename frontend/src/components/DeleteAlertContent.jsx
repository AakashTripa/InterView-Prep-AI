import React from "react";

const DeleteAlertContent = ({ content, onDelete }) => {
  return (
    <div className="bg-red-50 rounded-lg p-4 border border-red-200 shadow-sm">
      <p className="text-sm text-red-800 font-medium">{content}</p>

      <div className="flex justify-center mt-6">
        <button
          type="button"
          onClick={onDelete}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition-colors duration-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteAlertContent;
