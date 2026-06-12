import React, { useState } from 'react';
import { KeyIcon } from '@heroicons/react/24/outline';
import Button from '../ui/Button';

interface ApiKeyModalProps {
    onSave: (geminiKey: string, openaiKey: string) => void;
}

const ApiKeyModal: React.FC<ApiKeyModalProps> = ({ onSave }) => {
    const [geminiKey, setGeminiKey] = useState('');
    const [openAiKey, setOpenAiKey] = useState('');
    const [error, setError] = useState('');

    const handleSave = () => {
        if (!geminiKey.trim() || !openAiKey.trim()) {
            setError('Por favor, preencha ambas as chaves de API.');
            return;
        }
        setError('');
        onSave(geminiKey.trim(), openAiKey.trim());
    };

    return (
        <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="glass-card w-full max-w-md p-8 relative animate-fade-in shadow-2xl border border-[var(--border-default)]">
                <div className="flex flex-col items-center mb-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4 text-primary">
                        <KeyIcon className="w-8 h-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-[var(--text-primary)]">Configuração Necessária</h2>
                    <p className="text-sm text-[var(--text-secondary)] mt-2">
                        Para utilizar a inteligência artificial do VitrineX, você precisa informar as chaves de API. Elas são salvas de forma segura no seu navegador.
                    </p>
                </div>
                
                <div className="space-y-5">
                    {error && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                            Google Gemini API Key
                        </label>
                        <input
                            type="password"
                            placeholder="AIzaSy..."
                            className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                            value={geminiKey}
                            onChange={(e) => setGeminiKey(e.target.value)}
                        />
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">
                            OpenAI API Key
                        </label>
                        <input
                            type="password"
                            placeholder="sk-..."
                            className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                            value={openAiKey}
                            onChange={(e) => setOpenAiKey(e.target.value)}
                        />
                    </div>

                    <Button 
                        onClick={handleSave} 
                        variant="primary" 
                        className="w-full py-3 mt-4 flex justify-center items-center"
                    >
                        Salvar e Continuar
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ApiKeyModal;
