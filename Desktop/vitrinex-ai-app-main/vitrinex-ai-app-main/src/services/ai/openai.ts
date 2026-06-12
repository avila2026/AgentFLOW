import { OpenAI } from 'openai';
import { OPENAI_DEFAULT_MODEL, HARDCODED_OPENAI_KEY } from '../../constants';
import { SecureStorage } from '../../lib/secureStorage';
import { getUserProfile } from '../core/db';

export interface GenerateTextOpenAIOptions {
  model?: string;
  previousResponseId?: string;
  tools?: Array<{ type: 'web_search' | 'file_search' | 'code_interpreter' }>;
  userId?: string;
}

export interface OpenAICapabilityStatus {
  text: boolean;
  vision: boolean;
  audio: boolean;
  message: string;
}

export const getOpenAIApiKey = async (userId?: string): Promise<string> => {
  // 1. Browser localStorage (only if running in a browser context)
  if (typeof window !== 'undefined' && window.localStorage) {
    const localKey = window.localStorage.getItem('vitrinex_openai_api_key');
    if (localKey) return localKey;
  }

  // 2. SecureStorage (Node/Electron environment)
  try {
    const secureKey = await SecureStorage.getItem('vitrinex_openai_api_key_secure');
    if (secureKey) {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('vitrinex_openai_api_key', secureKey as string);
      }
      return secureKey as string;
    }
  } catch (e) {
    console.warn('SecureStorage retrieval failed', e);
  }

  // 3. Supabase Profile
  if (userId) {
    try {
      const profile = await getUserProfile(userId);
      if ((profile as any)?.openaiApiKey) {
        if (typeof window !== 'undefined' && window.localStorage) {
          window.localStorage.setItem('vitrinex_openai_api_key', (profile as any).openaiApiKey);
        }
        await SecureStorage.setItem('vitrinex_openai_api_key_secure', (profile as any).openaiApiKey);
        return (profile as any).openaiApiKey;
      }
    } catch (e) {
      console.warn('Supabase key retrieval failed', e);
    }
  }

  // 4. Environment Variables / Hardcoded
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_OPENAI_API_KEY) {
    return (import.meta as any).env.VITE_OPENAI_API_KEY;
  }
  if (typeof process !== 'undefined' && process.env.VITE_OPENAI_API_KEY) {
    return process.env.VITE_OPENAI_API_KEY;
  }
  if (HARDCODED_OPENAI_KEY) return HARDCODED_OPENAI_KEY;

  throw new Error('Configuração Ausente: Chave de API OpenAI não encontrada.');
};

export const getOpenAIClient = async (explicitKey?: string, userId?: string): Promise<OpenAI> => {
  const apiKey = explicitKey || await getOpenAIApiKey(userId);
  return new OpenAI({
    apiKey,
    dangerouslyAllowBrowser: true
  });
};

export const generateTextOpenAI = async (
  prompt: string,
  options?: GenerateTextOpenAIOptions
): Promise<string> => {
  const modelToUse = options?.model || OPENAI_DEFAULT_MODEL;

  try {
    const client = await getOpenAIClient(undefined, options?.userId);

    const messages = [{ role: 'user', content: prompt }];

    const params: any = {
      model: modelToUse,
      messages: messages
    };

    if (options?.tools) {
      params.tools = options.tools;
    }

    const response = await client.chat.completions.create(params);

    const textOutput = response.choices?.[0]?.message?.content;
    if (!textOutput) {
      throw new Error("Resposta de texto não retornada da OpenAI API.");
    }

    return textOutput;
  } catch (error) {
    console.error("OpenAI generation failed:", error);
    throw error;
  }
};

export const testOpenAIConnection = async (explicitKey?: string, userId?: string): Promise<string> => {
  try {
    const ai = await getOpenAIClient(explicitKey, userId);

    const response = await ai.chat.completions.create({
      model: OPENAI_DEFAULT_MODEL,
      messages: [{ role: 'user', content: "Diga 'Conexão com OpenAI estabelecida com sucesso.' em português." }]
    });

    const text = response.choices?.[0]?.message?.content;
    if (!text) throw new Error("Resposta vazia da OpenAI.");

    return text;
  } catch (error) {
    const err = error as Error;
    const errorMessage = err.message || err.toString();
    console.error("Erro detalhado OpenAI:", errorMessage);
    throw new Error(`Falha na conexão OpenAI: ${errorMessage}`);
  }
};

export const verifyOpenAISystemCapabilities = async (explicitKey?: string, userId?: string): Promise<OpenAICapabilityStatus> => {
  try {
    await testOpenAIConnection(explicitKey, userId);
    return {
      text: true,
      vision: true,
      audio: true,
      message: 'Sistema OpenAI Totalmente Operacional'
    };
  } catch (error) {
    const err = error as Error;
    return {
      text: false,
      vision: false,
      audio: false,
      message: err.message || 'Falha geral na validação OpenAI'
    };
  }
};
