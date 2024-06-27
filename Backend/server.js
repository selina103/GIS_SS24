const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3006;

// Middleware
app.use(bodyParser.json());
app.use(express.static('Frontend')); // Statisches Verzeichnis für Frontend-Dateien

// Datenbank initialisieren
const db = new sqlite3.Database('./myDatabase.db', (err) => {
    if (err) {
        console.error('Fehler beim Öffnen der Datenbank:', err.message);
    } else {
        console.log('Verbunden mit der SQLite-Datenbank');
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
    const { bild, kategorie, beschreibung, size, price } = req.body;
    const query = `INSERT INTO kleidungsstueck (bild, kategorie, beschreibung, size, price) VALUES (?, ?, ?, ?, ?)`;
    db.run(query, [bild, kategorie, beschreibung, size, price], function(err) {
        if (err) {
            console.error('Fehler beim Hinzufügen des Kleidungsstücks:', err.message);
            res.status(500).send('Fehler beim Hinzufügen des Kleidungsstücks');
        } else {
            res.status(201).json({ id: this.lastID });
        }
    });
});

// Endpunkt zum Abrufen aller Kleidungsstücke oder nach Kategorie
app.get('/kleidungsstueck', (req, res) => {
    const { kategorie } = req.query;
    let query = 'SELECT * FROM kleidungsstueck';
    let params = [];

    if (kategorie) {
        query += ' WHERE kategorie = ?';
        params.push(kategorie);
    }

    db.all(query, params, (err, rows) => {
        if (err) {
            console.error('Fehler beim Abrufen der Kleidungsstücke:', err.message);
            res.status(500).send('Fehler beim Abrufen der Kleidungsstücke');
        } else {
            res.json(rows);
        }
    });
});

// Endpunkt zum Abrufen eines einzelnen Kleidungsstücks nach ID
app.get('/kleidungsstueck/:id', (req, res) => {
    const { id } = req.params;
    const query = 'SELECT * FROM kleidungsstueck WHERE id = ?';
    
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Fehler beim Abrufen des Kleidungsstücks:', err.message);
            res.status(500).send('Fehler beim Abrufen des Kleidungsstücks');
        } else if (!row) {
            res.status(404).send('Kleidungsstück nicht gefunden');
        } else {
            res.json(row);
        }
    });
});

// Endpunkt zum Löschen eines Kleidungsstücks nach ID
app.delete('/kleidungsstueck/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM kleidungsstueck WHERE id = ?';
    
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Fehler beim Löschen des Kleidungsstücks:', err.message);
            res.status(500).send('Fehler beim Löschen des Kleidungsstücks');
        } else if (this.changes === 0) {
            res.status(404).send('Kleidungsstück nicht gefunden');
        } else {
            res.status(200).send('Kleidungsstück erfolgreich gelöscht');
        }
    });
});

// Server starten
app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
