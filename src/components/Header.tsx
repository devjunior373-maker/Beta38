import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Smartphone, Monitor, Apple, Box, Tablet, Cloud, User, Layout, Bell, Settings, LogOut, PlusCircle, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PLATFORMS = [
  { name: 'Android', icon: Smartphone },
  { name: 'Windows', icon: Monitor },
  { name: 'Mac', icon: Apple },
  { name: 'Ubuntu', icon: Box },
  { name: 'iPhone', icon: Tablet },
  { name: 'Webapps', icon: Cloud },
];

const USER_MENU_ITEMS = [
  { name: 'Perfil', icon: User },
  { name: 'Projectos', icon: Layout },
  { name: 'Publicar projecto', icon: PlusCircle },
  { name: 'Notificações', icon: Bell },
  { name: 'Configurações', icon: Settings },
];

interface HeaderProps {
  onOpenAuth: () => void;
  isLoggedIn: boolean;
  onPublishClick: () => void;
  onProjectsClick: () => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, isLoggedIn, onPublishClick, onProjectsClick, onSearch }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('Android');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const SelectedIcon = PLATFORMS.find(p => p.name === selectedPlatform)?.icon || Smartphone;

  return (
    <>
      <header className="h-14 bg-[#1E90FF] flex items-center justify-between px-4 sm:px-6 shrink-0 sticky top-0 z-50 shadow-md">
        {/* Mobile: Hamburger Menu (Left) */}
        <div className="flex items-center sm:hidden">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2 hover:bg-white/10 rounded transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Desktop: Logo/Search (Left) */}
        <div className="hidden sm:flex items-center flex-1 max-w-xl">
          <div className="relative flex-1">
            <input
              type="text"
              onChange={handleSearchChange}
              placeholder="Procurar aplicações"
              className="w-full bg-white h-10 px-4 pr-12 focus:outline-none placeholder:text-gray-400 rounded-sm"
            />
            <button className="absolute right-0 top-0 h-10 w-12 bg-[#79B400] flex items-center justify-center text-white hover:bg-[#689B00] transition-colors rounded-r-sm">
              <Search size={20} />
            </button>
          </div>
        </div>

        {/* Mobile: Logo (Center) - Optional, helps branding on small screens */}
        <div className="sm:hidden flex-1 flex justify-center">
          <span className="text-white font-black text-xl tracking-tighter">Beta38</span>
        </div>

        {/* Desktop Controls & Mobile Search (Right) */}
        <div className="flex items-center gap-2 sm:gap-4 justify-end flex-1 sm:flex-none">
          {/* Mobile Search (Right) */}
          <div className="sm:hidden flex items-center max-w-[140px] xs:max-w-none">
            <div className="relative">
              <input
                type="text"
                onChange={handleSearchChange}
                placeholder="Procurar..."
                className="w-full bg-white/10 text-white h-8 px-2 pr-8 focus:bg-white focus:text-gray-900 focus:outline-none placeholder:text-white/60 focus:placeholder:text-gray-400 rounded-sm transition-all text-xs"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 text-white/80 transition-colors">
                <Search size={14} />
              </button>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-2 text-white cursor-pointer hover:bg-white/10 px-3 py-2 rounded transition-colors group min-w-[120px] justify-between"
              >
                <div className="flex items-center gap-2">
                  <SelectedIcon size={18} />
                  <span className="font-bold text-sm">{selectedPlatform}</span>
                </div>
                <ChevronDown size={16} className={`transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="absolute top-full right-0 mt-1 w-48 bg-white rounded shadow-xl border border-gray-200 overflow-hidden py-1"
                  >
                    {PLATFORMS.map((platform) => (
                      <button
                        key={platform.name}
                        className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors text-left ${
                          selectedPlatform === platform.name ? 'bg-blue-50 text-[#1E90FF]' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                        onClick={() => {
                          setSelectedPlatform(platform.name);
                          setIsDropdownOpen(false);
                        }}
                      >
                        <platform.icon size={16} className={selectedPlatform === platform.name ? 'text-[#1E90FF]' : 'text-gray-400'} />
                        <span className="font-medium">{platform.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="flex items-center gap-2">
              {isLoggedIn ? (
                <div className="relative" ref={userMenuRef}>
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="w-10 h-10 border-2 border-white/20 rounded-full flex items-center justify-center bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer group relative overflow-hidden"
                  >
                    <User size={20} />
                  </button>

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15, ease: "easeOut" }}
                        className="absolute top-full right-0 mt-1 w-56 bg-white rounded shadow-xl border border-gray-200 overflow-hidden py-2"
                      >
                        {USER_MENU_ITEMS.map((item) => (
                          <button
                            key={item.name}
                            className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left group"
                            onClick={() => {
                              setIsUserMenuOpen(false);
                              if (item.name === 'Publicar projecto') {
                                onPublishClick();
                              } else if (item.name === 'Projectos') {
                                onProjectsClick();
                              }
                            }}
                          >
                            <item.icon size={18} className="text-gray-400 group-hover:text-[#1E90FF] transition-colors" />
                            <span className="font-medium">{item.name}</span>
                          </button>
                        ))}
                        <div className="my-1 border-t border-gray-100"></div>
                        <button
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors text-left group"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            window.location.reload();
                          }}
                        >
                          <LogOut size={18} className="text-red-400 group-hover:text-red-600 transition-colors" />
                          <span className="font-medium">Sair</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={onOpenAuth}
                  className="text-white font-bold text-sm hover:bg-white/10 px-3 py-2 rounded transition-colors whitespace-nowrap"
                >
                  Entrar / Registar
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] sm:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-4/5 max-w-[300px] bg-white z-[101] shadow-2xl overflow-y-auto sm:hidden"
            >
              <div className="flex flex-col h-full">
                <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-[#1E90FF] text-white">
                  <span className="text-2xl font-black tracking-tighter">Beta38</span>
                  <button 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-1 hover:bg-white/10 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 p-6 space-y-8">
                  {/* Account Section */}
                  <div className="space-y-4">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Conta</h3>
                    {isLoggedIn ? (
                      <div className="space-y-2">
                        {USER_MENU_ITEMS.map((item) => (
                          <button
                            key={item.name}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              if (item.name === 'Publicar projecto') {
                                onPublishClick();
                              } else if (item.name === 'Projectos') {
                                onProjectsClick();
                              }
                            }}
                            className="w-full flex items-center gap-4 py-3 text-gray-700 hover:text-[#1E90FF] transition-colors"
                          >
                            <item.icon size={22} className="text-gray-400" />
                            <span className="font-bold">{item.name}</span>
                          </button>
                        ))}
                        <button 
                          onClick={() => window.location.reload()}
                          className="w-full flex items-center gap-4 py-3 text-red-600 border-t border-gray-100 mt-2"
                        >
                          <LogOut size={22} />
                          <span className="font-bold">Sair</span>
                        </button>
                      </div>
                    ) : (
                      <button 
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onOpenAuth();
                        }}
                        className="w-full bg-[#1E90FF] text-white font-bold py-3 rounded-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                      >
                        <User size={20} />
                        Entrar / Registar
                      </button>
                    )}
                  </div>

                  {/* Platforms Section */}
                  <div className="space-y-4 pt-4 border-t border-gray-100">
                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Plataformas</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {PLATFORMS.map((platform) => (
                        <button
                          key={platform.name}
                          onClick={() => {
                            setSelectedPlatform(platform.name);
                            setIsMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-4 py-3 px-4 rounded-sm transition-all ${
                            selectedPlatform === platform.name 
                            ? 'bg-blue-50 text-[#1E90FF] border-l-4 border-[#1E90FF]' 
                            : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <platform.icon size={20} className={selectedPlatform === platform.name ? 'text-[#1E90FF]' : 'text-gray-400'} />
                          <span className="font-bold">{platform.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 italic text-xs text-gray-400 text-center">
                  Beta38 - O seu ecossistema de software.
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
