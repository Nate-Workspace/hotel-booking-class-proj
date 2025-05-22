import React from "react";

interface CenterHeaderProps {
  decor: string;
  title: string;
  description: string;
}

const CenterHeader: React.FC<CenterHeaderProps> = ({
  decor,
  title,
  description,
}) => {
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <span className="text-primary font-bold text-sm">{decor}</span>
      <span className="lg:text-4xl md:text-3xl text-2xl font-bold">
        {title}
      </span>
      <span className="text-gray-700">{description}</span>
    </div>
  );
};

export default CenterHeader;
