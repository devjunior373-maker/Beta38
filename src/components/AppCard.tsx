import React from 'react';
import { AppData } from '../types';
import { motion } from 'motion/react';

interface AppCardProps {
  app: AppData;
  onClick?: (app: AppData) => void;
  onTestClick?: (app: AppData) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick, onTestClick }) => {
  const isTubeMate = app.name.includes('TubeMate');

  const handleTestClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onTestClick?.(app);
  };

  return (
    <motion.div 
      whileHover={{ 
        scale: 1.05, 
        zIndex: 50,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
      }}
      initial={isTubeMate ? { zIndex: 10, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" } : {}}
      onClick={() => onClick?.(app)}
      className={`bg-white p-4 flex flex-col gap-3 shadow-sm border border-transparent hover:border-[#D1D1D1] transition-colors cursor-pointer group relative ${isTubeMate ? 'ring-2 ring-[#79B400] ring-offset-2 scale-[1.02]' : ''}`}
    >
      <div className="flex justify-center mb-2">
        <img 
          src={app.iconUrl} 
          alt={app.name} 
          className="w-20 h-20 object-contain group-hover:scale-110 transition-transform"
        />
      </div>
      
      <div className="flex flex-col gap-1">
        <span className="text-[10px] uppercase font-bold text-[#79B400] tracking-wider truncate">
          {app.developer}
        </span>
        <h3 className="text-base font-bold text-[#333] line-clamp-1 leading-tight mb-1">
          {app.name}
        </h3>
        <p className="text-[11px] text-[#666] line-clamp-3 min-h-[42px] leading-relaxed">
          {app.description}
        </p>
      </div>
      
      <div className="mt-auto flex items-center justify-between gap-2">
        <span className="text-[10px] text-[#999] font-medium">
          {app.version}
        </span>
        <button 
          onClick={handleTestClick}
          className="bg-[#1E90FF] text-white text-[10px] font-black px-4 py-1.5 rounded-sm hover:bg-[#1C81E5] transition-colors uppercase tracking-tight shadow-sm"
        >
          Testar
        </button>
      </div>
    </motion.div>
  );
};
