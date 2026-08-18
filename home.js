/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {
    window.location.href = "login.html";
}


/* =====================================================
   AVATAR
===================================================== */

const avatarContainer =
    document.querySelector(".account-avatar");

const avatar =
    document.getElementById("account-avatar");


if (avatarContainer && avatar) {

    if (usuario.avatar) {

        avatar.textContent = "";

        avatarContainer.style.backgroundImage =
            `url("${usuario.avatar}")`;

        avatarContainer.style.backgroundSize =
            "cover";

        avatarContainer.style.backgroundPosition =
            "center";

        avatarContainer.style.backgroundRepeat =
            "no-repeat";

    } else {

        avatarContainer.style.backgroundImage = "none";

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