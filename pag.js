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
