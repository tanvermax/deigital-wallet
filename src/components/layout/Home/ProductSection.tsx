// src/components/ProductSection.jsx or similar

import React from 'react';
// Assuming the image is saved in your project, e.g., src/assets/phone-app-screenshot.png
// NOTE: You'll need to replace this with your actual image path or a hosted link.
import phoneScreenshot from '../../../assets/Product-coinage.png';
import FeatureCard from './FeatureCard';

// Placeholder icons using simple text/emoji for demonstration.
// In a real application, replace these with actual SVG or React-Icon components.
const PlaceholderIcons = {
  instant: <span className="text-3xl">⚡️</span>, // Placeholder for Instant
  secure: <span className="text-3xl">🔒</span>,  // Placeholder for Secure
  analytics: <span className="text-3xl">📈</span>,// Placeholder for Analytics
  mobile: <span className="text-3xl">📱</span>   // Placeholder for Mobile
};

export type Feature = {
  // 'React.ReactNode' is used because the icon can be a string (emoji), 
  // a JSX element (<span>), or a full SVG/Icon component.
  icon: React.ReactNode; 
  title: string;
  description: string;
};

export type PlaceholderIconsType = Record<
  'instant' | 'secure' | 'analytics' | 'mobile', 
  React.ReactNode
>;
const FEATURES = [
  {
    icon: PlaceholderIcons.instant,
    title: "Instant transactions",
    description: "Experience instant access to funds with lightning-fast transactions.",
  },
  {
    icon: PlaceholderIcons.secure,
    title: "Secure encryption",
    description: "Protect your financial data with top-notch encryption technology.",
  },
  {
    icon: PlaceholderIcons.analytics,
    title: "Real-time analytics",
    description: "Utilize real-time analytics for transaction insights and data-driven decisions.",
  },
  {
    icon: PlaceholderIcons.mobile,
    title: "Mobile compatibility",
    description: "Mobile-friendly access for transactions anytime, anywhere.",
  },
];

const ProductSection = () => {
  return (
    // Outer container for the whole section with some padding
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The main layout uses a grid for the phone side and the text/features side */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          
          {/* LEFT COLUMN: Phone Screenshot & Background */}
          <div className="relative flex justify-center md:justify-start">
            {/* Soft Green Background Gradient/Shape */}
            <div className="absolute inset-0 bg-green-50/50 rounded-2xl md:ml-12 lg:ml-20" 
                 style={{ content: '""', zIndex: 0, clipPath: 'polygon(0 0, 100% 0, 100% 70%, 0% 100%)' }}>
            </div>
            {/* 'Products' heading overlaid on the background */}
            <h2 className="absolute top-10 left-1/2 -translate-x-1/2 md:-translate-x-full md:left-0 text-7xl font-bold text-green-200 opacity-50 z-10">
              Products
            </h2>
            
            {/* The actual Phone Image/Mockup */}
            <div className="relative w-full max-w-sm mx-auto z-20">
              {/* NOTE: If you can't use an image, you could try to build a pure-CSS phone mockup,
                 but using the provided image (cropped) is the most straightforward approach. 
                 Since I cannot access a specific file path, I'll use a placeholder structure for the phone. */}
                 
              {/* Using a placeholder for the phone image */}
              <img
                src={phoneScreenshot} // Replace with your actual imported image
                alt="Mobile banking app screenshot showing current balance"
                className="w-full h-auto rounded-3xl shadow-2xl"
              />
              {/* If you can't use the full screenshot, a simplified CSS mockup: */}
              {/* <div className="bg-black w-72 h-[40rem] rounded-[2.5rem] p-1 shadow-2xl border-[10px] border-gray-900 mx-auto">
                <div className="bg-white rounded-[2rem] h-full p-6 text-center flex flex-col justify-center">
                  <p className="text-xs text-gray-500 mb-2">Hello Nathan,</p>
                  <p className="text-xl font-bold mb-8">Welcome Back!</p>
                  <div className="bg-teal-500 text-white p-4 rounded-xl">
                    <p className="text-sm">Current Balance</p>
                    <p className="text-3xl font-bold">$ 460,249,80</p>
                  </div>
                  <p className="mt-8 text-sm text-gray-500">...App Features Here...</p>
                </div>
              </div> */}
            </div>
          </div>
          
          {/* RIGHT COLUMN: Text & Features */}
          <div className="md:pl-8">
            {/* Sub-Header/Tag */}
            <p className="text-sm font-semibold tracking-widest text-gray-500 uppercase mb-3 border border-gray-300 inline-block px-3 py-1 rounded-full">
              PRODUCTS
            </p>
            
            {/* Main Headline */}
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 leading-tight">
              Efficient <span className="text-teal-600">transactions</span> for everyone.
            </h1>
            
            {/* Description */}
            <p className="text-lg text-gray-600 mb-10">
              Experience seamless payments and enjoy peace of mind with our robust security measures.
            </p>
            
            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
              {FEATURES.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default ProductSection;