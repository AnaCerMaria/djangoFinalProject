// // Accommodation data - you can replace this with an API or database call
// const accommodations = [
//         {
//             "name": "Hotel Le Meurice",
//             "latitude": 48.8656,
//             "longitude": 2.3266,
//             "address": "228 Rue de Rivoli, 75001 Paris, France",
//             "country": "France",
//             "price_per_night": 450.00
//         },
//         {
//             "name": "Hôtel Ritz Paris",
//             "latitude": 48.8686,
//             "longitude": 2.3295,
//             "address": "15 Place Vendôme, 75001 Paris, France",
//             "country": "France",
//             "price_per_night": 1200.00
//         },
//         {
//             "name": "Le Bristol Paris",
//             "latitude": 48.8704,
//             "longitude": 2.3125,
//             "address": "112 Rue du Faubourg Saint-Honoré, 75008 Paris, France",
//             "country": "France",
//             "price_per_night": 850.00
//         },
//         {
//             "name": "Hôtel Eiffel Blomet",
//             "latitude": 48.8418,
//             "longitude": 2.3052,
//             "address": "78 Rue Blomet, 75015 Paris, France",
//             "country": "France",
//             "price_per_night": 220.00
//         },
//         {
//             "name": "Hôtel La Comtesse",
//             "latitude": 48.8546,
//             "longitude": 2.3061,
//             "address": "29 Avenue de Tourville, 75007 Paris, France",
//             "country": "France",
//             "price_per_night": 320.00
//         },
//         {
//             "name": "Hôtel des Arts Montmartre",
//             "latitude": 48.8854,
//             "longitude": 2.3374,
//             "address": "5 Rue Tholozé, 75018 Paris, France",
//             "country": "France",
//             "price_per_night": 180.00
//         },
//         {
//             "name": "Hôtel le Relais Saint Germain",
//             "latitude": 48.8526,
//             "longitude": 2.3379,
//             "address": "9 Carrefour de l'Odéon, 75006 Paris, France",
//             "country": "France",
//             "price_per_night": 400.00
//         },
//         {
//             "name": "Hôtel Plaza Athénée",
//             "latitude": 48.8667,
//             "longitude": 2.3053,
//             "address": "25 Avenue Montaigne, 75008 Paris, France",
//             "country": "France",
//             "price_per_night": 1000.00
//         },
//         {
//             "name": "Hôtel The Hoxton",
//             "latitude": 48.8688,
//             "longitude": 2.3469,
//             "address": "30-32 Rue du Sentier, 75002 Paris, France",
//             "country": "France",
//             "price_per_night": 275.00
//         },
//         {
//             "name": "Maison Souquet",
//             "latitude": 48.8832,
//             "longitude": 2.3311,
//             "address": "10 Rue de Bruxelles, 75009 Paris, France",
//             "country": "France",
//             "price_per_night": 650.00
//         },
// // Add more accommodations here as needed
//     ]
// ;

// Preluăm datele locațiilor din baza de date prin variabila din Django
const locations = hotels | safe; // Assuming 'hotels_data' is a JSON object

// Funcția de inițializare a hărții
function initMap() {
    // Set initial map center and zoom level
    const mapCenter = { lat: 20.0, lng: 0.0 }; // Center of the world view
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 2,
        center: mapCenter,
    });

    // Add markers for each accommodation
    locations.forEach((hotel) => {
        const marker = new google.maps.Marker({
            map: map,
            position: { lat: hotel.latitude, lng: hotel.longitude },
            title: hotel.name,
        });

        // Add an info window to display accommodation details
        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${hotel.name}</h3>
                      <p><strong>Price per night:</strong> ${hotel.price_per_night}</p>
                      <p><strong>Country:</strong> ${hotel.country}</p>`,
        });

        // Show info window when the marker is clicked
        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });
}