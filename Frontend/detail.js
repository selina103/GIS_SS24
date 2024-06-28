document.addEventListener('DOMContentLoaded', async () => {
    // Holt die URL-Parameter der aktuellen Seite
    let params = new URLSearchParams(window.location.search);
    let id = params.get('id');  // Stellt sicher, dass die ID aus der URL extrahiert wird

    try {
        // Sendet eine GET-Anfrage an das Backend, um das Kleidungsstück mit der gegebenen ID abzurufen
        let response = await fetch(`http://localhost:3006/kleidungsstueck/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            let item = await response.json();  // Parst die JSON-Antwort

            // Gibt das ausgewählte Kleidungsstück in der Konsole aus
            console.log('Ausgewähltes Kleidungsstück:', item);

            // Holt das DIV-Element mit der ID 'KleidungsDetails'
            let kleidungsDetails = document.getElementById('KleidungsDetails');
            // Setzt den Dokumenttitel und den Headertext auf die Beschreibung des Kleidungsstücks
            document.title = item.beschreibung;
            let header = document.querySelector('h1');
            header.textContent = item.beschreibung;

            // Setzt den HTML-Inhalt des DIV-Elements mit den Details des Kleidungsstücks
            kleidungsDetails.innerHTML = `
                <img src="${item.bild}" alt="${item.beschreibung}" style="width: 200px; height: 200px;">
                <p><strong>Kategorie:</strong> ${item.kategorie}</p>
                <p><strong>Größe:</strong> ${item.size}</p>
                <p><strong>Preis:</strong> €${item.price}</p>
                <button class="delete-btn">Löschen</button>
            `;

            // Fügt einen Event-Listener zum Löschen-Button hinzu
            document.querySelector('.delete-btn').addEventListener('click', async () => {
                if (confirm('Möchten Sie dieses Kleidungsstück wirklich löschen?')) {
                    try {
                        let deleteResponse = await fetch(`http://localhost:3006/kleidungsstueck/${id}`, {
                            method: 'DELETE',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        });

                        if (deleteResponse.ok) {
                            alert('Kleidungsstück erfolgreich gelöscht');
                            // Leitet zurück zur Kategorie-Seite weiter
                            window.location.href = `Kategorien/${item.kategorie}.html`;
                        } else {
                            console.error('Fehler beim Löschen des Kleidungsstücks');
                        }
                    } catch (error) {
                        console.error('Fehler beim Senden der Anfrage:', error);
                    }
                }
            });
        } else {
            console.error('Fehler beim Abrufen des Kleidungsstücks');
        }
    } catch (error) {
        console.error('Fehler beim Senden der Anfrage:', error);
    }
});
