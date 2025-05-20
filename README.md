# 🧰 Jobbörse Plattform – Fullstack-Anwendung

Eine moderne Webanwendung zur Veröffentlichung und Suche von Stellenangeboten. Die Plattform bietet sowohl für Arbeitgeber als auch für Bewerber eine intuitive Oberfläche zum Verwalten von Jobs und Bewerbungen.

## 🚀 Projektübersicht

Diese Plattform ermöglicht:

- 🧑‍💼 Arbeitgeber können Stellenanzeigen erstellen, verwalten und Bewerbungen prüfen.
- 👨‍💻 Bewerber können sich registrieren, nach Jobs suchen und sich direkt bewerben.
- 📩 Ein eingebautes Nachrichtensystem erlaubt die Kommunikation zwischen Arbeitgeber und Bewerber.
- ⭐ Favoriten-Funktion für Jobs
- 🔔 Echtzeit-Benachrichtigungen
- 💬 Live-Chat-Funktion mit Emojis und "Gelesen"-Status

## 🛠️ Verwendete Technologien

### Frontend:
- ✅ HTML5, CSS3, JavaScript
- ✅ Bootstrap 5 für Responsive UI
- ✅ FontAwesome für Icons
- ✅ AJAX für dynamische Interaktionen ohne Seiten-Reload

### Backend:
- ✅ PHP (OOP + MVC-Architektur)
- ✅ MySQL für Datenhaltung
- ✅ Native Sessions für Authentifizierung
- ✅ Custom Router + Controller-System

## 📂 Projektstruktur

```bash
job-portal/
│
├── public/               # Öffentliche Dateien (CSS, JS, Bilder, index.php, Authentifizierung)
├── app/
│   ├── controllers/      # Alle Controller-Dateien
│   ├── models/           # Datenbankmodelle (Job, User, Application, Message, Notification, etc.)
│   ├── views/            # PHP-Ansichten (Frontend und Adminbereich)
│   └── core/             # Router, Datenbankverbindung, BaseController
│
├── uploads/              # Hochgeladene Lebensläufe (CVs)
├── .htaccess             # URL-Rewriting
└── README.md             # Diese Datei
```

## ⚙️ Installation & Lokaler Start

### Voraussetzungen:
- PHP ≥ 8.0
- MySQL
- Apache/Nginx oder lokal mit [MAMP](https://www.mamp.info/)
- Git

### Setup-Schritte:

1. **Projekt klonen:**
   ```bash
   git clone https://github.com/almarzouk/jobs.git
   cd jobs
   ```

2. **Datenbank einrichten:**
   - Öffne `database.sql` und importiere sie über phpMyAdmin oder CLI in MySQL.

3. **Konfiguration anpassen:**
   - In `app/core/Database.php` die Zugangsdaten zu deiner Datenbank eintragen.

4. **Starte den lokalen Server (z. B. mit MAMP):**
   - Stelle sicher, dass dein Root-Verzeichnis auf `/job-portal/public` zeigt.
   - Öffne im Browser: [http://localhost:8888](http://localhost:8888)

## 🔑 Admin Zugangsdaten (Demo)

```bash
E-Mail: admin@example.com
Passwort: admin123
```

## 📌 Funktionen im Überblick

### ✅ Für Besucher:
- Jobangebote durchsuchen
- Filter nach Ort, Kategorie, Art
- Registrieren & Bewerben

### ✅ Für Bewerber:
- Profil bearbeiten + CV hochladen
- Bewerbungshistorie einsehen
- Nachrichten mit Arbeitgebern

### ✅ Für Admins:
- Stellenanzeigen verwalten (CRUD)
- Bewerbungen einsehen & Status ändern
- Nutzerverwaltung
- Nachrichtenzentrale

## 📸 Screenshots

| Startseite | Jobdetails | Admin-Dashboard |
|------------|------------|------------------|
| ![Start](./screenshots/start.png) | ![Job](./screenshots/job.png) | ![Admin](./screenshots/admin.png) |

> Du kannst eigene Screenshots im Ordner `screenshots/` hinzufügen und oben verlinken.

## 🤝 Mitwirken

Wenn du zum Projekt beitragen möchtest:

1. Forke das Repository
2. Erstelle einen Branch: `git checkout -b feature/mein-feature`
3. Commit: `git commit -m "Feature hinzugefügt"`
4. Push: `git push origin feature/mein-feature`
5. Erstelle einen Pull Request

## 📄 Lizenz

Dieses Projekt steht unter der **MIT License**. Siehe `LICENSE.md` für weitere Informationen.

## 📫 Kontakt

Erstellt mit ❤️ von **[@almarzouk](https://github.com/almarzouk)**  
Fragen? Feedback? Schreib mir gerne über GitHub!
