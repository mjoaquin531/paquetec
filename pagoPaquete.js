document.addEventListener("DOMContentLoaded", function() {
    // Inicializar el mapa centrado en Argentina
    var map = L.map('map').setView([-38.4161, -63.6167], 5);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Marcadores de origen y destino
    var originMarker, destinationMarker;

    // Geocodificación
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

    // Manejo del formulario
    document.getElementById("form-envio").addEventListener("submit", function(event) {
        event.preventDefault();

        const origen = document.getElementById("direccion-origen").value;
        const destino = document.getElementById("direccion-destino").value;
        const esPrioritario = document.getElementById("prioritario").checked;
        
        // Precio dinámico (ejemplo básico)
        let precio = calcularPrecio();
        if (esPrioritario) {
            precio *= 1.1; // Aumentar el precio en un 10% si es prioritario
        }
        document.getElementById("precio").textContent = precio.toFixed(2);

        // Geocodificar y agregar marcadores en el mapa
        geocodeAddress(origen, function(latLng) {
            if (originMarker) map.removeLayer(originMarker);
            originMarker = L.marker(latLng).addTo(map).bindPopup('Origen: ' + origen).openPopup();
            map.setView(latLng, 10);
        });

        geocodeAddress(destino, function(latLng) {
            if (destinationMarker) map.removeLayer(destinationMarker);
            destinationMarker = L.marker(latLng).addTo(map).bindPopup('Destino: ' + destino).openPopup();
        });
    });

    // Función para calcular el precio del envío
    function calcularPrecio() {
        const ancho = parseFloat(document.getElementById("ancho").value);
        const alto = parseFloat(document.getElementById("alto").value);
        const profundidad = parseFloat(document.getElementById("profundidad").value);
        const peso = parseFloat(document.getElementById("peso").value);

        return (ancho * alto * profundidad) * peso * 0.001; // Cálculo simplificado
    }
});
