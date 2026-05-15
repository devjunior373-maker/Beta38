import React from 'react';
import * as Icons from 'lucide-react';
import { SIDEBAR_ITEMS } from '../constants';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-48 bg-white border-r border-[#D1D1D1] min-h-screen flex flex-col shrink-0">
      <div className="p-4 flex flex-col items-center border-b border-[#D1D1D1]">
        <div className="flex items-center gap-2 mb-2 group">
           <div className="relative w-10 h-10 flex items-center justify-center">
             {/* Simple geometric logo similar to the blue cube logo */}
             <div className="bg-[#48A2D8] w-8 h-8 rounded-sm rotate-45 flex items-center justify-center relative overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-black/20"></div>
               <div className="w-1.5 h-1.5 bg-white rounded-full relative z-10"></div>
             </div>
           </div>
           <div className="flex flex-col">
             <span className="text-xl font-black text-[#555] tracking-tighter leading-none">Beta38</span>
           </div>
        </div>
      </div>
      
      <nav className="flex-1">
        {SIDEBAR_ITEMS.map((item) => {
          const IconComponent = (Icons as any)[item.icon];
          const isActive = item.name === 'Android';
          
          return (
            <div
              key={item.name}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
                isActive 
                  ? 'bg-[#79B400] text-white' 
                  : 'text-[#666] hover:bg-gray-50'
              }`}
            >
              {IconComponent && <IconComponent size={18} strokeWidth={isActive ? 2.5 : 2} />}
              <span className="font-medium text-sm">{item.name}</span>
            </div>
          );
        })}
      </nav>
      
      <div className="p-4 border-t border-[#D1D1D1]">
        <div className="flex items-center gap-3 px-2 py-2 text-[#666] hover:bg-gray-50 cursor-pointer rounded">
          <Icons.PenTool size={18} />
          <span className="font-medium text-sm">Blog</span>
        </div>
      </div>
    </aside>
  );
};
