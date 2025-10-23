/* eslint-disable @typescript-eslint/no-unused-expressions */
import React, { useState, useEffect } from 'react';

interface DeluxeErrorProps {
  title?: string;
  message?: string;
  statusCode?: number;
  theme?: 'default' | 'cyber' | 'nature' | 'space';
  showContact?: boolean;
  onRetry?: () => void;
  onHome?: () => void;
  onContact?: () => void;
}

const DeluxeError: React.FC<DeluxeErrorProps> = ({
  title = "Oops! Something went wrong",
  message = "We encountered an unexpected error. Don't worry, our team has been notified.",
  statusCode = 500,
  theme = 'default',
  showContact = true,
  onRetry,
  onHome,
  onContact
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [particleCount] = useState(20);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const themes = {
    default: {
      bg: 'bg-gradient-to-br from-red-50 to-orange-50',
      primary: 'red',
      icon: '🔧'
    },
    cyber: {
      bg: 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900',
      primary: 'purple',
      icon: '💻'
    },
    nature: {
      bg: 'bg-gradient-to-br from-green-50 to-emerald-50',
      primary: 'emerald',
      icon: '🌿'
    },
    space: {
      bg: 'bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900',
      primary: 'violet',
      icon: '🚀'
    }
  };

  const currentTheme = themes[theme];
  const isDark = theme === 'cyber' || theme === 'space';

  const handleRetry = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    onRetry ? onRetry() : window.location.reload();
  };

  const handleHome = () => {
    onHome ? onHome() : window.location.href = '/';
  };

  const handleContact = () => {
    onContact ? onContact() : window.location.href = 'mailto:support@example.com';
  };

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: particleCount }).map((_, i) => (
          <div
            key={i}
            className={`absolute rounded-full animate-float opacity-20 ${
              isDark ? 'bg-white' : `bg-${currentTheme.primary}-500`
            }`}
            style={{
              width: Math.random() * 20 + 5 + 'px',
              height: Math.random() * 20 + 5 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 5 + 's',
              animationDuration: Math.random() * 10 + 10 + 's'
            }}
          />
        ))}
      </div>

      <div className="relative min-h-screen flex items-center justify-center px-4 py-12">
        <div className={`max-w-2xl w-full mx-auto ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        } transition-all duration-700 delay-300`}>
          
          {/* Main Error Card */}
          <div className={`backdrop-blur-lg rounded-3xl border ${
            isDark 
              ? 'bg-black/30 border-white/20 text-white' 
              : 'bg-white/80 border-gray-200/50 text-gray-900'
          } shadow-2xl p-8 md:p-12 transform hover:scale-[1.02] transition-transform duration-500`}>
            
            {/* Animated Status Code */}
            <div className="text-center mb-8">
              <div className="relative inline-block">
                <div className={`text-9xl font-black bg-gradient-to-r ${
                  theme === 'cyber' ? 'from-cyan-400 to-purple-500' :
                  theme === 'space' ? 'from-blue-400 to-purple-500' :
                  theme === 'nature' ? 'from-green-400 to-emerald-500' :
                  'from-red-400 to-orange-500'
                } bg-clip-text text-transparent animate-pulse`}>
                  {statusCode}
                </div>
                <div className={`absolute -inset-4 bg-gradient-to-r ${
                  theme === 'cyber' ? 'from-cyan-400 to-purple-500' :
                  theme === 'space' ? 'from-blue-400 to-purple-500' :
                  theme === 'nature' ? 'from-green-400 to-emerald-500' :
                  'from-red-400 to-orange-500'
                } rounded-2xl blur-xl opacity-30 animate-ping`}></div>
              </div>
            </div>

            {/* Animated Icon */}
            <div className="flex justify-center mb-6">
              <div className={`text-6xl animate-bounce ${
                isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
              } transition-all duration-1000 delay-500`}>
                {currentTheme.icon}
              </div>
            </div>

            {/* Content */}
            <div className="text-center mb-8">
              <h1 className={`text-4xl font-bold mb-4 ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}>
                {title}
              </h1>
              <p className={`text-xl mb-6 leading-relaxed ${
                isDark ? 'text-gray-300' : 'text-gray-600'
              }`}>
                {message}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className={`w-full h-2 rounded-full ${
                isDark ? 'bg-white/20' : 'bg-gray-200'
              } overflow-hidden`}>
                <div className={`h-full bg-gradient-to-r ${
                  theme === 'cyber' ? 'from-cyan-400 to-purple-500' :
                  theme === 'space' ? 'from-blue-400 to-purple-500' :
                  theme === 'nature' ? 'from-green-400 to-emerald-500' :
                  'from-red-400 to-orange-500'
                } animate-progress`}></div>
              </div>
              <p className={`text-sm mt-2 text-center ${
                isDark ? 'text-gray-400' : 'text-gray-500'
              }`}>
                Loading recovery options...
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleRetry}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm' 
                    : `bg-${currentTheme.primary}-500 hover:bg-${currentTheme.primary}-600 text-white shadow-lg`
                }`}
              >
                🔄 Try Again
              </button>
              
              <button
                onClick={handleHome}
                className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'bg-white text-black hover:bg-gray-200' 
                    : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50 shadow-lg'
                }`}
              >
                🏠 Go Home
              </button>

              {showContact && (
                <button
                  onClick={handleContact}
                  className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                    isDark 
                      ? 'bg-transparent border border-white/40 hover:bg-white/10 text-white' 
                      : 'bg-transparent border border-gray-400 hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  📞 Contact Support
                </button>
              )}
            </div>

            {/* Additional Help */}
            <div className={`text-center p-4 rounded-2xl ${
              isDark ? 'bg-white/10' : 'bg-gray-100'
            }`}>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                💡 <strong>Quick Tip:</strong> Check your internet connection or try refreshing the page
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className={`text-center mt-8 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <p className="text-sm animate-pulse">
              ⚡ Error ID: {Math.random().toString(36).substr(2, 9).toUpperCase()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeluxeError;