# Jéssica Costa — Landing Page de Estética

Landing page moderna, responsiva e em português, criada para apresentar a marca, os ambientes do consultório, serviços, depoimentos demonstrativos, produtos e solicitação de atendimento via WhatsApp.

## Estrutura

- `index.html` — estrutura da página e Bootstrap.
- `css/style.css` — identidade visual, responsividade, cards, navegação, animações e layout.
- `js/app.js` — dados dos serviços, depoimentos, produtos, formulário e integração com WhatsApp.
- `database/produtos_estetica.sql` — criação e carga inicial da tabela PostgreSQL de produtos.
- `assets/` — imagens fornecidas para os quatro ambientes.

## WhatsApp

Abra `js/app.js` e altere:

```js
const WHATSAPP_NUMBER = '5511999999999';
```

para o número comercial real, sempre com código do país + DDD + número, sem `+`, espaços ou parênteses.

Exemplo: `5511999999999`.

## PostgreSQL

Execute o arquivo `database/produtos_estetica.sql` no PostgreSQL. Ele cria o schema `estetica`, a tabela `estetica.produtos`, índices e registros fictícios para demonstração.

## Como abrir

Para uma demonstração simples, abra `index.html` no navegador. Para desenvolvimento, recomenda-se usar um servidor local, como Live Server no VS Code.

## Observação sobre os depoimentos

Os depoimentos presentes na página são fictícios e foram marcados como demonstrativos para evitar que sejam apresentados como avaliações reais.

## Imagens

As quatro imagens foram incorporadas a partir dos arquivos fornecidos nesta conversa. A imagem da frente do consultório contém a identificação visual existente na própria fotografia; caso o estabelecimento real tenha outra fachada ou nome, substitua o arquivo em `assets/frente-consultorio.png`.
