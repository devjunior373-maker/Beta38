import React from 'react';

export const Hero: React.FC = () => {
  return (
    <section className="relative h-[480px] w-full overflow-hidden flex items-center justify-center">
      {/* Background Image - Using a Clash of Clans themed image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] hover:scale-110"
        style={{ backgroundImage: 'url("https://images.wallpapersden.com/image/download/clash-of-clans-game-4k_bWVsZ2mUmZqaraWkpJRmbmdlrWZlbWU.jpg")' }}
      >
        <div className="absolute inset-0 bg-black/30"></div>
      </div>
      
      {/* Content Overlay */}
      <div className="relative z-10 text-center text-white p-6 max-w-4xl">
        <div className="flex flex-col items-center">
          <div className="text-sm font-bold bg-[#79B400] px-3 py-1 mb-4 rounded-sm self-start md:self-auto">
             8.212.3
          </div>
          <h1 className="text-6xl md:text-8xl font-black mb-4 drop-shadow-2xl tracking-tighter uppercase italic">
            Clash of Clans
          </h1>
          <p className="text-xl md:text-2xl font-bold italic drop-shadow-lg max-w-2xl">
            Destroy your enemies and lead your clan to glory
          </p>
        </div>
      </div>
      
      {/* Bottom Slope Accent (Orange triangular shape) */}
      <div className="absolute bottom-0 left-0 w-full h-16 bg-[#FF6300]" style={{ clipPath: 'polygon(0 100%, 100% 100%, 0 0)' }}></div>
    </section>
  );
};
