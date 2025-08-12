function isElementBelowViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top > (window.innerHeight || document.documentElement.clientHeight);
}

function handleScrollAnimation() {
  const items = document.querySelectorAll('.animated-item');
  items.forEach(item => {
    const rect = item.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

   
    if (rect.top <= viewportHeight && !item.classList.contains('visible')) {
      item.classList.add('visible');
    }

   
    if (isElementBelowViewport(item)) {
      item.classList.remove('visible');
    }
  });
}

window.addEventListener('scroll', handleScrollAnimation);

window.addEventListener('load', handleScrollAnimation);