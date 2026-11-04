# Aplikacija Potovanja

Aplikacija za planiranje potovanj ali drugih dogodkov. Cilja na pregleden in simplističen nadzor nad prihajajočimi in preteklimi dogodki.

## Uporabljene tehnologije

### Aplikacija uporablja Spring Boot REST API, PostgreSQL in HTML vmesnik, ki ga streže Express.

- Java 21
- Spring Boot 4.1.1
- Spring Web MVC
- Spring Data JPA
- PostgreSQL 17
- PostgreSQL JDBC driver
- Maven 3.10.0
- Maven Wrapper 3.3.4.
- Node.js 18
- Express 5.3.0
- Springdoc OpenAPI 3.1.0
- HTML, CSS in JavaScript

## Struktura projekta
```text
Projekt/
├── .gitignore
├── README.md
├── docker-compose.yml
├── backend/              <------------------------------------- korenska backend mapa
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   ├── .mvn/wrapper/
│   │   └── maven-wrapper.properties
│   └── src/             <-------------------------------------- glavna mapa kode
│       ├── main/
│       │   ├── java/si/feri/um/app/
│       │   │   ├── Aplikacija.java
│       │   │   ├── OpenApiNastavitve.java
│       │   │   ├── kontroler/
│       │   │   │   └── PotovanjeKontroler.java
│       │   │   ├── model/
│       │   │   │   └── Potovanje.java
│       │   │   ├── repozitorij/
│       │   │   │   └── PotovanjeRepozitorij.java
│       │   │   └── storitev/
│       │   │       ├── PotovanjeNiBiloNajdenoIzjema.java
│       │   │       └── PotovanjeStoritev.java
│       │   └── resources/
│       │       └── application.properties
│       └── test/
│           └── java/si/feri/um/app/
│               └── TestiAplikacije.java
└── frontend/             <------------------------------------- korenska mapa frontenda
    ├── package-lock.json
    ├── package.json
    ├── server.js
    └── public/
        ├── index.html
        ├── styles.css
        └── js/                    <---------------------------- logika frontenda
            ├── app.js
            ├── api/               <---------------------------- API-ji
            │   └── trips-api.js
            ├── calendar/          <---------------------------- koledar
            │   └── calendar.js
            ├── trips/             <---------------------------- prikaz in filtri potovanj
            │   ├── filters.js
            │   ├── form.js
            │   └── list.js
            └── utils/
                └── date-utils.js
```

## Navodila za nameščanje in zagon

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

## Navodila za razvijalce


## Standardi kodiranja
