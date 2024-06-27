const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const PORT = 3001; // Ändern der Portnummer hier

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../Frontend'))); // Statische Dateien aus dem Frontend-Verzeichnis bedienen

// Route für die Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

// Route für Kategorien (Beispiel: Hosen, Jacken, Pullover, etc.)
app.get('/kategorien/:kategorie', (req, res) => {
    res.sendFile(path.join(__dirname, `../Frontend/Kategorien/${req.params.kategorie}.html`));
});


mongoose.connect('mongodb+srv://selakie:<sesek8+TBSML>@clustergis.nmf5k87.mongodb.net/?retryWrites=true&w=majority&appName=ClusterGIS', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const kleidungsstueckSchema = new mongoose.Schema({
    bild: String,
    kategorie: String,
    beschreibung: String,
    size: String,
    price: Number,
});

const Kleidungsstueck = mongoose.model('Kleidungsstueck', kleidungsstueckSchema);

app.post('/data', async (req, res) => {
    try {
        const kleidungsstueck = new Kleidungsstueck(req.body);
        await kleidungsstueck.save();
        res.status(200).send('Kleidungsstück erfolgreich gespeichert');
    } catch (error) {
        res.status(500).send('Fehler beim Speichern des Kleidungsstückes');
    }
});

// Route für die Startseite
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
