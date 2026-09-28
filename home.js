var button = document.getElementById("participar")
var numero = document.getElementById("PartNumber")
var linha = document.getElementById("amarelo")
var contador = 45
button.addEventListener("click", () => {
    contador = contador + 1

    numero.innerHTML = `${contador}/100`

    linha.style.width = (contador / 100) * 100 + "%"

    console.log(contador)
})

let btn = document.querySelector(".menu")
let menu = document.querySelector(".menuInfo")
let menuClose = document.querySelector(".close")

btn.addEventListener("click",
    () => {
        menu.classList.add("itsOpen")
        btn.classList.add("a")
    }
)
menuClose.addEventListener("click",
    () => {
        menu.classList.remove("itsOpen")
        btn.classList.remove("a")
    }
)

const textosA = [
    "Um brinquedo pode durar pouco. Uma amizade construída brincando, dura pra sempre.",
    "Pequenas mãos. Grandes futuros.",
    "Esse sorriso não tem preço — mas começou com uma doação."
]
const textosB = [
    "Foi assim que o evento aconteceu: crianças que não se conheciam, unidas por uma tarde de brincadeira",
    "Cada peça encaixada é também um passo na criatividade, na paciência e no aprendizado de cada criança.",
    "É por momentos assim que continuamos acreditando no poder de um gesto simples."
];
const imagens = [
    "img/carrossel1.png",
    "img/carrossel2.png",
    "img/carrossel3.png"
];

var indiceAtual = 0 ;

function mostrarSlide() {
    var slide = document.querySelector(".hero")
    var conteudo1 = document.getElementById("heroTxt1")
    var conteudo2 = document.getElementById("heroTxt2")
    slide.style.backgroundImage = `url(${imagens[indiceAtual]})`
    conteudo1.innerHTML = `${textosA[indiceAtual]}`
    conteudo2.innerHTML = `${textosB[indiceAtual]}`

};  

function aumentarIndice() {
    indiceAtual++
    
    if(indiceAtual >= imagens.length){
        indiceAtual = 0
    }

    mostrarSlide()
}   

setInterval(aumentarIndice, 3000)
mostrarSlide()