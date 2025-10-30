# Sistema de Reserva de Passagens Aéreas

Sistema completo de gerenciamento e reserva de passagens aéreas desenvolvido com React (Frontend) e Node.js/Express (Backend), utilizando PostgreSQL como banco de dados.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Executando o Projeto](#executando-o-projeto)
- [Solução de Problemas](#solução-de-problemas)
- [Documentação Adicional](#documentação-adicional)

## 🎯 Visão Geral

Este sistema permite o gerenciamento completo de reservas de passagens aéreas, incluindo cadastro de usuários, cidades, viagens e tickets. O projeto é dividido em duas partes principais:

- **Backend**: API RESTful desenvolvida em Node.js com Express e Prisma ORM
- **Frontend**: Interface web desenvolvida em React com TypeScript

## ✨ Funcionalidades

### Gerenciamento de Usuários
- ✅ Cadastro de usuários com upload de avatar
- ✅ Listagem de todos os usuários
- ✅ Busca de usuário por ID
- ✅ Sistema de autenticação (preparado para JWT)
- ✅ Perfil de administrador

### Gerenciamento de Cidades
- ✅ Cadastro de cidades com imagem
- ✅ Listagem de todas as cidades
- ✅ Exclusão de cidade específica
- ✅ Exclusão em massa de cidades

### Gerenciamento de Viagens
- ✅ Criação de viagens entre cidades
- ✅ Definição de datas de ida e volta
- ✅ Controle de preços e assentos disponíveis
- ✅ Listagem de todas as viagens
- ✅ Busca de viagem por ID

### Gerenciamento de Aviões
- ✅ Cadastro de aviões (produtor e modelo)
- ✅ Listagem de todos os aviões

### Sistema de Tickets
- ✅ Criação de tickets vinculados a viagens
- ✅ Controle de status (PENDING, CONFIRMED, CANCELLED)
- ✅ Cálculo automático de preço total

## 🛠 Tecnologias Utilizadas

### Backend
- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **TypeScript** - Superset JavaScript tipado
- **Prisma** - ORM para PostgreSQL
- **PostgreSQL** - Banco de dados relacional
- **Multer** - Upload de arquivos
- **JWT** - Autenticação
- **Bcrypt** - Criptografia de senhas
- **Zod** - Validação de dados
- **CORS** - Controle de acesso

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool
- **React Router DOM** - Roteamento
- **Axios** - Cliente HTTP
- **CSS Modules** - Estilização

## 📁 Estrutura do Projeto

```
projeto-integrador-2-remake/
│
├── backend/                    # API Backend
│   ├── src/
│   │   ├── controller/        # Controladores das rotas
│   │   ├── services/          # Lógica de negócio
│   │   ├── repos/             # Repositórios (acesso ao BD)
│   │   ├── routes/            # Definição de rotas
│   │   ├── middleware/        # Middlewares (auth, upload, etc)
│   │   └── helper/            # Funções auxiliares
│   ├── prisma/
│   │   ├── schema.prisma      # Schema do banco de dados
│   │   └── migrations/        # Migrações do banco
│   ├── uploads/               # Arquivos enviados
│   ├── app.ts                 # Configuração do Express
│   ├── server.ts              # Inicialização do servidor
│   ├── package.json
│   └── .env                   # Variáveis de ambiente
│
├── frontend/                   # Interface Web
│   ├── src/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/             # Páginas da aplicação
│   │   ├── routes/            # Configuração de rotas
│   │   ├── hooks/             # Custom hooks
│   │   ├── styles/            # Arquivos de estilo
│   │   └── assets/            # Imagens e recursos
│   ├── public/                # Arquivos públicos
│   ├── package.json
│   └── .env                   # Variáveis de ambiente
│
└── README.md                   # Este arquivo
```

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn**
- **PostgreSQL** (versão 12 ou superior)
- **Git**

### Verificar Instalações

```bash
# Verificar Node.js
node --version

# Verificar npm
npm --version

# Verificar PostgreSQL
psql --version

# Verificar Git
git --version
```

## 🚀 Instalação

### 1. Clone o Repositório

```bash
git clone <url-do-repositorio>
cd "projeto integrador 2 remake"
```

### 2. Instalar Dependências do Backend

```bash
cd backend
npm install
```

### 3. Instalar Dependências do Frontend

```bash
cd ../frontend
npm install
```

## ⚙️ Configuração

### Configuração do Backend

1. **Criar arquivo `.env` no diretório `backend/` com as seguintes variáveis:**

- **PORT**: Porta onde o servidor irá rodar (ex: 3000)
- **DATABASE_URL**: URL de conexão com o PostgreSQL
- **JWT_SECRET**: Chave secreta para autenticação JWT

2. **Configurar o Banco de Dados:**

```bash
# Criar o banco de dados PostgreSQL
createdb nome_do_banco

# Executar as migrações
npx prisma migrate dev

# Gerar o Prisma Client
npx prisma generate
```

### Configuração do Frontend

1. **Criar arquivo `.env` no diretório `frontend/` com a URL da API:**

- **VITE_API_URL**: URL da API Backend (ex: http://localhost:3000/api)

## 🎮 Executando o Projeto

### Iniciar o Backend

```bash
cd backend
npm run dev
```

O servidor estará rodando em `http://localhost:3000`

### Iniciar o Frontend

```bash
cd frontend
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`

## 🔧 Solução de Problemas

### Erro: "Port already in use"

**Problema:** A porta já está sendo utilizada por outro processo.

**Solução:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Erro: "Cannot connect to database"

**Problema:** Falha na conexão com PostgreSQL.

**Soluções:**
1. Verificar se o PostgreSQL está rodando
2. Confirmar credenciais no arquivo `.env`
3. Verificar se o banco de dados existe

```bash
# Verificar status do PostgreSQL
# Windows
pg_ctl status

# Linux
sudo systemctl status postgresql
```

### Erro: "Prisma Client not generated"

**Problema:** O Prisma Client não foi gerado.

**Solução:**
```bash
cd backend
npx prisma generate
```

### Erro: "Module not found"

**Problema:** Dependências não instaladas corretamente.

**Solução:**
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install

# Ou com npm cache
npm cache clean --force
npm install
```

### Erro: "CORS policy blocked"

**Problema:** Requisições bloqueadas por CORS.

**Solução:**
- Verificar se o backend está rodando
- Confirmar URL da API no `.env` do frontend
- Verificar configuração CORS no `app.ts`

### Restaurar Arquivos Modificados

Se você modificou arquivos acidentalmente e deseja restaurá-los:

```bash
# Restaurar arquivo específico
git restore caminho/do/arquivo

# Restaurar todos os arquivos modificados
git restore .

# Descartar mudanças não commitadas (cuidado!)
git reset --hard HEAD
```

### Erro: "Upload failed"

**Problema:** Falha no upload de arquivos.

**Soluções:**
1. Verificar se a pasta `uploads/` existe no backend
2. Verificar permissões da pasta
3. Verificar tamanho máximo do arquivo

```bash
# Criar pasta uploads se não existir
mkdir backend/uploads
```

### Erro de Migração do Prisma

**Problema:** Erro ao executar migrações.

**Solução:**
```bash
# Resetar banco de dados (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações pendentes
npx prisma migrate deploy
```

## 📚 Documentação Adicional

Para informações mais detalhadas sobre cada parte do projeto, consulte:

- [README do Backend](./backend/README.md) - Documentação completa da API
- [README do Frontend](./frontend/README.md) - Documentação da interface

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença ISC.

## 👥 Autores

[gakita](https://github.com/gakita)

---

**Nota:** Este é um projeto acadêmico desenvolvido para fins educacionais.
