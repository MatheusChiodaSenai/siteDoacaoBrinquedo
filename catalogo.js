
const searchInput = document.getElementById("searchInput");
const cards = document.querySelectorAll(".product-card");

function filtrarBrinquedos() {
  const pesquisa = searchInput.value.toLowerCase().trim();

  cards.forEach(function (card) {
    const nomeBrinquedo = card.querySelector("h3").textContent
      .toLowerCase()
      .trim();

    if (nomeBrinquedo.includes(pesquisa)) {
      card.style.display = ""; 
    } else {
      card.style.display = "none"; 
    }
  });
}


searchInput.addEventListener("input", filtrarBrinquedos);
