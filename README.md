# 📄 Document Manager API (NestJS + PostgreSQL)

A modular NestJS backend app for managing users, documents, and ingestion processes. Built with TypeORM, JWT, Swagger, Docker, and test coverage.

---

## 🚀 Features

- ✅ JWT Authentication with Role-Based Access (`admin`, `editor`, `viewer`)
- ✅ User Management (Admin-only)
- ✅ File Upload & Document CRUD
- ✅ Simulated Ingestion API with Status
- ✅ Swagger API Documentation
- ✅ Dockerized Setup
- ✅ 70%+ Unit & E2E Test Coverage

---

## 📦 Tech Stack

- **NestJS** + **TypeORM**
- **PostgreSQL**
- **JWT** Auth via `passport`
- **Docker + Docker Compose**
- **Jest + Supertest** for Testing
- **Swagger** for API Docs

---

## ⚙️ Environment Setup

Create a `.env` file:

```env
PORT=3000

# DB
DB_HOST=postgres
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=document_manager

# JWT
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d


## 🐳 Dockerized Setup

# Build and run all services
```

docker-compose up --build

# Stop containers

```
docker-compose down


## 🧪 Running Tests

# Run all unit tests

npm run test

# Generate coverage report

npm run test\:cov

# Run E2E tests

npm run test\:e2e


📂 Folder Structure

src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── documents/
│   └── ingestion/
├── database/
│   ├── entities/
│   └── seed/
├── common/
│   ├── guards/
│   ├── decorators/
│   └── enums.ts
├── config/
├── main.ts
└── app.module.ts


# 🔐 Authentication

* Use /auth/register and /auth/login to get a JWT.

* Add Bearer <token> in Swagger Authorize or Postman headers.

# ✍️ API Endpoints Overview

* POST /auth/register – Register user

* POST /auth/login – Login user

* GET /admin/users – Admin: List users

* POST /documents – Upload document

* GET /documents – List documents

* POST /ingestion/trigger – Trigger ingestion

* GET /ingestion/status/:id – Check ingestion status



---

## ✅ Summary

| Component          | Status   |
|--------------------|----------|
| Swagger Setup      | ✅ Done  |
| README.md          | ✅ Done  |
| Docker Support     | ✅ Done  |
| Test Instructions  | ✅ Done  |

---



```
