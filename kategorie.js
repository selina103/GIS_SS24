document.addEventListener('DOMContentLoaded', () => {
    let kleidungsListe = document.getElementById('KleidungsListe');
    let pathname = window.location.pathname;
    let kategorie = pathname.split('/').pop().split('.')[0];

    console.log('Aktuelle Kategorie:', kategorie);

    let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};
    console.log('Geladene Kleidungsstücke:', kleidung);

    let items = kleidung[kategorie] || [];
    console.log('Kleidungsstücke in der Kategorie:', items);

    items.forEach((item, index) => {
        let listItem = document.createElement('li');
        listItem.innerHTML = `<a href="../detail.html?kategorie=${kategorie}&id=${index}">${item.beschreibung}</a>`;
        kleidungsListe.appendChild(listItem);
    });
});
