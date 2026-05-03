# AgentFLOW

Orquestrador local de agentes CLI com IA, rodando 100% offline via [Ollama](https://ollama.com).

## Visão Geral

O **AgentFLOW** é um hub de orquestração que centraliza múltiplos agentes de CLI (GitHub Copilot, Codex, Droid, Pi, OpenCode, OpenClaw) sob um único backend local de IA. Nenhuma dependência de nuvem — tudo roda na sua máquina.

### Arquitetura

```
┌──────────────────────────────────────┐
│           AgentFLOW                  │
│  ┌─────────┐      ┌─────────────┐   │
│  │ Copilot │──────│  Ollama     │   │
│  │  CLI    │      │  (local)    │   │
│  └─────────┘      └─────────────┘   │
│       │                              │
│   delega para                        │
│   codex, droid, pi,                  │
│   opencode, openclaw                 │
└──────────────────────────────────────┘
```

### Componentes

| Arquivo | Função |
|---------|--------|
| `install-ollama.ps1` | Instala o Ollama e baixa o modelo `qwen2.5-coder:1.5b-base` |
| `copilot-orchestrator.ps1` | Inicia o Ollama, configura variáveis e lança o Copilot CLI |

## Primeiros Passos

### Pré-requisitos

- Windows com PowerShell 5.1+
- GitHub Copilot CLI instalado (`copilot` no PATH)

### Instalação

```powershell
# 1. Instale o Ollama e o modelo
.\install-ollama.ps1

# 2. Inicie o orquestrador
.\copilot-orchestrator.ps1
```

### Uso

Dentro da sessão do Copilot, você pode delegar tarefas para outros agentes disponíveis no PATH:

```
> use codex para refatorar src/auth.ts
> chame droid pra revisar esse PR
> rode opencode -p "otimizar queries SQL"
```

## Modelo Padrão

- **Modelo:** `qwen2.5-coder:1.5b-base`
- **Backend:** `http://localhost:11434`
- **Formato:** compatível com OpenAI API (`/v1`)

Para usar outro modelo, edite o parâmetro `-Model` no `copilot-orchestrator.ps1` ou baixe outro modelo via `ollama pull`.

## Agentes Suportados

Os seguintes comandos são detectados automaticamente se estiverem no PATH:

| Agente | Comando |
|--------|---------|
| GitHub Copilot CLI | `copilot` |
| OpenAI Codex CLI | `codex` |
| Android Droid | `droid` |
| Pi CLI | `pi` |
| OpenCode | `opencode` |
| OpenClaw | `openclaw` |

## Segurança

- Nenhum dado sai da máquina (modelo local).
- O backend Ollama escuta apenas em `localhost` por padrão.
- Não armazene credenciais no repositório; use variáveis de ambiente.

## Licença

MIT — veja [LICENSE](LICENSE).
