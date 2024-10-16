import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface StoryBookProps {
  story: {
    text: string;
    images: string[];
  };
  theme: string;
  onNewStory: () => void;
}

const StoryBook: React.FC<StoryBookProps> = ({ story, theme, onNewStory }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const pages = story.text.split('\n\n').reduce((acc, curr, index) => {
    if (index % 2 === 0) {
      acc.push(curr);
    } else {
      acc[acc.length - 1] += '\n\n' + curr;
    }
    return acc;
  }, [] as string[]);

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative w-full max-w-4xl aspect-[3/2] bg-amber-100 rounded-lg shadow-2xl overflow-hidden book-border">
      <div className="absolute inset-0 flex">
        {/* Left page */}
        <div className="w-1/2 p-8 flex flex-col justify-between border-r border-amber-200">
          {currentPage > 0 && (
            <>
              <img
                src={story.images[currentPage - 1]}
                alt={`Story illustration ${currentPage}`}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <div className="text-lg overflow-y-auto flex-grow">
                {pages[currentPage - 1]}
              </div>
            </>
          )}
        </div>
        {/* Right page */}
        <div className="w-1/2 p-8 flex flex-col justify-between">
          <img
            src={story.images[currentPage]}
            alt={`Story illustration ${currentPage + 1}`}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <div className="text-lg overflow-y-auto flex-grow">
            {pages[currentPage]}
          </div>
        </div>
      </div>
      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
        <button
          onClick={prevPage}
          disabled={currentPage === 0}
          className="bg-amber-600 text-white p-2 rounded-full disabled:opacity-50"
        >
          <ChevronLeft size={24} />
        </button>
        <span className="text-sm text-amber-800">
          Page {currentPage * 2 + 1}-{Math.min((currentPage + 1) * 2, pages.length)} of {pages.length}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(pages.length / 2) - 1}
          className="bg-amber-600 text-white p-2 rounded-full disabled:opacity-50"
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <button
        onClick={onNewStory}
        className="absolute top-4 right-4 bg-amber-600 text-white p-2 rounded-md hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 flex items-center justify-center"
      >
        <RefreshCw className="mr-2" size={18} />
        New Story
      </button>
    </div>
  );
};

export default StoryBook;
