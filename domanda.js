const preambolo = document.getElementById("preambolo");
const chat = document.getElementById("chat");

const messaggioUtente = document.querySelector(".utente");
const messaggioAssistente = document.querySelector(".assistente");

const domandaChat = document.getElementById("domanda-chat");
const rispostaChat = document.getElementById("risposta-chat");

const scelta = document.getElementById("scelta");

const bottoneSi = document.getElementById("si");
const bottoneNo = document.getElementById("no");

const errore = document.getElementById("errore");
const erroreTesto = document.getElementById("errore-testo");
const chiudiErrore = document.getElementById("chiudi-errore");


/* =========================================
   DOMANDA
========================================= */

const domanda = `
Hey Chat, dimmi 10 modi carini per dire
ad una ragazza brillante, bellissima,
ma soprattutto all'unica persona che riesce
a farmi veramente sorridere,
se vuole essere la mia fidanzata.
`;


/* =========================================
   RISPOSTE
========================================= */

const risposte = [

    "Potresti dirle: \"Tra tutte le cose belle che mi sono capitate, tu sei decisamente la mia preferita. Ti va di essere la mia fidanzata?\"",

    "Oppure: \"Non so se esista un modo perfetto per dirtelo, quindi te lo dico semplicemente: mi piaci da morire. Vuoi essere la mia fidanzata?\"",

    "Potresti essere diretto: \"Sei brillante, sei bellissima e, inspiegabilmente, riesci sempre a farmi sorridere. Credo di essermi innamorato di te. Vuoi stare con me?\"",

    "Un'altra possibilità: \"Ho cercato mille modi per dirtelo, ma alla fine c'è una sola domanda che conta davvero: vuoi essere la mia ragazza?\"",

    "Oppure qualcosa di più romantico: \"Tra tutte le persone che avrei potuto incontrare, sono felice di aver incontrato proprio te. Ti va di diventare la mia fidanzata?\"",

    "Potresti dirle: \"Non prometto di avere sempre le parole giuste, ma prometto che con te ho sempre voglia di trovarle. Vuoi essere la mia fidanzata?\"",

    "Una versione semplice: \"Mi fai ridere, mi fai stare bene e sei la persona che vorrei accanto a me. Vuoi essere la mia ragazza?\"",

    "Oppure: \"Credo che tu sia diventata una di quelle persone di cui non vorrei più fare a meno. Quindi provo a chiedertelo: vuoi essere la mia fidanzata?\"",

    "Una un po' più audace: \"Ho un piccolo problema: mi piaci troppo. L'unica soluzione che mi viene in mente è chiederti se vuoi essere la mia fidanzata.\"",

    "E infine, forse la più sincera: \"Non mi serve una frase perfetta. Mi basta dirti che sei la ragazza che riesce a farmi sorridere davvero e che vorrei continuare a farlo insieme a te. Vuoi essere la mia fidanzata?\""

];


/* =========================================
   SCRITTURA AUTOMATICA
========================================= */

function scriviTesto(elemento, testo, velocita = 25) {

    return new Promise((resolve) => {

        elemento.textContent = "";

        elemento.classList.add("typing");

        let indice = 0;

        const intervallo = setInterval(() => {

            elemento.textContent += testo.charAt(indice);

            indice++;

            if (indice >= testo.length) {

                clearInterval(intervallo);

                elemento.classList.remove("typing");

                resolve();
            }

        }, velocita);

    });

}


/* =========================================
   PAUSA
========================================= */

function aspetta(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}


/* =========================================
   AVVIO
========================================= */

async function avviaChat() {

    await aspetta(1800);

    chat.classList.add("visibile");

    await aspetta(1000);

    messaggioUtente.classList.add("visibile");

    await scriviTesto(
        domandaChat,
        domanda,
        18
    );

    await aspetta(1200);

    messaggioAssistente.classList.add("visibile");

    rispostaChat.innerHTML =
        `<p class="risposta-introduzione">
            Certo. Dopo un'attenta analisi della situazione,
            direi che hai un problema piuttosto semplice:
            <br><br>
            <strong>ti piace davvero tanto.</strong>
            <br><br>
            Ecco 10 modi per chiederglielo:
        </p>`;

    const lista = document.createElement("ol");

    lista.className = "risposta-lista";

    rispostaChat.appendChild(lista);

    for (let i = 0; i < risposte.length; i++) {

        const li = document.createElement("li");

        lista.appendChild(li);

        await scriviTesto(
            li,
            risposte[i],
            12
        );

        await aspetta(350);
    }

    await aspetta(1200);

    scelta.classList.add("visibile");

}


/* =========================================
   BOTTONE SÌ
========================================= */

bottoneSi.addEventListener("click", () => {

    window.location.href = "finale.html";

});


/* =========================================
   BOTTONE NO
========================================= */

const errori = [

    "Risposta non valida.",

    "Errore 404: il 'No' non è stato trovato.",

    "Operazione impossibile. Hai sicuramente cliccato il pulsante sbagliato.",

    "Attenzione: questa risposta non sembra essere contemplata dal sistema.",

    "Errore critico. Prova a scegliere Sì.",

    "Il sistema ha analizzato la risposta e ha deciso di non accettarla.",

    "Risposta rifiutata. Motivo: non pervenuto.",

    "Qualcosa è andato storto. Suggerimento: prova con Sì.",

    "Errore irreversibile: forse dovresti riprovare.",

    "Questa opzione sembra non essere disponibile. Che strano."
];


let numeroErrore = 0;


bottoneNo.addEventListener("click", () => {

    erroreTesto.textContent =
        errori[numeroErrore % errori.length];

    numeroErrore++;

    errore.classList.add("visibile");

});


/* =========================================
   CHIUDI POPUP
========================================= */

chiudiErrore.addEventListener("click", () => {

    errore.classList.remove("visibile");

});


/* Chiudi cliccando fuori dal popup */

errore.addEventListener("click", (evento) => {

    if (evento.target === errore) {

        errore.classList.remove("visibile");

    }

});


/* =========================================
   AVVIA
========================================= */

avviaChat();