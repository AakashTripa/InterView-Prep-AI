import React from 'react';
import { LuTrash2 } from 'react-icons/lu';
import { getInitials } from '../../utils/helper';

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-xl p-2 overflow-hidden cursor-pointer hover:shadow-lg shadow-gray-200 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-lg p-4 cursor-pointer relative"
        style={{
          background: colors.bgcolorLight || colors.bgcolor || '#D1E8FF', // fallback pastel blue
        }}
      >
        <div className="flex items-start">
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-md flex items-center justify-center mr-4 shadow-sm">
            <span className="text-lg font-semibold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          {/* Content Container */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              {/* Title and Skills */}
              <div>
                <h2 className="text-[17px] font-semibold text-gray-900">{role}</h2>
                <p className="text-xs text-gray-700 mt-1">{topicsToFocus}</p>
              </div>
            </div>
          </div>
        </div>

        <button
          className="absolute top-2 right-2 group-hover:flex hidden items-center gap-2 text-xs text-white font-medium bg-red-500 px-2 py-1 rounded border border-red-300 hover:border-red-400 z-10 shadow-sm"
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
          aria-label="Delete session"
        >
          <LuTrash2 size={14} />
        </button>
      </div>
      <div className="px-3 pb-3">
        <div className="flex items-center gap-3 mt-4">
          <div className="text-[10px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
          </div>
          <div className="text-[10px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            {questions} Q&A
          </div>
          <div className="text-[10px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full">
            Last Updated: {lastUpdated}
          </div>
        </div>
        {/* description */}
        <p className="text-[12px] text-gray-600 font-medium line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
