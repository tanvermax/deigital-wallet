// src/components/TestimonialsSection.tsx

import React from 'react';
import TestimonialCard,{ type TestimonialCardProps }  from './TestimonialCard'; // Import the type too

// --- MOCK DATA FOR AVATARS ---
// Replace these with actual image paths or URLs in a real application
import davidAvatar from '../../../assets/user1.png'; // Example path
import amandaAvatar from '../../../assets/user2.png'; // Example path

// --- DATA FOR TESTIMONIALS ---
// Define the data for your testimonial cards, adhering to TestimonialCardProps type
const testimonialsData: TestimonialCardProps[] = [
  {
    quote: "Our international transactions are now smoother and more cost-effective, allowing us to expand our global reach.",
    avatarSrc: davidAvatar, // Use the imported image
    name: "David Wilson",
    title: "EXPORT MANAGER",
    bgColorClass: "bg-teal-50", // Light teal background
  },
  {
    quote: "We've experienced a dramatic reduction in transaction fees, which has positively impacted our bottom line.",
    avatarSrc: amandaAvatar, // Use the imported image
    name: "Amanda White",
    title: "FINANCIAL OFFICER",
    bgColorClass: "bg-green-50", // Light green background
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="md:max-w-7xl max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* LEFT SIDE: Heading, Description, and Button */}
          <div className="flex flex-col pr-8">
            {/* Tag */}
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-3 border border-gray-300 inline-block px-3 py-1 rounded-full w-fit">
              REVIEW
            </p>
            
            {/* Main Headline */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Digital <span className="text-teal-600">transactions</span> made easy.
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-8">
              Discover clients' experiences with Coinage's secure E-Wallet and Payment Gateway.
            </p>
            
            {/* Button */}
            <button className="bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition duration-300 w-fit">
              View All Review
            </button>
          </div>
          
          {/* RIGHT SIDE: Testimonial Cards */}
          <div className="flex flex-col space-y-8">
            {testimonialsData.map((testimonial, index) => (
              <TestimonialCard
                key={index} // Using index as key is generally okay for static lists
                quote={testimonial.quote}
                avatarSrc={testimonial.avatarSrc}
                name={testimonial.name}
                title={testimonial.title}
                bgColorClass={testimonial.bgColorClass}
              />
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;