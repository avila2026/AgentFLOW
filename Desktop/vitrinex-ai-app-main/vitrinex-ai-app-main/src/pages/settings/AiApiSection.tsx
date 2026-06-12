import React, { useState, useEffect } from 'react';
import { useToast } from '../../contexts/ToastContext';
import Button from '../../components/ui/Button';
import { KeyIcon } from '@heroicons/react/24/outline';
import { OLLAMA_DEFAULT_BASE_URL, OLLAMA_DEFAULT_MODEL } from '../../constants';

const AiApiSection: React.FC = () => {
    const { addToast } = useToast();
    const [openAiKey, setOpenAiKey] = useState('');
    const [ollamaBaseUrl, setOllamaBaseUrl] = useState('');
    const [ollamaModel, setOllamaModel] = useState('');

    useEffect(() => {
        const savedOpenAi = localStorage.getItem('vitrinex_openai_api_key') || '';
        const savedOllamaBaseUrl = localStorage.getItem('vitrinex_ollama_base_url') || '';
        const savedOllamaModel = localStorage.getItem('vitrinex_ollama_model') || '';
        setOpenAiKey(savedOpenAi);
        setOllamaBaseUrl(savedOllamaBaseUrl);
        setOllamaModel(savedOllamaModel);
    }, []);

    const handleSave = () => {
        localStorage.setItem('vitrinex_openai_api_key', openAiKey);
        localStorage.setItem('vitrinex_ollama_base_url', ollamaBaseUrl);
        localStorage.setItem('vitrinex_ollama_model', ollamaModel);
        addToast({
            type: 'success',
            title: 'Configurações Salvas',
            message: 'Configurações de IA salvas com sucesso.'
        });
    };

    return (
        <section id="ai-api-section" className="glass-card p-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <KeyIcon className="w-6 h-6 text-primary" />
                    <h2 className="text-xl font-bold text-[var(--text-primary)]">Provedores de Inteligência Artificial</h2>
                </div>
                <Button onClick={handleSave} variant="primary">
                    Salvar Configurações
                </Button>
            </div>
            
            <div className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">OpenAI API Key (Oficial)</label>
                    <input
                        type="password"
                        placeholder="sk-..."
                        className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                        value={openAiKey}
                        onChange={(e) => setOpenAiKey(e.target.value)}
                    />
                    <p className="text-xs text-[var(--text-secondary)]">Usado para as funções principais de alta fidelidade como o Criador de Campanhas e Estratégias.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Ollama API Base URL</label>
                        <input
                            type="text"
                            placeholder={OLLAMA_DEFAULT_BASE_URL}
                            className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                            value={ollamaBaseUrl}
                            onChange={(e) => setOllamaBaseUrl(e.target.value)}
                        />
                        <p className="text-xs text-[var(--text-secondary)]">Endpoint do Ollama local ou cloud. Padrão: {OLLAMA_DEFAULT_BASE_URL}</p>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[var(--text-secondary)] uppercase tracking-wider">Ollama Model Name</label>
                        <input
                            type="text"
                            placeholder={OLLAMA_DEFAULT_MODEL}
                            className="w-full bg-[var(--background-input)] border border-[var(--border-default)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-primary transition-colors"
                            value={ollamaModel}
                            onChange={(e) => setOllamaModel(e.target.value)}
                        />
                        <p className="text-xs text-[var(--text-secondary)]">Nome do modelo executando localmente. Padrão: {OLLAMA_DEFAULT_MODEL}</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AiApiSection;
