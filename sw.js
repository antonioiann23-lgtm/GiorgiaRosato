const CACHE_NAME = "giorgia-rosato-v1";

const FILES_TO_CACHE = [
    "./",
    "./index.html",
    "./storia.html",
    "./domanda.html",
    "./finale.html",
    "./exit.html",

    "./style.css",
    "./script.js",

    "./domanda.css",
    "./domanda.js",

    "./finale.css",
    "./finale.js",

    "./exit.css",
    "./exit.js",

    "./js/jspdf.umd.min.js",

    "./Images/Ponza_1_54500_mappa.png",
    "./Images/firmaA-removebg-preview.png",
    "./Images/firmaA.jpeg",
    "./Images/firmag-removebg-preview.png",
    "./Images/firmag.jpeg",
    "./Images/ponza.jpeg",
    "./Images/redvelvet.jpeg",
    "./Images/us.jpeg",
    "./Images/you.jpeg"
];


self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))

    );

});


self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys
                    .filter(key => key !== CACHE_NAME)
                    .map(key => caches.delete(key))

            );

        })

    );

});


self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)
            .then(response => {

                return response || fetch(event.request);

            })

    );

});
