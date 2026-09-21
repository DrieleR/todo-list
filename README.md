# To Do List

Aplicação de lista de tarefas com cadastro, edição, exclusão e organização por categorias (Trabalho, Estudos, Pessoal). API REST própria com autenticação por usuário.

## Stack

- **Frontend**: React + Vite + Tailwind CSS
- **Backend**: Node.js + Express
- **Banco de dados**: SQLite (`better-sqlite3`)
- **Autenticação**: JWT + senhas com hash (bcrypt)

## Estrutura

```
todo-list/
├── client/    # aplicação React
└── server/    # API REST
```

## Como rodar

### 1. Backend

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

A API sobe em `http://localhost:3001`.

### 2. Frontend

Em outro terminal:

```bash
cd client
npm install
cp .env.example .env
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

## Rotas da API

| Método | Rota            | Descrição                    | Autenticado |
|--------|-----------------|-------------------------------|-------------|
| POST   | `/auth/register`| Cria uma conta                | Não         |
| POST   | `/auth/login`   | Login, retorna token          | Não         |
| GET    | `/tasks`        | Lista tarefas do usuário      | Sim         |
| POST   | `/tasks`        | Cria uma tarefa               | Sim         |
| PUT    | `/tasks/:id`    | Atualiza uma tarefa           | Sim         |
| DELETE | `/tasks/:id`    | Remove uma tarefa             | Sim         |

`GET /tasks` aceita `?category=trabalho|estudos|pessoal` para filtrar.

Autenticação: enviar `Authorization: Bearer <token>` nas rotas de tarefas.

## Modelo de dados

**User**: `id, name, email, password (hash)`

**Task**: `id, title, description, category (trabalho|estudos|pessoal), done, user_id`

## Próximos passos possíveis

- Deploy (Render/Railway para API, Vercel/Netlify para o front)
- Testes automatizados (Jest/Vitest)
- Paginação e busca de tarefas
- Recuperação de senha
