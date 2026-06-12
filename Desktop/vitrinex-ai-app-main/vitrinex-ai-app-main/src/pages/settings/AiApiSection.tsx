import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/ui/Button';
import { KeyIcon } from '@heroicons/react/24/outline';

const AiApiSection: React.FC = () => {
    const { addToast } = useToast();
    const [geminiKey, setGeminiKey] = useState('');
    const [openAiKey, setOpenAiKey] = useState('');

    useEffect(() => {
        const savedGemini = localStorage.getItem('vitrinex_gemini_api_key') || '';
        const savedOpenAi = localStorage.getItem('vitrinex_openai_api_key') || '';
        setGeminiKey(savedGemini);
        setOpenAiKey(savedOpenAi);
    }, []);

    const handleSave = () => {
        localStorage.setItem('vitrinex_gemini_api_key', geminiKey);
        localStorage.setItem('vitrinex_openai_api_key', openAiKey);
        addToast({
            type: 'success',
            title: 'Chaves Salvas',
            message: 'Suas chaves de API foram salvas com sucesso.'
        });
    };

    return (
        <section id="ai-api-section" className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <KeyIcon className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">APIs de Inteligência Artificial</h2>
                </div>
                <Button onClick={handleSave} variant="primary">
                    Salvar Chaves
                </Button>
            </div>
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Google Gemini API Key</label>
                    <input
                        type="password"
                        placeholder="AIzaSy..."
                        className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                        value={geminiKey}
                        onChange={(e) => setGeminiKey(e.target.value)}
                    />
                    <p className="text-xs text-[var(--text-secondary)]">Necessário para geração de conteúdo e análise avançada via Gemini.</p>
                </div>
                
                <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">OpenAI API Key</label>
                    <input
                        type="password"
                        placeholder="sk-..."
                        className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                        value={openAiKey}
                        onChange={(e) => setOpenAiKey(e.target.value)}
                    />
                    <p className="text-xs text-[var(--text-secondary)]">Necessário para integrações GPT-4 e processamento de linguagem.</p>
                </div>
            </div>
        </section>
    );
};

export default AiApiSection;
