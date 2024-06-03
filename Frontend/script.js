// JavaScript wird erst ausgeführt, wenn das gesamte HTML-Dokument vollständig geladen wurde 
document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('Kleidungsform');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Holt Werte aus den Eingabefeldern des Formulars
        let bild = document.getElementById('bild').value;
        let kategorie = document.getElementById('kategorie').value;
        let beschreibung = document.getElementById('beschreibung').value;
        let size = document.getElementById('size').value;
        let price = document.getElementById('price').value;

        // Erstellt ein Objekt für das neue gewünschte Kleidungsstück
        let kleidungsstueck = {
            bild: bild,
            kategorie: kategorie,
            beschreibung: beschreibung,
            size: size,
            price: price
        };

        // Gibt das neue Kleidungsstück-Objekt in der Konsole aus
        console.log('Neues Kleidungsstück:', kleidungsstueck);

        // Holt die bestehende Kleidungsstück-Liste aus dem LocalStorage
        let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};
        if (!kleidung[kategorie]) {
            kleidung[kategorie] = [];
        }

        // Fügt das neue Kleidungsstück der passenden Kategorie hinzu
        kleidung[kategorie].push(kleidungsstueck);
        // Speichert die aktualisierte Kleidungsstück-Liste zurück im LocalStorage
        localStorage.setItem('kleidung', JSON.stringify(kleidung));

        // Gibt die aktualisierte Kleiderschrank-Liste in der Konsole aus
        console.log('Aktualisierter Kleiderschrank:', kleidung);

        // Setzt das Formular zurück
        form.reset();
    });
})
