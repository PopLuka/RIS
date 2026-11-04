# Aplikacija Potovanja

Aplikacija za planiranje potovanj ali drugih dogodkov. Cilja na pregleden in simplističen nadzor nad prihajajočimi in preteklimi dogodki.

## Kazalo vsebine

- [Uporabljene tehnologije](#uporabljene-tehnologije)
- [Struktura projekta](#struktura-projekta)
- [Navodila za nameščanje](#navodila-za-nameščanje)
- [Zagon projekta](#zagon-projekta)
- [Ustavitev projekta](#ustavitev-projekta)
- [Navodila za razvijalce](#navodila-za-razvijalce)
- [Standardi kodiranja](#standardi-kodiranja)

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

## Navodila za nameščanje

### Kaj je treba namestiti

Pred zagonom aplikacije namesti:

- **Git** — za prenos projekta z GitHuba.
- **JDK 21** — Maven Wrapper za backend potrebuje Javo 21.
- **Node.js 18 ali novejši** — skupaj z njim se namesti tudi `npm`.
- **Docker Desktop** — za zagon PostgreSQL podatkovne baze. Docker Desktop mora med delom aplikacije teči.

Namestitev preveri v PowerShellu:

```powershell
git --version
java -version
node --version
npm --version
docker --version
docker compose version
```
### Prenos projekta

```powershell
cd $HOME\Documents
git clone github.com/PopLuka/RIS
cd <Ime_repozitorija>
```
`<Ime_repozitorija>` zamenjaj z imenom nastale mape.

## Zagon projekta

### Zagon podatkovne baze
V korenski mapi najprej zaženi **PostgreSQL:**
```powershell
docker compose up -d postgres
```
Naslednji zagon pa:
```powershell
docker compose start postgres
```

Preveri, ali docker teče:
```powershell
docker compose ps
```
Docker Compose uporabi PostgreSQL 17 in ustvari podatkovno bazo potovanja. Privzeti uporabniški podatki so:
- uporabnik: `postgres`
- geslo: `postgres`
- naslov: `localhost:5432`
Podatki se hranijo v Dockerjevem trajnem volumnu `potovanja-postgres-data`.

### Zagon backend-a
V novem PowerShell terminalu se pomakni v mapo `backend`:
```PowerShell
cd <Pot_do_projekta>\backend
.\mwnw.cmd spring-boot:run
```
Maven Wrapper ob prvem zagonu prenese Maven in Java dependency-je. Ob zagonu deluje na: `http://localhost:8080`
Za dokumentacijo API-ja odpri: `http://localhost:8080/swagger-ui/index.html`

> Če backend ne zazna Jave 21, nastavi `JAVA_HOME` na mapo, kjer je nameščen JDK 21:
> ```powershell
> $env:JAVA_HOME = 'C:\pot\do\jdk-21'
> ```
> in ponovno zaženi backend.

### Zagon frontend-a
V novem PowerShell terminalu se pomakni v mapo `frontend`:
```PowerShell
cd <Pot_do_projekta>\frontend
npm ci
npm start
```
Frontend teče na naslovu: `http://localhost:3000` odpri ga v [brskalniku](http://localhost:3000).

## Ustavitev projekta
V terminalih, kjer tečeta frontend in backend pritisni `CTRL+C`, PostgreSQL pa s terminalom v korenski mapi pa ustavi z:
```powershell
docker compose stop postgres
```

## Navodila za razvijalce
Prispevki so dobrodošli. Predlagani postopek:

1. Kloniraj repozitorij in preveri, da se aplikacija zažene po navodilih v razdelku **Zagon projekta**.
2. Za spremembo ustvari svojo vejo:
   ```bash
   git switch -c opis-spremembe
3. Spremembe omeji na eno funkcionalnost ali popravek.
4. Preveri delovanje aplikacije in po potrebi dodaj ali posodobi teste.
5. Oddaj spremembe v pull request z opisom, kaj se je spremenilo in kako si preveril delovanje.  
  
Za preverjanje backend testov v mapi backend zaženi: `.\mvnw.cmd test`  
Frontend trenutno nima nastavljenega samodejnega ukaza za teste. Njegove spremembe preveri z zagonom aplikacije po navodilih za zagon.

## Standardi kodiranja
Pri novih spremembah upoštevaj slog, ki ga projekt že uporablja:
- **Java**: uporabljaj tabulatorje za zamik, imena paketov piši z malimi črkami, imena razredov z PascalCase, metode in spremenljivke pa z camelCase. Za injiciranje storitev uporabljaj konstruktorje.
- **Backend**: ohranjaj ločitev na kontrolerje, storitve, repozitorije in modele. Končne točke REST naj sledijo obstoječim vzorcem v PotovanjeKontroler.
- **JavaScript**: uporabljaj ES module, const kadar spremenljivke ne prepisuješ, camelCase, enojne narekovaje in podpičja. Asinhrone klice piši z `async`/`await`.
- **Frontend**: kodo organiziraj po namenu v obstoječe mape, na primer api/, calendar/, trips/ in utils/.
- **CSS**: pri barvah in skupnih slogovnih vrednostih uporabljaj obstoječe spremenljivke CSS v :root; odzivni slog dodajaj z medijskimi poizvedbami.
