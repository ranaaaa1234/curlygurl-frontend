import React from "react";

type tooltipProps = {
  text: string;
  children: React.ReactNode;
};

const Tooltip: React.FC<tooltipProps> = ({ text, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <span
        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1
                       opacity-0 group-hover:opacity-100 bg-purple-900 text-white text-xs 
                       rounded px-2 py-1 transition duration-200 z-50 whitespace-nowrap"
      >
        {text}
      </span>
    </div>
  );
};

export default Tooltip;