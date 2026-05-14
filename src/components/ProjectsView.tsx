import React from 'react';
import { motion } from 'motion/react';
import { AppData } from '../types';
import { AppCard } from './AppCard';
import { ArrowLeft, Layout, PlusCircle } from 'lucide-react';

interface ProjectsViewProps {
  apps: AppData[];
  onBack: () => void;
  onPublishClick: () => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({ apps, onBack, onPublishClick }) => {
  // For demo purposes, we'll just show all apps, but in a real app this would be filtered by user
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="max-w-screen-2xl mx-auto px-6 py-12 md:px-12"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-[#1E90FF] transition-colors mb-4 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold">Voltar para a Loja</span>
          </button>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight flex items-center gap-4">
            <Layout size={36} className="text-[#1E90FF]" />
            Os Meus Projectos
          </h1>
          <p className="text-gray-500 mt-2 text-lg">Gere e visualize todos os projectos que publicou na plataforma.</p>
        </div>

        <button 
          onClick={onPublishClick}
          className="bg-[#79B400] hover:bg-[#689B00] text-white font-bold py-3 px-8 rounded-sm transition-all flex items-center justify-center gap-3 group shadow-lg shadow-[#79B400]/20"
        >
          <PlusCircle size={22} className="group-hover:rotate-90 transition-transform duration-300" />
          Publicar Novo Projecto
        </button>
      </div>

      {apps.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6">
          {apps.map((app) => (
            <div key={app.id} className="relative group">
              <AppCard app={app} />
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <div className="bg-[#1E90FF] text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg uppercase tracking-wider">
                  Admin
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-20 text-center">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Layout size={40} className="text-gray-300" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Ainda não tem projectos</h3>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto">Comece a partilhar o seu trabalho com o mundo publicando o seu primeiro projecto hoje.</p>
          <button 
            onClick={onPublishClick}
            className="text-[#1E90FF] font-bold hover:underline inline-flex items-center gap-2"
          >
            Publicar meu primeiro projecto <PlusCircle size={18} />
          </button>
        </div>
      )}
    </motion.div>
  );
};
