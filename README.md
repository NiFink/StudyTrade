# StudyTrade SE3

## Beschreibung

Das Software-Entwicklungsprojekt StudyTrade ist eine Webanwendung ausschließlich für Studenten der Hochschule der Medien. Auf dieser können sie Profile erstellen und Produkte hochladen. Über die Homepage können die User daraufhin nach Produkten suchen und die verschiedenen Funktionen der Seite betrachten. Nach den Eigenschaften von Produkten kann auf der Produktseite gefiltert werden, um diese anschließend in der Produktübersicht anzuschauen.

## Inhaltsverzeichnis

1. [Installation](#installation)
2. [Verwendung](#verwendung)
3. [Tests](#tests)
4. [Autoren](#autoren)
5. [Versionsgeschichte](#versionsgeschichte)
6. [Zusätzliche Informationen](#zusätzliche-informationen)

## Installation

### Voraussetzungen

- Java 17 oder höher
- Ein aktueller Webbrowser

### Installationsanleitung

```bash
# Klone das Repository über HTTPS
git clone https://gitlab.mi.hdm-stuttgart.de/nk150/studytrade-se3.git

# Klone das Repository über SSH
git clone git@gitlab.mi.hdm-stuttgart.de:nk150/studytrade-se3.git

# Öffne das Projekt
cd studytrade-se3

# Installiere Abhängigkeiten für das Frontend
cd studytrade-frontend
npm install

# Installiere Abhängigkeiten für das Backend
cd ../studytrade-backend
mvn install

```

## Verwendung

```bash
# Baue Docker-Images und starte Container (http://localhost:3000/)
cd ..
docker-compose up

# Stoppe und entferne Docker-Container und -Images
docker-compose down --rmi all -v

# Starte die Frontend-Anwendung (http://localhost:3000/)
cd studytrade-frontend
npm start

# Starte die Backend-Anwendung (http://localhost:8080/swagger-ui/index.html#/)
cd ../studytrade-backend
mvn spring-boot:run
```

## Tests

### Anleitung zum Testen

```bash
# Führe Backend-Tests aus
cd studytrade-backend
mvn test

# Führe Frontend-Tests aus
cd ../studytrade-frontend
npm test
```

## Autoren

### Hauptautoren:

- Jan Sander (js485@hdm-stuttgart.de),
- Nils Fink (nf056@hdm-stuttgart.de),
- Lisa Kohls (lk210@hdm-stuttgart.de),
- Niklas Kieß (nk150@hdm-stuttgart.de),
- Ryan Röhrich (rr062@hdm-stuttgart.de),
- Jessica Schmidt (js496@hdm-stuttgart.de)

## Versionsgeschichte

### v1.0.0

- First release (siehe CHANGELOG.md)

## Zusätzliche Informationen

- Wiki
