import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Upload, Globe, Smartphone, Monitor, ChevronRight } from 'lucide-react';
import { AppData } from '../types';

interface PublishFormProps {
  onBack: () => void;
  onPublish: (app: AppData) => void;
}

export const PublishForm: React.FC<PublishFormProps> = ({ onBack, onPublish }) => {
  const [formData, setFormData] = useState({
    name: '',
    developer: '',
    description: '',
    version: '1.0.0',
    platform: 'Android',
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/330/330430.png' // Default placeholder
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newApp: AppData = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
    };
    onPublish(newApp);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-4xl mx-auto px-6 py-12"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-[#1E90FF] transition-colors mb-8 group"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        <span className="font-bold">Voltar para a página inicial</span>
      </button>

      <div className="bg-white rounded-sm shadow-xl overflow-hidden border border-gray-200">
        <div className="bg-[#1E90FF] px-8 py-10 text-white">
          <h2 className="text-3xl font-bold">Publicar Novo Projecto</h2>
          <p className="text-white/80 mt-2">Partilhe o seu software com milhões de utilizadores em todo o mundo.</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Nome do Projecto</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: TubeMate, VLC Player..."
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Desenvolvedor / Organização</label>
                <input 
                  required
                  type="text" 
                  value={formData.developer}
                  onChange={(e) => setFormData({...formData, developer: e.target.value})}
                  placeholder="Seu nome ou empresa"
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Sistema Operativo</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Android', 'Windows', 'Mac', 'iPhone', 'Webapps'].map((sys) => (
                    <button
                      key={sys}
                      type="button"
                      onClick={() => setFormData({...formData, platform: sys})}
                      className={`py-3 px-2 text-sm font-bold border rounded-sm transition-all flex flex-col items-center gap-2 ${
                        formData.platform === sys 
                        ? 'bg-[#1E90FF] border-[#1E90FF] text-white' 
                        : 'bg-white border-gray-300 text-gray-600 hover:border-[#1E90FF]'
                      }`}
                    >
                      {sys === 'Android' && <Smartphone size={18} />}
                      {sys === 'Windows' && <Monitor size={18} />}
                      {sys === 'Mac' && <Monitor size={18} />}
                      {sys === 'Webapps' && <Globe size={18} />}
                      {sys}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Descrição Curta</label>
                <textarea 
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Uma breve explicação do que o seu projecto faz..."
                  className="w-full p-4 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent transition-all resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Versão</label>
                <input 
                  type="text" 
                  value={formData.version}
                  onChange={(e) => setFormData({...formData, version: e.target.value})}
                  placeholder="Ex: 1.0.0"
                  className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">URL do Ícone (opcional)</label>
                <div className="flex gap-4">
                   <div className="w-12 h-12 bg-gray-100 rounded-sm flex items-center justify-center shrink-0 border border-gray-200">
                     <img src={formData.iconUrl} alt="Preview" className="w-8 h-8 object-contain" />
                   </div>
                   <input 
                    type="text" 
                    value={formData.iconUrl}
                    onChange={(e) => setFormData({...formData, iconUrl: e.target.value})}
                    placeholder="https://exemplo.com/icone.png"
                    className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-[#1E90FF] focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex justify-end">
            <button 
              type="submit"
              className="bg-[#79B400] hover:bg-[#689B00] text-white font-bold py-4 px-12 rounded-sm transition-all flex items-center gap-2 group text-lg"
            >
              Publicar Projecto
              <ChevronRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};
