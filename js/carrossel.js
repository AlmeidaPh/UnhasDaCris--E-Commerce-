class Carrossel {
  constructor() {
    this.$carrossel = $('.carrossel');
    this.$slides = $('.slide');
    this.totalSlides = this.$slides.length;
    this.currentIndex = 0;
    this.intervalo = null;
    
    this.iniciar();
  }
  
  iniciar() {
    this.criarIndicadores();
    this.configurarEventos();
    this.iniciarAutoplay();
    this.atualizarCarrossel();
  }
  
  criarIndicadores() {
    const $indicadores = $('<div class="indicadores"></div>');
    
    for (let i = 0; i < this.totalSlides; i++) {
      $indicadores.append(`<div class="indicador" data-index="${i}"></div>`);
    }
    
    $('.carrossel-container').append($indicadores);
    $('.indicador').first().addClass('ativo');
  }
  
  configurarEventos() {
    $('.proximo').click(() => this.proximoSlide());
    $('.anterior').click(() => this.slideAnterior());
    
    $(document).on('click', '.indicador', (e) => {
      this.currentIndex = parseInt($(e.target).data('index'));
      this.atualizarCarrossel();
    });
    
    $('.carrossel-container').hover(
      () => clearInterval(this.intervalo),
      () => this.iniciarAutoplay()
    );
  }
  
  atualizarCarrossel() {
    this.$carrossel.css('transform', `translateX(-${this.currentIndex * 100}%)`);
    $('.indicador').removeClass('ativo');
    $(`.indicador[data-index="${this.currentIndex}"]`).addClass('ativo');
  }
  
  proximoSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
    this.atualizarCarrossel();
  }
  
  slideAnterior() {
    this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
    this.atualizarCarrossel();
  }
  
  iniciarAutoplay() {
    this.intervalo = setInterval(() => this.proximoSlide(), 5000);
  }
}

$(document).ready(() => new Carrossel());