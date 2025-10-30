# Backend - Sistema de Reserva de Passagens Aéreas

API RESTful desenvolvida em Node.js com Express, TypeScript e Prisma ORM para gerenciamento de reservas de passagens aéreas.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Arquitetura](#arquitetura)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Banco de Dados](#banco-de-dados)
- [API Endpoints](#api-endpoints)
- [Modelos de Dados](#modelos-de-dados)
- [Middleware](#middleware)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Solução de Problemas](#solução-de-problemas)

## 🎯 Visão Geral

O backend fornece uma API completa para gerenciar:
- **Usuários**: Cadastro, autenticação e perfis
- **Cidades**: Cadastro de destinos com imagens
- **Viagens**: Criação e gerenciamento de voos
- **Tickets**: Sistema de reservas
- **Aviões**: Cadastro de aeronaves

## 🏗 Arquitetura

O projeto segue uma arquitetura em camadas:

```
┌─────────────────┐
│   Controllers   │  ← Recebe requisições HTTP
└────────┬────────┘
         │
┌────────▼────────┐
│    Services     │  ← Lógica de negócio
└────────┬────────┘
         │
┌────────▼────────┐
│  Repositories   │  ← Acesso ao banco de dados
└────────┬────────┘
         │
┌────────▼────────┐
│  Prisma/DB      │  ← PostgreSQL
└─────────────────┘
```

## 🛠 Tecnologias

- Node.js
- Express
- TypeScript
- Prisma
- PostgreSQL
- React
- Vite

## 📁 Estrutura de Pastas

```
backend/
│
├── src/
│   ├── controller/              # Controladores das rotas
│   │   ├── registerUserController.ts
│   │   ├── getAllUsersController.ts
│   │   ├── getUserByIDController.ts
│   │   ├── deleteAllUsersController.ts
│   │   ├── registerCityController.ts
│   │   ├── getAllCitiesController.ts
│   │   ├── deleteCityController.ts
│   │   ├── deleteAllCitiesController.ts
│   │   ├── createTripController.ts
│   │   ├── getAllTripsController.ts
│   │   ├── getTripByIDController.ts
│   │   ├── registerPlaneController.ts
│   │   └── getAllPlanesController.ts
│   │
│   ├── services/                # Lógica de negócio
│   │   ├── registerUserService.ts
│   │   ├── getAllUsersService.ts
│   │   ├── getUserByIDService.ts
│   │   ├── deleteAllUsersService.ts
│   │   ├── registerCityService.ts
│   │   ├── getAllCitiesService.ts
│   │   ├── deleteCityService.ts
│   │   ├── deleteAllCitiesService.ts
│   │   ├── createTripService.ts
│   │   ├── getAllTripsService.ts
│   │   ├── getTripByIDService.ts
│   │   └── registerPlaneService.ts
│   │
│   ├── repos/                   # Repositórios (acesso ao BD)
│   │   ├── userRepository.ts
│   │   ├── cityRepository.ts
│   │   ├── tripRepository.ts
│   │   ├── ticketRepository.ts
│   │   └── planeRepository.ts
│   │
│   ├── routes/
│   │   └── routes.ts            # Definição de todas as rotas
│   │
│   ├── middleware/
│   │   ├── uploadPhotos.ts      # Configuração Multer
│   │   └── authMiddleware.ts    # Autenticação JWT
│   │
│   └── helper/
│       └── pathUploadExists.ts  # Utilitários
│
├── prisma/
│   ├── schema.prisma            # Schema do banco de dados
│   └── migrations/              # Histórico de migrações
│
├── uploads/                     # Arquivos enviados (avatares, imagens)
│   └── default-avatar.svg       # Avatar padrão
│
├── app.ts                       # Configuração do Express
├── server.ts                    # Inicialização do servidor
├── package.json                 # Dependências e scripts
├── tsconfig.json                # Configuração TypeScript
├── .env                         # Variáveis de ambiente
├── .gitignore                   # Arquivos ignorados pelo Git
└── README.md                    # Este arquivo
```

## 🚀 Instalação

### 1. Pré-requisitos

- Node.js v18 ou superior
- PostgreSQL v12 ou superior
- npm ou yarn

### 2. Instalar Dependências

```bash
cd backend
npm install
```

### 3. Dependências Principais

```json
{
  "dependencies": {
    "@prisma/client": "^6.18.0",
    "@types/multer": "^2.0.0",
    "bcrypt": "^6.0.0",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "jsonwebtoken": "^9.0.2",
    "multer": "^2.0.2",
    "uuid": "^13.0.0",
    "zod": "^4.1.12"
  },
  "devDependencies": {
    "@types/express": "^5.0.3",
    "@types/node": "^24.9.1",
    "dotenv": "^17.2.3",
    "prisma": "^6.18.0",
    "tsx": "^4.20.6",
    "typescript": "^5.9.3"
  }
}
```

## ⚙️ Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do diretório `backend/` com as seguintes variáveis obrigatórias:

- **PORT**: Porta onde o servidor irá rodar (ex: 3000)
- **DATABASE_URL**: URL de conexão com o PostgreSQL (formato: `postgresql://usuario:senha@host:porta/nome_banco?schema=public`)
- **JWT_SECRET**: Chave secreta para autenticação JWT (use uma chave forte e única)

### 2. Configurar PostgreSQL

```bash
# Conectar ao PostgreSQL
psql -U postgres

# Criar banco de dados
CREATE DATABASE flight_booking;

# Criar usuário (opcional)
CREATE USER seu_usuario WITH PASSWORD 'sua_senha';

# Conceder privilégios
GRANT ALL PRIVILEGES ON DATABASE flight_booking TO seu_usuario;

# Sair
\q
```

## 🗄 Banco de Dados

### Schema Prisma

O projeto utiliza 5 modelos principais:

#### User (Usuários)
```prisma
model User {
  id         Int       @id @default(autoincrement())
  email      String    @unique
  name       String
  password   String
  avatarPath String?   @default("default-avatar.svg")
  createdAt  DateTime  @default(now())
  tickets    Ticket[]
  isAdmin    Boolean   @default(false)
}
```

#### City (Cidades)
```prisma
model City {
  id        Int      @id @default(autoincrement())
  name      String   @unique
  country   String
  createdAt DateTime @default(now())
  imagePath String?  @default("url_imagem_padrao")
  fromTrips Trip[]   @relation("FromCity")
  toTrips   Trip[]   @relation("ToCity")
}
```

#### Trip (Viagens)
```prisma
model Trip {
  id             Int       @id @default(autoincrement())
  fromCityId     Int
  fromCity       City      @relation("FromCity", fields: [fromCityId], references: [id])
  toCityId       Int
  toCity         City      @relation("ToCity", fields: [toCityId], references: [id])
  departureDate  DateTime  @db.Time()
  returnDate     DateTime? @db.Time()
  basePrice      Float
  availableSeats Int
  tickets        Ticket[]
  createdAt      DateTime  @default(now())
  updatedAt      DateTime  @updatedAt
}
```

#### Ticket (Tickets)
```prisma
model Ticket {
  id         Int      @id @default(autoincrement())
  userId     Int
  user       User     @relation(fields: [userId], references: [id])
  tripId     Int
  trip       Trip     @relation(fields: [tripId], references: [id])
  seatCount  Int
  totalPrice Float
  status     String   @default("PENDING")
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}
```

#### Plane (Aviões)
```prisma
model Plane {
  planeId  Int    @id @default(autoincrement())
  producer String
  model    String
}
```

### Migrações

```bash
# Criar nova migração
npx prisma migrate dev --name nome_da_migracao

# Aplicar migrações em produção
npx prisma migrate deploy

# Resetar banco de dados (CUIDADO: apaga todos os dados)
npx prisma migrate reset

# Gerar Prisma Client
npx prisma generate

# Abrir Prisma Studio (interface visual)
npx prisma studio
```

## 🌐 API Endpoints

### Base URL
```
http://localhost:3000/api
```

### Usuários

#### Registrar Usuário
```http
POST /api/registerUser
Content-Type: multipart/form-data

Body:
- name: string (required)
- email: string (required)
- password: string (required)
- avatarPath: file (optional)
- isAdmin: boolean (optional, default: false)

Response: 201 Created
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "avatarPath": "uuid-filename.jpg",
  "isAdmin": false,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Listar Todos os Usuários
```http
GET /api/users

Response: 200 OK
[
  {
    "id": 1,
    "name": "João Silva",
    "email": "joao@email.com",
    "avatarPath": "uuid-filename.jpg",
    "isAdmin": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Buscar Usuário por ID
```http
GET /api/users/:id

Response: 200 OK
{
  "id": 1,
  "name": "João Silva",
  "email": "joao@email.com",
  "avatarPath": "uuid-filename.jpg",
  "tickets": [],
  "isAdmin": false
}
```

#### Deletar Todos os Usuários
```http
DELETE /api/deleteAllUsers

Response: 200 OK
{
  "message": "All users deleted successfully",
  "count": 5
}
```

### Cidades

#### Registrar Cidade
```http
POST /api/registerCity
Content-Type: multipart/form-data

Body:
- name: string (required)
- country: string (required)
- imagePath: file (optional)

Response: 201 Created
{
  "id": 1,
  "name": "São Paulo",
  "country": "Brasil",
  "imagePath": "uuid-filename.jpg",
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Listar Todas as Cidades
```http
GET /api/cities

Response: 200 OK
[
  {
    "id": 1,
    "name": "São Paulo",
    "country": "Brasil",
    "imagePath": "uuid-filename.jpg",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

#### Deletar Cidade
```http
DELETE /api/deleteCity/:id

Response: 200 OK
{
  "message": "City deleted successfully"
}
```

#### Deletar Todas as Cidades
```http
DELETE /api/deleteAllCities

Response: 200 OK
{
  "message": "All cities deleted successfully",
  "count": 10
}
```

### Viagens

#### Registrar Viagem
```http
POST /api/registerTrip
Content-Type: application/json

Body:
{
  "fromCityId": 1,
  "toCityId": 2,
  "departureDate": "2024-12-25T10:00:00Z",
  "returnDate": "2024-12-30T15:00:00Z",
  "basePrice": 500.00,
  "availableSeats": 180
}

Response: 201 Created
{
  "id": 1,
  "fromCityId": 1,
  "toCityId": 2,
  "departureDate": "2024-12-25T10:00:00Z",
  "returnDate": "2024-12-30T15:00:00Z",
  "basePrice": 500.00,
  "availableSeats": 180,
  "createdAt": "2024-01-01T00:00:00.000Z"
}
```

#### Listar Todas as Viagens
```http
GET /api/trips

Response: 200 OK
[
  {
    "id": 1,
    "fromCity": {
      "id": 1,
      "name": "São Paulo",
      "country": "Brasil"
    },
    "toCity": {
      "id": 2,
      "name": "Rio de Janeiro",
      "country": "Brasil"
    },
    "departureDate": "2024-12-25T10:00:00Z",
    "returnDate": "2024-12-30T15:00:00Z",
    "basePrice": 500.00,
    "availableSeats": 180
  }
]
```

#### Buscar Viagem por ID
```http
GET /api/trips/:id

Response: 200 OK
{
  "id": 1,
  "fromCity": { ... },
  "toCity": { ... },
  "departureDate": "2024-12-25T10:00:00Z",
  "returnDate": "2024-12-30T15:00:00Z",
  "basePrice": 500.00,
  "availableSeats": 180,
  "tickets": []
}
```

### Aviões

#### Registrar Avião
```http
POST /api/registerPlane
Content-Type: application/json

Body:
{
  "producer": "Boeing",
  "model": "737-800"
}

Response: 201 Created
{
  "planeId": 1,
  "producer": "Boeing",
  "model": "737-800"
}
```

#### Listar Todos os Aviões
```http
GET /api/planes

Response: 200 OK
[
  {
    "planeId": 1,
    "producer": "Boeing",
    "model": "737-800"
  }
]
```

### Arquivos Estáticos

#### Acessar Imagens/Avatares
```http
GET /api/uploads/:filename

Exemplo:
GET /api/uploads/abc123-avatar.jpg
```

## 🔒 Middleware

### Upload de Arquivos (Multer)

Configurado em `src/middleware/uploadPhotos.ts`:

```typescript
- Pasta de destino: ./uploads
- Tamanho máximo: 5MB
- Tipos permitidos: JPEG, PNG, JPG, SVG
- Nome do arquivo: UUID + extensão original
```

### Autenticação JWT (Preparado)

Localizado em `src/middleware/authMiddleware.ts`:

```typescript
// Uso futuro para proteger rotas
router.get('/protected', authMiddleware, controller)
```

### CORS

Configurado em `app.ts` para permitir requisições do frontend.

## 📜 Scripts Disponíveis

```bash
# Desenvolvimento (com hot reload)
npm run dev

# Gerar Prisma Client
npx prisma generate

# Criar migração
npx prisma migrate dev

# Aplicar migrações
npx prisma migrate deploy

# Resetar banco de dados
npx prisma migrate reset

# Abrir Prisma Studio
npx prisma studio

# Verificar tipos TypeScript
npx tsc --noEmit
```

## 🔧 Solução de Problemas

### Erro: "Port 3000 already in use"

**Problema:** Porta já está sendo utilizada.

**Solução:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Ou alterar a porta no .env
PORT=3001
```

### Erro: "Cannot connect to database"

**Problema:** Falha na conexão com PostgreSQL.

**Soluções:**

1. Verificar se PostgreSQL está rodando:
```bash
# Windows
pg_ctl status

# Linux/Mac
sudo systemctl status postgresql
```

2. Verificar credenciais no `.env`
3. Testar conexão:
```bash
psql -U postgres -d flight_booking
```

### Erro: "Prisma Client not initialized"

**Problema:** Prisma Client não foi gerado.

**Solução:**
```bash
npx prisma generate
```

### Erro: "Migration failed"

**Problema:** Erro ao executar migrações.

**Soluções:**

1. Verificar se o banco existe:
```bash
psql -U postgres -l
```

2. Resetar migrações (CUIDADO: apaga dados):
```bash
npx prisma migrate reset
```

3. Criar nova migração:
```bash
npx prisma migrate dev --name fix_migration
```

### Erro: "Module not found"

**Problema:** Dependências não instaladas.

**Solução:**
```bash
# Limpar e reinstalar
rm -rf node_modules package-lock.json
npm install

# Ou limpar cache
npm cache clean --force
npm install
```

### Erro: "Upload failed" ou "File too large"

**Problema:** Falha no upload de arquivos.

**Soluções:**

1. Verificar se pasta `uploads/` existe:
```bash
mkdir uploads
```

2. Verificar permissões:
```bash
# Linux/Mac
chmod 755 uploads

# Windows: Verificar permissões de escrita na pasta
```

3. Verificar tamanho do arquivo (máx 5MB)

4. Verificar tipo do arquivo (JPEG, PNG, JPG, SVG)

### Erro: "Unique constraint violation"

**Problema:** Tentativa de criar registro duplicado.

**Exemplo:** Email ou nome de cidade já existe.

**Solução:**
- Verificar se o registro já existe antes de criar
- Usar campos únicos diferentes

### Erro: "Foreign key constraint failed"

**Problema:** Tentativa de criar relacionamento com registro inexistente.

**Exemplo:** Criar viagem com cidade que não existe.

**Solução:**
```bash
# Verificar se os IDs existem
# Exemplo: Verificar se cidade existe antes de criar viagem
```

### Restaurar Código

Se você modificou arquivos e quer restaurar:

```bash
# Restaurar arquivo específico
git restore src/controller/userController.ts

# Restaurar todos os arquivos
git restore .

# Descartar todas as mudanças (CUIDADO!)
git reset --hard HEAD
```

### Limpar Banco de Dados

Para começar do zero:

```bash
# Resetar banco (apaga todos os dados)
npx prisma migrate reset

# Ou deletar e recriar manualmente
dropdb flight_booking
createdb flight_booking
npx prisma migrate dev
```

## 🧪 Testando a API

### Usando cURL

```bash
# Registrar usuário
curl -X POST http://localhost:3000/api/registerUser \
  -F "name=João Silva" \
  -F "email=joao@email.com" \
  -F "password=senha123"

# Listar usuários
curl http://localhost:3000/api/users

# Registrar cidade
curl -X POST http://localhost:3000/api/registerCity \
  -F "name=São Paulo" \
  -F "country=Brasil"

# Listar cidades
curl http://localhost:3000/api/cities
```

### Usando Postman/Insomnia

1. Importar coleção de requisições
2. Configurar variável de ambiente: `BASE_URL = http://localhost:3000/api`
3. Testar endpoints

## 📊 Monitoramento

### Logs

O servidor exibe logs no console:

```
Server running on port 3000
uploadDir: C:\...\backend\uploads
defaultImageSource: C:\...\backend\uploads\default-avatar.svg
Arquivo existe? true
```

### Prisma Studio

Interface visual para visualizar e editar dados:

```bash
npx prisma studio
```

Acesse: `http://localhost:5555`

## 🔐 Segurança

### Boas Práticas Implementadas

- ✅ Senhas criptografadas com Bcrypt
- ✅ Validação de dados com Zod
- ✅ CORS configurado
- ✅ Upload de arquivos com validação
- ✅ Variáveis de ambiente para dados sensíveis
- ✅ Preparado para autenticação JWT

### Melhorias Futuras

- [ ] Rate limiting
- [ ] Helmet.js para headers de segurança
- [ ] Validação de JWT em rotas protegidas
- [ ] Logs estruturados
- [ ] Testes automatizados

## 📝 Notas Adicionais

### Estrutura de Resposta Padrão

```typescript
// Sucesso
{
  "data": { ... },
  "message": "Success"
}

// Erro
{
  "error": "Error message",
  "details": { ... }
}
```

### Convenções de Código

- Usar camelCase para variáveis e funções
- Usar PascalCase para classes e tipos
- Sempre tipar com TypeScript
- Comentar código complexo
- Seguir padrão de arquitetura em camadas

---

**Desenvolvido para Projeto Integrador 2**
