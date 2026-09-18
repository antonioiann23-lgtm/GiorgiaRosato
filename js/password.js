(function () {
    const PASSWORD = "sunflower";
    const ACCESS_KEY = "giorgia_site_access";

    // Se l'accesso è già stato autorizzato in questa sessione,
    // lascia visualizzare normalmente la pagina.
    if (sessionStorage.getItem(ACCESS_KEY) === "true") {
        return;
    }

    // Nasconde temporaneamente il contenuto della pagina
    document.documentElement.style.visibility = "hidden";

    function createPasswordScreen() {
        document.documentElement.style.visibility = "visible";

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
                sessionStorage.setItem(ACCESS_KEY, "true");

                overlay.remove();

                document.body.classList.remove("password-locked");
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
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", createPasswordScreen);
    } else {
        createPasswordScreen();
    }
})();
