document.addEventListener('DOMContentLoaded', () => {
    // Holt das UL-Element mit der ID 'KleidungsListe'
    let kleidungsListe = document.getElementById('KleidungsListe');
    // Holt den Pfadnamen der aktuellen URL
    let pathname = window.location.pathname;
    // Extrahiert den Kategorienamen aus dem Pfadnamen 
    let kategorie = pathname.split('/').pop().split('.')[0];

    // Gibt die aktuelle Kategorie in der Konsole aus
    console.log('Aktuelle Kategorie:', kategorie);

    // Holt die bestehende Kleidungsstück-Liste aus dem LocalStorage
    let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};

    // Gibt die geladene Kleidungsstück-Liste in der Konsole aus
    console.log('Geladene Kleidungsstücke:', kleidung);

    // Holt die Kleidungsstücke der aktuellen Kategorie
    let items = kleidung[kategorie] || [];
    // Gibt die Kleidungsstücke der aktuellen Kategorie in der Konsole aus
    console.log('Kleidungsstücke in der Kategorie:', items);

    // Durchläuft jedes Kleidungsstück in der aktuellen Kategorie
    items.forEach((item, index) => {
        // Erstellt ein neues LI-Element.
        let listItem = document.createElement('li');
        // Setzt den HTML-Inhalt des LI-Elements mit einem Link zu den Details
        listItem.innerHTML = `<a href="../detail.html?kategorie=${kategorie}&id=${index}">${item.beschreibung}</a>`;
        // Fügt das LI-Element der Kleidungsstück-Liste (UL) hinzu
        kleidungsListe.appendChild(listItem);
    });
});
