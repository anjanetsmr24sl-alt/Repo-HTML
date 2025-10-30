const tiempoCarga = 1000;

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('pantallaCarga').style.display = 'none';
        document.getElementById('pantallaNormal').style.display = 'flex';
    }, tiempoCarga);
});

const tarjetas = document.querySelectorAll('.tarjetaBijuuBorde');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

let indexActivo = 0;
const espacio = 150; 
const maxVisible = 2;

const botonInfo = document.getElementById('infoButton');
const menuBijuu = document.getElementById('menuBijuu');

const detalles = [
    "detalleShukaku",
    "detalleMatatabi",
    "detalleIsobu",
    "detalleGoku",
    "detalleKokuo",
    "detalleSaiken",
    "detalleChomei",
    "detalleGyuki",
    "detalleKurama"
];

const textosBijuu = [
    "Shukaku: El Bijuu de Una Cola",
    "Matatabi: El Bijuu de Dos Colas",
    "Isobu: El Bijuu de Tres Colas",
    "Goku: El Bijuu de Cuatro Colas",
    "Kokuo: El Bijuu de Cinco Colas",
    "Saiken: El Bijuu de Seis Colas",
    "Chomei: El Bijuu de Siete Colas",
    "Gyuki: El Bijuu de Ocho Colas",
    "Kurama: El Bijuu de Nueve Colas"
];

function actualizarCarrusel() {
    const total = tarjetas.length;

    tarjetas.forEach((tarjeta, i) => {
        let offset = i - indexActivo;

        if (offset < -Math.floor(total / 2)) offset += total;
        if (offset > Math.floor(total / 2)) offset -= total;

        const nombreDiv = tarjeta.querySelector('.nombreBijuu');
        if(nombreDiv) nombreDiv.textContent = textosBijuu[i];

        if (offset >= -maxVisible && offset <= maxVisible) {
            tarjeta.style.transform = `translateX(${offset * espacio}px) translateY(-50%) scale(${offset === 0 ? 1.2 : 0.8})`;
            tarjeta.style.opacity = offset === 0 ? '1' : '0.6';
            tarjeta.style.pointerEvents = offset === 0 ? 'auto' : 'none';
            tarjeta.style.zIndex = maxVisible + 1 - Math.abs(offset);
            tarjeta.classList.toggle('active', offset === 0);
        } else {
            tarjeta.style.opacity = '0';
            tarjeta.style.pointerEvents = 'none';
            tarjeta.style.zIndex = '0';
        }
    });

    const textoElemento = document.getElementById('textoBijuu');
    textoElemento.textContent = textosBijuu[indexActivo];
}

prevBtn.addEventListener('click', () => {
    indexActivo = (indexActivo - 1 + tarjetas.length) % tarjetas.length;
    actualizarCarrusel();
});

nextBtn.addEventListener('click', () => {
    indexActivo = (indexActivo + 1) % tarjetas.length;
    actualizarCarrusel();
});

botonInfo.addEventListener('click', () => {
    menuBijuu.style.display = 'none';

    detalles.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    const detalleId = detalles[indexActivo];
    document.getElementById(detalleId).style.display = 'block';
});

const botonesCerrar = document.querySelectorAll('.cerrarDetalle');
botonesCerrar.forEach(btn => {
    btn.addEventListener('click', () => {
        detalles.forEach(id => {
            document.getElementById(id).style.display = 'none';
        });
        menuBijuu.style.display = 'block';
    });
});

const logoMenu = document.querySelector('.logoMenu img');
logoMenu.addEventListener('click', () => {
    detalles.forEach(id => {
        document.getElementById(id).style.display = 'none';
    });

    menuBijuu.style.display = 'block';
    indexActivo = 0;
    actualizarCarrusel();

    window.location.href = 'index.html';
});


actualizarCarrusel();

