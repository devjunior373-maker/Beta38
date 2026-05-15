import React from 'react';
import { POPULAR_SEARCHES } from '../constants';

interface PopularBarProps {
  onSelectCategory: (category: string | null) => void;
  selectedCategory: string | null;
}

export const PopularBar: React.FC<PopularBarProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="bg-[#1E90FF] py-3 px-6 overflow-hidden border-t border-white/10 shadow-inner">
      <div className="flex items-center whitespace-nowrap overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => onSelectCategory(null)}
            className={`text-sm hover:text-white cursor-pointer transition-colors px-1 font-medium ${
              selectedCategory === null ? 'text-white underline underline-offset-4' : 'text-white/80'
            }`}
          >
            Tudo
          </button>
          <div className="w-[1px] h-3 bg-white/30"></div>
          {POPULAR_SEARCHES.map((search, i) => (
            <React.Fragment key={search}>
              <button 
                onClick={() => onSelectCategory(search)}
                className={`text-sm hover:text-white cursor-pointer transition-colors px-1 font-medium ${
                  selectedCategory === search ? 'text-white underline underline-offset-4' : 'text-white/80'
                }`}
              >
                {search}
              </button>
              {i < POPULAR_SEARCHES.length - 1 && <div className="w-[1px] h-3 bg-white/30"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
