document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    //navegacionFija();
    crearGaleria();
    scrolNav();
    
}

function navegacionFija() {
    const barra = ducument.querySelector('.header');
    const sobreConcierto = document.querySelector('.sobre-concierto');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function() {        
        if( sobreConcierto.getBoundingClientRect().bottom < 0 ) {
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }        
    });
} 

function scrolNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            
            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});

        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 13; i <=24; i++ ) {
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;

        imagen.onclick = function() {
            mostrarImagen(i); 
        };

        galeria.appendChild(imagen);
    }

} 

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif" />
            <source srcset="build/img/grande/${id}.webp" type="image/webp" />
            <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria" />
        `;

        // Crear el Overlay   con la imagen

        const overlay = document.createElement('DIV');
        overlay.appendChild(imagen);
        overlay.classList.add('overlay');
        overlay.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        };

        // Boton para cerrar el Modal
        const cerrarModal = document.createElement('p');
        cerrarModal.textContent = 'X';
        cerrarModal.classList.add('btn-cerrar');
        cerrarModal.onclick = function() {
            const body = document.querySelector('body');
            body.classList.remove('fijar-body');
            overlay.remove();
        };

        overlay.appendChild(cerrarModal);

        // Añadirlos al HTML
        const body = document.querySelector('body');
        body.appendChild(overlay);
        body.classList.add('fijar-body');
}