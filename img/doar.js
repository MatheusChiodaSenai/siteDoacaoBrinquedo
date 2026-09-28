 	
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

