// ============================================
// LÓGICA DE GALERÍA REUTILIZABLE
// ============================================

function crearItemGaleria(urlImagen, idImagen, esModalFavoritos = false) {
    const item = document.createElement('div');
    item.className = 'foto-item';
    
    const img = document.createElement('img');
    img.src = urlImagen;
    img.alt = 'Joya Krykols';
    img.loading = 'lazy';
    
    const btnCorazon = document.createElement('button');
    btnCorazon.className = 'btn-corazon';
    btnCorazon.innerHTML = '♥';
    btnCorazon.title = 'Agregar a favoritos';
    
    // Marcar si ya es favorito
    if (esFavorito(idImagen)) {
        btnCorazon.classList.add('activo');
    }
    
    btnCorazon.addEventListener('click', (e) => {
        e.stopPropagation();
        const fueAgregado = toggleFavorito(idImagen, urlImagen);
        btnCorazon.classList.toggle('activo', fueAgregado);
        
        // Si estamos en el modal de favoritos y se quitó, remover la tarjeta
        if (esModalFavoritos && !fueAgregado) {
            item.style.transition = 'opacity 0.3s, transform 0.3s';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.remove();
                // Verificar si quedó vacío
                const grid = document.getElementById('gridFavoritos');
                if (grid.children.length === 0) {
                    document.getElementById('vacioMsg').classList.add('visible');
                }
            }, 300);
        }
    });
    
    item.appendChild(img);
    item.appendChild(btnCorazon);
    
    return item;
}

function iniciarGaleria(listaImagenes, nombreSeccion) {
    const grid = document.getElementById('galeriaGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    listaImagenes.forEach((url, index) => {
        // ID único: sección + índice + nombre de archivo
        const nombreArchivo = url.split('/').pop();
        const idImagen = `${nombreSeccion}-${nombreArchivo}`;
        
        const item = crearItemGaleria(url, idImagen);
        grid.appendChild(item);
    });
}

// Cerrar modal al hacer clic fuera
document.addEventListener('click', (e) => {
    const modal = document.getElementById('modalFavoritos');
    if (e.target === modal) {
        cerrarFavoritos();
    }
});

// Cerrar modal con tecla Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') cerrarFavoritos();
});