
(function () {
  const btnMenu = document.querySelector("header .menu");
  const menuInfo = document.querySelector("header .menuInfo");
  const menuFechar = document.querySelector("header .close");
  if (!btnMenu || !menuInfo || !menuFechar) return;

  btnMenu.addEventListener("click", function () {
    menuInfo.classList.add("itsOpen");
  });
  menuFechar.addEventListener("click", function () {
    menuInfo.classList.remove("itsOpen");
  });
})();


const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".product-card");
const btnVerMais = document.getElementById("btnVerMais");
const verMaisContainer = document.getElementById("verMaisContainer");


const LIMITE_MOBILE = 6;
const LARGURA_MOBILE = 900; 

function aplicarLimiteMobile() {
  const isMobile = window.innerWidth <= LARGURA_MOBILE;

  cards.forEach(function (card, index) {
    if (isMobile && index >= LIMITE_MOBILE) {
      card.classList.add("escondido-mobile");
    } else {
      card.classList.remove("escondido-mobile");
    }
  });


  const existemEscondidos = document.querySelectorAll(".product-card.escondido-mobile").length > 0;
  verMaisContainer.style.display = (isMobile && existemEscondidos) ? "flex" : "none";
}

function filtrarBrinquedos() {
  const pesquisa = searchInput.value.toLowerCase().trim();
  const pesquisando = pesquisa.length > 0;

  if (pesquisando) {
    
    verMaisContainer.style.display = "none";
  }

  cards.forEach(function (card) {
    const nomeBrinquedo = card.querySelector("h3").textContent
      .toLowerCase()
      .trim();

    if (pesquisando) {
      card.classList.remove("escondido-mobile");
      card.style.display = nomeBrinquedo.includes(pesquisa) ? "" : "none";
    } else {
      card.style.display = "";
      aplicarLimiteMobile();
    }
  });
}

btnVerMais.addEventListener("click", function () {
  cards.forEach(function (card) {
    card.classList.remove("escondido-mobile");
  });
  verMaisContainer.style.display = "none";
});

window.addEventListener("resize", aplicarLimiteMobile);
searchInput.addEventListener("input", filtrarBrinquedos);


aplicarLimiteMobile();



const sortSelect = document.getElementById("sortSelect");
const productsGrid = document.querySelector(".products-grid");
const ordemOriginal = Array.from(cards); 

function ordenarBrinquedos() {
  if (!sortSelect || !productsGrid) return;

  const valor = sortSelect.value;
  let cardsOrdenados;

  if (valor === "recentes") {
    
    cardsOrdenados = Array.from(cards).sort(function (a, b) {
      return Number(b.dataset.brinquedoId) - Number(a.dataset.brinquedoId);
    });
  } else if (valor === "antigos") {
   
    cardsOrdenados = Array.from(cards).sort(function (a, b) {
      return Number(a.dataset.brinquedoId) - Number(b.dataset.brinquedoId);
    });
  } else {
    cardsOrdenados = ordemOriginal;
  }

  cardsOrdenados.forEach(function (card) {
    productsGrid.appendChild(card);
  });

  aplicarLimiteMobile();
}

if (sortSelect) {
  sortSelect.addEventListener("change", ordenarBrinquedos);
}



(function () {
  const productCards = document.querySelectorAll(".product-card");

 
  productCards.forEach(function (card, index) {
    card.dataset.brinquedoId = String(index);
  });




  const modalHTML = `
    <div class="modalBrinquedoFundo" id="modalBrinquedoFundo">
      <div class="modalBrinquedo">
        <button type="button" class="modalBrinquedoFechar" id="modalBrinquedoFechar" aria-label="Fechar">✕</button>
        <div class="modalBrinquedoImagem">
          <img id="modalBrinquedoImg" src="" alt="">
        </div>
        <div class="modalBrinquedoInfo">
          <span class="badge badge-category" id="modalBrinquedoCategoria"></span>
          <h2 id="modalBrinquedoNome"></h2>
          <p class="modalBrinquedoTexto">Estamos doando, não vendendo: ao confirmar, você garante que vai levar este brinquedo para a campanha. Assim que confirmar, ele sai da lista para os outros doadores focarem no que ainda falta.</p>
          <div class="modalBrinquedoBotoes">
            <button type="button" class="modalBrinquedoConfirmar" id="modalBrinquedoConfirmar">Quero doar este brinquedo</button>
            <button type="button" class="modalBrinquedoCancelar" id="modalBrinquedoCancelar">Voltar</button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modalFundo = document.getElementById("modalBrinquedoFundo");
  const modalImg = document.getElementById("modalBrinquedoImg");
  const modalNome = document.getElementById("modalBrinquedoNome");
  const modalCategoria = document.getElementById("modalBrinquedoCategoria");
  const btnFechar = document.getElementById("modalBrinquedoFechar");
  const btnCancelar = document.getElementById("modalBrinquedoCancelar");
  const btnConfirmar = document.getElementById("modalBrinquedoConfirmar");

  let cardSelecionado = null;

  function abrirModal(card) {
    cardSelecionado = card;
    const img = card.querySelector(".product-image img");
    const nome = card.querySelector("h3").textContent.trim();
    const categoria = card.querySelector(".badge-category");

    modalImg.src = img ? img.src : "";
    modalImg.alt = img ? img.alt : nome;
    modalNome.textContent = nome;
    modalCategoria.textContent = categoria ? categoria.textContent : "";

    modalFundo.classList.add("aberto");
    document.body.classList.add("semRolagemModal");
  }

  function fecharModal() {
    modalFundo.classList.remove("aberto");
    document.body.classList.remove("semRolagemModal");
    cardSelecionado = null;
  }

  productCards.forEach(function (card) {
    card.style.cursor = "pointer";
    card.addEventListener("click", function () {
      abrirModal(card);
    });
  });

  btnFechar.addEventListener("click", fecharModal);
  btnCancelar.addEventListener("click", fecharModal);
  modalFundo.addEventListener("click", function (e) {
    if (e.target === modalFundo) fecharModal();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && modalFundo.classList.contains("aberto")) fecharModal();
  });

  btnConfirmar.addEventListener("click", function () {
    if (!cardSelecionado) return;
    cardSelecionado.remove();
    fecharModal();
  });
})();
