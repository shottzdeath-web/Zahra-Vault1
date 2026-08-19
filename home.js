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
   CONFIGURAÇÃO
========================================================= */

const API =
    "http://localhost:3000";


/* =========================================================
   CARREGAR USUÁRIO LOCAL
========================================================= */

const dadosSalvos =
    localStorage.getItem("usuario");


if (!dadosSalvos) {

    window.location.href =
        "login.html";

} else {

    try {

        const usuarioLocal =
            JSON.parse(dadosSalvos);


        if (!usuarioLocal.id) {

            console.error(
                "ID do usuário não encontrado."
            );

        } else {

            carregarUsuario(
                usuarioLocal.id
            );

        }

    } catch (error) {

        console.error(
            "Erro ao ler usuário:",
            error
        );

        window.location.href =
            "login.html";

    }

}


/* =========================================================
   BUSCAR USUÁRIO NO BACKEND
========================================================= */

async function carregarUsuario(id) {

    try {

        const resposta =
            await fetch(
                `${API}/api/usuario/${id}`
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


        if (!usuario) {

            console.error(
                "Usuário não encontrado."
            );

            return;

        }


        /* =================================================
           ATUALIZAR CACHE
        ================================================= */

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );


        /* =================================================
           DADOS DO PERFIL
        ================================================= */

        const nome =
            usuario.displayName ||
            usuario.display_name ||
            usuario.username ||
            "Usuário";


        const letra =
            nome
                .charAt(0)
                .toUpperCase();


        /* =================================================
           ELEMENTOS DA HOME
        ================================================= */

        const username =
            document.getElementById(
                "username"
            );


        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        const sidebarAvatar =
            document.getElementById(
                "sidebarAvatar"
            );


        const memberUsername =
            document.getElementById(
                "memberUsername"
            );


        const chatUsername =
            document.getElementById(
                "chatUsername"
            );


        const topProfileAvatar =
            document.getElementById(
                "topProfileAvatar"
            );


        /* =================================================
           NOME NA SIDEBAR
        ================================================= */

        if (username) {

            username.textContent =
                nome;

        }


        /* =================================================
           NOME NOS MEMBROS
        ================================================= */

        if (memberUsername) {

            memberUsername.textContent =
                nome;

        }


        /* =================================================
           NOME NO CHAT PREVIEW
        ================================================= */

        if (chatUsername) {

            chatUsername.textContent =
                nome;

        }


        /* =================================================
           AVATAR
        ================================================= */

        function aplicarAvatar(elemento) {

            if (!elemento) {
                return;
            }


            if (usuario.avatar) {

                elemento.textContent =
                    "";


                elemento.style.backgroundImage =
                    `url("${usuario.avatar}")`;


                elemento.style.backgroundSize =
                    "cover";


                elemento.style.backgroundPosition =
                    "center";


                elemento.style.backgroundRepeat =
                    "no-repeat";


            } else {

                elemento.style.backgroundImage =
                    "none";


                elemento.textContent =
                    letra;

            }

        }


        /* =================================================
           APLICAR AVATAR
        ================================================= */

        aplicarAvatar(
            userAvatar
        );


        aplicarAvatar(
            sidebarAvatar
        );


        aplicarAvatar(
            topProfileAvatar
        );


        /* =================================================
           PERFIL DO TOPO
        ================================================= */

        if (topProfileAvatar) {

            topProfileAvatar.title =
                nome;

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