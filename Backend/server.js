//const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

//const app = express();
const PORT = 3006;

app.use(bodyParser.json());

// Verbindung zur SQLite-Datenbank herstellen
const db = new sqlite3.Database('./myDatabase.db', (err) => {
    if (err) {
        console.error('Fehler beim Verbinden zur Datenbank:', err);
    } else {
        console.log('Verbunden mit der SQLite-Datenbank');
    }
});

// Tabelle für Kleidungsstücke erstellen, falls sie nicht existiert
db.run(`
    CREATE TABLE IF NOT EXISTS kleidungsstueck (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        bild TEXT,
        kategorie TEXT,
        beschreibung TEXT,
        size TEXT,
        price REAL
    )
`);

// Endpunkt zum Hinzufügen eines Kleidungsstücks
app.post('/data', (req, res) => {
    const { bild, kategorie, beschreibung, size, price } = req.body;
    const query = `
        INSERT INTO kleidungsstueck (bild, kategorie, beschreibung, size, price)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [bild, kategorie, beschreibung, size, price], function(err) {
        if (err) {
            console.error('Fehler beim Speichern des Kleidungsstücks:', err);
            res.status(500).send('Fehler beim Speichern des Kleidungsstücks');
        } else {
            res.status(200).send({ id: this.lastID, ...req.body });
        }
    });
});

// Statisches Hosting der HTML-Dateien
//app.use(express.static(path.join(__dirname, '../Frontend')));

// Route für den Root-Pfad
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});

// Endpunkt zum Abrufen eines einzelnen Kleidungsstücks basierend auf der ID
app.get('/data/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT * FROM kleidungsstueck WHERE id = ?`;
    db.get(query, [id], (err, row) => {
        if (err) {
            console.error('Fehler beim Abrufen des Kleidungsstücks:', err);
            res.status(500).send('Fehler beim Abrufen des Kleidungsstücks');
        } else {
            res.status(200).json(row);
        }
    });
});

// Endpunkt zum Löschen eines einzelnen Kleidungsstücks basierend auf der ID
app.delete('/data/:id', (req, res) => {
    const id = req.params.id;
    const query = `DELETE FROM kleidungsstueck WHERE id = ?`;
    db.run(query, [id], function(err) {
        if (err) {
            console.error('Fehler beim Löschen des Kleidungsstücks:', err);
            res.status(500).send('Fehler beim Löschen des Kleidungsstücks');
        } else {
            res.status(200).send(`Kleidungsstück mit ID ${id} erfolgreich gelöscht`);
        }
    });
});
