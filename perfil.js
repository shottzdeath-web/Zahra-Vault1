/* =========================================================
   PERFIL ZVORY VAULT
========================================================= */

console.log("perfil.js carregado");


/* =========================================================
   CONFIGURAÇÃO
========================================================= */

const API =
    "http://localhost:3000";


/* =========================================================
   PROTEÇÃO
========================================================= */

const logado =
    localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href =
        "login.html";

}


/* =========================================================
   USUÁRIO
========================================================= */

let usuario = null;

const dadosSalvos =
    localStorage.getItem("usuario");


if (!dadosSalvos) {

    window.location.href =
        "login.html";

} else {

    try {

        usuario =
            JSON.parse(dadosSalvos);

    } catch (error) {

        console.error(
            "Erro ao ler usuário:",
            error
        );

        localStorage.removeItem(
            "usuario"
        );

        localStorage.removeItem(
            "logado"
        );

        window.location.href =
            "login.html";

    }

}


if (!usuario || !usuario.id) {

    console.error(
        "Usuário ou ID não encontrado."
    );

}


/* =========================================================
   ELEMENTOS
========================================================= */

const avatar =
    document.getElementById(
        "profile-avatar"
    );

const avatarInput =
    document.getElementById(
        "avatar-input"
    );

const changeAvatar =
    document.getElementById(
        "change-avatar"
    );

const editProfile =
    document.getElementById(
        "edit-profile"
    );

const editor =
    document.getElementById(
        "profile-editor"
    );

const closeEditor =
    document.getElementById(
        "close-editor"
    );

const usernameInput =
    document.getElementById(
        "profile-username"
    );

const displayInput =
    document.getElementById(
        "profile-display"
    );

const bioInput =
    document.getElementById(
        "profile-bio"
    );

const emailInput =
    document.getElementById(
        "profile-email"
    );

const saveButton =
    document.getElementById(
        "save-profile"
    );

const message =
    document.getElementById(
        "profile-message"
    );


const displayName =
    document.getElementById(
        "profile-display-name"
    );

const usernameDisplay =
    document.getElementById(
        "profile-username-display"
    );

const bioDisplay =
    document.getElementById(
        "profile-bio-display"
    );

const bioDetails =
    document.getElementById(
        "profile-bio-details"
    );

const infoUsername =
    document.getElementById(
        "info-username"
    );

const infoEmail =
    document.getElementById(
        "info-email"
    );


/* =========================================================
   CARREGAR PERFIL DO BANCO
========================================================= */

async function carregarPerfil() {

    if (!usuario || !usuario.id) {

        console.error(
            "ID do usuário não disponível."
        );

        renderizarPerfil();

        return;

    }


    try {

        console.log(
            "Buscando usuário no banco:",
            usuario.id
        );


        const resposta =
            await fetch(
                `${API}/api/usuario/${usuario.id}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            console.error(
                "Erro ao carregar perfil:",
                dados.error
            );

            renderizarPerfil();

            return;

        }


        if (dados.user) {

            usuario = {

                id:
                    dados.user.id,

                username:
                    dados.user.username,

                email:
                    dados.user.email,

                displayName:
                    dados.user.display_name ||
                    dados.user.username,

                bio:
                    dados.user.bio ||
                    "",

                avatar:
                    dados.user.avatar ||
                    ""

            };


            salvarLocal();

        }


    } catch (error) {

        console.error(
            "Não foi possível conectar ao backend:",
            error
        );

    }


    renderizarPerfil();

}


/* =========================================================
   RENDERIZAR PERFIL
========================================================= */

function renderizarPerfil() {

    if (!usuario) {
        return;
    }


    const username =
        usuario.username ||
        "usuario";


    const nome =
        usuario.displayName ||
        usuario.display_name ||
        username ||
        "Usuário";


    const bio =
        usuario.bio ||
        "Este usuário ainda não adicionou uma bio.";


    if (displayName) {

        displayName.textContent =
            nome;

    }


    if (usernameDisplay) {

        usernameDisplay.textContent =
            "@" + username;

    }


    if (bioDisplay) {

        bioDisplay.textContent =
            bio;

    }


    if (bioDetails) {

        bioDetails.textContent =
            bio;

    }


    if (infoUsername) {

        infoUsername.textContent =
            username;

    }


    if (infoEmail) {

        infoEmail.textContent =
            usuario.email ||
            "—";

    }


    if (usernameInput) {

        usernameInput.value =
            username;

    }


    if (displayInput) {

        displayInput.value =
            usuario.displayName ||
            usuario.display_name ||
            username;

    }


    if (bioInput) {

        bioInput.value =
            usuario.bio ||
            "";

    }


    if (emailInput) {

        emailInput.value =
            usuario.email ||
            "";

    }


    renderizarAvatar();

}


/* =========================================================
   RENDERIZAR AVATAR
========================================================= */

function renderizarAvatar() {

    if (!avatar) {
        return;
    }


    avatar.innerHTML = "";


    if (usuario.avatar) {

        const imagem =
            document.createElement(
                "img"
            );


        imagem.src =
            usuario.avatar;