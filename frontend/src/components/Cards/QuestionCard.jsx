import React, { useEffect, useRef, useState } from "react";
import { LuChevronDown, LuPin, LuPinOff, LuSparkles } from "react-icons/lu";
import AIResponsePreview from "../AIResponsePreview";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePin,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height, setHeight] = useState(0);
  const contentRef = useRef(null);

  useEffect(() => {
    if (isExpanded) {
      const contentHeight = contentRef.current.scrollHeight;
      setHeight(contentHeight + 10);
    } else {
      setHeight(0);
    }
  }, [isExpanded]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="bg-gradient-to-br from-sky-50 via-white to-violet-50 rounded-xl mb-4 overflow-hidden py-4 px-5 shadow-sm border border-slate-200 group transition duration-300 ease-in-out hover:shadow-lg">
      <div className="flex items-start justify-between cursor-pointer">
        <div className="flex items-start gap-3.5">
          <span className="text-xs md:text-sm font-semibold text-indigo-500 leading-[18px]">Q</span>
          <h3
            className="text-base md:text-[15px] font-medium text-slate-800 mr-0 md:mr-20 hover:text-indigo-600 transition"
            onClick={toggleExpand}
          >
            {question}
          </h3>
        </div>

        <div className="flex items-center justify-end ml-4 relative">
          <div
            className={`flex ${
              isExpanded ? "md:flex" : "md:hidden group-hover:flex"
            }`}
          >
            <button
              className="flex items-center gap-1.5 text-xs text-indigo-800 font-medium bg-indigo-100 px-3 py-1 rounded border border-indigo-100 hover:border-indigo-300 transition"
              onClick={onTogglePin}
            >
              {isPinned ? <LuPinOff className="text-xs" /> : <LuPin className="text-xs" />}
              <span className="hidden md:inline">{isPinned ? "Unpin" : "Pin"}</span>
            </button>

            <button
              className="flex items-center gap-2 text-xs text-emerald-800 font-medium bg-emerald-100 px-3 py-1 ml-2 rounded border border-emerald-100 hover:border-emerald-300 transition"
              onClick={() => {
                setIsExpanded(true);
                onLearnMore(question);
              }}
            >
              <LuSparkles />
              <span className="hidden md:block">Learn More</span>
            </button>
          </div>

          <button
            className="text-gray-400 hover:text-gray-500 ml-2 transition"
            onClick={toggleExpand}
          >
            <LuChevronDown
              size={20}
              className={`transform transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: `${height}px` }}
      >
        <div
          className="mt-4 text-gray-800 bg-violet-50 px-5 py-4 rounded-md border border-slate-200"
          ref={contentRef}
        >
          <AIResponsePreview answer={answer} />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
