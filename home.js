/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {
    window.location.href = "login.html";
}


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const API = "http://localhost:3000";


/* =========================================================
   CARREGAR USUÁRIO LOCAL
========================================================= */

const dadosSalvos = localStorage.getItem("usuario");

if (!dadosSalvos) {

    window.location.href = "login.html";

} else {

    try {

        const usuarioLocal = JSON.parse(dadosSalvos);

        if (!usuarioLocal.id) {

            console.error(
                "ID do usuário não encontrado."
            );

        } else {

            carregarUsuario(usuarioLocal.id);

        }

    } catch (error) {

        console.error(
            "Erro ao ler usuário:",
            error
        );

        window.location.href = "login.html";
    }
}


/* =========================================================
   BUSCAR USUÁRIO NO BACKEND
========================================================= */

async function carregarUsuario(id) {

    try {

        const resposta = await fetch(
            `${API}/api/usuario/${id}`
        );


        const dados = await resposta.json();


        if (!resposta.ok) {

            console.error(
                dados.error ||
                "Não foi possível carregar o usuário."
            );

            return;
        }


        const usuario = dados.user;


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
           NOME
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
           ELEMENTOS
        ================================================= */

        const userAvatar =
            document.getElementById(
                "userAvatar"
            );


        const topProfileAvatar =
            document.getElementById(
                "topProfileAvatar"
            );


        /* =================================================
           APLICAR AVATAR
        ================================================= */

        function aplicarAvatar(elemento) {

            if (!elemento) {
                return;
            }


            if (usuario.avatar) {

                elemento.textContent = "";

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


        aplicarAvatar(userAvatar);

        aplicarAvatar(topProfileAvatar);


        /* =================================================
           TITULO DO PERFIL
        ================================================= */

        if (topProfileAvatar) {

            topProfileAvatar.title =
                nome;
        }


        if (userAvatar) {

            userAvatar.title =
                nome;
        }

    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );
    }
}