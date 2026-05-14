import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app we'd do auth here
    onAuthSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-xl bg-white rounded-sm shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                  {mode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h2>
                <p className="text-gray-500 text-sm mt-2">
                  {mode === 'login' 
                    ? 'Acesse sua conta para gerenciar seus downloads' 
                    : 'Junte-se à nossa comunidade de desenvolvedores'}
                </p>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                {mode === 'register' && (
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                      Nome completo
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        type="text"
                        placeholder="Seu nome"
                        className="w-full pl-10 pr-4 h-10 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1E90FF] transition-all placeholder:text-gray-400"
                      />
                    </div>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    E-mail
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="email"
                      placeholder="exemplo@email.com"
                      className="w-full pl-10 pr-4 h-10 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1E90FF] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-700 uppercase tracking-wider ml-1">
                    Palavra-passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input
                      type="password"
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 h-10 bg-white border border-gray-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#1E90FF] transition-all placeholder:text-gray-400"
                    />
                  </div>
                </div>

                <button className="w-full bg-[#1E90FF] hover:bg-[#1C86EE] text-white font-bold h-10 rounded-sm mt-4 transition-all flex items-center justify-center gap-2 group">
                  {mode === 'login' ? 'Entrar' : 'Registar'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>

              <div className="mt-8 pt-6 border-t border-gray-100 text-center">
                <p className="text-sm text-gray-600">
                  {mode === 'login' ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                  <button
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="ml-2 text-[#1E90FF] font-bold hover:underline"
                  >
                    {mode === 'login' ? 'Registe-se agora' : 'Faça login'}
                  </button>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
