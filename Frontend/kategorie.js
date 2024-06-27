document.addEventListener('DOMContentLoaded', async () => {
    // Holt das UL-Element mit der ID 'KleidungsListe'
    let kleidungsListe = document.getElementById('KleidungsListe');
    // Holt den Pfadnamen der aktuellen URL
    let pathname = window.location.pathname;
    // Extrahiert den Kategorienamen aus dem Pfadnamen
    let kategorie = pathname.split('/').pop().split('.')[0];

    // Gibt die aktuelle Kategorie in der Konsole aus
    console.log('Aktuelle Kategorie:', kategorie);

    try {
        // Holt die Kleidungsstück-Liste aus dem Backend
        const response = await fetch(`http://localhost:3006/kleidungsstueck?kategorie=${kategorie}`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const kleidung = await response.json();

        // Gibt die geladene Kleidungsstück-Liste in der Konsole aus
        console.log('Geladene Kleidungsstücke:', kleidung);

        // Überprüft, ob die Antwort ein Array ist
        if (!Array.isArray(kleidung)) {
            throw new Error('Erwartetes Array von Kleidungsstücken');
        }

        // Durchläuft jedes Kleidungsstück in der aktuellen Kategorie
        kleidung.forEach((item, index) => {
            // Erstellt ein neues LI-Element.
            let listItem = document.createElement('li');
            // Setzt den HTML-Inhalt des LI-Elements mit einem Link zu den Details
            listItem.innerHTML = `<a href="../detail.html?id=${item.id}">${item.beschreibung}</a>`;
            // Fügt das LI-Element der Kleidungsstück-Liste (UL) hinzu
            kleidungsListe.appendChild(listItem);
        });
    } catch (error) {
        console.error('Fehler beim Abrufen der Kleidungsstücke:', error);
    }
});
