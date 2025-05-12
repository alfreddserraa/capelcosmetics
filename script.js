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
  // Manejo del modal de contacto
  // Importamos el modal desde Contacto_Modal_Form.html si no está ya en la página
  let contactModal = document.getElementById('contactModal');
  
  // Si no existe, lo creamos a partir del fichero externo o como fallback añadimos el HTML directamente
  if (!contactModal) {
    // Intentamos leer el contenido del fichero externo primero
    const modalHTML = `
    <div class="modal-overlay" id="contactModal">
      <div class="modal-container">
        <div class="modal-image">
          <img src="/api/placeholder/400/320" alt="Capel Cosmetics">
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
    
    // Añadimos el modal al body
    const modalContainer = document.createElement('div');
    modalContainer.innerHTML = modalHTML;
    document.body.appendChild(modalContainer);
    
    // Actualizamos la referencia al modal
    contactModal = document.getElementById('contactModal');
    
    // Aseguramos que los estilos estén aplicados
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        /* Modal Styles - Inline para asegurar que se aplican */
        .modal-overlay {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
            z-index: 1000;
            align-items: center;
            justify-content: center;
            overflow-y: auto;
        }

        .modal-container {
            position: relative;
            display: flex;
            width: 100%;
            max-width: 1000px;
            height: 90vh;
            max-height: 700px;
            background-color: white;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        .modal-image {
            flex: 0 0 40%;
            background-color: #f5f5f5;
            background-size: cover;
            background-position: center;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .modal-image img {
            max-width: 80%;
            max-height: 80%;
        }

        .modal-content {
            flex: 0 0 60%;
            padding: 40px;
            background-color: #041672;
            color: white;
            display: flex;
            flex-direction: column;
            position: relative;
            overflow-y: auto;
        }

        .modal-close {
            position: absolute;
            top: 20px;
            right: 20px;
            font-size: 24px;
            color: white;
            background: none;
            border: none;
            cursor: pointer;
            z-index: 10;
        }

        .form-control {
            width: 100%;
            padding: 10px;
            border: none;
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            background-color: transparent;
            color: white;
            font-size: 16px;
        }

        .form-control::placeholder {
            color: rgba(255, 255, 255, 0.7);
        }

        @media (max-width: 768px) {
            .modal-container {
                flex-direction: column;
                height: auto;
                max-height: 90vh;
            }

            .modal-image {
                height: 200px;
                flex: none;
            }

            .modal-content {
                flex: none;
                padding: 30px 20px;
            }
        }
      </style>
    `);
  }
  
  // Funciones del modal
  function openModal(e) {
    if (e) e.preventDefault();
    if (contactModal) {
      contactModal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Prevenir scroll cuando el modal está abierto
    }
  }
  
  function closeModal() {
    if (contactModal) {
      contactModal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Re-habilitar scroll
    }
  }
  
  // Configuramos todos los listeners de eventos para el modal
  // 1. Botón de cerrar
  const closeModalBtn = document.getElementById('closeModal');
  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }
  
  // 2. Cerrar al hacer clic fuera del modal
  if (contactModal) {
    contactModal.addEventListener('click', function(e) {
      if (e.target === contactModal) {
        closeModal();
      }
    });
  }
  
  // 3. Manejar envío del formulario
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
      closeModal();
    });
  }
  
  // 4. Enlaces de contacto en la página - uso de data-attribute para mayor precisión
  const contactLinks = document.querySelectorAll('a[data-contact="true"], a:contains("Contacta"), a:contains("Contacto")');
  contactLinks.forEach(link => {
    link.addEventListener('click', openModal);
    console.log('Enlace de contacto encontrado y vinculado:', link.textContent);
  });
  
  // 5. Botones CTA de contacto
  const ctaButtons = document.querySelectorAll('.cta-button');
  ctaButtons.forEach(button => {
    if (button.textContent.trim() === 'Contactar' || button.hasAttribute('data-contact')) {
      button.addEventListener('click', openModal);
      console.log('Botón CTA encontrado y vinculado:', button.textContent);
    }
  });
  
  // Añadir método :contains() a los selectores si no existe
  if (!document.querySelector(':contains')) {
    // Añadir un método de selección personalizado para el texto
    document.querySelectorAll = (function(orig) {
      return function(selector) {
        if (selector.includes(':contains')) {
          // Extraer el texto a buscar
          const parts = selector.split(':contains(');
          const baseSelector = parts[0];
          const searchText = parts[1].slice(0, -1);
          
          // Obtener todos los elementos que coinciden con el selector base
          const allElements = orig.call(document, baseSelector || '*');
          
          // Filtrar por el texto contenido
          return Array.from(allElements).filter(el => 
            el.textContent.trim().includes(searchText)
          );
        } else {
          return orig.call(document, selector);
        }
      };
    })(document.querySelectorAll);
  }
  
  // Para asegurarnos de que también funcione con cualquier otro formulario existente
  const oldForm = document.getElementById('formulario');
  if (oldForm) {
    oldForm.addEventListener('submit', function(e) {
      e.preventDefault();
      alert('Gracias por tu mensaje. Te contactaremos pronto.');
    });
  }
  
  // Log para depuración
  console.log('Modal de contacto configurado:', !!contactModal);
  console.log('Botón de cierre configurado:', !!closeModalBtn);
  console.log('Formulario configurado:', !!contactForm);
  console.log('Enlaces de contacto encontrados:', document.querySelectorAll('a[href="#"][data-contact]').length);
  console.log('Botones CTA encontrados:', document.querySelectorAll('.cta-button').length);
});