import { digimons } from './data.js';

(() => {
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back');
  const list = document.querySelector('.slider__list');
  let currentIndex = 0;

  // Gera cards dinamicamente
  const createCard = ({ name, cost, hp, element, background, image, types, skills }) => {
    const li = document.createElement('li');
    li.className = `card ${background}`;

    li.innerHTML = `
      <div class="card__top">
        <div class="card__cost">${cost}</div>
        <div class="card__element"><img class="menor" src="src/assets/images/${element}.png" alt="${element}"/></div>
        <div class="card__hp">HP ${hp}</div>
        <h2 class="card__name">${name}</h2>
      </div>
      <div class="card__image">
        <img class="menor" src="src/assets/images/${image}" alt="${name}" />
      </div>
      <div class="card__details">
        <div class="card__types">${types.map(t => `<span>${t}</span>`).join('')}</div>
        <ul class="card__skills">
          ${skills
            .map(
              s => `<li><span>${s.icons
                .map(ic => `<img class="menor" src=\"src/assets/images/${ic}.png\" alt=\"${ic}\"/>`)
                .join('')}</span><strong>${s.name}</strong><em>${s.power}</em></li>`
            )
            .join('')}
        </ul>
      </div>
    `;

    return li;
  };

  // Inserir no DOM
  digimons.forEach(d => list.appendChild(createCard(d)));
  const cards = [...list.children];

  const update = () => {
    cards.forEach((c, i) => c.classList.toggle('is-active', i === currentIndex));
  };

  btnNext.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    update();
  });

  btnBack.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    update();
  });

  // inicializa
  update();
})();