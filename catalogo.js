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


(function () {
  const productsGrid = document.querySelector(".products-grid");
  if (!productsGrid) return; // não é a página do catálogo

  const searchInput = document.getElementById("searchInput");
  const sortSelect = document.getElementById("sortSelect");
  const btnVerMais = document.getElementById("btnVerMais");
  const verMaisContainer = document.getElementById("verMaisContainer");

  const LIMITE_MOBILE = 6;
  const LARGURA_MOBILE = 900;

  
  const todosCards = Array.from(productsGrid.querySelectorAll(".product-card"));
  todosCards.forEach(function (card, index) {
    card.dataset.brinquedoId = String(index);
  });

  const removidos = new Set();
  let mostrarTudo = false;

  function idDe(card) {
    return Number(card.dataset.brinquedoId);
  }

  function atualizar() {
    const pesquisa = searchInput ? searchInput.value.toLowerCase().trim() : "";
    const pesquisando = pesquisa.length > 0;
    const isMobile = window.innerWidth <= LARGURA_MOBILE;
    const ordem = sortSelect ? sortSelect.value : "recentes";

    
    const ativos = todosCards.filter(function (card) {
      return !removidos.has(card);
    });

    
    ativos.sort(function (a, b) {
      return ordem === "antigos" ? idDe(b) - idDe(a) : idDe(a) - idDe(b);
    });
    ativos.forEach(function (card) {
      productsGrid.appendChild(card);
    });

    
    let visiveis = 0;
    let existemEscondidos = false;

    ativos.forEach(function (card) {
      const nome = card.querySelector("h3").textContent.toLowerCase().trim();
      const bateBusca = !pesquisando || nome.includes(pesquisa);

      if (!bateBusca) {
        card.style.display = "none";
        card.classList.remove("escondido-mobile");
        return;
      }

      card.style.display = "";
      visiveis++;

      const passouDoLimite = isMobile && !pesquisando && !mostrarTudo && visiveis > LIMITE_MOBILE;
      card.classList.toggle("escondido-mobile", passouDoLimite);
      if (passouDoLimite) existemEscondidos = true;
    });

    
    if (verMaisContainer) {
      verMaisContainer.style.display = existemEscondidos ? "flex" : "none";
    }
  }

  if (btnVerMais) {
    btnVerMais.addEventListener("click", function () {
      mostrarTudo = true;
      atualizar();
    });
  }
  if (searchInput) searchInput.addEventListener("input", atualizar);
  if (sortSelect) sortSelect.addEventListener("change", atualizar);
  window.addEventListener("resize", atualizar);

  
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

  todosCards.forEach(function (card) {
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
    removidos.add(cardSelecionado);
    cardSelecionado.remove();
    fecharModal();
    atualizar(); 
  });

  atualizar();
})();