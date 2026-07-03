class MzaCarousel {
  constructor(element) {
    this.carousel = element;
    this.track = this.carousel.querySelector('.mzaCarousel-track');
    this.slides = Array.from(this.carousel.querySelectorAll('.mzaCarousel-slide'));
    this.prevBtn = this.carousel.querySelector('.mzaCarousel-prev');
    this.nextBtn = this.carousel.querySelector('.mzaCarousel-next');
    this.pagination = this.carousel.querySelector('.mzaCarousel-pagination');
    this.progressBar = this.carousel.querySelector('.mzaCarousel-progressBar');
    
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    
    this.init();
  }
  
  init() {
    this.createPagination();
    this.updateCarousel();
    this.attachEvents();
  }
  
  createPagination() {
    this.slides.forEach((_, index) => {
      const btn = document.createElement('button');
      btn.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) btn.classList.add('active');
      btn.addEventListener('click', () => this.goToSlide(index));
      this.pagination.appendChild(btn);
    });
    this.paginationBtns = Array.from(this.pagination.querySelectorAll('button'));
  }
  
  attachEvents() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    
    // Navegación con teclado
    this.carousel.querySelector('.mzaCarousel-viewport').addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide();
      if (e.key === 'ArrowRight') this.nextSlide();
    });
    
    // Swipe en móvil
    let startX = 0;
    this.track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    });
    
    this.track.addEventListener('touchend', (e) => {
      const endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) this.nextSlide();
        else this.prevSlide();
      }
    });
  }
  
  goToSlide(index) {
    this.currentIndex = index;
    this.updateCarousel();
  }
  
  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.updateCarousel();
  }
  
  prevSlide() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.updateCarousel();
  }
  
  updateCarousel() {
    // Mover track
    const offset = -this.currentIndex * 100;
    this.track.style.transform = `translateX(${offset}%)`;
    
    // Actualizar paginación
    this.paginationBtns.forEach((btn, index) => {
      btn.classList.toggle('active', index === this.currentIndex);
    });
    
    // Actualizar barra de progreso
    const progress = ((this.currentIndex + 1) / this.totalSlides) * 100;
    this.progressBar.style.width = `${progress}%`;
    
    // Actualizar ARIA
    this.slides.forEach((slide, index) => {
      slide.setAttribute('aria-hidden', index !== this.currentIndex);
    });
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  const carousel = document.getElementById('mzaCarousel');
  if (carousel) {
    new MzaCarousel(carousel);
  }
});
