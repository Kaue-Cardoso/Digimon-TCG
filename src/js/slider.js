import { digimons } from './data.js';

(() => {
  const btnNext = document.getElementById('btn-next');
  const btnBack = document.getElementById('btn-back');
  const list = document.querySelector('.slider__list');
  let currentIndex = 0;

  const createCard = async ({ name, cost, hp, element, background, skills }) => {
    const url = `https://digi-api.com/api/v1/digimon/${name}`;
    const response = await fetch(url);
    const digimon = await response.json();

    let fieldsHtml = '';
    if (digimon.name === 'Agumon') {
      fieldsHtml = digimon.fields
        ?.filter((_, index) => index !== 0 && index !== 4)
        .map(f => `<img src="${f.image}" alt="${f.field}" />`)
        .join('') || '';
    } else {
      fieldsHtml = digimon.fields
        ?.map(f => `<img src="${f.image}" alt="${f.field}" />`)
        .join('') || '';
    }


    const li = document.createElement('li');
    li.className = `card`;
    li.style.backgroundImage = `url('src/assets/images/${background}')`;

    li.innerHTML = `
    <div class="card__top">
      <div class="card__cost">${cost}</div>
      <div class="card__titles"> 
        <h2 class="card__name">${name}</h2>
        <div>${digimon.levels?.[0]?.level || 'N/A'}</div>
      </div>
      <h3 class="card__hp">HP: ${hp}</h3>
      <div class="card__element">
        <img src="src/assets/images/${digimon.attributes[0].attribute}.png" alt="${element}"/>
      </div>
    </div>

    <div class="card__image">
      <img src="src/assets/images/digi_${name}.png" alt="${name}" />
    </div>

    <div class="card__details">
      <div class="card__topics">
        <div class="card__attributes">
          ${digimon.attributes[0].attribute}
        </div>
        <div class="card__fields">
          ${fieldsHtml}
        </div>
        <div class="card__types">
          ${digimon.types?.[0]?.type || ''}
        </div>
      </div>

      <ul class="card__skills">
        ${skills.map(s => `
          <li class="skills">
            <div class="skills__tittle">
              <span>${s.icons.map(ic => `<img src="src/assets/images/${ic}.png" alt="${ic}" />`).join('')}</span>
              ${s.name}
            </div>
            <strong><em>${s.power}</em></strong>
          </li>
          <li class="card_description">${s.description}</li>
        `).join('')}
      </ul>
    </div>
  `;

    const card_hp = li.querySelector('.card__hp');
    const card_top = li.querySelector('.card__top');
    const card_topics = li.querySelector('.card__topics');

    const field = digimon.fields?.[0]?.field;
    console.log("Atributo do Digimon:", digimon.name, field);

    switch (field) {
      case "Deep Savers":
        if (digimon.name === 'Agumon') {
          card_hp.classList.add('roar');
          card_topics.style.borderColor = "rgb(227, 71, 24)";
        }
        else {
          card_hp.classList.add('deep');
          // card_top.style.borderColor = "blue";
          card_topics.style.borderColor = "rgb(24, 59, 174)";
        }

        break;
      case "Nightmare Soldiers":
        card_hp.style.borderColor = "rgb(23, 171, 80)";
        break;
      case "Dragon's Roar":
        card_hp.classList.add('roar');
        card_topics.style.borderColor = "rgb(227, 71, 24)";
        break;
      case "Nature Spirits":
        card_hp.classList.add('nature');
        card_topics.style.borderColor = "rgb(15, 149, 57)";
        break;
      case "Metal Empire":
        card_hp.classList.add('metal');
        card_topics.style.borderColor = "rgb(132, 133, 132)";
        break;
      case "Jungle Troopers":
        card_hp.classList.add('jungle');
        card_topics.style.borderColor = "rgb(163, 214, 34)";
        break;
      default:
        card_hp.style.borderColor = "#ccc"; 
    }

    return li;
  };

  const carregarCards = async () => {
    for (const digimon of digimons) {
      const card = await createCard(digimon);
      list.appendChild(card);
    }

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

    update();
  };

  carregarCards();
})();
