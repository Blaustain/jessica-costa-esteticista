


## Projeto Integrador II — Faculdade UNIVES-SP

> **Projeto acadêmico integrador desenvolvido no contexto da Faculdade UNIVES-SP, reunindo conhecimentos de Engenharia da Computação, desenvolvimento web, banco de dados, APIs e integração de sistemas.**

---

## 1. Sobre o projeto

O projeto **Jéssica Costa — Estética e Bem-Estar** consiste no desenvolvimento de uma aplicação web moderna para uma clínica/estabelecimento de estética, com foco em presença digital, apresentação dos serviços, organização das informações e **solicitação de agendamentos de forma integrada**.

A solução foi construída como um **Projeto Integrador da Faculdade UNIVES-SP**, envolvendo a participação de uma equipe de estudantes e a implementação técnica do sistema pelo estudante de Engenharia da Computação **Samuel Souza Araujo Souto**.

O sistema combina:

- Interface web responsiva;
- HTML5;
- CSS3;
- JavaScript;
- Bootstrap 5;
- Node.js;
- Express;
- API REST;
- PostgreSQL;
- Supabase;
- Variáveis de ambiente;
- Integração com WhatsApp;
- Validação de dados;
- Persistência de clientes e agendamentos.

O objetivo foi transformar uma página institucional em uma aplicação web funcional, conectando a experiência do usuário no navegador a uma camada de backend e a um banco de dados relacional.

---

# 2. Contexto acadêmico

Este trabalho foi desenvolvido como **Projeto Integrador da Faculdade UNIVES-SP**, permitindo aplicar conhecimentos adquiridos durante a formação acadêmica em um cenário prático.

O projeto contempla diferentes áreas da Engenharia da Computação:

- Desenvolvimento de software;
- Engenharia de requisitos;
- Desenvolvimento Front-End;
- Desenvolvimento Back-End;
- APIs REST;
- Banco de dados relacionais;
- Modelagem de dados;
- Integração entre sistemas;
- Segurança básica de credenciais;
- Responsividade e experiência do usuário;
- Persistência de dados;
- Automação do fluxo de atendimento.

O projeto também demonstra a importância da integração entre diferentes componentes tecnológicos para construir uma aplicação funcional de ponta a ponta.

---

# 3. Equipe do Projeto

O Projeto Integrador contou com a participação dos seguintes membros:

| Membro                              | Registro acadêmico |
| ----------------------------------- | ------------------: |
| Fernanda Gabbai A. Evangelista      |             2208156 |
| Flavia da Silva Barcelos            |            24218264 |
| Ingrid Cordioli da Silva            |            23209731 |
| Joelma Costa Martins                |            24205078 |
| Luciano Nascimento da Silva         |            24222352 |
| Mario Luis Mora                     |             2014043 |
| Rebeca Aparecida dos Santos Lima    |             1703253 |
| **Samuel Souza Araujo Souto** |  **23228013** |

### Desenvolvimento do sistema

**Desenvolvedor responsável pela implementação técnica do sistema:**

**Samuel Souza Araujo Souto**
**Estudante de Engenharia da Computação**

Responsável pelo desenvolvimento e integração técnica da aplicação, incluindo a estrutura Front-End, lógica JavaScript, API Node.js/Express, integração com PostgreSQL/Supabase e fluxo de agendamento.

> A participação da equipe caracteriza o desenvolvimento como um trabalho acadêmico integrador, enquanto a implementação técnica do sistema foi conduzida pelo estudante de Engenharia da Computação Samuel Souza Araujo Souto.

---

# 4. Objetivos

## Objetivo geral

Desenvolver uma aplicação web responsiva para uma empresa de estética, proporcionando uma experiência digital moderna para apresentação do estabelecimento, serviços e produtos, além de permitir a solicitação de atendimentos com persistência das informações em banco de dados.

## Objetivos específicos

- Criar uma identidade visual moderna para a aplicação;
- Apresentar o espaço e os ambientes da clínica;
- Disponibilizar os serviços de estética;
- Consultar serviços armazenados no banco de dados;
- Disponibilizar informações de produtos;
- Criar formulário de agendamento;
- Validar informações inseridas pelo usuário;
- Cadastrar clientes automaticamente;
- Registrar agendamentos no PostgreSQL;
- Criar uma API REST para comunicação entre Front-End e banco;
- Integrar o fluxo de confirmação ao WhatsApp;
- Desenvolver uma interface adaptada a smartphones, tablets e computadores;
- Aplicar conceitos de organização e separação de responsabilidades entre Front-End, Back-End e banco de dados.

---

# 5. Arquitetura da solução

A arquitetura desenvolvida segue o fluxo:

```text
┌─────────────────────────────────────┐
│             USUÁRIO                 │
│       Smartphone / Tablet / PC      │
└──────────────────┬──────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│             FRONT-END               │
│                                     │
│ HTML5 + CSS3 + JavaScript           │
│ Bootstrap 5                         │
└──────────────────┬──────────────────┘
                   │
                   │ HTTP / JSON
                   ▼
┌─────────────────────────────────────┐
│             BACK-END                │
│                                     │
│ Node.js + Express                   │
│ API REST                            │
└──────────────────┬──────────────────┘
                   │
                   │ PostgreSQL
                   ▼
┌─────────────────────────────────────┐
│          SUPABASE POSTGRESQL        │
│                                     │
│ clientes                            │
│ servicos                            │
│ produtos                            │
│ agendamentos                        │
└─────────────────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────┐
│             WHATSAPP                │
│       Confirmação do atendimento    │
└─────────────────────────────────────┘
```
