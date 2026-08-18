/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {
    window.location.href = "login.html";
}


/* =========================================================
   CARREGAR DADOS DO USUÁRIO
========================================================= */

const dadosSalvos = localStorage.getItem("usuario");

if (!dadosSalvos) {

    window.location.href = "login.html";

} else {

    const usuario = JSON.parse(dadosSalvos);

    const username =
        document.getElementById("account-username");

    const email =
        document.getElementById("account-email");

    const avatar =
        document.getElementById("account-avatar");


    if (username) {

        username.textContent =
            usuario.displayName ||
            usuario.username ||
            "Usuário";

    }


    if (email) {

        email.textContent =
            usuario.email || "—";

    }


    if (avatar) {

        if (usuario.avatar) {

            avatar.textContent = "";

            avatar.style.backgroundImage =
                `url("${usuario.avatar}")`;

            avatar.style.backgroundSize = "cover";
            avatar.style.backgroundPosition = "center";
            avatar.style.backgroundRepeat = "no-repeat";

        } else {

            avatar.textContent =
                (
                    usuario.displayName ||
                    usuario.username ||
                    "U"
                )
                .charAt(0)
                .toUpperCase();

        }

    }

}


/* =========================================================
   MENU DE CONFIGURAÇÕES
========================================================= */

const settingsButton =
    document.getElementById("settings-button");

const settingsDropdown =
    document.getElementById("settings-dropdown");


if (settingsButton && settingsDropdown) {

    settingsButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            settingsDropdown.classList.toggle("active");

        }
    );


    settingsDropdown.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );


    document.addEventListener(
        "click",
        function () {

            settingsDropdown.classList.remove("active");

        }
    );

}