document.getElementById('formulario').addEventListener('submit', function (e) {
    e.preventDefault(); // evita que la página se recargue al enviar
    alert('Gracias por tu mensaje. Te contactaremos pronto.');
  });  

// JavaScript para manejar la navegación del contenido
document.addEventListener('DOMContentLoaded', function() {
  // Links de navegación principal
  const empresaLink = document.getElementById('empresaLink');
  const homeLink = document.getElementById('homeLink');
  const mobileEmpresaLink = document.getElementById('mobileEmpresaLink');
  
  // Secciones de página
  const homePage = document.getElementById('homePage');
  const empresaPage = document.getElementById('empresaPage');
  
  // Content navigation
  const contentLinks = document.querySelectorAll('.content-link');
  const submenuItems = document.querySelectorAll('.submenu-item');
  const mobileSubmenuItems = document.querySelectorAll('.mobile-submenu-item');
  
  // Función para mostrar la página de empresa
  function showEmpresaPage() {
      homePage.classList.remove('active');
      empresaPage.classList.add('active');
      
      // También podríamos actualizar las clases de los links para mostrar cuál está activo
      empresaLink.classList.add('active');
  }
  
  // Función para mostrar la página de inicio
  function showHomePage() {
      empresaPage.classList.remove('active');
      homePage.classList.add('active');
      
      // Remover clase activa de los links
      empresaLink.classList.remove('active');
  }
  
  // Manejar clicks en el link de Empresa
  if (empresaLink) {
      empresaLink.addEventListener('click', function(e) {
          e.preventDefault();
          showEmpresaPage();
      });
  }
  
  // Manejar clicks en el link de Empresa en versión móvil
  if (mobileEmpresaLink) {
      mobileEmpresaLink.addEventListener('click', function(e) {
          e.preventDefault();
          showEmpresaPage();
          
          // Opcional: cerrar menú móvil después de navegar
          document.querySelector('.mobile-menu').classList.remove('active');
      });
  }
  
  // Manejar clicks en el logo (volver a home)
  if (homeLink) {
      homeLink.addEventListener('click', function(e) {
          e.preventDefault();
          showHomePage();
      });
  }
  
  // Manejar clicks en los elementos del submenú
  submenuItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetSubmenu = this.getAttribute('data-submenu');
          
          // Primero ir a la página de empresa
          showEmpresaPage();
          
          // Luego mostrar el contenido específico
          showSubmenuContent(targetSubmenu);
      });
  });
  
  // Manejar clicks en los elementos del submenú móvil
  mobileSubmenuItems.forEach(item => {
      item.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetSubmenu = this.getAttribute('data-submenu');
          
          // Primero ir a la página de empresa
          showEmpresaPage();
          
          // Luego mostrar el contenido específico
          showSubmenuContent(targetSubmenu);
          
          // Cerrar menú móvil
          document.querySelector('.mobile-menu').classList.remove('active');
      });
  });
  
  // Función para mostrar el contenido específico del submenú
  function showSubmenuContent(contentId) {
      // Primero ocultar todos los contenidos
      const allContents = document.querySelectorAll('.empresa-content');
      allContents.forEach(content => content.classList.remove('active'));
      
      // Mostrar el contenido solicitado
      const targetContent = document.getElementById(contentId);
      if (targetContent) {
          targetContent.classList.add('active');
      }
      
      // Actualizar la navegación de contenido
      contentLinks.forEach(link => {
          if (link.getAttribute('data-content') === contentId) {
              link.classList.add('active');
          } else {
              link.classList.remove('active');
          }
      });
  }
  
  // Manejar la navegación del content-nav
  contentLinks.forEach(link => {
      link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Eliminar clase activa de todos los links
          contentLinks.forEach(el => el.classList.remove('active'));
          
          // Añadir clase activa al link actual
          this.classList.add('active');
          
          // Mostrar el contenido correspondiente
          const contentId = this.getAttribute('data-content');
          showSubmenuContent(contentId);
      });
  });
  
  // Mobile menu toggle
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeMenu = document.querySelector('.close-menu');
  
  hamburger.addEventListener('click', function() {
      mobileMenu.classList.add('active');
  });
  
  closeMenu.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
  });
  
  // Submenu toggles
  const submenuToggles = document.querySelectorAll('.submenu-toggle');
  
  submenuToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
          const submenu = this.nextElementSibling;
          submenu.classList.toggle('active');
          this.textContent = submenu.classList.contains('active') ? '-' : '+';
      });
  });
});