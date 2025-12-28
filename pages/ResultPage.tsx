
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ResultPageProps {
  resultText: string;
  onReset: () => void;
}

const ResultPage: React.FC<ResultPageProps> = ({ resultText, onReset }) => {
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [editableText, setEditableText] = useState(resultText);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editableText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGoBack = () => {
    onReset();
    navigate('/assistant');
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display antialiased min-h-screen flex flex-col items-center justify-center">
      <div className="relative flex h-full min-h-screen w-full max-w-[480px] flex-col bg-background-light dark:bg-background-dark overflow-x-hidden shadow-2xl">
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background-light dark:bg-background-dark p-4 pb-2 border-b border-gray-200 dark:border-[#1c3a26]">
          <button onClick={handleGoBack} className="text-slate-900 dark:text-white flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
            <span className="material-symbols-outlined" style={{ fontSize: '24px' }}>arrow_back_ios_new</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pr-10">Resultado</h2>
        </header>

        {/* Success Message */}
        <div className="px-4 py-4 flex flex-col items-center">
          <div className="flex items-center justify-center gap-2 bg-green-100 dark:bg-[#13ec5b]/10 px-4 py-2 rounded-full border border-green-200 dark:border-[#13ec5b]/20">
            <span className="material-symbols-outlined text-green-700 dark:text-primary filled" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            <p className="text-green-800 dark:text-primary text-sm font-medium">Anúncio pronto para vender!</p>
          </div>
        </div>

        {/* Main Content: Description Field */}
        <main className="flex-1 flex flex-col px-4 pb-6">
          <div className="flex flex-col flex-1 gap-2">
            <label className="text-slate-700 dark:text-gray-300 text-sm font-medium pl-1" htmlFor="description">Descrição Otimizada</label>
            <div className="relative flex-1 flex flex-col group">
              <textarea 
                className="form-textarea w-full h-full min-h-[350px] flex-1 resize-none rounded-xl text-slate-800 dark:text-gray-100 bg-surface-light dark:bg-surface-dark border border-gray-200 dark:border-[#2a4d35] focus:border-primary dark:focus:border-primary focus:ring-1 focus:ring-primary placeholder:text-gray-400 dark:placeholder:text-[#5a8068] p-4 text-base font-normal leading-relaxed shadow-sm transition-all duration-200" 
                id="description" 
                value={editableText}
                onChange={(e) => setEditableText(e.target.value)}
                placeholder="Gerando conteúdo..."
              ></textarea>
              
              <button 
                onClick={copyToClipboard} 
                className="absolute top-3 right-3 p-2 bg-gray-100 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400 hover:text-primary hover:bg-green-50 dark:hover:bg-primary/10 transition-colors opacity-100" 
                title="Copiar"
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                  {isCopied ? 'done' : 'content_copy'}
                </span>
              </button>
            </div>
          </div>
        </main>

        {/* Actions Footer */}
        <footer className="bg-background-light dark:bg-background-dark px-4 pb-8 pt-2">
          <div className="flex justify-center mb-4">
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-sm font-semibold">
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>edit</span>
              <span>Edite se necessário</span>
            </button>
          </div>
          
          <div className="flex flex-col gap-3">
            <button 
              onClick={copyToClipboard} 
              className="relative overflow-hidden group w-full cursor-pointer flex items-center justify-center rounded-xl h-14 px-6 bg-primary hover:bg-[#0fd650] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-green-900/20"
            >
              <div className="flex items-center gap-2 text-background-dark text-base font-bold tracking-wide">
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>
                  {isCopied ? 'done' : 'content_copy'}
                </span>
                <span>{isCopied ? 'Copiado!' : 'Copiar Descrição'}</span>
              </div>
            </button>
            
            <button 
              onClick={() => window.open('https://www.mercadolivre.com.br/', '_blank')}
              className="w-full cursor-pointer flex items-center justify-center rounded-xl h-14 px-6 bg-transparent border-2 border-gray-200 dark:border-[#2a4d35] hover:border-primary dark:hover:border-primary active:scale-[0.98] transition-all duration-200 group"
            >
              <div className="flex items-center gap-2 text-slate-700 dark:text-white group-hover:text-primary transition-colors text-base font-bold tracking-wide">
                <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>storefront</span>
                <span>Abrir Marketplace</span>
              </div>
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ResultPage;
