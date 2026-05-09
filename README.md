# Projeto_1_PROJOO

Estrutura inicial do projeto com suporte a TypeScript.

## Estrutura
- src/: Código fonte
- docs/: Documentação

#

## Version
## version 1.0.1 
QuickFix
- verbatimModuleSyntax: true: Essa opção obriga você a ser muito específico. Se você está importando apenas tipos, precisa usar o import type. Se tentar usar um import normal para uma interface, ele vai dar erro.
Mudado para false

- Regra do Node.js (ESM): O Node.js não tenta "adivinhar" se um arquivo é .js, .json ou .node. Ele exige que você diga exatamente qual é o arquivo.
adiciano .js nos imports