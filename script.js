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

// Mobile Menu Toggle
document.querySelector('.hamburger').addEventListener('click', function() {
document.querySelector('.mobile-menu').classList.add('active');
});

document.querySelector('.close-menu').addEventListener('click', function() {
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
const dots = document.querySelectorAll('.slider-dot');
const leftArrow = document.querySelector('.slider-arrow.left');
const rightArrow = document.querySelector('.slider-arrow.right');
const heroTitle = document.querySelector('.hero-content h1');
const heroSubtitle = document.querySelector('.hero-content p');

// Cambiar a slide 0 (EMPRESA) para empezar, en lugar de 3 (NOVEDADES)
let currentSlide = 0; 

function updateSlider() {
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

// Actualiza la imagen de fondo con la imagen personalizada para este slide
const heroSection = document.querySelector('.hero');
heroSection.style.backgroundImage = `url('${slideContent[currentSlide].background}')`;
}

// Añade eventos click a los puntos del slider
dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
});
});

// Navegación con flechas
leftArrow.addEventListener('click', () => {
currentSlide = (currentSlide - 1 + dots.length) % dots.length;
updateSlider();
});

rightArrow.addEventListener('click', () => {
currentSlide = (currentSlide + 1) % dots.length;
updateSlider();
});

// Ejecutar updateSlider() cuando el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
// Actualizar slider inmediatamente
updateSlider();

// Opcionalmente, puedes añadir un autoplay para el slider
// setInterval(() => {
//   currentSlide = (currentSlide + 1) % dots.length;
//   updateSlider();
// }, 5000); // Cambia de slide cada 5 segundos
});