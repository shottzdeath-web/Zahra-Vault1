/* =========================================================
   PROTEÇÃO DO PERFIL
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


    const usernameInput =
        document.getElementById(
            "profile-username"
        );


    const emailInput =
        document.getElementById(
            "profile-email"
        );


    const displayInput =
        document.getElementById(
            "profile-display"
        );


    const usernameDisplay =
        document.getElementById(
            "account-username"
        );


    const emailDisplay =
        document.getElementById(
            "account-email"
        );


    const avatar =
        document.getElementById(
            "profile-avatar"
        );


    const avatarInput =
        document.getElementById(
            "avatar-input"
        );


    const avatarButton =
        document.getElementById(
            "change-avatar"
        );


    const saveButton =
        document.getElementById(
            "save-profile"
        );


    const message =
        document.getElementById(
            "profile-message"
        );


    /* =====================================================
       PREENCHER DADOS
    ===================================================== */

    if (usernameInput) {

        usernameInput.value =
            usuario.username || "";

    }


    if (emailInput) {

        emailInput.value =
            usuario.email || "";

    }


    if (displayInput) {

        displayInput.value =
            usuario.displayName ||
            usuario.username ||
            "";

    }


    if (usernameDisplay) {

        usernameDisplay.textContent =
            usuario.username || "Usuário";

    }


    if (emailDisplay) {

        emailDisplay.textContent =
            usuario.email || "—";

    }


    /* =====================================================
       AVATAR
    ===================================================== */

    if (avatar) {

        if (usuario.avatar) {

            avatar.textContent = "";

            avatar.style.backgroundImage =
                `url("${usuario.avatar}")`;

            avatar.style.backgroundSize =
                "cover";

            avatar.style.backgroundPosition =
                "center";

        } else {

            avatar.textContent =
                (usuario.username || "U")
                    .charAt(0)
                    .toUpperCase();

        }

    }


    /* =====================================================
       ESCOLHER AVATAR
    ===================================================== */

    if (avatarButton && avatarInput) {

        avatarButton.addEventListener(
            "click",
            function () {

                avatarInput.click();

            }
        );


        avatarInput.addEventListener(
            "change",
            function () {

                const file =
                    avatarInput.files[0];


                if (!file) {
                    return;
                }


                const reader =
                    new FileReader();


                reader.onload =
                    function (event) {

                        const imagem =
                            event.target.result;


                        if (avatar) {

                            avatar.textContent =
                                "";

                            avatar.style.backgroundImage =
                                `url("${imagem}")`;

                            avatar.style.backgroundSize =
                                "cover";

                            avatar.style.backgroundPosition =
                                "center";

                        }


                        usuario.avatar =
                            imagem;

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================================
       SALVAR PERFIL
    ===================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            function () {

                const username =
                    usernameInput.value.trim();


                const displayName =
                    displayInput.value.trim();


                if (!username) {

                    mostrarMensagem(
                        "Digite um nome de usuário.",
                        true
                    );

                    return;

                }


                usuario.username =
                    username;


                usuario.displayName =
                    displayName || username;


                localStorage.setItem(
                    "usuario",
                    JSON.stringify(usuario)
                );


                if (usernameDisplay) {

                    usernameDisplay.textContent =
                        usuario.username;

                }


                mostrarMensagem(
                    "Perfil atualizado com sucesso."
                );

            }
        );

    }


    /* =====================================================
       MENSAGEM
    ===================================================== */

    function mostrarMensagem(
        texto,
        erro = false
    ) {

        if (!message) {
            return;
        }


        message.textContent =
            texto;


        message.classList.toggle(
            "error",
            erro
        );


        setTimeout(
            function () {

                message.textContent =
                    "";

            },
            3000
        );

    }

}