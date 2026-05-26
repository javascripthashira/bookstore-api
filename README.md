# Bookstore API

A production-ready REST API for managing books and authors, built with Express, TypeScript, Prisma and PostgreSQL.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express + TypeScript
- **ORM**: Prisma v7
- **Database**: PostgreSQL (Neon)
- **Validation**: express-validator
- **Documentation**: Swagger UI

## Prerequisites

- Node.js v18+
- npm
- PostgreSQL database (or Neon account)

## Setup Instructions

### 1. Clone the repository
\`\`\`bash
git clone <your-repo-url>
cd bookstore-api
\`\`\`

### 2. Install dependencies
\`\`\`bash
npm install
\`\`\`

### 3. Configure environment variables
\`\`\`bash
cp .env.example .env
\`\`\`

Update `.env` with your values:
\`\`\`env
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
PORT=5000
CORS_ORIGIN=http://localhost:3000
\`\`\`

### 4. Run migrations
\`\`\`bash
npx prisma migrate deploy
\`\`\`

### 5. Generate Prisma client
\`\`\`bash
npx prisma generate
\`\`\`

### 6. Start the server
\`\`\`bash
npm run dev
\`\`\`

## Environment Variables

| Variable | Description | Example |
|---|---|---|
| DATABASE_URL | PostgreSQL connection string | postgresql://user:pass@host/db?sslmode=require |
| PORT | Server port | 5000 |
| CORS_ORIGIN | Allowed CORS origin | http://localhost:3000 |

## API Documentation

Swagger UI is available at:
\`\`\`
http://localhost:5000/api-docs
\`\`\`

## Endpoints

### Authors
| Method | Endpoint | Description |
|---|---|---|
| POST | /authors | Create an author |
| GET | /authors | Get all authors |
| GET | /authors/:id | Get author by ID |
| PUT | /authors/:id | Update author |
| DELETE | /authors/:id | Delete author |

### Books
| Method | Endpoint | Description |
|---|---|---|
| POST | /books | Create a book |
| GET | /books | Get all books |
| GET | /books?genre=fiction&sort=price&page=1&limit=10 | Filtered listing |
| GET | /books/:id | Get book by ID |
| PUT | /books/:id | Update book |
| DELETE | /books/:id | Delete book |

## Running Migrations

```bash
# Development
npx prisma migrate dev --name <migration-name>

# Production
npx prisma migrate deploy
```