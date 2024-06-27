const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3006;

app.use(bodyParser.json());

let kleidung = [];

app.post('/kleidungsstueck', (req, res) => {
    console.log('Empfangene Daten:', req.body);
    const { bild, kategorie, beschreibung, size, price } = req.body;

    if (!bild || !kategorie || !beschreibung || !size || !price) {
        return res.status(400).send('Alle Felder sind erforderlich');
    }

    kleidung.push({ bild, kategorie, beschreibung, size, price });
    res.status(201).send('Daten erfolgreich gespeichert');
});

app.listen(port, () => {
    console.log(`Server läuft auf http://localhost:${port}`);
});
