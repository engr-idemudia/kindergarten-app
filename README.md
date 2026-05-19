# Kindergarten Management App

A full-stack, multi-tenant SaaS platform for managing kindergarten operations — including child records, attendance, class groups, teacher management, and parent communication.

**Live Demo:** [kindergarten.idemudia.dev](https://kindergarten.idemudia.dev)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Backend | Spring Boot, Java 25, Spring Security, JWT |
| Database | PostgreSQL (Docker locally, Render in production) |
| DevOps | GitHub Actions CI/CD, Docker, Render, Vercel |

---

## Features

- Multi-tenant architecture — each kindergarten is fully isolated
- Role-based access control — Admin, Teacher, and Parent portals
- JWT authentication with tenant context
- Class group and attendance management
- Daily journal entries with photo support
- Meal and menu planning
- Parent-child relationship management

---

## My Contributions

This project was built as part of a 5-person agile team at TalTech. Below are my personal contributions across the full stack.

### DevOps & CI/CD
- Configured GitHub Actions workflow for automated Docker image builds and deployment
- Set up Render deployment pipeline for the Spring Boot backend
- Resolved Docker build context issues and multi-stage Dockerfile configuration
- Deployed the live demo to a custom subdomain (`kindergarten.idemudia.dev`) via Vercel and Squarespace DNS

### Security & Authentication (Spring Security / JWT)
- Resolved JWT tenant resolution bug — extracted `tenantId` from JWT token instead of request parameters, ensuring correct multi-tenant data isolation (PR #55)
- Contributed to Spring Security configuration for role-based endpoint access

### Backend Feature Development (Spring Boot / Java)
- Implemented auto-creation of Parent profiles on user registration (PR #56)
- Built the Teacher portal Class Records endpoint — full REST controller, service, DTO, and repository layers (PR #67)
- Created the `KINDERGARTEN_ADMIN` dashboard backend support (PR #71)

### Frontend Development (Next.js / TypeScript)
- Built the Class Records frontend for the Teacher portal — React components with TypeScript and API integration (PR #67)
- Built the `KINDERGARTEN_ADMIN` dashboard with role-based routing and data display (PR #71)

### Code Quality & Collaboration
- Conducted peer code reviews on PRs #72 and #74
- Resolved merge conflicts across multiple branches
- Seeded the production database with demo users for all roles

---

## Demo Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@test.com` | `password123` |
| Teacher | `teacher@test.com` | `password123` |
| Parent | `parent@test.com` | `password123` |

---

## Local Development

### Prerequisites

- Java 25
- Docker
- Node.js (LTS)

### 1. Clone the repository

```bash
git clone https://github.com/engr-idemudia/kindergarten-app.git
cd kindergarten-app
```

### 2. Configure environment variables

In `backend/src/main/resources/`, create a `.env.properties` file using `.env.example` as a template:

```properties
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/kindergarten
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
JWT_SECRET=your_jwt_secret_minimum_32_characters
NEXT_PUBLIC_API_URL=http://localhost:8080
```

### 3. Start the database

```bash
docker compose -f docker-compose.dev.yml up -d postgres
```

### 4. Start the backend

```bash
cd backend
./gradlew bootRun
```

Backend runs at `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui/index.html`

### 5. Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`

### Stop the database

```bash
docker compose -f docker-compose.dev.yml down
```

---

## Production Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel (auto-deploy on push to `main`) |
| Backend | Render (Docker, auto-deploy on push to `main`) |
| CI/CD | GitHub Actions — builds and pushes Docker images to Docker Hub |

---

## Project Structure

```
kindergarten-app/
├── backend/          # Spring Boot application
│   ├── src/
│   │   └── main/
│   │       ├── java/       # Controllers, services, repositories
│   │       └── resources/  # Config, Flyway migrations
│   └── Dockerfile
├── frontend/         # Next.js application
│   ├── src/
│   │   ├── app/      # App Router pages
│   │   ├── components/
│   │   ├── services/ # API integration
│   │   └── modules/  # Domain feature slices
│   └── Dockerfile
└── docker-compose.dev.yml
```

---

## Author

**Idemudia Osaghae**  
[idemudia.dev](https://idemudia.dev) · [GitHub](https://github.com/engr-idemudia)
