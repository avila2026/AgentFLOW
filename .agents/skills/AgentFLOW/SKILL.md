```markdown
# AgentFLOW Development Patterns

> Auto-generated skill from repository analysis

## Overview

This skill teaches the core development conventions and workflows used in the AgentFLOW TypeScript codebase. You'll learn about file naming, import/export styles, commit message patterns, and how to write and organize tests. This guide is ideal for contributors seeking to maintain consistency and quality in AgentFLOW projects.

## Coding Conventions

### File Naming

- Use **kebab-case** for all filenames.
  - Example:  
    ```
    user-service.ts
    agent-flow-manager.test.ts
    ```

### Import Style

- Use **relative imports** for all modules.
  - Example:
    ```typescript
    import { processAgent } from './process-agent';
    import { AgentType } from '../types/agent-type';
    ```

### Export Style

- Use **named exports** exclusively.
  - Example:
    ```typescript
    // agent-flow.ts
    export function startAgentFlow() { ... }
    export const AGENT_FLOW_VERSION = '1.0.0';
    ```

### Commit Message Patterns

- Use **Conventional Commits**.
- Prefix commit messages with the type, e.g., `fix`.
- Keep commit messages concise (average ~62 characters).
  - Example:
    ```
    fix: resolve agent initialization race condition
    ```

## Workflows

_No automated workflows detected in this repository._

## Testing Patterns

- Test files use the pattern: `*.test.*`
  - Example:  
    ```
    agent-flow-manager.test.ts
    ```
- The specific testing framework is **unknown**, but tests are organized in files matching the above pattern.

- Example test file structure:
    ```typescript
    // agent-flow-manager.test.ts
    import { startAgentFlow } from './agent-flow-manager';

    describe('startAgentFlow', () => {
      it('should initialize the agent flow', () => {
        // test implementation
      });
    });
    ```

## Commands

| Command    | Purpose                            |
|------------|------------------------------------|
| /test      | Run all tests in *.test.* files    |
| /lint      | Lint the codebase for style issues |
| /commit    | Commit changes using conventions   |
```