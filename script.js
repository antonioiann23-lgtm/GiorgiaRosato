const testo1 = `
Non sono sicuro che questo sia il momento giusto.

Forse è passato ancora poco tempo.
Non lo so.

E sinceramente non so nemmeno se esista
davvero un momento giusto per certe cose.
`;

const testo2 = `
Ma da qualche giorno a questa parte
sento che qualcosa nei tuoi confronti sta cambiando.

Forse da Ponza.
Forse da prima.

Non riesco più a pensare a te
come a una semplice frequentazione.

E quando sottolineo che io e te
non stiamo insieme,
che siamo solo "amici",

sinceramente...

non ci credo più nemmeno io.
`;

const testo3 = `
Come ben sai,
io non ho mai fatto questo passo.

E credimi,
mi fa molta paura.

Perché sono una persona
che non fa niente con leggerezza.

Ma sentivo di farlo.
Proprio in questo momento.
`;


function scriviTesto(elemento, testo, velocita = 28) {

    return new Promise((resolve) => {

        let indice = 0;

        function scrivi() {

            if (indice < testo.length) {

                elemento.textContent += testo.charAt(indice);

                indice++;

                setTimeout(scrivi, velocita);

            } else {

                resolve();

            }

        }

        scrivi();

    });

}


async function avviaStoria() {

    const elemento1 = document.getElementById("testo1");
    const elemento2 = document.getElementById("testo2");
    const elemento3 = document.getElementById("testo3");

    const ponza = document.getElementById("ponza");
    const continua = document.getElementById("continua");


    // Se non siamo nella pagina della storia,
    // non facciamo nulla.

    if (!elemento1) {
        return;
    }


    // -------------------------
    // PRIMA PARTE
    // -------------------------

    await scriviTesto(
        elemento1,
        testo1,
        25
    );


    // Piccola pausa

    await new Promise(resolve => {
        setTimeout(resolve, 800);
    });


    // -------------------------
    // PONZA
    // -------------------------

    ponza.style.display = "block";

    ponza.style.animation = "comparsa 1s ease";


    await new Promise(resolve => {
        setTimeout(resolve, 1800);
    });


    // -------------------------
    // SECONDA PARTE
    // -------------------------

    await scriviTesto(
        elemento2,
        testo2,
        24
    );


    await new Promise(resolve => {
        setTimeout(resolve, 700);
    });


    // -------------------------
    // TERZA PARTE
    // -------------------------

    await scriviTesto(
        elemento3,
        testo3,
        25
    );


    // -------------------------
    // PAUSA FINALE
    // -------------------------

    await new Promise(resolve => {
        setTimeout(resolve, 2500);
    });


    // -------------------------
    // MOSTRA IL DOLCETTO
    // -------------------------

    continua.classList.add("visibile");

}


avviaStoria();