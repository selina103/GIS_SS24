document.addEventListener('DOMContentLoaded', () => {
    let form = document.getElementById('Kleidungsform');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let bild = document.getElementById('bild').value;
        let kategorie = document.getElementById('kategorie').value;
        let beschreibung = document.getElementById('beschreibung').value;
        let size = document.getElementById('size').value;
        let price = document.getElementById('price').value;

        let kleidungsstueck = {
            bild: bild,
            kategorie: kategorie,
            beschreibung: beschreibung,
            size: size,
            price: price
        };

        console.log('Neues Kleidungsstück:', kleidungsstueck);

        let kleidung = JSON.parse(localStorage.getItem('kleidung')) || {};
        if (!kleidung[kategorie]) {
            kleidung[kategorie] = [];
        }
        kleidung[kategorie].push(kleidungsstueck);
        localStorage.setItem('kleidung', JSON.stringify(kleidung));

        console.log('Aktualisierter Kleiderschrank:', kleidung);

        form.reset();
    });
});

