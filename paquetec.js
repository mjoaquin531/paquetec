document.addEventListener("DOMContentLoaded", function() {
    // la lista de urlss de imagenes que vamos a usar para decorar xq esta re feo sino
    const images = [
        'image1.jpg',
        'image2.jpg',
        'image3.jpg',
        'image4.jpg'
    ];

    const sections = document.querySelectorAll('section');

    sections.forEach(section => {
        const img = document.createElement('img');
        const randomImage = images[Math.floor(Math.random() * images.length)];
        img.src = randomImage;
        
        section.insertBefore(img, section.firstChild);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    const menuToggle = document.getElementById("menuToggle");
    const sideMenu = document.getElementById("sideMenu");

    menuToggle.addEventListener("click", function() {
        sideMenu.classList.toggle("open");
    });

    const searchButton = document.getElementById("searchButton");
    searchButton.addEventListener("click", function() {
        const searchInput = document.getElementById("searchInput").value;
        alert(`Buscando: ${searchInput}`);
    });
});
document.addEventListener("DOMContentLoaded", function() {
    //mapa de Leaflet
    var map = L.map('map').setView([-38.4161, -63.6167], 5); // coordenadas centrales de argentina

    //capa del mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // algunos ejemplo de puntos de despacho
    var point1 = L.marker([-34.6037, -58.3816]).addTo(map).bindPopup('buenos aires - punto de despacho');
    var point2 = L.marker([-31.4201, -64.1888]).addTo(map).bindPopup('cordoba - punto de despacho');
    var point3 = L.marker([-24.7821, -65.4232]).addTo(map).bindPopup('salta - punto de despacho');

    //lógica para permitir al usuario seleccionar puntos
    map.on('click', function(e) {
        var userMarker = L.marker(e.latlng).addTo(map);
        userMarker.bindPopup('Punto de despacho seleccionado: ' + e.latlng.toString()).openPopup();
    });
});
// funcion para geocodificar direcciones usando Nominatim (OpenStreetMap) esta para ver esto en detalle xq no se q onda
function geocodeAddress(address, callback) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const latLng = [data[0].lat, data[0].lon];
                callback(latLng);
            } else {
                alert("No se encontraron resultados para la direccion proporcionada.");
            }
        })
        .catch(error => {
            console.error("Error en la geocodificacion:", error);
        });
}
document.addEventListener("DOMContentLoaded", function() {
    var originMarker, destinationMarker;

    const form = document.querySelector('#detalles-paquete form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const origen = document.getElementById("direccion-origen").value;
        const destino = document.getElementById("direccion-destino").value;

        //geocodifico la direccion de origen
        geocodeAddress(origen, function(latLng) {
            if (originMarker) {
                map.removeLayer(originMarker); // remuevo el marcador anterior si existe
            }
            originMarker = L.marker(latLng).addTo(map).bindPopup('Origen: ' + origen).openPopup();
            map.setView(latLng, 10); // centro el mapa en el origen
        });

        //geocodifico la direccion de destino
        geocodeAddress(destino, function(latLng) {
            if (destinationMarker) {
                map.removeLayer(destinationMarker); //remuevo el marcador anterior si existe
            }
            destinationMarker = L.marker(latLng).addTo(map).bindPopup('Destino: ' + destino).openPopup();
        });
    });
});
//hay que agregar, la chance de borrar marcadores (no se hacerlo maga mandale vos ), un buscador de direcciones mas especifico capaz
//