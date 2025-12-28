
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdData, ChatMessage, AppStep } from '../types';
import { generateAdDescription } from '../services/geminiService';

interface AssistantPageProps {
  adData: AdData;
  onUpdateData: (data: Partial<AdData>) => void;
  onResultGenerated: (text: string) => void;
}

const AssistantPage: React.FC<AssistantPageProps> = ({ adData, onUpdateData, onResultGenerated }) => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'ai', text: 'Olá! 👋 Sou seu assistente de vendas. Vamos criar um anúncio impossível de ignorar!' },
    { id: '2', role: 'ai', text: 'Primeiro, o que você está vendendo hoje?' },
  ]);
  const [step, setStep] = useState<AppStep>(AppStep.PRODUCT_NAME);
  const [inputValue, setInputValue] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const tags = [
    { id: 1, label: 'Caixa Original', icon: 'inventory_2' },
    { id: 2, label: '1 Controle', icon: 'check_circle' },
    { id: 3, label: 'Nota Fiscal', icon: 'receipt_long' },
    { id: 4, label: 'Sem riscos', icon: 'diamond' },
    { id: 5, label: 'Cabos Originais', icon: 'power' },
    { id: 6, label: 'Jogos Inclusos', icon: 'sports_esports' },
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages]);

  const addMessage = (role: 'ai' | 'user', text: string) => {
    const newMessage: ChatMessage = { id: Date.now().toString(), role, text };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleNextStep = async () => {
    if (step === AppStep.PRODUCT_NAME) {
      if (!inputValue.trim()) return;
      onUpdateData({ productName: inputValue });
      addMessage('user', inputValue);
      setInputValue('');
      setStep(AppStep.CONDITION);
      setTimeout(() => {
        addMessage('ai', 'Ótima escolha! 🚀 Qual é a condição atual do seu item?');
      }, 500);
    } else if (step === AppStep.CONDITION) {
      if (!inputValue.trim()) return;
      onUpdateData({ condition: inputValue });
      addMessage('user', inputValue);
      setInputValue('');
      setStep(AppStep.HIGHLIGHTS);
      setTimeout(() => {
        addMessage('ai', 'Perfeito. Agora, selecione os principais destaques para valorizar seu anúncio. Isso ajuda no SEO do Marketplace!');
      }, 500);
    }
  };

  const toggleTag = (label: string) => {
    const currentTags = adData.tags;
    if (currentTags.includes(label)) {
      onUpdateData({ tags: currentTags.filter(t => t !== label) });
    } else {
      onUpdateData({ tags: [...currentTags, label] });
    }
  };

  const handleOptimize = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    setStep(AppStep.GENERATING);
    addMessage('ai', 'Estou criando a descrição perfeita... Aguarde um instante! ✨');

    try {
      const result = await generateAdDescription(adData);
      onResultGenerated(result);
      navigate('/result');
    } catch (error) {
      addMessage('ai', 'Ops! Tive um problema ao conectar com a minha inteligência. Tente novamente em instantes.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-gray-900 dark:text-gray-100 min-h-screen flex flex-col antialiased selection:bg-primary selection:text-black">
      <header className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-gray-200/50 dark:border-white/5 transition-all duration-300">
        <div className="flex items-center justify-between px-4 h-16 max-w-md mx-auto">
          <button onClick={() => navigate('/')} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-gray-500 dark:text-gray-400">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="flex flex-col items-center">
            <h1 className="text-base font-bold tracking-tight">Assistente de Descrição</h1>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Passo {step} de 4</span>
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 active:scale-95 transition-all text-gray-500 dark:text-gray-400"
          >
            <span className="material-symbols-outlined">restart_alt</span>
          </button>
        </div>
        <div className="h-1 w-full bg-gray-200 dark:bg-white/5">
          <div 
            className="h-full bg-gradient-to-r from-emerald-500 to-primary transition-all duration-500 shadow-[0_0_15px_rgba(19,236,91,0.6)]" 
            style={{ width: `${(step / 4) * 100}%` }}
          ></div>
        </div>
      </header>

      <main 
        ref={scrollRef}
        className="flex-1 w-full max-w-md mx-auto pt-24 pb-[420px] px-4 flex flex-col gap-6 overflow-y-auto hide-scrollbar"
      >
        {messages.map((msg) => (
          <div key={msg.id} className={`flex items-end gap-3 animate-fade-in-up ${msg.role === 'user' ? 'justify-end' : ''}`}>
            {msg.role === 'ai' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-emerald-400 flex items-center justify-center shrink-0 shadow-lg shadow-primary/20">
                <span className="material-symbols-outlined text-black text-[18px]">smart_toy</span>
              </div>
            )}
            <div className={`p-4 rounded-2xl shadow-sm max-w-[85%] border transition-all ${
              msg.role === 'ai' 
              ? 'bg-white dark:bg-surface-dark bubble-corner-left border-gray-100 dark:border-white/5' 
              : 'bg-primary text-black bubble-corner-right border-transparent shadow-lg shadow-primary/10 font-semibold'
            }`}>
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
            {msg.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 text-[18px]">person</span>
              </div>
            )}
          </div>
        ))}
      </main>

      {/* Bottom Sheet Actions */}
      <div className="fixed bottom-0 inset-x-0 glass-panel border-t border-gray-200/50 dark:border-white/5 z-40 rounded-t-[32px] shadow-[0_-10px_60px_rgba(0,0,0,0.15)] dark:shadow-[0_-10px_60px_rgba(0,0,0,0.4)]">
        <div className="max-w-md mx-auto p-6 flex flex-col gap-5">
          
          {step === AppStep.HIGHLIGHTS && (
            <div>
              <label className="text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4 block px-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">touch_app</span>
                Toque para adicionar destaques
              </label>
              <div className="flex flex-wrap gap-2.5">
                {tags.map((tag) => {
                  const isSelected = adData.tags.includes(tag.label);
                  return (
                    <button
                      key={tag.id}
                      onClick={() => toggleTag(tag.label)}
                      className={`group px-4 py-3 border rounded-xl text-sm font-medium transition-all active:scale-95 flex items-center gap-2 
                        ${isSelected 
                          ? 'bg-primary text-black border-primary font-bold shadow-lg shadow-primary/20 transform scale-105' 
                          : 'bg-gray-100 dark:bg-white/5 hover:bg-primary/20 hover:text-primary-dark dark:hover:text-primary border-transparent hover:border-primary/50 text-gray-700 dark:text-gray-300'
                        }`}
                    >
                      <span className={`material-symbols-outlined text-[18px] transition-colors ${isSelected ? '' : 'text-gray-400 group-hover:text-primary'}`}>
                        {tag.icon}
                      </span>
                      {tag.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="relative group">
            <input 
              className="w-full h-14 pl-4 pr-14 bg-white dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-2xl text-base focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none transition-all placeholder:text-gray-400 dark:placeholder:text-gray-600 text-gray-900 dark:text-white shadow-sm" 
              placeholder={
                step === AppStep.PRODUCT_NAME ? "Ex: PlayStation 5, iPhone 13..." :
                step === AppStep.CONDITION ? "Ex: Lacrado, Ótimo estado, Com defeito..." :
                "Adicionar outro destaque personalizado..."
              }
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && (step === AppStep.HIGHLIGHTS ? (inputValue && (toggleTag(inputValue), setInputValue(''))) : handleNextStep())}
              type="text"
            />
            <button 
              onClick={() => {
                if (step === AppStep.HIGHLIGHTS && inputValue) {
                  toggleTag(inputValue);
                  setInputValue('');
                } else {
                  handleNextStep();
                }
              }}
              className="absolute right-2 top-2 bottom-2 w-10 flex items-center justify-center rounded-xl bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400 hover:bg-primary hover:text-black transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">
                {step === AppStep.HIGHLIGHTS ? 'add' : 'send'}
              </span>
            </button>
          </div>

          <div className="pt-2">
            <button 
              disabled={step !== AppStep.HIGHLIGHTS || isGenerating}
              onClick={handleOptimize}
              className={`w-full relative overflow-hidden flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-dark hover:brightness-110 text-black font-bold text-lg h-16 rounded-2xl shadow-[0_8px_25px_-6px_rgba(19,236,91,0.4)] hover:shadow-[0_12px_30px_-4px_rgba(19,236,91,0.5)] active:scale-[0.98] transition-all transform duration-200 group ${
                step !== AppStep.HIGHLIGHTS ? 'opacity-50 cursor-not-allowed grayscale' : ''
              }`}
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out skew-y-12"></div>
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                  <span>Processando...</span>
                </div>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>auto_fix_high</span>
                  <span className="relative z-10">Otimizar Descrição</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssistantPage;
