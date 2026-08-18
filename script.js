/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mainNav =
    document.getElementById("main-nav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener(
        "click",
        function () {

            mainNav.classList.toggle("active");

        }
    );


    mainNav
        .querySelectorAll("a")
        .forEach(link => {

            link.addEventListener(
                "click",
                function () {

                    mainNav.classList.remove("active");

                }
            );

        });

}


/* =========================================================
   LOGOUT
========================================================= */

const logout =
    document.getElementById("logout");

const footerLogout =
    document.getElementById("footer-logout");


function sair() {

    localStorage.removeItem("logado");

    window.location.href = "index.html";

}


if (logout) {

    logout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sair();

        }
    );

}


if (footerLogout) {

    footerLogout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sair();

        }
    );

}
const settingsLogout =
    document.getElementById("settings-logout");


if (settingsLogout) {

    settingsLogout.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            sair();

        }
    );

}