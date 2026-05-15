import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Download, Star, Share2, Shield, Info, Smartphone, CheckCircle, Clock } from 'lucide-react';
import { AppData } from '../types';

interface AppDetailsProps {
  app: AppData;
  onBack: () => void;
}

export const AppDetails: React.FC<AppDetailsProps> = ({ app, onBack }) => {
  const [testStatus, setTestStatus] = useState<'idle' | 'downloading' | 'installing' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);

  const handleTest = () => {
    if (testStatus !== 'idle') return;
    
    setTestStatus('downloading');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 15;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setTestStatus('installing');
        setTimeout(() => setTestStatus('completed'), 1500);
      }
      setProgress(p);
    }, 200);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-6xl mx-auto px-6 py-8"
    >
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-600 hover:text-[#1E90FF] font-bold mb-8 group transition-colors"
      >
        <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
        Voltar para a loja
      </button>

      <div className="">
        <div className="py-8 md:py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* App Icon */}
            <div className="w-32 h-32 md:w-48 md:h-48 bg-gray-50 rounded-2xl flex items-center justify-center p-4 border border-gray-100 shadow-sm shrink-0">
              <img src={app.iconUrl} alt={app.name} className="w-full h-full object-contain" />
            </div>

            {/* App Info */}
            <div className="flex-1 space-y-4">
              <div className="space-y-1">
                <span className="text-[#79B400] font-black text-sm uppercase tracking-widest">{app.developer}</span>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">{app.name}</h1>
                <div className="flex items-center gap-4 text-sm text-gray-500 font-medium">
                  <span className="bg-gray-100 px-2 py-0.5 rounded">{app.category}</span>
                  <div className="flex items-center gap-1">
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-yellow-400 fill-yellow-400" />
                    <Star size={16} className="text-gray-300 fill-gray-300" />
                    <span className="ml-1 text-gray-900">4.0</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 pt-4">
                <button 
                  onClick={handleTest}
                  disabled={testStatus !== 'idle'}
                  className={`relative overflow-hidden h-14 min-w-[200px] rounded-sm font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg ${
                    testStatus === 'completed' 
                      ? 'bg-[#79B400] text-white' 
                      : 'bg-[#1E90FF] text-white hover:bg-[#1C81E5] active:scale-95'
                  }`}
                >
                  {testStatus === 'idle' && (
                    <>
                      <Download size={22} />
                      TESTAR AGORA
                    </>
                  )}
                  {testStatus === 'downloading' && (
                    <div className="relative z-10">Descarregando ({Math.round(progress)}%)</div>
                  )}
                  {testStatus === 'installing' && (
                    <div className="relative z-10 flex items-center gap-2">
                      <Clock size={20} className="animate-spin" />
                      Instalando...
                    </div>
                  )}
                  {testStatus === 'completed' && (
                    <div className="relative z-10 flex items-center gap-2">
                      <CheckCircle size={22} />
                      CONCLUÍDO
                    </div>
                  )}
                  
                  {testStatus === 'downloading' && (
                    <motion.div 
                      className="absolute left-0 top-0 bottom-0 bg-white/20"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  )}
                </button>
                
                <button className="h-14 w-14 flex items-center justify-center border-2 border-gray-200 text-gray-500 hover:bg-gray-50 rounded-sm transition-colors cursor-pointer">
                  <Share2 size={24} />
                </button>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                  <Shield size={14} className="text-[#79B400]" />
                  100% SEGURO
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                  <Smartphone size={14} />
                  {app.platform}
                </div>
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase">
                  <Info size={14} />
                  V {app.version}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12 border-t border-gray-100 pt-12">
            <div className="lg:col-span-2 space-y-8">
              <section className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900 border-l-4 border-[#1E90FF] pl-4">Descrição</h2>
                <div className="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                  {app.description}
                  {"\n\n"}
                  O Beta38 apresenta a versão mais recente e estável do {app.name}. 
                  Esta aplicação foi verificada e está livre de qualquer software malicioso. 
                  Desfrute das funcionalidades premium e da interface intuitiva fornecida pelo desenvolvedor {app.developer}.
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-2xl font-black text-gray-900 border-l-4 border-[#1E90FF] pl-4">Capturas de Ecrã</h2>
                <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4 -mx-4 px-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="min-w-[280px] aspect-[9/16] bg-gray-100 rounded-lg flex items-center justify-center text-gray-300 overflow-hidden border border-gray-200">
                      <Smartphone size={64} opacity={0.2} />
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <aside className="space-y-8">
              <div className="bg-gray-50 p-6 rounded-sm space-y-6">
                <h3 className="font-black text-gray-900 uppercase text-sm tracking-widest border-b border-gray-200 pb-2">Informação Técnica</h3>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Licença</span>
                    <span className="text-gray-900 font-bold">Grátis</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Sistema Operativo</span>
                    <span className="text-gray-900 font-bold">{app.platform}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Categoria</span>
                    <span className="text-gray-900 font-bold font-bold">{app.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Língua</span>
                    <span className="text-gray-900 font-bold">Português ( Angola )</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Downloads</span>
                    <span className="text-gray-900 font-bold">1.2M+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Data</span>
                    <span className="text-gray-900 font-bold">15 Maio 2026</span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1E90FF]/5 p-6 rounded-sm border border-[#1E90FF]/10">
                <h3 className="font-black text-[#1E90FF] uppercase text-sm tracking-widest mb-4">Porquê o Beta38?</h3>
                <ul className="space-y-3">
                  <li className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#79B400] shrink-0 translate-y-0.5" />
                    Downloads a alta velocidade sem limites.
                  </li>
                  <li className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#79B400] shrink-0 translate-y-0.5" />
                    Ecossistema seguro e verificado.
                  </li>
                  <li className="flex gap-2 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-[#79B400] shrink-0 translate-y-0.5" />
                    Sem necessidade de registo para testar.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
