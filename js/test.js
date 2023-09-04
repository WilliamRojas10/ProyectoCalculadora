const menu = document.getElementById('menu')
const hamburgesa = document.getElementById('hamburgesa')
const cerrar = document.getElementById('close')

cerrar.addEventListener("click", () => {
    menu.classList.remove("visible")
    menu.classList.add("oculto");
})

hamburgesa.addEventListener("click", () => {
    menu.classList.remove("oculto")
    menu.classList.add("visible");
})