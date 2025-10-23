import React from 'react';
// Assuming FeatureCardProps is defined in a types file or defined here
export type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-start p-4">
      <div className="mb-4 p-3 rounded-xl bg-green-100 text-teal-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;