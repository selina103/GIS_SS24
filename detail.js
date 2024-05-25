document.addEventListener('DOMContentLoaded', () => {
    let params = new URLSearchParams(window.location.search);
    let kategorie = params.get('kategorie');
    let id = params.get('id');

    console.log('Kategorie:', kategorie, 'ID:', id);

    let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};
    let item = kleidung[kategorie][id];

    console.log('Ausgewähltes Kleidungsstück:', item);

    let kleidungsDetails = document.getElementById('KleidungsDetails');
    kleidungsDetails.innerHTML = `
        <img src="${item.bild}" alt="${item.beschreibung}" style="width: 200px; height: 200px;">
        <h2>${item.beschreibung}</h2>
        <p><strong>Kategorie:</strong> ${item.kategorie}</p>
        <p><strong>Größe:</strong> ${item.size}</p>
        <p><strong>Preis:</strong> €${item.price}</p>
    `;
});
