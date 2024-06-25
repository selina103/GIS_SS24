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
            let response = await fetch('http://localhost:3000/data', {
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
            } else {
                console.error('Fehler beim Speichern des Kleidungsstückes');
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage:', error);
        }
    });
});
