document.addEventListener('DOMContentLoaded', () => {
    // Holt die URL-Parameter der aktuellen Seite
    let params = new URLSearchParams(window.location.search);
    // Extrahiert den 'kategorie' und 'id' Parameter aus der URL
    let kategorie = params.get('kategorie');
    let id = params.get('id');

    // Gibt die aktuelle Kategorie und ID in der Konsole aus.
    console.log('Kategorie:', kategorie, 'ID:', id);

    // Holt die bestehende Kleidungsstück-Liste aus dem LocalStorage
    let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};
    // Holt das Kleidungsstück anhand der Kategorie und ID. Falls nicht vorhanden, wird null zurückgegeben
    let item = kleidung[kategorie] ? kleidung[kategorie][id] : null;

    // Falls das Kleidungsstück existiert, zeigt es die Details an
    if (item) {
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
        `;

        // Fügt einen Event-Listener zum Löschen-Button hinzu
        document.querySelector('.delete-btn').addEventListener('click', () => {
            if (confirm('Möchten Sie dieses Kleidungsstück wirklich löschen?')) {
                // Entfernt das Kleidungsstück aus der Kategorie
                kleidung[kategorie].splice(id, 1); 
                // Speichert die aktualisierte Kleidungsstück-Liste im LocalStorage
                localStorage.setItem('kleidung', JSON.stringify(kleidung)); 
                // Leitet zur Kategorieseite weiter
                window.location.href = `${kategorie}.html`; 
            }
        });
        // Falls das Kleidungsstück nicht gefunden wird, gibt eine Fehlermeldung in der Konsole aus
    } else {
        console.error('Kleidungsstück nicht gefunden.');
    }
});
