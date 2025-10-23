// src/components/TestimonialCard.tsx

import React from 'react';

// Define the types for the props of TestimonialCard
export type TestimonialCardProps = {
  quote: string;
  avatarSrc: string; // URL for the avatar image
  name: string;
  title: string; // e.g., "EXPORT MANAGER", "FINANCIAL OFFICER"
  bgColorClass: string; // Tailwind class for background color, e.g., "bg-green-50"
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, avatarSrc, name, title, bgColorClass }) => {
  return (
    <div className={`md:p-8 p-4 rounded-2xl ${bgColorClass} shadow-sm flex flex-col`}>
      <div className="  flex items-center mb-6">
        {/* Avatar */}
        <img 
          src={avatarSrc} 
          alt={`${name}'s avatar`} 
          className="w-16 h-16 rounded-full object-cover mr-4" 
        />
        {/* Quote */}
        <p className="text-xs md:text-2xl font-medium text-gray-800 leading-relaxed italic">
          "{quote}"
        </p>
      </div>
      
      {/* Name and Title */}
      <div className="ml-20 mt-auto"> {/* Aligns name/title with the quote on the left */}
        <p className="font-semibold text-lg text-gray-800">{name}</p>
        <p className="text-sm uppercase text-gray-600 tracking-wider mt-1">{title}</p>
      </div>
    </div>
  );
};

export default TestimonialCard;