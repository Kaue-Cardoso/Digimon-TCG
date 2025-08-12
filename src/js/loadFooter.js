document.addEventListener('DOMContentLoaded', async function () {
  await loadFooter();
});

async function loadFooter() {
  try {
    const response = await fetch('footer.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const navbarHtml = await response.text();
    const navbarPlaceholder = document.getElementById('footer-placeholder');

    if (navbarPlaceholder) {
      navbarPlaceholder.innerHTML = navbarHtml;
    } else {
      console.error('Elemento #navbar-placeholder não encontrado no DOM.');
    }

  } catch (error) {
    console.error('Erro ao carregar a navbar:', error);
  }
}
