const form = document.getElementById('formDoacao');
const input = document.getElementById('valor');
const chips = document.querySelectorAll('.chip');
const botaoDoar = document.querySelector('.btnDoarValor');


const textoOriginalBotao = botaoDoar.innerHTML;
let confirmacaoTimeout = null;

function valorAtual() {
    const v = parseInt(input.value, 10);
    return Number.isFinite(v) && v > 0 ? v : 0;
}

function atualizar() {
    const v = valorAtual();

    
    document.querySelectorAll('[data-valor-texto]').forEach(t => {
        t.textContent = v.toLocaleString('pt-BR');
    });

    chips.forEach(c => c.classList.toggle('ativo', Number(c.dataset.valor) === v));

   
    botaoDoar.disabled = v === 0;
}

chips.forEach(c => c.addEventListener('click', () => {
    input.value = c.dataset.valor;
    atualizar();
}));

document.getElementById('mais').addEventListener('click', () => {
    input.value = valorAtual() + 1;
    atualizar();
});

document.getElementById('menos').addEventListener('click', () => {
    input.value = Math.max(1, valorAtual() - 1);
    atualizar();
});

input.addEventListener('input', atualizar);

form.addEventListener('submit', e => {
    e.preventDefault();

    const valor = valorAtual();
    if (valor === 0) return;

    const dados = Object.fromEntries(new FormData(form));
    console.log('Doação:', dados);

    mostrarConfirmacaoDoacao(valor);
});

function mostrarConfirmacaoDoacao(valor) {
    
    clearTimeout(confirmacaoTimeout);

    botaoDoar.classList.add('doado');
    botaoDoar.innerHTML = `Doação de R$ ${valor.toLocaleString('pt-BR')} confirmada! ✅`;

    mostrarToastDoacao(`🎉 Obrigado! Sua doação de R$ ${valor.toLocaleString('pt-BR')} foi registrada.`);

    confirmacaoTimeout = setTimeout(() => {
        botaoDoar.classList.remove('doado');
        botaoDoar.innerHTML = textoOriginalBotao;
        atualizar(); 
    }, 3500);
}

let toastDoacaoEl = null;
let toastDoacaoTimeout = null;

function mostrarToastDoacao(mensagem) {
    if (!toastDoacaoEl) {
        toastDoacaoEl = document.createElement('div');
        toastDoacaoEl.className = 'toastDoacao';
        document.body.appendChild(toastDoacaoEl);
    }

    toastDoacaoEl.textContent = mensagem;
    toastDoacaoEl.classList.add('visivel');

    clearTimeout(toastDoacaoTimeout);
    toastDoacaoTimeout = setTimeout(() => {
        toastDoacaoEl.classList.remove('visivel');
    }, 4000);
}


let btn = document.querySelector(".menu");
let menu = document.querySelector(".menuInfo");
let menuClose = document.querySelector(".close");

btn.addEventListener("click", () => {
    menu.classList.add("itsOpen");
    btn.classList.add("a");
});

menuClose.addEventListener("click", () => {
    menu.classList.remove("itsOpen");
    btn.classList.remove("a");
});

atualizar();