console.log("Zvory Vault carregada!");

/* =========================================================
   BOTÃO DE VENDEDOR
========================================================= */

const sellerButtons = document.querySelectorAll(".seller-button");
const message = document.querySelector("#message");

sellerButtons.forEach(button => {

    button.addEventListener("click", function(event) {

        /*
         * Se o botão estiver dentro de um link,
         * não bloqueamos a navegação.
         */

        if (message) {

            message.textContent =
                "Em breve você poderá vender na Zvory Vault!";

            message.style.opacity = "1";
            message.style.transform = "translateY(0)";

            setTimeout(() => {

                message.style.opacity = "0";
                message.style.transform = "translateY(20px)";

            }, 3000);

        }

    });

});


/* =========================================================
   MENU MOBILE
========================================================= */

const menuToggle =
    document.getElementById("menu-toggle");

const mainNav =
    document.getElementById("main-nav");


if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {

        mainNav.classList.toggle("active");

    });

}