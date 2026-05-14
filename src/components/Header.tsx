import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Smartphone, Monitor, Apple, Box, Tablet, Cloud, User, Layout, Bell, Settings, LogOut, PlusCircle } from 'lucide-react';
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
}

export const Header: React.FC<HeaderProps> = ({ onOpenAuth, isLoggedIn, onPublishClick, onProjectsClick }) => {
  const [selectedPlatform, setSelectedPlatform] = useState('Android');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

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
    <header className="h-14 bg-[#1E90FF] flex items-center justify-between px-6 shrink-0 sticky top-0 z-50 shadow-md">
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search apps"
            className="w-full bg-white h-10 px-4 pr-12 focus:outline-none placeholder:text-gray-400 rounded-sm"
          />
          <button className="absolute right-0 top-0 h-10 w-12 bg-[#79B400] flex items-center justify-center text-white hover:bg-[#689B00] transition-colors rounded-r-sm">
            <Search size={20} />
          </button>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
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
              className="text-white font-bold text-sm hover:bg-white/10 px-3 py-2 rounded transition-colors hidden sm:block whitespace-nowrap"
            >
              Entrar / Registar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
