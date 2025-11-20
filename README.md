# Bus Tracking App

Angular 16 single-page application with a Spring Boot 3 backend for managing bus trip approvals, realtime telemetry, and auditing.

## Requirements

- Node.js 18+ and npm (for the Angular client)
- Java 17 and Maven (for the Spring Boot API)
- Docker Desktop (optional, recommended for local PostgreSQL + Redis)

## Local Services (PostgreSQL & Redis via Docker)

```bash
docker compose up -d
```

Services exposed on:
- PostgreSQL: `localhost:5432`, database `bus_tracking`, user `postgres`, password `postgres`
- Redis: `localhost:6379`

Stop services with `docker compose down` (add `--volumes` to wipe data).

### Environment Overrides

The backend reads connection details from environment variables; defaults align with the Docker compose values.

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=bus_tracking
DB_USERNAME=postgres
DB_PASSWORD=postgres
REDIS_HOST=localhost
REDIS_PORT=6379
```

## Backend API

```bash
cd backend
mvn spring-boot:run
```

- Swagger UI: http://localhost:8080/swagger-ui.html (once endpoints are documented)
- Health check: http://localhost:8080/actuator/health

Run tests:

```bash
mvn clean test
```

### Default Admin Credentials

`admin` / `Admin123!` (seeded on startup; change via `bootstrap.admin.*` properties or environment variables).

## Frontend (Angular)

```bash
npm install
npm start
```

App served at http://localhost:4200/.

Run tests:

```bash
npm test
```

## Useful Scripts

- `docker compose down --volumes` — stop databases and reset state
- `mvn spring-boot:run -Dspring-boot.run.profiles=dev` — run backend with additional Spring profiles (when added)
