document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('Kleidungsform');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        let bild = document.getElementById('bild').value;
        let kategorie = document.getElementById('kategorie').value;
        let beschreibung = document.getElementById('beschreibung').value;
        let size = document.getElementById('size').value;
        let price = document.getElementById('price').value;

        let kleidungsstueck = {
            bild: bild,
            kategorie: kategorie,
            beschreibung: beschreibung,
            size: size,
            price: price
        };

        try {
            let response = await fetch('http://localhost:3006/kleidungsstueck', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(kleidungsstueck)
            });

            if (response.ok) {
                let result = await response.json();
                console.log('Kleidungsstück erfolgreich gespeichert:', result);
                form.reset();
                loadKleidungsstuecke(); // Laden Sie die Kleidungsstücke nach dem Hinzufügen neu
            } else {
                console.error('Fehler beim Speichern des Kleidungsstückes');
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage:', error);
        }
    });

    async function loadKleidungsstuecke() {
        try {
            let response = await fetch('http://localhost:3006/kleidungsstueck');
            if (response.ok) {
                let kleidungsstuecke = await response.json();
                displayKleidungsstuecke(kleidungsstuecke);
            } else {
                console.error('Fehler beim Abrufen der Kleidungsstücke');
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage:', error);
        }
    }

    function displayKleidungsstuecke(kleidungsstuecke) {
        let kleidungsListe = document.getElementById('kleidungsListe');
        kleidungsListe.innerHTML = '';

        kleidungsstuecke.forEach(kleidungsstueck => {
            let kleidungsItem = document.createElement('div');
            kleidungsItem.innerHTML = `
                <img src="${kleidungsstueck.bild}" alt="Bild" style="width: 100px; height: 100px;">
                <p>Kategorie: ${kleidungsstueck.kategorie}</p>
                <p>Beschreibung: ${kleidungsstueck.beschreibung}</p>
                <p>Größe: ${kleidungsstueck.size}</p>
                <p>Preis: ${kleidungsstueck.price}</p>
            `;
            kleidungsListe.appendChild(kleidungsItem);
        });
    }

    loadKleidungsstuecke(); // Laden Sie die Kleidungsstücke beim Laden der Seite
});
