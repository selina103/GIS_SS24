// Wartet, bis das DOM vollständig geladen ist, bevor der folgende Code ausgeführt wird
document.addEventListener('DOMContentLoaded', () => {

    // Holt das Formular-Element mit der ID 'Kleidungsform'
    let form = document.getElementById('Kleidungsform');

    // Fügt einen 'submit' Event-Listener zum Formular hinzu
    form.addEventListener('submit', async (e) => {
        // Verhindert das Standardverhalten des Formulars (Seitenneuladen)
        e.preventDefault();

        // Holt die Werte der Eingabefelder aus dem Formular
        let bild = document.getElementById('bild').value;
        let kategorie = document.getElementById('kategorie').value;
        let beschreibung = document.getElementById('beschreibung').value;
        let size = document.getElementById('size').value;
        let price = document.getElementById('price').value;

        // Erstellt ein Objekt mit den gesammelten Werten
        let kleidungsstueck = {
            bild: bild,
            kategorie: kategorie,
            beschreibung: beschreibung,
            size: size,
            price: price
        };

        // Versucht, das Kleidungsstück an den Server zu senden
        try {
            let response = await fetch('http://localhost:3006/kleidungsstueck', {
                method: 'POST', // Verwendet die POST-Methode
                headers: {
                    'Content-Type': 'application/json' // Setzt den Content-Type Header auf JSON
                },
                body: JSON.stringify(kleidungsstueck) // Konvertiert das Objekt in einen JSON-String und sendet es als Anfrage-Body
            });

            // Überprüft, ob die Antwort des Servers erfolgreich war
            if (response.ok) {
                let result = await response.json(); // Wartet auf die JSON-Antwort vom Server
                console.log('Kleidungsstück erfolgreich gespeichert:', result); // Loggt die erfolgreiche Speicherung
                form.reset(); // Setzt das Formular zurück
                loadKleidungsstuecke(); // Lädt die Kleidungsstücke nach dem Hinzufügen neu
            } else {
                console.error('Fehler beim Speichern des Kleidungsstückes'); // Loggt einen Fehler, falls die Antwort nicht erfolgreich war
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage:', error); // Loggt einen Fehler, falls die Anfrage fehlschlägt
        }
    });

    // Asynchrone Funktion zum Laden der Kleidungsstücke
    async function loadKleidungsstuecke() {
        try {
            let response = await fetch('http://localhost:3006/kleidungsstueck'); // Sendet eine GET-Anfrage an den Server
            if (response.ok) {
                let kleidungsstuecke = await response.json(); // Wartet auf die JSON-Antwort vom Server
                displayKleidungsstuecke(kleidungsstuecke); // Zeigt die Kleidungsstücke an
            } else {
                console.error('Fehler beim Abrufen der Kleidungsstücke'); // Loggt einen Fehler, falls die Antwort nicht erfolgreich war
            }
        } catch (error) {
            console.error('Fehler beim Senden der Anfrage:', error); // Loggt einen Fehler, falls die Anfrage fehlschlägt
        }
    }

    // Funktion zur Anzeige der Kleidungsstücke im DOM
    function displayKleidungsstuecke(kleidungsstuecke) {
        // Holt das Element mit der ID 'kleidungsListe'
        let kleidungsListe = document.getElementById('kleidungsListe');
        kleidungsListe.innerHTML = ''; // Setzt den innerHTML-Inhalt des Elements zurück

        // Durchläuft jedes Kleidungsstück und fügt es der Liste hinzu
        kleidungsstuecke.forEach(kleidungsstueck => {
            let kleidungsItem = document.createElement('div'); // Erstellt ein neues 'div'-Element
            // Setzt den HTML-Inhalt des 'div'-Elements mit den Details des Kleidungsstücks
            kleidungsItem.innerHTML = `
                <img src="${kleidungsstueck.bild}" alt="Bild" style="width: 100px; height: 100px;">
                <p>Kategorie: ${kleidungsstueck.kategorie}</p>
                <p>Beschreibung: ${kleidungsstueck.beschreibung}</p>
                <p>Größe: ${kleidungsstueck.size}</p>
                <p>Preis: ${kleidungsstueck.price}</p>
            `;
            // Fügt das 'div'-Element der Kleidungsstück-Liste hinzu
            kleidungsListe.appendChild(kleidungsItem);
        });
    }

    // Lädt die Kleidungsstücke, wenn die Seite geladen wird
    loadKleidungsstuecke();
});
