# Farmácia Vida – Controle de Estoque

Avaliação 2 – Disciplina: Frameworks Modernos para Desenvolvimento de Sistemas (2026.2)

## Integrantes
- Anna Carolina Nicacio Neves – @Annanicacio
- João Antônio Bittencourt Montagner - @João

## Tema
Controle de estoque de uma farmácia. A entidade **Medicamento** tem: nome, princípio ativo, fabricante, forma farmacêutica (seleção), dosagem, quantidade (número), preço (número), validade (data) e exige receita (booleano).

## Funcionalidades
- CRUD de medicamentos (tabela, formulário em dialog, validação em português, confirmação de exclusão e snackbar)
- Alertas visuais de "Vencido" e "Baixo" (estoque menor que 10)
- Página de consulta com busca geral e filtros por forma, faixa de preço, intervalo de validade e prescrição, combinados, com botão "Limpar filtros" e contador de resultados
- Dados compartilhados entre as páginas e persistidos no `localStorage` (`src/services/storage.js`)
- API consumida: **openFDA** (Axios), busca de medicamentos por nome comercial ou princípio ativo (em inglês) para preencher o formulário, com indicador de carregamento e tratamento de erros
- Vue Router + menu lateral, componentes com props/emits, interface Vuetify responsiva em tons de vermelho

## Como executar
```
npm install
npm run dev
```
