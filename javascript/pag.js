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

document.addEventListener('contextmenu', function(event) {
    event.preventDefault(); // Deshabilita el clic derecho
});


document.addEventListener('keydown', function(event) {
    // Detecta Ctrl + P o Cmd + P (impresión)
    if ((event.ctrlKey || event.metaKey) && event.key === 'p') {
        event.preventDefault(); // Previene la acción de imprimir
        showModalCapture(); // Muestra el modal de advertencia
    }

    // Detectar botón de impresión en Windows (Print Screen)
    if (event.key === 'PrintScreen') {
        event.preventDefault(); // Previene la captura de pantalla
        showModalCapture(); // Muestra el modal de advertencia
    }

    // Aunque no puedes prevenir Windows + Shift + S, puedes dar un mensaje general
    if ((event.key === 's' || event.key === 'S') && event.shiftKey && event.metaKey) {
        // Esto solo detectará Shift+Meta (tecla de Windows) + S, pero no podrás bloquearlo
        showModalCapture(); // Muestra el modal
    }
});

// Función para mostrar el modal de advertencia
function showModalCapture() {
    const modal = document.getElementById("captureModal");
    modal.style.display = "block"; // Mostrar modal

    // Cerrar modal después de 3 segundos automáticamente
    setTimeout(function() {
        modal.style.display = "none";
    }, 3000);
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

