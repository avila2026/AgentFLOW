import { genkit } from 'genkit';
import { ollama } from 'genkitx-ollama';
import { GoogleAuth } from 'google-auth-library';

// ----------------------------------------------------------------------
// SEGURANÇA: NUNCA "hardcode" (escreva diretamente) as chaves de API.
// Sempre utilize variáveis de ambiente (.env) para senhas, tokens e chaves.
// ----------------------------------------------------------------------
const OLLAMA_LOCAL_SERVER = process.env.OLLAMA_LOCAL_SERVER || 'http://127.0.0.1:11434';
const OLLAMA_REMOTE_SERVER = process.env.OLLAMA_REMOTE_SERVER || 'https://my-ollama-deployment';
const IS_DEV = process.env.NODE_ENV !== 'production';

// Configuração comum para os modelos
const ollamaCommon = { 
  models: [
    { name: 'gemma', type: 'generate' as const },
    { name: 'gemma4:31b-cloud', type: 'generate' as const }
  ],
  // Você também pode incluir embedders aqui se desejar
  // embedders: [{ name: 'nomic-embed-text', dimensions: 768 }]
};

// Configuração para ambiente de desenvolvimento local
const ollamaDev = {
  ...ollamaCommon,
  serverAddress: OLLAMA_LOCAL_SERVER,
};

// Configuração para produção (remota) usando chaves protegidas
const ollamaProd = {
  ...ollamaCommon,
  serverAddress: OLLAMA_REMOTE_SERVER,
  requestHeaders: async (params: any) => {
    // 1. Usando Chave API Estática através de Váriaveis de Ambiente (MAIS SEGURO)
    if (process.env.OLLAMA_API_KEY) {
      return { Authorization: `Bearer ${process.env.OLLAMA_API_KEY}` };
    }
    
    // 2. Alternativa: Usando tokens de identidade dinâmicos do Google Cloud
    const headers = await fetchWithAuthHeader(params.serverAddress);
    return { Authorization: headers['Authorization'] };
  },
};

// Inicialização da Inteligência Artificial via Genkit
export const ai = genkit({
  plugins: [
    ollama(IS_DEV ? ollamaDev : ollamaProd)
  ],
});

// ============================================================================
// Métodos Auxiliares de Autenticação (Google Auth)
// ============================================================================

let auth: GoogleAuth;
function getAuthClient() {
  if (!auth) {
    auth = new GoogleAuth();
  }
  return auth;
}

// Busca os headers, reutilizando tokens quando possível
async function fetchWithAuthHeader(url: string) {
  const client = await getIdTokenClient(url);
  const headers = await client.getRequestHeaders(url); // Auto-gerencia refresh
  return headers;
}

async function getIdTokenClient(url: string) {
  const authClient = getAuthClient();
  const client = await authClient.getIdTokenClient(url);
  return client;
}

// ============================================================================
// Exemplo de uso:
// ============================================================================
/**
 * async function executarGemma() {
 *   const llmResponse = await ai.generate({
 *     model: 'ollama/gemma', // ou 'ollama/gemma4:31b-cloud'
 *     prompt: 'Me explique a importância da segurança das chaves de API.',
 *   });
 *   console.log(llmResponse.text);
 * }
 */
