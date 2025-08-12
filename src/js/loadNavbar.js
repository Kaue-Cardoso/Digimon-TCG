document.addEventListener('DOMContentLoaded', async function () {
  await loadNavbar();
});

async function loadNavbar() {
  try {
    const response = await fetch('navbar.html');
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const navbarHtml = await response.text();
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
      navbarPlaceholder.innerHTML = navbarHtml;

      initHamburgerMenu();
      initScrollEffect(); 
    } else {
      console.error('Elemento #navbar-placeholder não encontrado no DOM.');
    }

  } catch (error) {
    console.error('Erro ao carregar a navbar:', error);
  }
}
function initScrollEffect() {
  const nav = document.querySelector('nav');
  const navSolidClass = 'nav-solid';

  function handleScroll() {
    if (window.scrollY > 50) {
      nav.classList.add(navSolidClass);
    } else {
      nav.classList.remove(navSolidClass);
    }
  }

  window.addEventListener('scroll', handleScroll);
  window.addEventListener('resize', handleScroll);
}

function initHamburgerMenu() {
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const nav = document.querySelector('nav');
  const navSolidClass = 'nav-solid';

  if (hamburger && navLinks && nav) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      if (navLinks.classList.contains('active')) {
        nav.classList.add(navSolidClass);
      } else {
        
        if (window.scrollY <= 50) {
          nav.classList.remove(navSolidClass);
        }
      }
    });
  } else {
    console.warn("Elementos da navegação não encontrados.");
  }
}