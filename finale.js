const immagine = document.getElementById("immagine-finale");

const firmaG = document.getElementById("firma-g");

const xFirma = document.getElementById("x-firma");

const firmaAzione = document.getElementById("firma-azione");

const risultato = document.getElementById("risultato");

const salvaPdf = document.getElementById("salva-pdf");


/* =========================================
   CANVAS DELLA FOTO CON FIRMA A
========================================= */

const canvas = document.createElement("canvas");

const ctx = canvas.getContext("2d");


let fotoPronta = false;


/* =========================================
   CARICA LA FOTO
========================================= */

const foto = new Image();

foto.src = "Images/us.jpeg";


/* =========================================
   CARICA FIRMA A
========================================= */

const firmaA = new Image();

firmaA.src = "Images/firmaA-removebg-preview.png";


Promise.all([

    caricaImmagine(foto),

    caricaImmagine(firmaA)

]).then(() => {

    creaFotoConFirma();

});


/* =========================================
   CREA FOTO + FIRMA A
========================================= */

function creaFotoConFirma() {

    canvas.width = foto.naturalWidth;

    canvas.height = foto.naturalHeight;


    /* Disegna la foto */

    ctx.drawImage(
        foto,
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
        DIMENSIONE FIRMA A

        Puoi modificare questo valore
        se vuoi una firma più grande/piccola.
    */

    const larghezzaFirma =
        canvas.width * 0.25;


    const rapporto =
        firmaA.naturalHeight /
        firmaA.naturalWidth;


    const altezzaFirma =
        larghezzaFirma * rapporto;


    /*
        POSIZIONE FIRMA A

        0.50 = centro orizzontale
        0.87 = posizione verticale

        Se vuoi spostarla:
        x più basso = più a sinistra
        x più alto = più a destra

        y più basso = più in alto
        y più alto = più in basso
    */

    const x =
        canvas.width * 0.43
        - larghezzaFirma / 2;


    const y =
        canvas.height * 0.87
        - altezzaFirma / 2;


    /* Disegna firma A */

    ctx.drawImage(
        firmaA,
        x,
        y,
        larghezzaFirma,
        altezzaFirma
    );


    /* Mostra il risultato */

    immagine.src =
        canvas.toDataURL("image/jpeg", 0.95);


    fotoPronta = true;

}


/* =========================================
   CLICK SULLA X
========================================= */

xFirma.addEventListener("click", () => {

    /* Mostra firma G */

    firmaG.classList.add("visibile");


    /* Nasconde la X */

    setTimeout(() => {

        firmaAzione.classList.add("nascosta");

    }, 500);


    /* Mostra il risultato */

    setTimeout(() => {

        risultato.classList.add("visibile");

    }, 1000);

});


/* =========================================
   CREA PDF
========================================= */

salvaPdf.addEventListener("click", () => {

    if (!fotoPronta) {
        return;
    }

    const { jsPDF } = window.jspdf;

    /* =====================================
       CREA CANVAS FINALE
    ===================================== */

    const pdfCanvas = document.createElement("canvas");

    const pdfCtx = pdfCanvas.getContext("2d");

    pdfCanvas.width = canvas.width;
    pdfCanvas.height = canvas.height;


    /* =====================================
       FOTO + FIRMA A
    ===================================== */

    pdfCtx.drawImage(
        canvas,
        0,
        0
    );


    /* =====================================
       FIRMA G
    ===================================== */

    const larghezzaG =
        pdfCanvas.width * 0.25;

    const rapportoG =
        firmaG.naturalHeight /
        firmaG.naturalWidth;

    const altezzaG =
        larghezzaG * rapportoG;


    const xG =
        pdfCanvas.width * 0.45
        - larghezzaG / 2;


    const yG =
    pdfCanvas.height
    - (pdfCanvas.height * 0.08)
    - altezzaG;


    pdfCtx.save();


    pdfCtx.translate(
        xG + larghezzaG / 2,
        yG + altezzaG / 2
    );


    pdfCtx.rotate(
        -3 * Math.PI / 180
    );


    pdfCtx.drawImage(
        firmaG,
        -larghezzaG / 2,
        -altezzaG / 2,
        larghezzaG,
        altezzaG
    );


    pdfCtx.restore();


    /* =====================================
       CREA IMMAGINE
    ===================================== */

    const immaginePDF =
        pdfCanvas.toDataURL(
            "image/jpeg",
            0.95
        );


    /* =====================================
       CREA PDF
    ===================================== */

    const pdf = new jsPDF({

        orientation:
            pdfCanvas.width >
            pdfCanvas.height
                ? "landscape"
                : "portrait",

        unit: "px",

        format: [
            pdfCanvas.width,
            pdfCanvas.height
        ]

    });


    pdf.addImage(
        immaginePDF,
        "JPEG",
        0,
        0,
        pdfCanvas.width,
        pdfCanvas.height
    );


    /* =====================================
       DOWNLOAD
    ===================================== */

    pdf.save(
        "il-nostro-accordo.pdf"
    );

});


/* =========================================
   FUNZIONE CARICAMENTO IMMAGINE
========================================= */

function caricaImmagine(img) {

    return new Promise((resolve, reject) => {

        if (img.complete && img.naturalWidth > 0) {

            resolve(img);

            return;

        }


        img.onload = () => {

            resolve(img);

        };


        img.onerror = () => {

            reject(
                new Error(
                    "Impossibile caricare " + img.src
                )
            );

        };

    });

}