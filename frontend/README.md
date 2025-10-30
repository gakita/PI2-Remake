# Frontend - Sistema de Reserva de Passagens Aéreas

Interface web moderna desenvolvida em React com TypeScript para o sistema de reserva de passagens aéreas.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Componentes](#componentes)
- [Rotas](#rotas)
- [Integração com API](#integração-com-api)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Solução de Problemas](#solução-de-problemas)

## 🎯 Visão Geral

O frontend é uma aplicação React moderna que fornece uma interface intuitiva para:
- Buscar voos entre cidades
- Visualizar ofertas de viagens
- Gerenciar reservas (em desenvolvimento)
- Autenticação de usuários (em desenvolvimento)

## ✨ Funcionalidades

### Implementadas
- ✅ Página inicial com busca de voos
- ✅ Listagem de cidades disponíveis
- ✅ Exibição de ofertas promocionais
- ✅ Design responsivo
- ✅ Integração com API backend

### Em Desenvolvimento
- 🔄 Sistema de autenticação
- 🔄 Página de resultados de busca
- 🔄 Página de detalhes da viagem
- 🔄 Sistema de reservas
- 🔄 Painel do usuário
- 🔄 Histórico de viagens

## 🛠 Tecnologias

- **React** v19.1.1 - Biblioteca UI
- **TypeScript** v5.9.3 - Superset JavaScript tipado
- **Vite** v7.1.14 - Build tool e dev server
- **React Router DOM** v7.9.4 - Roteamento SPA
- **Axios** v1.13.1 - Cliente HTTP
- **ESLint** v9.36.0 - Linter
- **CSS3** - Estilização

## 📁 Estrutura de Pastas

```
frontend/
│
├── src/
│   ├── components/              # Componentes reutilizáveis
│   │   ├── HeaderIndexPage.tsx  # Cabeçalho com busca
│   │   ├── SectionComponent.tsx # Seção de ofertas
│   │   └── PromoCard.tsx        # Card de promoção
│   │
│   ├── pages/                   # Páginas da aplicação
│   │   └── HomePage.tsx         # Página inicial
│   │
│   ├── routes/                  # Configuração de rotas
│   │   └── routes.tsx           # Definição de rotas
│   │
│   ├── hooks/                   # Custom hooks
│   ├── styles/                  # Arquivos CSS
│   ├── assets/                  # Imagens e recursos
│   ├── Server.tsx               # Configuração Axios
│   ├── Main.tsx                 # Ponto de entrada React
│   └── index.css                # Estilos globais
│
├── public/                      # Arquivos públicos
├── index.html                   # HTML principal
├── vite.config.ts               # Configuração Vite
├── package.json                 # Dependências e scripts
├── .env                         # Variáveis de ambiente
└── README.md                    # Este arquivo
```

## 🚀 Instalação

### Pré-requisitos

- Node.js v18 ou superior
- npm ou yarn
- Backend rodando (veja [Backend README](../backend/README.md))

### Instalar Dependências

```bash
cd frontend
npm install
```

## ⚙️ Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `frontend/` com a seguinte variável:

- **VITE_API_URL**: URL da API Backend (ex: http://localhost:3000/api)

**Importante:** Variáveis de ambiente no Vite devem começar com `VITE_`

## 🎮 Executando o Projeto

### Modo Desenvolvimento

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

### Modo Preview

```bash
npm run build
npm run preview
```

## 🧩 Componentes

### HeaderIndexPage

Componente principal do cabeçalho com funcionalidade de busca.

**Localização:** `src/components/HeaderIndexPage.tsx`

**Funcionalidades:**
- Logo e navegação
- Busca de voos por origem e destino
- Integração com API para listar cidades

### SectionComponent

Seção que exibe ofertas promocionais.

**Localização:** `src/components/SectionComponent.tsx`

### PromoCard

Card individual de promoção de viagem.

**Localização:** `src/components/PromoCard.tsx`

## 🗺 Rotas

### Rotas Disponíveis

| Rota | Componente | Descrição | Status |
|------|-----------|-----------|--------|
| `/` | HomePage | Página inicial | ✅ Implementada |
| `/login` | LoginPage | Login de usuário | 🔄 Em desenvolvimento |

## 🔌 Integração com API

### Configuração

```typescript
// src/Server.tsx
import axios from "axios"

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
    timeout: 10000
})

export default api
```

### Exemplo de Uso

```typescript
import api from "../Server"

// Buscar cidades
api.get("/cities")
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.error(error)
  })
```

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview do build
npm run preview

# Linter
npm run lint
```

## 🔧 Solução de Problemas

### Erro: "Cannot connect to API"

**Soluções:**
1. Verificar se o backend está rodando
2. Verificar URL da API no `.env`
3. Verificar CORS no backend

### Erro: "Module not found"

**Solução:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 5173 already in use"

**Solução:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Ou usar porta diferente
npm run dev -- --port 5174
```

### Restaurar Código

```bash
# Restaurar arquivo específico
git restore src/components/Header.tsx

# Restaurar todos os arquivos
git restore .
```

---

**Desenvolvido para Projeto Integrador 2**
