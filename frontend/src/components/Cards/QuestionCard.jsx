import React, { useEffect, useRef, useState } from "react";

const QuestionCard = ({
  question,
  answer,
  onLearnMore,
  isPinned,
  onTogglePi,
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

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <span className="">
                      Q
            </span>
            <h3 className=""
            onClick={toggleExpanded}
            >
   
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionCard;
