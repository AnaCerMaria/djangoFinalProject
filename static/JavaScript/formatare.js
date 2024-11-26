document.addEventListener("DOMContentLoaded", function () {
    // Selectăm toate elementele de titlu care au clasa "article-title"
    const titles = document.querySelectorAll(".article-title");

    titles.forEach(title => {
        // Extragem textul titlului
        let text = title.textContent.trim();

        // Separăm textul în cuvinte
        let words = text.split(" ");

        // Transformăm doar primul cuvânt: prima literă la mare, restul literelor rămân neschimbate
        let formattedTitle = words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase();

        // Adăugăm restul cuvintelor fără a modifica literele lor
        if (words.length > 1) {
            formattedTitle += " " + words.slice(1).join(" ");
        }

        // Actualizăm textul titlului cu formatarea dorită
        title.textContent = formattedTitle;

    });
})
;

// Selectăm toate elementele cu clasa 'break-after-period'
const elements = document.querySelectorAll(".break-after-period");

elements.forEach(element => {
    // Luăm conținutul textului
    let text = element.innerHTML;

    // Înlocuim fiecare punct urmat de spațiu cu punct + <br>
    text = text.replace(/\. /g, '.<br>');

    // Înlocuim fiecare bullet (•) cu <br> + bullet pentru rând nou
    text = text.replace(/•/g, '<br>•');

    // Adăugăm un spațiu de aliniat înainte de elemente de tip a), b), c) etc.
    text = text.replace(/(\b[a-z]\)\s)/g, '&nbsp;&nbsp;&nbsp;&nbsp;$1');

    // Adăugăm un spațiu de aliniat pentru primul cuvânt din fiecare propoziție
    text = text.replace(/(^|\.<br>)\s*([A-Z])/g, '$1&nbsp;&nbsp;&nbsp;&nbsp;$2');

    // Actualizăm conținutul elementului
    element.innerHTML = text;
});

// document.getElementById("DOMContentLoaded", function initMap() {
//     // Inițializează harta centrată pe Paris
//     const map = new google.maps.Map(document.getElementById("map"), {
//         zoom: 13,
//         center: {lat: 48.8566, lng: 2.3522}, // Coordonate pentru Paris
//     });
//
//     // Informații locații hoteluri (nume, coordonate și tarife)
//     const locations = [
//         {
//             name: "Hotel Britannique",
//             position: {lat: 48.8566, lng: 2.3522},
//             price: "684 lei",
//             url: "https://www.booking.com/hotel/fr/britannique-paris.ro.html"
//         },
//         {
//             name: "Hotel du Louvre",
//             position: {lat: 48.8606, lng: 2.3376},
//             price: "791 lei",
//             url: "https://www.booking.com/hotel/fr/louvre-paris.ro.html"
//         },
//         // Adaugă alte locații după cum este necesar
//     ];
//
//     // Adaugă marcajele pe hartă
//     locations.forEach(location => {
//         const marker = new google.maps.Marker({
//             position: location.position,
//             map: map,
//             title: location.name
//         });
//
//         // Conținutul popup-ului pentru fiecare locație
//         const infoWindow = new google.maps.InfoWindow({
//             content: `<strong>${location.name}</strong><br>Preț: ${location.price}<br><a href="${location.url}" target="_blank">Rezervă acum</a>`
//         });
//
//         // Afișează popup-ul la click pe marcaj
//         marker.addListener("click", () => {
//             infoWindow.open(map, marker);
//         });
//     });
// });