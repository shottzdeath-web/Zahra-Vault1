/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado =
    localStorage.getItem("logado");


if (logado !== "true") {

    window.location.href =
        "login.html";

}


/* =========================================================
   CARREGAR DADOS DO USUÁRIO
========================================================= */

const dadosSalvos =
    localStorage.getItem("usuario");


if (!dadosSalvos) {

    window.location.href =
        "login.html";

} else {

    const usuario =
        JSON.parse(dadosSalvos);


    const username =
        document.getElementById(
            "account-username"
        );


    const email =
        document.getElementById(
            "account-email"
        );


    const avatar =
        document.getElementById(
            "account-avatar"
        );


    /* =====================================================
       USUÁRIO
    ===================================================== */

    if (username) {

        username.textContent =
            usuario.username;

    }


    /* =====================================================
       E-MAIL
    ===================================================== */

    if (email) {

        email.textContent =
            usuario.email;

    }


    /* =====================================================
       AVATAR
    ===================================================== */

    if (avatar) {

        avatar.textContent =
            usuario.username
                .charAt(0)
                .toUpperCase();

    }

}