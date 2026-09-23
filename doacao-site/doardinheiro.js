const form = document.getElementById('formDoacao');
const input = document.getElementById('valor');
const textos = document.querySelectorAll('[data-valor-texto]');
const chips = document.querySelectorAll('.chip');
const botaoDoar = document.querySelector('.btnDoarValor');

function valorAtual() {
    const v = parseInt(input.value, 10);
    return Number.isFinite(v) && v > 0 ? v : 0;
}

function atualizar() {
    const v = valorAtual();
    textos.forEach(t => t.textContent = v.toLocaleString('pt-BR'));
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
    
    const dados = Object.fromEntries(new FormData(form));
    console.log('Doação:', dados);
});

atualizar();
