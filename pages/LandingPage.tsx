
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col justify-between overflow-x-hidden max-w-md mx-auto">
      {/* Main Content Area */}
      <div className="flex flex-col w-full flex-1">
        {/* Hero Image Section */}
        <div className="w-full p-4 pt-6">
          <div 
            className="w-full aspect-[4/5] bg-center bg-no-repeat bg-cover flex flex-col justify-end overflow-hidden rounded-2xl relative shadow-2xl shadow-black/50" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDi-lf3S_lbJgVMv8YwLP19i2OZ9u4HxHCo3bU3s9s6UHzPDCIse869gAKAN_wpaW3qnRUt9KFFa5c87ZeNuKfWzm2S6bbrrqSQYXw8DrW6I0lAZkD3XH8pMFilJf0S6qXRVOuouH4SPjuR5HpFHtRsBptcS0foOSHiErsgPPWwxfjO7X_IGbJUVfcyvkNnF8p1pWoLMcSgLBhkBehD0f5B3incTXxaIOrZpuK_sCluYo15DQVC3jhg52MiJgOsVS2sLwVExLB5lG9k")' }}
          >
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-background-dark/20 to-transparent"></div>
          </div>
        </div>
        {/* Text Content */}
        <div className="flex flex-col px-6 mt-4">
          <div className="inline-flex items-center gap-2 mb-4 self-start bg-primary/10 rounded-full px-3 py-1 border border-primary/20">
            <span className="material-symbols-outlined text-primary text-[18px]">auto_graph</span>
            <span className="text-primary text-xs font-bold uppercase tracking-wider">Otimizador de Anúncios</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold leading-[1.1] tracking-tight mb-4 text-slate-900 dark:text-white">
            Venda mais no Marketplace
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg leading-relaxed font-medium">
            Maximize seus resultados com descrições perfeitas geradas em segundos. Crie anúncios irresistíveis com a ajuda da nossa IA.
          </p>
        </div>
      </div>
      {/* Footer / CTA Section */}
      <div className="w-full px-4 pb-8 pt-6 bg-gradient-to-t from-background-light dark:from-background-dark to-transparent sticky bottom-0">
        <button 
          onClick={() => navigate('/assistant')}
          className="group relative flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-xl h-14 px-5 bg-primary hover:bg-[#34f575] active:scale-[0.98] transition-all duration-200 text-background-dark text-lg font-bold leading-normal tracking-wide shadow-[0_0_20px_rgba(19,236,91,0.3)]"
        >
          <span className="relative z-10 mr-2">Começar Agora</span>
          <span className="material-symbols-outlined relative z-10 transition-transform duration-300 group-hover:translate-x-1">arrow_forward</span>
          <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"></div>
        </button>
        <div className="mt-6 flex justify-center gap-2">
          <div className="h-1 w-8 rounded-full bg-primary"></div>
          <div className="h-1 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          <div className="h-1 w-2 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
