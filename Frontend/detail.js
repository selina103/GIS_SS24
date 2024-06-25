document.addEventListener('DOMContentLoaded', async () => {
    // Holt die URL-Parameter der aktuellen Seite
    let params = new URLSearchParams(window.location.search);
    // Extrahiert den 'kategorie' und 'id' Parameter aus der URL
    let kategorie = params.get('kategorie');
    let id = params.get('id');

    // Gibt die aktuelle Kategorie und ID in der Konsole aus.
    console.log('Kategorie:', kategorie, 'ID:', id);

    try {
        // Holt das Kleidungsstück anhand der Kategorie und ID vom Backend
        const response = await fetch(`http://localhost:3000/data?kategorie=${kategorie}&id=${id}`);
        if (!response.ok) {
            throw new Error('Netzwerkantwort war nicht ok');
        }
        const item = await response.json();

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
            <button class="delete-btn">Löschen</button>
        `;

        // Fügt einen Event-Listener zum Löschen-Button hinzu
        document.querySelector('.delete-btn').addEventListener('click', async () => {
            if (confirm('Möchten Sie dieses Kleidungsstück wirklich löschen?')) {
                try {
                    const deleteResponse = await fetch(`http://localhost:3000/data/${id}`, {
                        method: 'DELETE'
                    });

                    if (!deleteResponse.ok) {
                        throw new Error('Fehler beim Löschen des Kleidungsstücks');
                    }

                    // Leitet zur Kategorieseite weiter
                    window.location.href = `Kategorien/${kategorie}.html`; 
                } catch (error) {
                    console.error('Fehler beim Löschen des Kleidungsstücks:', error);
                }
            }
        });
    } else {
        console.error('Kleidungsstück nicht gefunden.');
    }
} catch (error) {
    console.error('Fehler beim Abrufen des Kleidungsstücks:', error);
}
});