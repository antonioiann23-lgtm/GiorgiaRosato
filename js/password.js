const PASSWORD = "sunflower";

document.addEventListener("DOMContentLoaded", function () {

    // Controlla se abbiamo già effettuato l'accesso
    if (sessionStorage.getItem("giorgia_access") === "true") {
        return;
    }

    // Crea la schermata
    const overlay = document.createElement("div");

    overlay.id = "password-screen";

    overlay.innerHTML = `
        <div class="password-box">

            <div class="password-heart">❤️</div>

            <h1>Un piccolo segreto...</h1>

            <p>Inserisci la password per entrare</p>

            <input
                type="password"
                id="password-input"
                placeholder="Password"
                autocomplete="off"
            >

            <button id="password-button">
                Entra
            </button>

            <div id="password-error"></div>

        </div>
    `;

    document.body.appendChild(overlay);

    const input = document.getElementById("password-input");
    const button = document.getElementById("password-button");
    const error = document.getElementById("password-error");

    function checkPassword() {

        if (input.value === PASSWORD) {

            sessionStorage.setItem("giorgia_access", "true");

            overlay.remove();

        } else {

            error.textContent = "Password non corretta ❤️";

            input.value = "";

            input.focus();

        }
    }

    button.addEventListener("click", checkPassword);

    input.addEventListener("keydown", function (event) {

        if (event.key === "Enter") {
            checkPassword();
        }

    });

    input.focus();

});
