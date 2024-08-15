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
