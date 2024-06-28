const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3006;

// Middleware
app.use(bodyParser.json()); // Middleware zum Parsen von JSON-Anfragen
app.use(express.static('../Frontend')); // Statisches Verzeichnis für Frontend-Dateien

// Datenbank initialisieren
const db = new sqlite3.Database('./myDatabase.db', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message); // Fehlerbehandlung beim Öffnen der Datenbank
    } else {
        console.log('Verbunden mit der SQLite-Datenbank');
        // Tabelle für Kleidungsstücke erstellen, falls sie noch nicht existiert
        db.run(`CREATE TABLE IF NOT EXISTS kleidungsstueck (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            bild TEXT, 
            kategorie TEXT, 
            beschreibung TEXT, 
            size TEXT, 
            price REAL 
        )`);
    }
});

// Endpunkt zum Hinzufügen eines Kleidungsstücks
app.post('/kleidungsstueck', (req, res) => {
    // Extrahiert die Felder aus dem Anfrage-Body
    const { bild, kategorie, beschreibung, size, price } = req.body;
    // SQL-Abfrage zum Einfügen eines neuen Kleidungsstücks
    const query = `INSERT INTO kleidungsstueck (bild, kategorie, beschreibung, size, price) VALUES (?, ?, ?, ?, ?)`;
    // Führt die Abfrage aus
    db.run(query, [bild, kategorie, beschreibung, size, price], function(err) {
        if (err) {
            console.error('Fehler beim Hinzufügen des Kleidungsstücks:', err.message); // Fehlerbehandlung
            res.status(500).send('Fehler beim Hinzufügen des Kleidungsstücks');
        } else {
            res.status(201).json({ id: this.lastID }); // Sendet die ID des neu hinzugefügten Kleidungsstücks zurück
        }
    });
});

// Endpunkt zum Abrufen aller Kleidungsstücke oder nach Kategorie
app.get('/kleidungsstueck', (req, res) => {
    const { kategorie } = req.query; // Extrahiert die Kategorie aus den URL-Parametern
    let query = 'SELECT * FROM kleidungsstueck'; // Basis-SQL-Abfrage
    let params = []; // Parameter für die Abfrage

    if (kategorie) {
        // Wenn eine Kategorie angegeben wurde, filtert die Abfrage nach dieser Kategorie
        query += ' WHERE kategorie = ?';
        params.push(kategorie);
    }

    // Führt die Abfrage aus
    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Fehler beim Abrufen der Kleidungsstücke:', err.message); // Fehlerbehandlung
            res.status(500).send('Fehler beim Abrufen der Kleidungsstücke');
        } else {
            res.json(rows); // Sendet die abgerufenen Kleidungsstücke als JSON zurück
        }
    });
});

// Endpunkt zum Abrufen eines einzelnen Kleidungsstücks nach ID
app.get('/kleidungsstueck/:id', (req, res) => {
    const { id } = req.params; // Extrahiert die ID aus den URL-Parametern
    const query = 'SELECT * FROM kleidungsstueck WHERE id = ?'; // SQL-Abfrage zum Abrufen eines bestimmten Kleidungsstücks
    
    // Führt die Abfrage aus
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Fehler beim Abrufen des Kleidungsstücks:', err.message); // Fehlerbehandlung
            res.status(500).send('Fehler beim Abrufen des Kleidungsstücks');
        } else if (!row) {
            res.status(404).send('Kleidungsstück nicht gefunden'); // Fehlermeldung, wenn das Kleidungsstück nicht gefunden wurde
        } else {
            res.json(row); // Sendet das gefundene Kleidungsstück als JSON zurück ins Fronted
        }
    });
});

// Endpunkt zum Löschen eines Kleidungsstücks nach ID
app.delete('/kleidungsstueck/:id', (req, res) => {
    const { id } = req.params; // Extrahiert die ID aus den URL-Parametern
    const query = 'DELETE FROM kleidungsstueck WHERE id = ?'; // SQL-Abfrage zum Löschen eines bestimmten Kleidungsstücks
    
    // Führt die Abfrage aus
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Fehler beim Löschen des Kleidungsstücks:', err.message); // Fehlerbehandlung
            res.status(500).send('Fehler beim Löschen des Kleidungsstücks');
        } else if (this.changes === 0) {
            res.status(404).send('Kleidungsstück nicht gefunden'); // Fehlermeldung, wenn das Kleidungsstück nicht gefunden wurde
        } else {
            res.status(200).send('Kleidungsstück erfolgreich gelöscht'); // Erfolgreiche Löschmeldung
        }
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`); // Konsolenausgabe, dass der Server läuft
});
