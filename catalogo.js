
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
