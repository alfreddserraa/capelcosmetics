document.getElementById('formulario')?.addEventListener('submit', function (e) {
  e.preventDefault(); // evita que la página se recargue al enviar
  alert('Gracias por tu mensaje. Te contactaremos pronto.');
});  

// Define el contenido para cada slide
const slideContent = [
{
    title: "EMPRESA",
    subtitle: "CONOCE NUESTRA HISTORIA"
},
{
    title: "SERVICIOS",
    subtitle: "SOLUCIONES PERSONALIZADAS"
},
{
    title: "PRODUCTOS",
    subtitle: "CALIDAD Y EFICACIA"
},
{
    title: "NOVEDADES",
    subtitle: "MANTÉNGASE INFORMADO"
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
dots.forEach((dot, index) => {
    if (index === currentSlide) {
        dot.classList.add('active');
    } else {
        dot.classList.remove('active');
    }
});

// Update content based on current slide
heroTitle.textContent = slideContent[currentSlide].title;
heroSubtitle.textContent = slideContent[currentSlide].subtitle;

// Update the background image
const heroSection = document.querySelector('.hero');
heroSection.style.backgroundImage = `url('https://via.placeholder.com/1920x900?text=Slide+${currentSlide + 1}')`;
}

dots.forEach((dot, index) => {
dot.addEventListener('click', () => {
    currentSlide = index;
    updateSlider();
});
});

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
});