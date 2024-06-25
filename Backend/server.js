const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Verbindung zur MongoDB herstellen
const mongoURI = 'mongodb+srv://selakie:sesek8+TBSML@digitalerkleiderschrank.yyu4wm4.mongodb.net/?retryWrites=true&w=majority&appName=digitalerKleiderschrank'; // Ersetzen Sie dies durch Ihren korrekten URI

mongoose.connect(mongoURI)
  .then(() => {
    console.log('Verbunden mit der MongoDB-Datenbank');
  })
  .catch((error) => {
    console.error('Verbindungsfehler:', error);
  });

// Schema und Modell
const kleidungsstueckSchema = new mongoose.Schema({
  bild: String,
  kategorie: String,
  beschreibung: String,
  size: String,
  price: Number,
});

const Kleidungsstueck = mongoose.model('Kleidungsstueck', kleidungsstueckSchema);

// Routen
app.post('/data', async (req, res) => {
  try {
    const kleidungsstueck = new Kleidungsstueck(req.body);
    await kleidungsstueck.save();
    res.status(201).send('Kleidungsstück erfolgreich gespeichert');
  } catch (error) {
    res.status(500).send('Fehler beim Speichern des Kleidungsstücks');
  }
});

// Server starten
app.listen(port, () => {
  console.log(`Server läuft auf http://localhost:${port}`);
});
