// Mantiene pegadas las líneas verticales al logo, a las reglas y al nav
(function () {
  const hero   = document.querySelector('.hero');
  const logo   = document.querySelector('.logo-diamante');
  const blk    = document.querySelector('.hero__content');
  const topR   = document.querySelector('.rule--top');
  const botR   = document.querySelector('.rule--bottom');
  const nav    = document.querySelector('.hero__nav');

  const vLogo  = document.querySelector('.vline--logo');
  const vNav   = document.querySelector('.vline--nav');

  function clamp(num, min){ return Math.max(num, min); }

  function sync() {
    const heroBox = hero.getBoundingClientRect();
    const logoBox = logo.getBoundingClientRect();
    const topBox  = topR.getBoundingClientRect();
    const botBox  = botR.getBoundingClientRect();
    const navBox  = nav.getBoundingClientRect();

    // Trayecto: borde inferior del logo → borde superior de la 1ª regla
    const topStart   = logoBox.bottom - heroBox.top;
    const topHeight  = clamp(topBox.top - logoBox.bottom, 0);

    vLogo.style.top    = `${topStart}px`;
    vLogo.style.height = `${topHeight}px`;

    // Trayecto: borde inferior de la 2ª regla → borde superior del nav
    const navStart   = botBox.bottom - heroBox.top;
    const navHeight  = clamp(navBox.top - botBox.bottom, 0);

    vNav.style.top    = `${navStart}px`;
    vNav.style.height = `${navHeight}px`;
  }

  window.addEventListener('DOMContentLoaded', sync, { once:true });
  window.addEventListener('resize',  sync);
  window.addEventListener('orientationchange', sync);

  // por si la imagen del fondo o fuentes retrasan el layout
  setTimeout(sync, 80);
})();

// ===== Apertura vertical doble on load =====
(function(){
  const body = document.body;
  const overlay = document.querySelector('.splitreveal');
  if(!overlay) return;

  // Dispara la apertura cuando el DOM está listo
  const play = () => {
    body.classList.add('sr-play');

    // Escuchar fin de ambas animaciones
    let ended = 0;
    const onEnd = () => {
      ended++;
      if (ended >= 2){       // top + bottom
        body.classList.add('sr-done');
        body.classList.remove('sr-play');
        // limpieza de listeners
        panes.forEach(p => p.removeEventListener('animationend', onEnd));
      }
    };
    const panes = overlay.querySelectorAll('.splitreveal__pane');
    panes.forEach(p => p.addEventListener('animationend', onEnd, { once:false }));
  };

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', play, { once:true });
  } else {
    play();
  }
})();
