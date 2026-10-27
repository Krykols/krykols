// ============================================
// SISTEMA DE FAVORITOS CON LOCALSTORAGE
// ============================================

const FAVORITOS_KEY = 'krykols_favoritos';

function obtenerFavoritos() {
    try {
        return JSON.parse(localStorage.getItem(FAVORITOS_KEY)) || [];
    } catch {
        return [];
    }
}

function guardarFavoritos(lista) {
    localStorage.setItem(FAVORITOS_KEY, JSON.stringify(lista));
    actualizarContador();
}

function toggleFavorito(idImagen, urlImagen) {
    let favoritos = obtenerFavoritos();
    const existe = favoritos.findIndex(f => f.id === idImagen);
    
    if (existe >= 0) {
        favoritos.splice(existe, 1);
    } else {
        favoritos.push({ id: idImagen, url: urlImagen });
    }
    
    guardarFavoritos(favoritos);
    return existe < 0; // true si se agregó, false si se quitó
}

function esFavorito(idImagen) {
    return obtenerFavoritos().some(f => f.id === idImagen);
}

function actualizarContador() {
    const contador = document.getElementById('contadorFavoritos');
    if (contador) {
        const total = obtenerFavoritos().length;
        contador.textContent = total;
        contador.style.display = total > 0 ? 'inline-block' : 'none';
    }
}

function abrirFavoritos() {
    const modal = document.getElementById('modalFavoritos');
    const grid = document.getElementById('gridFavoritos');
    const vacioMsg = document.getElementById('vacioMsg');
    
    const favoritos = obtenerFavoritos();
    grid.innerHTML = '';
    
    if (favoritos.length === 0) {
        vacioMsg.classList.add('visible');
    } else {
        vacioMsg.classList.remove('visible');
        favoritos.forEach(fav => {
            const item = crearItemGaleria(fav.url, fav.id, true);
            grid.appendChild(item);
        });
    }
    
    modal.classList.add('activo');
}

function cerrarFavoritos() {
    document.getElementById('modalFavoritos').classList.remove('activo');
}

// Actualizar contador al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContador);