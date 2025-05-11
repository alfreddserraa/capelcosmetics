document.addEventListener('DOMContentLoaded', function() {
  
  // Slider Functionality
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
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('active');
    });
  }

  if (closeMenu && mobileMenu) {
    closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
    });
  }

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

  // Inicialización del slider
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
  if (leftArrow) {
    leftArrow.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + dots.length) % dots.length;
      updateSlider();
    });
  }

  if (rightArrow) {
    rightArrow.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % dots.length;
      updateSlider();
    });
  }

  // Establecer la primera imagen de fondo inmediatamente (sin animación)
  const heroSection = document.querySelector('.hero');
  if (heroSection) {
    // Aplicar directamente al estilo inicial
    heroSection.style.backgroundImage = `url('${slideContent[0].background}')`;
    
    // Después de un breve retraso, actualizar el slider para asegurarse de que todo está en su lugar
    setTimeout(() => {
      updateSlider();
    }, 100);
  }

  // CORRECCIÓN: Manejo del modal de contacto
  // Primero comprobamos si el modal ya existe en la página
  let contactModal = document.getElementById('contactModal');
  
  // Si no existe, lo creamos y añadimos al body
  if (!contactModal) {
    const modalHTML = `
    <div class="modal-overlay" id="contactModal">
      <div class="modal-container">
        <div class="modal-image">
          <img src="https://multimedia.infojobs.net/api/v1/tenants/c7e2b9c1-8480-43b0-ad9e-000c17aa2cbb/domains/718302b6-5343-43d3-a8a3-829dc3da0893/buckets/6f3ab1cc-5920-4f4e-b131-46a4587a0e1f/images/59/591fd4ef-c095-4e2d-b641-be47c167112f?jwt=eyJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE1ODI4ODI2NTgsInJxcyI6IkdFVFxcL3RlbmFudHMvYzdlMmI5YzEtODQ4MC00M2IwLWFkOWUtMDAwYzE3YWEyY2JiL2RvbWFpbnMvNzE4MzAyYjYtNTM0My00M2QzLWE4YTMtODI5ZGMzZGEwODkzL2J1Y2tldHMvNmYzYWIxY2MtNTkyMC00ZjRlLWIxMzEtNDZhNDU4N2EwZTFmL2ltYWdlcy81OS81OTFmZDRlZi1jMDk1LTRlMmQtYjY0MS1iZTQ3YzE2NzExMmYiLCJtZXRhZGF0YSI6eyJydWxlIjp7InZlcnNpb24iOiIyMDE2LTEwIiwiYWN0aW9ucyI6W119fX0.GLzn5E-ITNEBGXURGBEoo7PPT-TP3SwMrHONzvVDHDqFA0cp4tOl01aqMZOzZ7ymr6SiJRC6XV5EP0VeUNznFxnYnwyJnQJ8khIEBQZBhfIu3KqlAa1Fz35V8l4hPkWfJa7mvstWpQiGEjsqlrMsRTHWQoI6UnNNORt_KjCFlI5gFHSd7ZXLWcsykS_vaSg_E8cooy353jKHHdlxJBaUvXKuu2oI3aU2KFUmpvXDdXKJYZaZXtTwagZMOfR9ivdDKLBimMB6aupjHAAlb0HHlBEm7Qdagji4iBUFjXsS4j_8C6Vz6PR2NzqF7wZYl8VN8JVNxPj_H14E5iGihryxxw&AccessKeyId=d724d9a53d95a810" alt="Capel Cosmetics">
        </div>
        <div class="modal-content">
          <button class="modal-close" id="closeModal">✕</button>
          <h2 class="modal-title">Escríbenos si tienes cualquier duda o necesitas información</h2>
          <p class="modal-subtitle">Acerca de nuestros productos o servicios a info@capelcosmetics.com</p>
          
          <form id="contactForm">
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Nombre completo*" required>
            </div>
            
            <div class="form-group">
              <input type="email" class="form-control" placeholder="Correo electrónico*" required>
            </div>
            
            <div class="form-group">
              <div class="form-select">
                <select class="form-control">
                  <option value="" disabled selected>Consulta sobre un producto</option>
                  <option value="cosmeticos">Cosméticos</option>
                  <option value="capilar">Cosmética Capilar</option>
                  <option value="perfumeria">Productos de perfumería</option>
                  <option value="higiene">Productos de higiene corporal</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <input type="text" class="form-control" placeholder="Empresa">
            </div>
            
            <div class="form-group">
              <input type="text" class="form-control" placeholder="País / Estado">
            </div>
            
            <div class="form-group">
              <textarea class="form-control form-textarea" placeholder="Escribe tu mensaje"></textarea>
            </div>
            
            <div class="form-checkbox">
              <input type="checkbox" id="privacyPolicy" required>
              <label for="privacyPolicy">He leído la política de cookies y acepto la <a href="#" class="privacy-link">Política de privacidad</a></label>
            </div>
            
            <button type="submit" class="form-submit">Enviar</button>
          </form>
        </div>
      </div>
    </div>
    `;
    
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Actualizamos la referencia al modal
    contactModal = document.getElementById('contactModal');
  }
  
  // Configuramos los controladores de eventos para el modal
  const closeModalBtn = document.getElementById('closeModal');
  const contactForm = document.getElementById('contactForm');

  // Función para abrir el modal
  function openModal(e) {
    e.preventDefault();
    if (contactModal) {
      contactModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    }
  }
  
  // Función para cerrar el modal
  function closeModal() {
    if (contactModal) {
      contactModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
  }
  
  // Asignamos los eventos al botón de cerrar y al clic fuera del modal
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  if (contactModal) {
    contactModal.addEventListener('click', function(e) {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }
  
  // Asignamos el manejo del formulario
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
      closeModal();
    });
  }
  
  // Agregamos los event listeners a los enlaces de contacto
  // Enlaces específicos con texto "Contacta"
  const contactLinks = document.querySelectorAll('a');
  contactLinks.forEach(link => {
    if (link.textContent.trim() === 'Contacta' || link.textContent.trim() === 'Contacto') {
      link.addEventListener('click', openModal);
    }
  });
  
  // Botón CTA con texto "Contactar"
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    if (button.textContent.trim() === 'Contactar') {
      button.addEventListener('click', openModal);
    }
  });

  // Para asegurarnos de que también funcione con cualquier otro formulario existente
  const oldForm = document.getElementById('formulario');
  if (oldForm) {
    oldForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
    });
  }
});