/* =========================================================
   ORGULLO Y MEMORIA — app.js
   No hace falta tocar este archivo para actualizar el sitio.
   Todo el contenido vive en los .json de /secciones/.
   ========================================================= */
(function () {
  'use strict';

  document.documentElement.classList.add('js');

  var RUTAS = {
    configuracion: 'secciones/configuracion/configuracion.json',
    quienesSomos:  'secciones/quienes-somos/quienes-somos.json',
    videos:        'secciones/videos/videos.json',
    galeria:       'secciones/galeria/galeria.json'
  };

  var MARCADOR = 'assets/img/marcador.svg';

  /* ---------- Carga híbrida: primero el .json, si no, el respaldo ---------- */
  function cargar(clave) {
    return fetch(RUTAS[clave], { cache: 'no-store' })
      .then(function (r) {
        if (!r.ok) throw new Error('HTTP ' + r.status);
        return r.json();
      })
      .catch(function (error) {
        var respaldo = (window.RESPALDO || {})[clave];
        if (respaldo) {
          console.info('[' + clave + '] se usó el archivo de respaldo (' + error.message + ')');
          return respaldo;
        }
        throw error;
      });
  }

  function texto(elemento, valor) {
    var nodo = document.getElementById(elemento);
    if (nodo && valor) nodo.textContent = valor;
  }

  function imagen(id, ruta, alt) {
    var nodo = document.getElementById(id);
    if (!nodo || !ruta) return;
    nodo.src = ruta;
    if (alt) nodo.alt = alt;
    nodo.onerror = function () { nodo.src = MARCADOR; nodo.onerror = null; };
  }

  function enlace(id, url) {
    var nodo = document.getElementById(id);
    if (nodo && url) nodo.href = url;
  }

  function codigo(prefijo, indice) {
    return prefijo + '–' + String(indice + 1).padStart(2, '0');
  }

  function error(contenedor, mensaje) {
    contenedor.innerHTML = '<p class="aviso-error">' + mensaje + '</p>';
  }

  /* =======================================================
     CONFIGURACIÓN GENERAL Y PIE DE PÁGINA
     ======================================================= */
  var ICONOS = {
    youtube:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.2 3.6z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.3 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.3-2.2-.4a3.9 3.9 0 0 1-1.4-.9 3.9 3.9 0 0 1-.9-1.4c-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4 1.3-.1 1.7-.1 4.8-.1zm0 3.4a6.4 6.4 0 1 0 0 12.8 6.4 6.4 0 0 0 0-12.8zm0 10.6a4.2 4.2 0 1 1 0-8.4 4.2 4.2 0 0 1 0 8.4zm6.6-10.9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/></svg>',
    twitter:   '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.2 2.3h3.4l-7.4 8.4 8.7 11.5h-6.8l-5.3-7-6.1 7H1.3l7.9-9-8.3-11h7l4.8 6.3zm-1.2 17.8h1.9L7.1 4.2H5z"/></svg>'
  };

  var BASE_RED = {
    youtube:   'https://www.youtube.com/@',
    instagram: 'https://www.instagram.com/',
    twitter:   'https://x.com/'
  };

  var NOMBRE_RED = { youtube: 'YouTube', instagram: 'Instagram', twitter: 'X (Twitter)' };

  function pintarConfiguracion(config) {
    document.title = (config.nombre || 'Orgullo y Memoria') + ' — Canal de YouTube';

    texto('marca-nombre', config.nombre);
    texto('marca-lema', config.lema);
    texto('portada-texto', config.descripcion);
    texto('portada-ficha', config.ficha);
    texto('pie-descripcion', config.descripcionPie || config.descripcion);
    texto('pie-institucion', config.institucion);
    texto('pie-legal', config.legal);

    imagen('logo-cabecera', config.logoProyecto, 'Logo de ' + (config.nombre || 'Orgullo y Memoria'));
    imagen('logo-pie', config.logoProyecto, 'Logo de ' + (config.nombre || 'Orgullo y Memoria'));
    imagen('escudo-colegio', config.escudoColegio, config.altEscudoColegio);
    imagen('escudo-colegio-pie', config.escudoColegio, config.altEscudoColegio);
    imagen('logo-sena', config.logoSena, config.altLogoSena);
    imagen('logo-sena-pie', config.logoSena, config.altLogoSena);

    var redes = config.redes || {};
    var urlCanal = redes.youtube ? BASE_RED.youtube + limpiar(redes.youtube) : '#';
    enlace('menu-canal', urlCanal);
    enlace('portada-canal', urlCanal);

    var lista = document.getElementById('lista-redes');
    lista.innerHTML = '';
    ['youtube', 'instagram', 'twitter'].forEach(function (red) {
      var arroba = limpiar(redes[red]);
      if (!arroba) return;
      var li = document.createElement('li');
      li.innerHTML =
        '<a href="' + BASE_RED[red] + arroba + '" target="_blank" rel="noopener">' +
        ICONOS[red] +
        '<span>' + NOMBRE_RED[red] + ' <span class="arroba">@' + arroba + '</span></span>' +
        '</a>';
      lista.appendChild(li);
    });
  }

  function limpiar(arroba) {
    return (arroba || '').trim().replace(/^@/, '');
  }

  /* =======================================================
     QUIÉNES SOMOS
     ======================================================= */
  function pintarQuienesSomos(datos) {
    texto('quienes-intro', datos.introduccion);

    var proposito = document.getElementById('proposito');
    proposito.innerHTML = '';
    [['Misión', datos.mision], ['Visión', datos.vision]].forEach(function (par) {
      if (!par[1]) return;
      var caja = document.createElement('article');
      caja.className = 'ficha aparece';
      caja.innerHTML = '<h3>' + par[0] + '</h3><p>' + par[1] + '</p>';
      proposito.appendChild(caja);
    });

    var rejilla = document.getElementById('rejilla-equipo');
    rejilla.innerHTML = '';
    var integrantes = datos.integrantes || [];
    if (!integrantes.length) {
      error(rejilla, 'Todavía no hay integrantes. Agrégalos en secciones/quienes-somos/quienes-somos.json');
      return;
    }
    integrantes.forEach(function (persona) {
      var caja = document.createElement('article');
      caja.className = 'ficha integrante aparece';
      var foto = persona.foto || MARCADOR;
      caja.innerHTML =
        '<img class="integrante__foto" src="' + foto + '" alt="Foto de ' + (persona.nombre || '') + '" ' +
        'onerror="this.onerror=null;this.src=\'' + MARCADOR + '\'">' +
        '<div>' +
        '<h4 class="integrante__nombre">' + (persona.nombre || '') + '</h4>' +
        '<p class="integrante__rol">' + (persona.rol || '') + '</p>' +
        '<p class="integrante__texto">' + (persona.descripcion || '') + '</p>' +
        '</div>';
      rejilla.appendChild(caja);
    });
  }

  /* =======================================================
     VIDEOS
     ======================================================= */
  function miniatura(video) {
    if (video.miniatura) return video.miniatura;
    if (video.video) return 'https://i.ytimg.com/vi/' + video.video + '/maxresdefault.jpg';
    return MARCADOR;
  }

  function pintarVideos(datos) {
    texto('videos-intro', datos.introduccion);

    var rejilla = document.getElementById('rejilla-videos');
    rejilla.innerHTML = '';
    var videos = datos.videos || [];
    if (!videos.length) {
      error(rejilla, 'Todavía no hay videos. Agrégalos en secciones/videos/videos.json');
      return;
    }

    videos.forEach(function (video, i) {
      var url = video.enlace || (video.video ? 'https://www.youtube.com/watch?v=' + video.video : '#');
      var alterna = video.video ? 'https://i.ytimg.com/vi/' + video.video + '/hqdefault.jpg' : MARCADOR;

      var tarjeta = document.createElement('a');
      tarjeta.className = 'video aparece';
      tarjeta.href = url;
      tarjeta.target = '_blank';
      tarjeta.rel = 'noopener';
      tarjeta.innerHTML =
        '<div class="video__marco">' +
          '<img src="' + miniatura(video) + '" alt="Miniatura del video: ' + (video.titulo || '') + '" loading="lazy" ' +
          'onerror="this.onerror=function(){this.onerror=null;this.src=\'' + MARCADOR + '\'};this.src=\'' + alterna + '\'">' +
          '<span class="video__codigo">' + codigo('OM', i) + '</span>' +
          '<span class="video__play" aria-hidden="true"><span></span></span>' +
        '</div>' +
        '<div class="video__cuerpo">' +
          '<h3 class="video__titulo">' + (video.titulo || 'Sin título') + '</h3>' +
          '<p class="video__texto">' + (video.descripcion || '') + '</p>' +
          '<span class="video__enlace">Ver en YouTube →</span>' +
        '</div>';
      rejilla.appendChild(tarjeta);
    });
  }

  /* =======================================================
     GALERÍA + VISOR
     ======================================================= */
  var fotos = [];
  var actual = 0;

  function pintarGaleria(datos) {
    texto('galeria-intro', datos.introduccion);

    var rejilla = document.getElementById('rejilla-galeria');
    rejilla.innerHTML = '';
    fotos = datos.fotos || [];
    if (!fotos.length) {
      error(rejilla, 'Todavía no hay fotos. Agrégalas en secciones/galeria/galeria.json');
      return;
    }

    fotos.forEach(function (foto, i) {
      var boton = document.createElement('button');
      boton.className = 'foto aparece';
      boton.type = 'button';
      boton.setAttribute('aria-label', 'Ampliar: ' + (foto.titulo || 'foto ' + (i + 1)));
      boton.innerHTML =
        '<img src="' + (foto.imagen || MARCADOR) + '" alt="' + (foto.titulo || '') + '" loading="lazy" ' +
        'onerror="this.onerror=null;this.src=\'' + MARCADOR + '\'">' +
        '<span class="foto__codigo">' + codigo('REG', i) + '</span>' +
        (foto.titulo ? '<span class="foto__pie">' + foto.titulo + '</span>' : '');
      boton.addEventListener('click', function () { abrirVisor(i); });
      rejilla.appendChild(boton);
    });
  }

  var visor = document.getElementById('visor');
  var visorImagen = document.getElementById('visor-imagen');
  var visorPie = document.getElementById('visor-pie');

  function abrirVisor(indice) {
    actual = indice;
    var foto = fotos[actual];
    visorImagen.src = foto.imagen || MARCADOR;
    visorImagen.alt = foto.titulo || '';
    visorPie.textContent = [codigo('REG', actual), foto.titulo, foto.descripcion]
      .filter(Boolean).join(' · ');
    visor.hidden = false;
    document.body.style.overflow = 'hidden';
    document.getElementById('visor-cerrar').focus();
  }

  function cerrarVisor() {
    visor.hidden = true;
    document.body.style.overflow = '';
  }

  function mover(paso) {
    if (!fotos.length) return;
    abrirVisor((actual + paso + fotos.length) % fotos.length);
  }

  document.getElementById('visor-cerrar').addEventListener('click', cerrarVisor);
  document.getElementById('visor-previa').addEventListener('click', function () { mover(-1); });
  document.getElementById('visor-siguiente').addEventListener('click', function () { mover(1); });
  visor.addEventListener('click', function (e) { if (e.target === visor) cerrarVisor(); });
  document.addEventListener('keydown', function (e) {
    if (visor.hidden) return;
    if (e.key === 'Escape') cerrarVisor();
    if (e.key === 'ArrowLeft') mover(-1);
    if (e.key === 'ArrowRight') mover(1);
  });

  /* =======================================================
     MENÚ MÓVIL
     ======================================================= */
  var boton = document.getElementById('menu-boton');
  var menu = document.getElementById('menu');
  boton.addEventListener('click', function () {
    var abierto = menu.classList.toggle('abierto');
    boton.setAttribute('aria-expanded', String(abierto));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      menu.classList.remove('abierto');
      boton.setAttribute('aria-expanded', 'false');
    }
  });

  /* =======================================================
     APARICIÓN AL DESPLAZAR
     ======================================================= */
  function observarAparicion() {
    if (!('IntersectionObserver' in window)) {
      document.querySelectorAll('.aparece').forEach(function (n) { n.classList.add('visible'); });
      return;
    }
    var observador = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visible');
          observador.unobserve(entrada.target);
        }
      });
    }, { threshold: .12 });
    document.querySelectorAll('.aparece:not(.visible)').forEach(function (n) { observador.observe(n); });
  }

  /* =======================================================
     ARRANQUE
     ======================================================= */
  function fallo(seccion) {
    return function (e) {
      console.error('No se pudo cargar ' + seccion, e);
    };
  }

  cargar('configuracion').then(pintarConfiguracion).catch(fallo('la configuración'));

  Promise.allSettled([
    cargar('quienesSomos').then(pintarQuienesSomos).catch(fallo('quiénes somos')),
    cargar('videos').then(pintarVideos).catch(fallo('los videos')),
    cargar('galeria').then(pintarGaleria).catch(fallo('la galería'))
  ]).then(observarAparicion);

})();
