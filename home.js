/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href = "login.html";

}


/* =========================================================
   CARREGAR USUÁRIO
========================================================= */

const dadosSalvos =
    localStorage.getItem("usuario");


if (!dadosSalvos) {

    window.location.href = "login.html";

} else {

    const usuarioLocal =
        JSON.parse(dadosSalvos);


    const usuarioId =
        usuarioLocal.id;


    if (!usuarioId) {

        console.error(
            "ID do usuário não encontrado."
        );

    } else {

        carregarUsuario(usuarioId);

    }

}


/* =========================================================
   BUSCAR USUÁRIO NO BANCO
========================================================= */

async function carregarUsuario(id) {

    try {

        const resposta =
            await fetch(
                `http://localhost:3000/api/usuario/${id}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            console.error(
                dados.error ||
                "Não foi possível carregar o usuário."
            );

            return;

        }


        const usuario =
            dados.user;


        /* ================================================
           ATUALIZAR CACHE LOCAL
        ================================================= */

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );


        /* ================================================
           ELEMENTOS DA HOME
        ================================================= */

        const username =
            document.getElementById(
                "account-username"
            );


        const email =
            document.getElementById(
                "account-email"
            );


        const avatarContainer =
            document.querySelector(
                ".account-avatar"
            );


        const avatar =
            document.getElementById(
                "account-avatar"
            );


        /* ================================================
           NOME
        ================================================= */

        if (username) {

            username.textContent =
                usuario.display_name ||
                usuario.displayName ||
                usuario.username ||
                "Seu usuário";

        }


        /* ================================================
           E-MAIL
        ================================================= */

        if (email) {

            email.textContent =
                usuario.email ||
                "exemplo@gmail.com";

        }


        /* ================================================
           AVATAR
        ================================================= */

        if (
            avatarContainer &&
            avatar
        ) {

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

                avatarContainer.style.backgroundImage =
                    "none";


                avatar.textContent =
                    (
                        usuario.display_name ||
                        usuario.displayName ||
                        usuario.username ||
                        "U"
                    )
                    .charAt(0)
                    .toUpperCase();

            }

        }


    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );

    }

}


/* =========================================================
   MENU DE CONFIGURAÇÕES
========================================================= */

const settingsButton =
    document.getElementById(
        "settings-button"
    );


const settingsDropdown =
    document.getElementById(
        "settings-dropdown"
    );


if (
    settingsButton &&
    settingsDropdown
) {

    settingsButton.addEventListener(
        "click",
        function (event) {

            event.preventDefault();
            event.stopPropagation();

            settingsDropdown.classList.toggle(
                "active"
            );

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

            settingsDropdown.classList.remove(
                "active"
            );

        }
    );

}