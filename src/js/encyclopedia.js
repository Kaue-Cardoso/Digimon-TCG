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

const encyclopedia = document.getElementById("digi_card");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageButtons = document.getElementById("pageButtons");

const searchName = document.getElementById("searchName");
const searchAttribute = document.getElementById("searchAttribute");
const searchLevel = document.getElementById("searchLevel");
const searchBtn = document.getElementById("searchBtn");

let currentPage = 1;
const pageSize = 30;
let totalPages = 1;

let activeName = "";
let activeAttribute = "";
let activeLevel = "";

async function loadDigimon(id) {
    const url = `https://digi-api.com/api/v1/digimon/${id}`;
    const response = await fetch(url);
    const digimon = await response.json();

    if (digimon.attributes.length > 0) {
        const card = document.createElement('div');
        card.classList.add('card');

        card.innerHTML = `
      <img class="card_img" src="${digimon.images[0].href}" alt="${digimon.name}">
      <div class="card_content">
        <div class="card_text">
          <h3>${digimon.name.charAt(0).toUpperCase() + digimon.name.slice(1)}</h3>
          <p>${digimon.levels[0].level}</p>
        </div>
        <div class="card_attribute">
          <img src="src/assets/images/${digimon.attributes[0].attribute}.png" alt="${digimon.attributes[0].attribute}" /> 
        </div>
      </div>
    `;

        const card_content = card.querySelector('.card_content');
        const attr = digimon.attributes[0].attribute;

        if (attr === "Vaccine") {
            card.style.borderColor = "var(--vaccine)";
            card_content.classList.add('vaccine');
        } else if (attr === "Data") {
            card.style.borderColor = "var(--data)";
            card_content.classList.add('data');
        } else if (attr === "Virus") {
            card.style.borderColor = "var(--virus)";
            card_content.classList.add('virus');
        } else if (attr === "Free") {
            card.style.borderColor = "var(--free)";
            card_content.classList.add('free');
        } else if (attr === "Unknown") {
            card.style.borderColor = "var(--unknown)";
            card_content.classList.add('unknown');
        }

        card.addEventListener("click", () => {
            openModal(digimon);
        });

        encyclopedia.appendChild(card);
    }
}

function renderPagination() {
    pageButtons.innerHTML = "";

    if (totalPages > 1 && currentPage > 1) {
        const firstPageBtn = document.createElement("button");
        firstPageBtn.textContent = 1;
        firstPageBtn.addEventListener("click", () => {
            currentPage = 1;
            listDigimons(currentPage);
        });
        pageButtons.appendChild(firstPageBtn);

    }

    const currentBtn = document.createElement("button");
    currentBtn.textContent = currentPage;
    currentBtn.disabled = true;
    currentBtn.classList.add("active-page");
    pageButtons.appendChild(currentBtn);

   
    if (totalPages > 1 && currentPage < totalPages - 1) {

        const lastPageBtn = document.createElement("button");
        lastPageBtn.textContent = totalPages;
        lastPageBtn.addEventListener("click", () => {
            currentPage = totalPages;
            listDigimons(currentPage);
        });
        pageButtons.appendChild(lastPageBtn);
    }

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

async function listDigimons(page) {
    encyclopedia.innerHTML = "";

    let url = `https://digi-api.com/api/v1/digimon?page=${page - 1}&pageSize=${pageSize}`;
    const params = [];

    if (activeName) params.push(`name=${encodeURIComponent(activeName)}`);
    if (activeAttribute) params.push(`attribute=${encodeURIComponent(activeAttribute)}`);
    if (activeLevel) params.push(`level=${encodeURIComponent(activeLevel)}`);

    if (params.length > 0) {
        url += `&${params.join("&")}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    totalPages = data.pageable.totalPages || 1;

    if (!data.content || data.content.length === 0) {
        encyclopedia.innerHTML = `<p style="text-align:center;">Nenhum resultado encontrado.</p>`;
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    for (let digi of data.content) {
        await loadDigimon(digi.id);
    }

    renderPagination();
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        listDigimons(currentPage);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        listDigimons(currentPage);
    }
});

searchBtn.addEventListener("click", () => {
    activeName = searchName.value.trim();
    activeAttribute = searchAttribute.value.trim();
    activeLevel = searchLevel.value.trim();
    currentPage = 1;
    listDigimons(currentPage);
});

listDigimons(currentPage);


const modal = document.getElementById("digimonModal");
const modalBody = document.getElementById("modalBody");
const closeModalBtn = document.getElementById("closeModal");

function openModal(digimon) {
    modalBody.innerHTML = `
      <h2 class="modal_title">${digimon.name}</h2>
      <div class="modal_display"> 
          <div class="modal_image"> 
          <img src="${digimon.images[0].href}" alt="${digimon.name}">
          </div>
          <div class="modal_text">
          <p><strong>Level</strong> <span class="span_text">${digimon.levels.map(l => l.level).join(", ")}</span></p>
          <p><strong>Types</strong> <span class="span_text">${digimon.types.map(t => t.type).join(", ")}</span></p>
          <p><strong>Attribute</strong> <span class="span_text">${digimon.attributes.map(a => a.attribute).join(", ")}</span></p>
          <p><strong>Fields</strong> <span class="span_text">${digimon.fields.map(f => f.field).join(", ")}</span> </p>
          </div>
      </div>
      <div class="modal_description">
          <h2 class="modal_description_title">Profile</h2>
          <p>${digimon.descriptions[1]?.description || "Sem descrição"}</p>

      </div>
  `;

    const modal_description = modalBody.querySelector('.modal_description_title');
    const modal_text_paragraphs = modalBody.querySelectorAll('.modal_text > p');
    const modal_title = modalBody.querySelector(".modal_title");
    const color = digimon.attributes[0].attribute;
    let borderColor;

    // Estilo por atributo
    if (color === "Vaccine") {
        modal_description.classList.add('vaccine');
        modal_title.style.borderColor = "var(--vaccine)";
        borderColor = "var(--vaccine)";
    } else if (color === "Data") {
        modal_description.classList.add('data');
        modal_title.style.borderColor = "var(--data)";
        borderColor = "var(--data)"
    } else if (color === "Virus") {
        modal_description.classList.add('virus');
        modal_title.style.borderColor = "var(--virus)";
        borderColor = "var(--virus)"
    } else if (color === "Free") {
        modal_description.classList.add('free');
        modal_title.style.borderColor = "var(--free)";
        borderColor = "var(--free)"
    } else if (color === "Unknown") {
        modal_description.classList.add('unknown');
        modal_title.style.borderColor = "var(--unknown)";
        borderColor = "var(--unknown)"
    }
    modal_text_paragraphs.forEach(paragraph => {
        paragraph.style.borderColor = borderColor;
        paragraph.style.color = borderColor
    });

    modal.style.display = "block";
}

closeModalBtn.onclick = () => {
    modal.style.display = "none";
};

window.onclick = (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
};