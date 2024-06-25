const mongoose = require('mongoose');

// Verbindung zu MongoDB herstellen
mongoose.connect('mongodb://localhost:27017/kleiderschrank', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Verbindung zu MongoDB erfolgreich');
}).catch((err) => {
    console.error('Fehler beim Verbinden zu MongoDB:', err.message);
});

// Schema und Model für Kleidungsstücke definieren
const kleidungsstueckSchema = new mongoose.Schema({
    bild: String,
    kategorie: String,
    beschreibung: String,
    size: String,
    price: Number
});

const Kleidungsstueck = mongoose.model('Kleidungsstueck', kleidungsstueckSchema);

module.exports = Kleidungsstueck;

