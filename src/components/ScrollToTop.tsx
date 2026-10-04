import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopProps {
  isDarkMode?: boolean;
}

export const ScrollToTop: React.FC<ScrollToTopProps> = ({ isDarkMode = false }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Cuộn lên đầu trang"
      title="Cuộn nhanh lên đầu trang"
      className={`fixed bottom-6 right-6 z-50 p-3.5 rounded-2xl shadow-xl border transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95 cursor-pointer ${
        isDarkMode
          ? 'bg-indigo-600 text-white border-indigo-500 shadow-indigo-950/60 hover:bg-indigo-500'
          : 'bg-white text-indigo-600 border-slate-200 shadow-indigo-500/20 hover:bg-indigo-50 hover:text-indigo-700'
      }`}
    >
      <ArrowUp className="w-5 h-5 stroke-[2.5]" />
    </button>
  );
};
