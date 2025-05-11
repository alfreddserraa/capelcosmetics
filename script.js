document.getElementById('formulario')?.addEventListener('submit', function (e) {
  e.preventDefault(); // evita que la página se recargue al enviar
  alert('Gracias por tu mensaje. Te contactaremos pronto.');
});  

// Define el contenido para cada slide, ahora con imágenes de fondo personalizadas
const slideContent = [
{
    title: "EMPRESA",
    subtitle: "CONOCE NUESTRA HISTORIA",
    background: "https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
},
{
    title: "SERVICIOS",
    subtitle: "SOLUCIONES PERSONALIZADAS",
    background: "https://images.unsplash.com/photo-1608248597279-f99d160beba3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
},
{
    title: "PRODUCTOS",
    subtitle: "CALIDAD Y EFICACIA",
    background: "https://images.unsplash.com/photo-1595535373192-fc8935bacd89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
},
{
    title: "NOVEDADES",
    subtitle: "MANTÉNGASE INFORMADO",
    background: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80"
}
];

// Precarga de imágenes para el slider
function preloadImages() {
    slideContent.forEach(slide => {
        const img = new Image();
        img.src = slide.background;
    });
}

// Mobile Menu Toggle
document.querySelector('.hamburger')?.addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.add('active');
});

document.querySelector('.close-menu')?.addEventListener('click', function() {
    document.querySelector('.mobile-menu').classList.remove('active');
});

// Mobile Submenu Toggle
const submenuToggles = document.querySelectorAll('.submenu-toggle');

submenuToggles.forEach(toggle => {
    toggle.addEventListener('click', function() {
        const submenu = this.nextElementSibling;
        submenu.classList.toggle('active');
        this.textContent = submenu.classList.contains('active') ? '−' : '+';
    });
});

// Hero Slider
let currentSlide = 0; 

function updateSlider() {
    const dots = document.querySelectorAll('.slider-dot');
    const heroTitle = document.querySelector('.hero-content h1');
    const heroSubtitle = document.querySelector('.hero-content p');
    const heroSection = document.querySelector('.hero');
    
    if (!heroSection || !heroTitle || !heroSubtitle) return;

    // Actualiza qué punto está activo
    dots.forEach((dot, index) => {
        if (index === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });

    // Actualiza el contenido basado en el slide actual
    heroTitle.textContent = slideContent[currentSlide].title;
    heroSubtitle.textContent = slideContent[currentSlide].subtitle;

    // Añade un efecto de desvanecimiento
    heroSection.style.opacity = "0";
    
    setTimeout(() => {
        // Actualiza la imagen de fondo con la imagen personalizada para este slide
        heroSection.style.backgroundImage = `url('${slideContent[currentSlide].background}')`;
        heroSection.style.opacity = "1";
    }, 300);
}

// Ejecutar cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    // Precargar las imágenes
    preloadImages();
    
    const dots = document.querySelectorAll('.slider-dot');
    const leftArrow = document.querySelector('.slider-arrow.left');
    const rightArrow = document.querySelector('.slider-arrow.right');
    
    // Añade eventos click a los puntos del slider
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlider();
        });
    });

    // Navegación con flechas
    leftArrow?.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + dots.length) % dots.length;
        updateSlider();
    });

    rightArrow?.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % dots.length;
        updateSlider();
    });

    // Establecer la primera imagen de fondo inmediatamente (sin animación)
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        // Aplicar directamente al estilo inicial
        heroSection.style.backgroundImage = `url('${slideContent[0].background}')`;
    }

    // Después de un breve retraso, actualizar el slider para asegurarse de que todo está en su lugar
    setTimeout(() => {
        updateSlider();
    }, 100);
    
    // Opcional: autoplay para el slider
    // setInterval(() => {
    //   currentSlide = (currentSlide + 1) % dots.length;
    //   updateSlider();
    // }, 5000); // Cambia de slide cada 5 segundos
});