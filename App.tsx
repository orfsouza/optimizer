
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AssistantPage from './pages/AssistantPage';
import ResultPage from './pages/ResultPage';
import { AdData } from './types';

const App: React.FC = () => {
  const [adData, setAdData] = useState<AdData>({
    productName: '',
    condition: '',
    tags: []
  });
  const [result, setResult] = useState<string>('');

  const handleUpdateAdData = (newData: Partial<AdData>) => {
    setAdData(prev => ({ ...prev, ...newData }));
  };

  const handleSetResult = (text: string) => {
    setResult(text);
  };

  return (
    <Router>
      <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white transition-colors duration-300">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route 
            path="/assistant" 
            element={
              <AssistantPage 
                adData={adData} 
                onUpdateData={handleUpdateAdData} 
                onResultGenerated={handleSetResult} 
              />
            } 
          />
          <Route 
            path="/result" 
            element={
              result ? (
                <ResultPage 
                  resultText={result} 
                  onReset={() => {
                    setAdData({ productName: '', condition: '', tags: [] });
                    setResult('');
                  }}
                />
              ) : (
                <Navigate to="/assistant" replace />
              )
            } 
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
