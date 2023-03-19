const fila=document.querySelector('.carruselBox');
const perros=document.querySelector('.dogCarrusel');

const flechaIzq=document.getElementById('arrow-left');
const flechaDer=document.getElementById('arrow-right');

flechaDer.addEventListener("click", () => {
    fila.scrollLeft += fila.offsetWidth;
})

flechaIzq.addEventListener("click", () => {
    fila.scrollLeft -= fila.offsetWidth;
})