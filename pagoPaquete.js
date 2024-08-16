document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([-38.4161, -63.6167], 5);
    
    // Capa de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    var originMarker, destinationMarker, routeLine;

    function geocodeAddress(address, callback) {
        fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const latLng = [data[0].lat, data[0].lon];
                    callback(latLng);
                } else {
                    alert("No se encontraron resultados para la dirección proporcionada.");
                }
            })
            .catch(error => {
                console.error("Error en la geocodificación:", error);
            });
    }

    function calcularRuta(latLngOrigen, latLngDestino) {
        const url = `https://router.project-osrm.org/route/v1/driving/${latLngOrigen[1]},${latLngOrigen[0]};${latLngDestino[1]},${latLngDestino[0]}?geometries=geojson&overview=full`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (routeLine) map.removeLayer(routeLine);

                // Trazar la ruta real basada en la respuesta de OSRM
                const routeCoordinates = data.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
                routeLine = L.polyline(routeCoordinates, { color: 'blue' }).addTo(map);
                map.fitBounds(routeLine.getBounds());
            })
            .catch(error => {
                console.error("Error al calcular la ruta:", error);
            });
    }

    document.getElementById("mostrar-mapa").addEventListener("click", function() {
        const calle1 = document.getElementById("calle1").value;
        const calle2 = document.getElementById("calle2").value;
        const altura = document.getElementById("altura").value;
        const barrio = document.getElementById("barrio").value;
        const direccionOrigen = `${calle1} ${calle2} ${altura} ${barrio}`;
        
        const calle3 = document.getElementById("calle3").value;
        const calle4 = document.getElementById("calle4").value;
        const altura1 = document.getElementById("altura1").value;
        const barrio1 = document.getElementById("barrio1").value;
        const direccionDestino = `${calle3} ${calle4} ${altura1} ${barrio1}`;

        geocodeAddress(direccionOrigen, function(latLngOrigen) {
            if (originMarker) map.removeLayer(originMarker);
            originMarker = L.marker(latLngOrigen).addTo(map).bindPopup('Origen: ' + direccionOrigen).openPopup();
            map.setView(latLngOrigen, 10);
            
            geocodeAddress(direccionDestino, function(latLngDestino) {
                if (destinationMarker) map.removeLayer(destinationMarker);
                destinationMarker = L.marker(latLngDestino).addTo(map).bindPopup('Destino: ' + direccionDestino).openPopup();

                // Calcular la ruta real entre origen y destino
                calcularRuta(latLngOrigen, latLngDestino);
            });
        });
    });
});
