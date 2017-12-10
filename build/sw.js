(global => {
  'use strict';

  var now = new Date();
  var onejan = new Date(now.getFullYear(), 0, 1);
  var week = Math.ceil( (((now - onejan) / 86400000) + onejan.getDay() + 1) / 7 );
  var ver = now.toISOString().substring(0, 7);
  var versionCache = '-FTUMJIV-story-' + ver + '-' + week

  // Load the sw-tookbox library.
  importScripts('/story/sw-toolbox.js');

  // Turn on debug logging, visible in the Developer Tools' console.
  // global.toolbox.options.debug = true;
  toolbox.precache([]);

  toolbox.router.get('/story/sw/*', global.toolbox.cacheFirst, {
      cache: {
          name: 'serviceWorkerCache' + versionCache,
          maxEntries: 200
      }
  });
  toolbox.router.get('/story/**/*.{css}', global.toolbox.cacheFirst, {
    cache: {
      name: 'staticCssCache' + versionCache,
      maxEntries: 200
    }
  });
  toolbox.router.get('/story/**/*.{js}', global.toolbox.cacheFirst, {
    cache: {
      name: 'staticJsCache' + versionCache,
      maxEntries: 200
    }
  });  
  toolbox.router.get(/\.(?:png|gif|jpg)$/, global.toolbox.cacheFirst, {
    cache: {
      name: 'imageCache' + versionCache,
      maxEntries: 200
    }
  });

  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'googleapis',
      maxEntries: 20,
    },
    origin: /\.googleapis\.com$/
  });    
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'cloudflare',
      maxEntries: 20,
    },
    origin: /\.cloudflare\.com$/
  });  
  toolbox.router.get('/(.*)', global.toolbox.cacheFirst, {
    cache: {
      name: 'code-jquery',
      maxEntries: 20,
    },
    origin: /\.code\.jquery\.com$/
  });

  // Boilerplate to ensure our service worker takes control of the page as soon as possible.
  global.addEventListener('install', event => event.waitUntil(global.skipWaiting()));
  global.addEventListener('activate', event => event.waitUntil(global.clients.claim()));
})(self);
