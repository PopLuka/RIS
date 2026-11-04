# Potovanja

Aplikacija uporablja Spring Boot REST API, PostgreSQL in HTML vmesnik, ki ga streže Express.

## Zagon

1. Zaženi PostgreSQL: `docker compose up -d postgres`.
2. Zaženi backend v PowerShellu.
   cd backend
   $env:JAVA_HOME = 'C:\Program Files\Java\jdk-21.0.12'
   $env:MAVEN_OPTS = "-Duser.home=$env:USERPROFILE"
   .\mvnw.cmd spring-boot:run
3. Zaženi frontend: `cd frontend`, `npm install`, nato `npm start`. Odpri `http://localhost:3000`.