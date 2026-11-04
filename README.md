# RIS

Naloge pri predmetu RIS 2026.

## Aplikacija Potovanja

Aplikacija uporablja Spring Boot REST API, PostgreSQL in HTML vmesnik, ki ga streže Express. Express posreduje klice `/api/*` backendu.

### Zagon

1. V projektni mapi zaženi PostgreSQL:

   ```powershell
   docker compose up -d postgres
   ```

2. V novem PowerShell terminalu zaženi backend:

   ```powershell
   cd backend
   $env:JAVA_HOME = 'C:\Program Files\Java\jdk-21.0.12'
   $env:MAVEN_OPTS = "-Duser.home=$env:USERPROFILE"
   .\mvnw.cmd spring-boot:run
   ```

   Backend posluša na `http://localhost:8080`.

3. V drugem terminalu zaženi frontend:

   ```powershell
   cd frontend
   npm install
   npm start
   ```

   Odpri `http://localhost:3000`.

Povezavo s PostgreSQL lahko nastaviš z okoljskimi spremenljivkami `DB_URL`, `DB_USERNAME` in `DB_PASSWORD`. Privzeta povezava je `jdbc:postgresql://localhost:5432/potovanja`.
