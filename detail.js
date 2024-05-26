document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);
    let kategorie = params.get('kategorie');
    let id = params.get('id');

    console.log('Kategorie:', kategorie, 'ID:', id);

    let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};
    let item = kleidung[kategorie] ? kleidung[kategorie][id] : null;

    if (item) {
        console.log('Ausgewähltes Kleidungsstück:', item);

        let kleidungsDetails = document.getElementById('KleidungsDetails');
        document.title = item.beschreibung;  // Setzt den Seitentitel auf die Beschreibung des Kleidungsstücks
        let header = document.querySelector('h1');  // Annahme: das <h1>-Element ist der Titel auf der Seite
        header.textContent = item.beschreibung;  // Setzt den Titel auf die Beschreibung des Kleidungsstücks

        kleidungsDetails.innerHTML = `
            <img src="${item.bild}" alt="${item.beschreibung}" style="width: 200px; height: 200px;">
            <p><strong>Kategorie:</strong> ${item.kategorie}</p>
            <p><strong>Größe:</strong> ${item.size}</p>
            <p><strong>Preis:</strong> €${item.price}</p>
        `;

        document.querySelector('.delete-btn').addEventListener('click', () => {
            // Hier wird die Lösch-Logik hinzugefügt
            if (confirm('Möchten Sie dieses Kleidungsstück wirklich löschen?')) {
                kleidung[kategorie].splice(id, 1); // Entfernt das ausgewählte Kleidungsstück
                localStorage.setItem('kleidung', JSON.stringify(kleidung)); // Aktualisiert den lokalen Speicher
                window.location.href = `${kategorie}.html`; // Leitet zur Kategorieseite zurück
            }
        });
    } else {
        console.error('Kleidungsstück nicht gefunden.');
    }
});
