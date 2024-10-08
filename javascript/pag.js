let slideIndex = 0;
const slides = document.querySelectorAll('.gallery-item');

function showSlides(n) {
    if (n >= slides.length) { slideIndex = 0; }
    if (n < 0) { slideIndex = slides.length - 1; }

    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${-slideIndex * 100}%)`;
        slide.style.opacity = index === slideIndex ? '1' : '0.7';
    });
}
// Prevenir la descarga de imágenes en la galería y mostrar modal
document.querySelectorAll('.gallery-item img').forEach(img => {
    // Prevenir menú contextual (clic derecho)
    img.addEventListener('contextmenu', function(event) {
        event.preventDefault();
        showModal();
    });

    // Prevenir arrastrar imágenes
    img.setAttribute('draggable', false);
});

// Función para mostrar el modal
function showModal() {
    const modal = document.getElementById("customModal");
    const closeBtn = document.querySelector(".close");

    modal.style.display = "block"; // Mostrar modal

    // Cerrar modal cuando se haga clic en la "X"
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    // Cerrar modal si se hace clic fuera del contenido del modal
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
}

// Prevenir el uso del teclado para descargar imágenes (Ctrl + S, Ctrl + U, etc.)
document.addEventListener('keydown', function(event) {
    if (event.ctrlKey && (event.key === 's' || event.key === 'u' || event.key === 'Shift')) {
        event.preventDefault(); // Prevenir teclas
        showModal(); // Mostrar modal
    }
});

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex--;
    showSlides(slideIndex);
});



document.querySelector('.next').addEventListener('click', () => {
    slideIndex++;
    showSlides(slideIndex);
});

// Iniciar la galería en el primer slide
showSlides(slideIndex);

