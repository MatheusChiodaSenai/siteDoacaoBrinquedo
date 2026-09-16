// Pega o campo de busca e todos os cards de produto da página
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".product-card");

function filtrarBrinquedos() {
  const pesquisa = searchInput.value.toLowerCase().trim();

  cards.forEach(function (card) {
    const nomeBrinquedo = card.querySelector("h3").textContent
      .toLowerCase()
      .trim();

    if (nomeBrinquedo.includes(pesquisa)) {
      card.style.display = ""; // mostra o card
    } else {
      card.style.display = "none"; // esconde o card
    }
  });
}

// Filtra a cada letra digitada na busca (busca "ao vivo")
searchInput.addEventListener("input", filtrarBrinquedos);
