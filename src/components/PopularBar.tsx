import React from 'react';
import { POPULAR_SEARCHES } from '../constants';

export const PopularBar: React.FC = () => {
  return (
    <div className="bg-[#1E90FF] py-3 px-6 overflow-hidden border-t border-white/10 shadow-inner">
      <div className="flex items-center whitespace-nowrap overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-4">
          {POPULAR_SEARCHES.map((search, i) => (
            <React.Fragment key={search}>
              <span className="text-white/80 text-sm hover:text-white cursor-pointer transition-colors px-1 font-medium">
                {search}
              </span>
              {i < POPULAR_SEARCHES.length - 1 && <div className="w-[1px] h-3 bg-white/30"></div>}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
