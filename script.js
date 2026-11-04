document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  const introImg = document.getElementById('intro-img');
  const introTextoOverlay = document.querySelector('.intro-texto-overlay');
  const introVideo = document.getElementById('intro-video');
  const portada = document.getElementById('portada');
  const instrucciones = document.getElementById('instrucciones');
  const menu = document.getElementById('menu');
  const nucleo1 = document.getElementById('nucleo-1');
  const nucleo2 = document.getElementById('nucleo-2');
  const nucleo3 = document.getElementById('nucleo-3');
  
  const modalDetalleLibreta = document.getElementById('modal-detalle-libreta');
  const modalEstafaTelefonica = document.getElementById('modal-estafa-telefonica');
  const modalDenuncias = document.getElementById('modal-denuncias');
  const modalClonacion = document.getElementById('modal-clonacion');
  const modalInvestigacion = document.getElementById('modal-investigacion');
  const modalInfoDelito = document.getElementById('modal-infodedelito');
  const modalLey = document.getElementById('modal-ley');
  const modalRobo = document.getElementById('modal-robo');
  const modalRedes = document.getElementById('modal-redes');
  
  const modalLlamadaActiva4 = document.getElementById('modal-llamada-activa-4');
  const modalLlamadaActivaInfo = document.getElementById('modal-llamada-activa-info');
  const experienciaFinal = document.getElementById('experiencia-final');

  const btnRojo = document.getElementById('btn-rojo');
  const btnRojo2 = document.getElementById('btn-rojo-2');
  const btnVolverMenu = document.getElementById('btn-volver-menu');
  const btnVolverMenu2 = document.getElementById('btn-volver-menu-2');
  const btnVolverMenu3 = document.getElementById('btn-volver-menu-3');
  
  const btnCerrarLibreta = document.getElementById('btn-cerrar-libreta');
  const btnCerrarEstafa = document.getElementById('btn-cerrar-estafa');
  const btnCerrarDenuncias = document.getElementById('btn-cerrar-denuncias');
  const btnCerrarClonacion = document.getElementById('btn-cerrar-clonacion');
  const btnCerrarInvestigacion = document.getElementById('btn-cerrar-investigacion');
  const btnCerrarInfoDelito = document.getElementById('btn-cerrar-infodedelito');
  const btnCerrarLey = document.getElementById('btn-cerrar-ley');
  const btnCerrarRobo = document.getElementById('btn-cerrar-robo');
  const btnCerrarRedes = document.getElementById('btn-cerrar-redes');
  const btnCerrarLlamadaActiva = document.getElementById('btn-cerrar-llamada-activa');
  const btnCerrarLlamadaActivaInfo = document.getElementById('btn-cerrar-llamada-activa-info');
  const btnCerrarExp = document.getElementById('btn-cerrar-exp');
  const btnCerrarAudioExp = document.getElementById('btn-cerrar-audio-exp');

  const tarjetaOpcion4_N1 = document.querySelector('#nucleo-1 [data-opcion="4"]');
  const tarjetaOpcion5_N1 = document.querySelector('#nucleo-1 [data-opcion="5"]');
  const tarjetaOpcion6_N1 = document.querySelector('#nucleo-1 [data-opcion="6"]');

  const tarjetaOpcion4_N2 = document.querySelector('#nucleo-2 [data-opcion="4"]');
  const tarjetaOpcion5_N2 = document.querySelector('#nucleo-2 [data-opcion="5"]');
  const tarjetaOpcion6_N2 = document.querySelector('#nucleo-2 [data-opcion="6"]');

  const tarjetaOpcion4_N3 = document.querySelector('#nucleo-3 [data-opcion="4"]');
  const tarjetaOpcion5_N3 = document.querySelector('#nucleo-3 [data-opcion="5"]');
  const tarjetaOpcion6_N3 = document.querySelector('#nucleo-3 [data-opcion="6"]');
  
  const opcion1 = document.querySelector('.opcion-1');
  const opcion2 = document.querySelector('.opcion-2');
  const opcion3 = document.querySelector('.opcion-3');
  const btnExperienciaFinal = document.querySelector('.opcion-experiencia-final');
  const btnAvanzarExp = document.getElementById('btn-avanzar-exp');
  const experienciaCierre = document.getElementById('experiencia-cierre');
  const btnAvanzarCierre = document.getElementById('btn-avanzar-cierre');
  const pantallaFinal = document.getElementById('pantalla-final');

  if (btnExperienciaFinal) {
    btnExperienciaFinal.style.display = 'none';
  }

  let algunNucleoVisitado = false;

  const audioLlamada1 = document.getElementById('audio-llamada1') || new Audio('llamada1.mpeg');
  const audioLlamada2 = document.getElementById('audio-llamada2') || new Audio('llamada2.mpeg');
  const audioVishing = document.getElementById('audio-vishing') || new Audio('vishing.mp3');
  const audioClonacion = document.getElementById('audio-clonacion') || new Audio('clonacion.mp3');
  
  audioLlamada1.preload = 'auto';
  audioLlamada2.preload = 'auto';
  audioVishing.preload = 'auto';
  audioClonacion.preload = 'auto';

  let pantalla = 'intro';
  let timerLlamada = null;
  let timerPaso2 = null;
  let timerPaso3 = null;
  let timerPaso2_N2 = null;
  let timerPaso3_N2 = null;
  let karaokeInterval = null;
  let karaokeIntervalN2 = null;

  const timbre = document.getElementById('audio-timbre') || new Audio('Sonido-timbre-Telefono-SnapYT.App.mp3');
  timbre.loop = true;
  timbre.volume = 0.8;
  try { timbre.load(); } catch (e) { }

  function mostrar(el) {
    if (!el) return;
    el.classList.remove('oculta');
    el.classList.add('visible');
    el.setAttribute('aria-hidden', 'false');
  }

  function ocultar(el) {
    if (!el) return;
    el.classList.remove('visible');
    el.classList.add('oculta');
    el.setAttribute('aria-hidden', 'true');
  }

  function entrarPortada() {
    if (pantalla !== 'intro') return;
    pantalla = 'portada';
    if (intro) intro.classList.add('oculta');
    mostrar(portada);
  }

  let introIniciada = false;
  let introFinalizada = false;

  function transicionarAVideo() {
    if (introFinalizada) return;
    introFinalizada = true;

    timbre.pause();
    timbre.currentTime = 0;

    if (introImg) introImg.classList.add('oculta');
    if (introTextoOverlay) introTextoOverlay.classList.add('oculta');
    
    if (introVideo) {
      introVideo.classList.remove('oculta');
      introVideo.play().catch(() => {});

      introVideo.onended = () => {
        entrarPortada();
      };
    } else {
      entrarPortada();
    }
  }

  if (intro) {
    intro.addEventListener('click', () => {
      if (!introIniciada && !introFinalizada) {
        introIniciada = true;
        timbre.play().catch(() => {});
        setTimeout(transicionarAVideo, 5000);
      } else if (introIniciada && !introFinalizada) {
        transicionarAVideo();
      } else if (introVideo && !introVideo.classList.contains('oculta')) {
        introVideo.pause();
        entrarPortada();
      }
    });
  }

  if (btnRojo) {
    btnRojo.addEventListener('click', (e) => {
      e.preventDefault();
      atender();
    });
  }

  function atender() {
    if (pantalla !== 'portada') return;
    pantalla = 'instrucciones';
    timbre.pause();
    timbre.currentTime = 0;
    ocultar(portada);
    mostrar(instrucciones);
  }

  if (btnRojo2) {
    btnRojo2.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      irAlMenu();
    });
  }

  function irAlMenu() {
    if (pantalla !== 'instrucciones') return;
    pantalla = 'menu';
    ocultar(instrucciones);
    mostrar(menu);

    if (algunNucleoVisitado && btnExperienciaFinal) {
      btnExperienciaFinal.style.display = 'flex';
    }
  }

  if (opcion1) {
    opcion1.addEventListener('click', () => {
      algunNucleoVisitado = true;
      pantalla = 'nucleo-1';
      ocultar(menu);
      mostrar(nucleo1);
    });
  }

  if (opcion2) {
    opcion2.addEventListener('click', () => {
      algunNucleoVisitado = true;
      pantalla = 'nucleo-2';
      ocultar(menu);
      mostrar(nucleo2);
    });
  }

  if (opcion3) {
    opcion3.addEventListener('click', () => {
      algunNucleoVisitado = true;
      pantalla = 'nucleo-3';
      ocultar(menu);
      mostrar(nucleo3);
    });
  }

  const experienciaAudio = document.getElementById('experiencia-audio');
  const audioNumTitulo = document.getElementById('audio-num-titulo');
  const btnExpReal = document.getElementById('btn-exp-real');
  const btnExpIa = document.getElementById('btn-exp-ia');

  const experienciaErrorReal = document.getElementById('experiencia-error-real');
  const experienciaAciertoReal = document.getElementById('experiencia-acierto-real');
  const experienciaAciertoIa = document.getElementById('experiencia-acierto-ia');
  const experienciaErrorIa = document.getElementById('experiencia-error-ia');

  const btnAvanzarErrorReal = document.getElementById('btn-avanzar-error-real');
  const btnAvanzarAciertoReal = document.getElementById('btn-avanzar-acierto-real');
  const btnAvanzarAciertoIa = document.getElementById('btn-avanzar-acierto-ia');
  const btnAvanzarErrorIa = document.getElementById('btn-avanzar-error-ia');

  const experienciaResumenExito = document.getElementById('experiencia-resumen-exito');
  const experienciaResumenFallo = document.getElementById('experiencia-resumen-fallo');
  const btnFinalizarResumenExito = document.getElementById('btn-finalizar-resumen-exito');
  const btnFinalizarResumenFallo = document.getElementById('btn-finalizar-resumen-fallo');

  let aciertosTotales = 0;

  const audiosExperiencia = [
    { id: 1, elemento: document.getElementById('audio-exp-1') || new Audio('llamada1.mpeg'), tipo: 'real' },
    { id: 2, elemento: document.getElementById('audio-exp-2') || new Audio('audio2ia.mp3'), tipo: 'ia' },
    { id: 3, elemento: document.getElementById('audio-exp-3') || new Audio('audio3ia.mp3'), tipo: 'ia' },
    { id: 4, elemento: document.getElementById('audio-exp-4') || new Audio('audio4real.mp3'), tipo: 'real' }
  ];

  let audioActualIndex = 0;

  function detenerAudiosExperiencia() {
    audiosExperiencia.forEach(item => {
      if (item.elemento) {
        item.elemento.pause();
        item.elemento.currentTime = 0;
      }
    });
  }

  function reproducirAudioActual() {
    detenerAudiosExperiencia();
    const config = audiosExperiencia[audioActualIndex];
    if (audioNumTitulo) {
      audioNumTitulo.textContent = `Audio número ${config.id}`;
    }
    if (config.elemento) {
      config.elemento.currentTime = 0;
      config.elemento.play().catch(() => {});
    }
  }

  if (btnExperienciaFinal && experienciaFinal) {
    btnExperienciaFinal.addEventListener('click', () => {
      pantalla = 'experiencia-final';
      ocultar(menu);
      mostrar(experienciaFinal);
    });
  }

  if (btnAvanzarExp && experienciaFinal && experienciaAudio) {
    btnAvanzarExp.addEventListener('click', () => {
      audioActualIndex = 0;
      aciertosTotales = 0;
      pantalla = 'experiencia-audio';
      ocultar(experienciaFinal);
      mostrar(experienciaAudio);
      reproducirAudioActual();
    });
  }

  if (btnCerrarExp && experienciaFinal) {
    btnCerrarExp.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(experienciaFinal);
      mostrar(menu);
      if (algunNucleoVisitado && btnExperienciaFinal) {
        btnExperienciaFinal.style.display = 'flex';
      }
    });
  }

  if (btnExpReal) {
    btnExpReal.addEventListener('click', () => {
      detenerAudiosExperiencia();
      const actual = audiosExperiencia[audioActualIndex];
      ocultar(experienciaAudio);

      if (actual.tipo === 'real') {
        aciertosTotales++;
        pantalla = 'experiencia-acierto-real';
        mostrar(experienciaAciertoReal);
      } else {
        pantalla = 'experiencia-error-ia';
        mostrar(experienciaErrorIa);
      }
    });
  }

  if (btnExpIa) {
    btnExpIa.addEventListener('click', () => {
      detenerAudiosExperiencia();
      const actual = audiosExperiencia[audioActualIndex];
      ocultar(experienciaAudio);

      if (actual.tipo === 'ia') {
        aciertosTotales++;
        pantalla = 'experiencia-acierto-ia';
        mostrar(experienciaAciertoIa);
      } else {
        pantalla = 'experiencia-error-real';
        mostrar(experienciaErrorReal);
      }
    });
  }

  function avanzarSiguienteAudio() {
    audioActualIndex++;
    if (audioActualIndex < audiosExperiencia.length) {
      pantalla = 'experiencia-audio';
      mostrar(experienciaAudio);
      reproducirAudioActual();
    } else {
      // Al terminar las 4 opciones, evaluamos si la mayoría fue bien (3 o 4 aciertos de 4)
      if (aciertosTotales >= 3) {
        pantalla = 'experiencia-resumen-exito';
        mostrar(experienciaResumenExito);
      } else {
        pantalla = 'experiencia-resumen-fallo';
        mostrar(experienciaResumenFallo);
      }
    }
  }

  if (btnAvanzarErrorReal) {
    btnAvanzarErrorReal.addEventListener('click', () => {
      ocultar(experienciaErrorReal);
      avanzarSiguienteAudio();
    });
  }

  if (btnAvanzarAciertoReal) {
    btnAvanzarAciertoReal.addEventListener('click', () => {
      ocultar(experienciaAciertoReal);
      avanzarSiguienteAudio();
    });
  }

  if (btnAvanzarAciertoIa) {
    btnAvanzarAciertoIa.addEventListener('click', () => {
      ocultar(experienciaAciertoIa);
      avanzarSiguienteAudio();
    });
  }

  if (btnAvanzarErrorIa) {
    btnAvanzarErrorIa.addEventListener('click', () => {
      ocultar(experienciaErrorIa);
      avanzarSiguienteAudio();
    });
  }

  if (btnVolverMenu) {
    btnVolverMenu.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(nucleo1);
      mostrar(menu);
      if (algunNucleoVisitado && btnExperienciaFinal) {
        btnExperienciaFinal.style.display = 'flex';
      }
    });
  }

    function irACierre() {
    ocultar(experienciaResumenExito);
    ocultar(experienciaResumenFallo);
    pantalla = 'experiencia-cierre';
    mostrar(experienciaCierre);
  }

  if (btnAvanzarCierre) {
    btnAvanzarCierre.addEventListener('click', () => {
      ocultar(experienciaCierre);
      pantalla = 'pantalla-final';
      mostrar(pantallaFinal);
    });
  }

  if (btnFinalizarResumenExito) {
    btnFinalizarResumenExito.addEventListener('click', irACierre);
  }

  if (btnFinalizarResumenFallo) {
    btnFinalizarResumenFallo.addEventListener('click', irACierre);
  }

  if (btnVolverMenu2) {
    btnVolverMenu2.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(nucleo2);
      mostrar(menu);
      if (algunNucleoVisitado && btnExperienciaFinal) {
        btnExperienciaFinal.style.display = 'flex';
      }
    });
  }

  if (btnVolverMenu3) {
    btnVolverMenu3.addEventListener('click', () => {
      pantalla = 'menu';
      ocultar(nucleo3);
      mostrar(menu);
      if (algunNucleoVisitado && btnExperienciaFinal) {
        btnExperienciaFinal.style.display = 'flex';
      }
    });
  }

  function limpiarTimersSecuencia() {
    if (timerPaso2) clearTimeout(timerPaso2);
    if (timerPaso3) clearTimeout(timerPaso3);
    if (timerLlamada) clearTimeout(timerLlamada);
  }

  function limpiarTimersNucleo2() {
    if (timerPaso2_N2) clearTimeout(timerPaso2_N2);
    if (timerPaso3_N2) clearTimeout(timerPaso3_N2);
  }

    function reiniciarBarra(modal) {
    const relleno = modal.querySelector('.barra-progreso-fill');
    if (!relleno) return;
    relleno.style.animation = 'none';
    void relleno.offsetWidth;
    relleno.style.animation = '';
  }
  
  function actualizarSubtitulos(lineas, tiempoActual) {
    let lineaActiva = null;

    lineas.forEach(linea => {
      const inicio = parseFloat(linea.getAttribute('data-inicio'));
      const fin = parseFloat(linea.getAttribute('data-fin'));
      if (tiempoActual >= inicio && tiempoActual <= fin) {
        lineaActiva = linea;
      }
    });

    lineas.forEach(linea => linea.classList.toggle('activo', linea === lineaActiva));
    if (!lineaActiva) return;

    const inicio = parseFloat(lineaActiva.getAttribute('data-inicio'));
    const fin = parseFloat(lineaActiva.getAttribute('data-fin'));
    const duracion = fin - inicio || 1;
    const progreso = Math.min(Math.max((tiempoActual - inicio) / duracion, 0), 1);
    const palabras = lineaActiva.querySelectorAll('.palabra');
    const palabrasResaltadas = Math.ceil(progreso * palabras.length);

    palabras.forEach((p, idx) => p.classList.toggle('resaltada', idx < palabrasResaltadas));
  }

  // Karaoke Núcleo 1
  function iniciarKaraokeAudio() {
    const lineas = document.querySelectorAll('#dialogo-karaoke .linea-dialogo');
    if (!lineas.length || !audioLlamada1) return;

    if (karaokeInterval) clearInterval(karaokeInterval);

    lineas.forEach(l => {
      l.classList.remove('activo');
      l.querySelectorAll('.palabra').forEach(p => p.classList.remove('resaltada'));
    });

    karaokeInterval = setInterval(() => {
      if (audioLlamada1.paused || audioLlamada1.ended) {
        clearInterval(karaokeInterval);
        return;
      }

      actualizarSubtitulos(lineas, audioLlamada1.currentTime);
    }, 50);
  }

  // Karaoke Núcleo 2
  function iniciarKaraokeAudioN2() {
    const lineas = document.querySelectorAll('#dialogo-karaoke-n2 .linea-dialogo');
    if (!lineas.length || !audioLlamada2) return;

    if (karaokeIntervalN2) clearInterval(karaokeIntervalN2);

    lineas.forEach(l => {
      l.classList.remove('activo');
      l.querySelectorAll('.palabra').forEach(p => p.classList.remove('resaltada'));
    });

    karaokeIntervalN2 = setInterval(() => {
      if (audioLlamada2.paused || audioLlamada2.ended) {
        clearInterval(karaokeIntervalN2);
        return;
      }

      actualizarSubtitulos(lineas, audioLlamada2.currentTime);
    }, 50);
  }

  function activarLlamada1() {
    limpiarTimersSecuencia();
    ocultar(modalDetalleLibreta);
    mostrar(modalLlamadaActiva4);
    pantalla = 'llamada-activa-4';

    const videoLlamada = modalLlamadaActiva4.querySelector('.fondo-llamada-video');
    if (videoLlamada) {
      videoLlamada.currentTime = 0;
      videoLlamada.play().catch(() => {});
    }

    if (audioLlamada1) {
      audioLlamada1.currentTime = 0;
      audioLlamada1.play().then(() => {
        iniciarKaraokeAudio();
      }).catch(() => {});
    }
  }

  function activarLlamada2() {
    limpiarTimersNucleo2();
    ocultar(modalInfoDelito);
    mostrar(modalLlamadaActivaInfo);
    pantalla = 'llamada-activa-info';

    const videoLlamada = modalLlamadaActivaInfo.querySelector('.fondo-llamada-video');
    if (videoLlamada) {
      videoLlamada.currentTime = 0;
      videoLlamada.play().catch(() => {});
    }

    if (audioLlamada2) {
      audioLlamada2.currentTime = 0;
      audioLlamada2.play().then(() => {
        iniciarKaraokeAudioN2();
      }).catch(() => {});
    }
  }

  if (tarjetaOpcion4_N1 && modalDetalleLibreta) {
    tarjetaOpcion4_N1.addEventListener('click', () => {
      pantalla = 'modal-4';
      limpiarTimersSecuencia();
      
      modalDetalleLibreta.classList.remove('paso-2', 'paso-3', 'cambiado', 'activo');
      void modalDetalleLibreta.offsetWidth;
      modalDetalleLibreta.classList.add('activo');

      ocultar(nucleo1);
      mostrar(modalDetalleLibreta);

      timerPaso2 = setTimeout(() => {
        if (modalDetalleLibreta.classList.contains('visible')) {
          modalDetalleLibreta.classList.add('paso-2');
          reiniciarBarra(modalDetalleLibreta);
        }
      }, 7000);

      timerPaso3 = setTimeout(() => {
        if (modalDetalleLibreta.classList.contains('visible')) {
          modalDetalleLibreta.classList.remove('paso-2');
          modalDetalleLibreta.classList.add('paso-3', 'cambiado');
          reiniciarBarra(modalDetalleLibreta);
        }
      }, 14000);
    });
  }

  document.addEventListener('keydown', (e) => {
    // Núcleo 1 - Opción 4
    if (modalDetalleLibreta && modalDetalleLibreta.classList.contains('visible') && modalDetalleLibreta.classList.contains('paso-3')) {
      if (e.key === '0') {
        activarLlamada1();
      } else if (e.key === '9') {
        limpiarTimersSecuencia();
        modalDetalleLibreta.classList.remove('paso-2', 'paso-3', 'cambiado', 'activo');
        ocultar(modalDetalleLibreta);
        pantalla = 'nucleo-1';
        mostrar(nucleo1);
      }
    }

    // Núcleo 2 - Opción 6
    if (modalInfoDelito && modalInfoDelito.classList.contains('visible') && modalInfoDelito.classList.contains('paso-3')) {
      if (e.key === '0') {
        activarLlamada2();
      } else if (e.key === '9') {
        limpiarTimersNucleo2();
        modalInfoDelito.classList.remove('paso-2', 'paso-3', 'cambiado', 'activo');
        ocultar(modalInfoDelito);
        pantalla = 'nucleo-2';
        mostrar(nucleo2);
      }
    }
  });

  if (btnCerrarLibreta && modalDetalleLibreta) {
    btnCerrarLibreta.addEventListener('click', () => {
      limpiarTimersSecuencia();
      modalDetalleLibreta.classList.remove('paso-2', 'paso-3', 'cambiado', 'activo');
      ocultar(modalDetalleLibreta);
      mostrar(nucleo1);
    });
  }

  if (btnCerrarLlamadaActiva && modalLlamadaActiva4) {
    btnCerrarLlamadaActiva.addEventListener('click', () => {
      if (karaokeInterval) clearInterval(karaokeInterval);
      if (audioLlamada1) {
        audioLlamada1.pause();
        audioLlamada1.currentTime = 0;
      }
      const videoLlamada = modalLlamadaActiva4.querySelector('.fondo-llamada-video');
      if (videoLlamada) {
        videoLlamada.pause();
        videoLlamada.currentTime = 0;
      }
      ocultar(modalLlamadaActiva4);
      mostrar(modalDetalleLibreta);
      pantalla = 'modal-4';
    });
  }

  if (tarjetaOpcion5_N1 && modalEstafaTelefonica) {
    tarjetaOpcion5_N1.addEventListener('click', () => {
      pantalla = 'modal-5';
      ocultar(nucleo1);
      mostrar(modalEstafaTelefonica);
      if (audioVishing) {
        audioVishing.currentTime = 0;
        audioVishing.play().catch(() => {});
      }
    });
  }

  if (btnCerrarEstafa && modalEstafaTelefonica) {
    btnCerrarEstafa.addEventListener('click', () => {
      if (audioVishing) {
        audioVishing.pause();
        audioVishing.currentTime = 0;
      }
      ocultar(modalEstafaTelefonica);
      mostrar(nucleo1);
    });
  }

  if (tarjetaOpcion6_N1 && modalDenuncias) {
    tarjetaOpcion6_N1.addEventListener('click', () => {
      pantalla = 'modal-6';
      ocultar(nucleo1);
      mostrar(modalDenuncias);
    });
  }

  if (btnCerrarDenuncias && modalDenuncias) {
    btnCerrarDenuncias.addEventListener('click', () => {
      ocultar(modalDenuncias);
      mostrar(nucleo1);
    });
  }

  if (tarjetaOpcion4_N2 && modalClonacion) {
    tarjetaOpcion4_N2.addEventListener('click', () => {
      pantalla = 'modal-clonacion';
      ocultar(nucleo2);
      mostrar(modalClonacion);
      if (audioClonacion) {
        audioClonacion.currentTime = 0;
        audioClonacion.play().catch(() => {});
      }
    });
  }

  if (btnCerrarClonacion && modalClonacion) {
    btnCerrarClonacion.addEventListener('click', () => {
      if (audioClonacion) {
        audioClonacion.pause();
        audioClonacion.currentTime = 0;
      }
      ocultar(modalClonacion);
      mostrar(nucleo2);
    });
  }

  if (tarjetaOpcion5_N2 && modalInvestigacion) {
    tarjetaOpcion5_N2.addEventListener('click', () => {
      pantalla = 'modal-investigacion';
      ocultar(nucleo2);
      mostrar(modalInvestigacion);
    });
  }

  if (btnCerrarInvestigacion && modalInvestigacion) {
    btnCerrarInvestigacion.addEventListener('click', () => {
      ocultar(modalInvestigacion);
      mostrar(nucleo2);
    });
  }

  // Núcleo 2 - Opción 6 (Secuencia de 3 pasos)
  if (tarjetaOpcion6_N2 && modalInfoDelito) {
    tarjetaOpcion6_N2.addEventListener('click', () => {
      pantalla = 'modal-infodedelito';
      limpiarTimersNucleo2();

      modalInfoDelito.classList.remove('paso-2', 'paso-3', 'cambiado', 'activo');
      void modalInfoDelito.offsetWidth;
      modalInfoDelito.classList.add('activo');

      ocultar(nucleo2);
      mostrar(modalInfoDelito);

      timerPaso2_N2 = setTimeout(() => {
        if (modalInfoDelito.classList.contains('visible')) {
          modalInfoDelito.classList.add('paso-2');
          reiniciarBarra(modalInfoDelito);
        }
      }, 7000);

      timerPaso3_N2 = setTimeout(() => {
        if (modalInfoDelito.classList.contains('visible')) {
          modalInfoDelito.classList.remove('paso-2');
          modalInfoDelito.classList.add('paso-3', 'cambiado');
          reiniciarBarra(modalInfoDelito);
        }
      }, 14000);
    });
  }

  if (btnCerrarInfoDelito && modalInfoDelito) {
    btnCerrarInfoDelito.addEventListener('click', () => {
      limpiarTimersNucleo2();
      modalInfoDelito.classList.remove('paso-2', 'paso-3', 'cambiado', 'activo');
      ocultar(modalInfoDelito);
      mostrar(nucleo2);
    });
  }

  if (btnCerrarLlamadaActivaInfo && modalLlamadaActivaInfo) {
    btnCerrarLlamadaActivaInfo.addEventListener('click', () => {
      if (karaokeIntervalN2) clearInterval(karaokeIntervalN2);
      if (audioLlamada2) {
        audioLlamada2.pause();
        audioLlamada2.currentTime = 0;
      }
      const videoLlamada = modalLlamadaActivaInfo.querySelector('.fondo-llamada-video');
      if (videoLlamada) {
        videoLlamada.pause();
        videoLlamada.currentTime = 0;
      }
      ocultar(modalLlamadaActivaInfo);
      mostrar(modalInfoDelito);
      pantalla = 'modal-infodedelito';
    });
  }

  if (tarjetaOpcion4_N3 && modalLey) {
    tarjetaOpcion4_N3.addEventListener('click', () => {
      pantalla = 'modal-ley';
      ocultar(nucleo3);
      mostrar(modalLey);
    });
  }

  if (btnCerrarLey && modalLey) {
    btnCerrarLey.addEventListener('click', () => {
      ocultar(modalLey);
      mostrar(nucleo3);
    });
  }

  if (tarjetaOpcion5_N3 && modalRobo) {
    tarjetaOpcion5_N3.addEventListener('click', () => {
      pantalla = 'modal-robo';
      modalRobo.classList.remove('activo');
      void modalRobo.offsetWidth;
      modalRobo.classList.add('activo');
      ocultar(nucleo3);
      mostrar(modalRobo);
    });
  }

  if (btnCerrarRobo && modalRobo) {
    btnCerrarRobo.addEventListener('click', () => {
      modalRobo.classList.remove('activo');
      ocultar(modalRobo);
      mostrar(nucleo3);
    });
  }

  if (tarjetaOpcion6_N3 && modalRedes) {
    tarjetaOpcion6_N3.addEventListener('click', () => {
      pantalla = 'modal-redes';
      modalRedes.classList.remove('cambiado');
      ocultar(nucleo3);
      mostrar(modalRedes);

      if (timerLlamada) clearTimeout(timerLlamada);
      timerLlamada = setTimeout(() => {
        if (modalRedes.classList.contains('visible')) {
          modalRedes.classList.add('cambiado');
        }
      }, 5000);
    });
  }

  if (btnCerrarRedes && modalRedes) {
    btnCerrarRedes.addEventListener('click', () => {
      if (timerLlamada) clearTimeout(timerLlamada);
      modalRedes.classList.remove('cambiado');
      ocultar(modalRedes);
      mostrar(nucleo3);
    });
  }

  // =========================================================
  // EFECTO SPOTLIGHT: hover en los 3 mensajes del menú
  // =========================================================
  const canvasMenu = document.getElementById('canvas-menu');
  const opcionesTarjeta = canvasMenu ? canvasMenu.querySelectorAll('.opcion-tarjeta') : [];

  opcionesTarjeta.forEach(tarjeta => {
    tarjeta.addEventListener('mouseenter', () => {
      canvasMenu.classList.add('hover-activo');
      // Determinar cuál opción se está hover
      canvasMenu.classList.remove('hover-opcion-1', 'hover-opcion-2', 'hover-opcion-3');
      if (tarjeta.classList.contains('opcion-1')) {
        canvasMenu.classList.add('hover-opcion-1');
      } else if (tarjeta.classList.contains('opcion-2')) {
        canvasMenu.classList.add('hover-opcion-2');
      } else if (tarjeta.classList.contains('opcion-3')) {
        canvasMenu.classList.add('hover-opcion-3');
      }
      // Marcar solo la tarjeta activa
      opcionesTarjeta.forEach(t => t.classList.remove('opcion-hover'));
      tarjeta.classList.add('opcion-hover');
    });

    tarjeta.addEventListener('mouseleave', () => {
      tarjeta.classList.remove('opcion-hover');
      canvasMenu.classList.remove('hover-activo', 'hover-opcion-1', 'hover-opcion-2', 'hover-opcion-3');
    });
  });
});
