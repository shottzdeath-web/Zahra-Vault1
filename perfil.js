/* =========================================================
   PERFIL ZVORY VAULT
========================================================= */

console.log("perfil.js carregado");


/* =========================================================
   PROTEÇÃO
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {
    window.location.href = "login.html";
}


/* =========================================================
   ELEMENTOS
========================================================= */

const avatar =
    document.getElementById("profile-avatar");

const avatarLetter =
    document.getElementById("avatar-letter");

const avatarInput =
    document.getElementById("avatar-input");

const changeAvatar =
    document.getElementById("change-avatar");

const editProfile =
    document.getElementById("edit-profile");

const editor =
    document.getElementById("profile-editor");

const closeEditor =
    document.getElementById("close-editor");

const usernameInput =
    document.getElementById("profile-username");

const displayInput =
    document.getElementById("profile-display");

const bioInput =
    document.getElementById("profile-bio");

const emailInput =
    document.getElementById("profile-email");

const saveButton =
    document.getElementById("save-profile");

const message =
    document.getElementById("profile-message");


const displayName =
    document.getElementById("profile-display-name");

const usernameDisplay =
    document.getElementById("profile-username-display");

const bioDisplay =
    document.getElementById("profile-bio-display");

const bioDetails =
    document.getElementById("profile-bio-details");

const infoUsername =
    document.getElementById("info-username");

const infoEmail =
    document.getElementById("info-email");


/* =========================================================
   USUÁRIO
========================================================= */

let usuario = null;

const dadosSalvos =
    localStorage.getItem("usuario");


if (dadosSalvos) {

    try {

        usuario =
            JSON.parse(dadosSalvos);

    } catch (error) {

        console.error(
            "Erro ao ler usuário:",
            error
        );

    }

}


if (!usuario) {

    window.location.href = "login.html";

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
            usuario.email || "—";

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
   AVATAR
========================================================= */

function renderizarAvatar() {

    if (!avatar) {
        return;
    }


    if (usuario.avatar) {

        avatar.innerHTML = "";


        const imagem =
            document.createElement("img");


        imagem.src =
            usuario.avatar;


        imagem.alt =
            "Avatar";


        imagem.style.width =
            "100%";


        imagem.style.height =
            "100%";


        imagem.style.objectFit =
            "cover";


        imagem.style.borderRadius =
            "inherit";


        avatar.appendChild(
            imagem
        );


    } else {

        avatar.innerHTML =
            `<span id="avatar-letter">${
                (
                    usuario.displayName ||
                    usuario.display_name ||
                    usuario.username ||
                    "U"
                )
                .charAt(0)
                .toUpperCase()
            }</span>`;

    }

}


/* =========================================================
   EDITAR PERFIL
========================================================= */

if (editProfile) {

    editProfile.addEventListener(
        "click",
        function () {

            console.log(
                "Botão editar clicado"
            );


            if (editor) {

                editor.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   FECHAR EDITOR
========================================================= */

if (closeEditor) {

    closeEditor.addEventListener(
        "click",
        function () {

            console.log(
                "Botão fechar clicado"
            );


            if (editor) {

                editor.classList.remove(
                    "active"
                );

            }

        }
    );

}


/* =========================================================
   ALTERAR AVATAR
========================================================= */

if (changeAvatar) {

    changeAvatar.addEventListener(
        "click",
        function () {

            console.log(
                "Botão avatar clicado"
            );


            if (avatarInput) {

                avatarInput.click();

            }

        }
    );

}


if (avatarInput) {

    avatarInput.addEventListener(
        "change",
        function () {

            const arquivo =
                avatarInput.files[0];


            if (!arquivo) {
                return;
            }


            if (
                !arquivo.type.startsWith(
                    "image/"
                )
            ) {

                mostrarMensagem(
                    "Escolha uma imagem válida.",
                    true
                );

                return;

            }


            const leitor =
                new FileReader();


            leitor.onload =
                function (event) {

                    usuario.avatar =
                        event.target.result;


                    salvarLocal();


                    renderizarAvatar();


                    mostrarMensagem(
                        "Avatar atualizado."
                    );

                };


            leitor.readAsDataURL(
                arquivo
            );

        }
    );

}


/* =========================================================
   SALVAR PERFIL
========================================================= */

if (saveButton) {

    saveButton.addEventListener(
        "click",
        async function () {

            console.log(
                "Salvar perfil clicado"
            );


            const novoUsername =
                usernameInput
                    ? usernameInput.value.trim()
                    : "";


            const novoDisplay =
                displayInput
                    ? displayInput.value.trim()
                    : "";


            const novaBio =
                bioInput
                    ? bioInput.value.trim()
                    : "";


            if (!novoUsername) {

                mostrarMensagem(
                    "Digite um nome de usuário.",
                    true
                );

                return;

            }


            usuario.username =
                novoUsername;


            usuario.displayName =
                novoDisplay ||
                novoUsername;


            usuario.bio =
                novaBio;


            /*
             * Primeiro salva localmente.
             * Isso mantém o perfil funcionando
             * mesmo durante o desenvolvimento.
             */

            salvarLocal();


            renderizarPerfil();


            /*
             * Depois tenta sincronizar
             * com o backend.
             */

            if (usuario.id) {

                try {

                    const resposta =
                        await fetch(
                            `http://localhost:3000/api/usuario/${usuario.id}`,
                            {

                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify({

                                        username:
                                            usuario.username,

                                        email:
                                            usuario.email,

                                        displayName:
                                            usuario.displayName,

                                        bio:
                                            usuario.bio,

                                        avatar:
                                            usuario.avatar ||
                                            ""

                                    })

                            }
                        );


                    const dados =
                        await resposta.json();


                    if (resposta.ok) {

                        const usuarioBanco =
                            dados.user;


                        usuario =
                            {

                                id:
                                    usuarioBanco.id,

                                username:
                                    usuarioBanco.username,

                                email:
                                    usuarioBanco.email,

                                displayName:
                                    usuarioBanco.display_name,

                                bio:
                                    usuarioBanco.bio,

                                avatar:
                                    usuarioBanco.avatar

                            };


                        salvarLocal();

                        renderizarPerfil();

                    }

                } catch (error) {

                    console.log(
                        "Backend não disponível. Perfil salvo localmente."
                    );

                }

            }


            mostrarMensagem(
                "Perfil atualizado com sucesso."
            );

        }
    );

}


/* =========================================================
   LOCALSTORAGE
========================================================= */

function salvarLocal() {

    localStorage.setItem(
        "usuario",
        JSON.stringify(usuario)
    );

}


/* =========================================================
   MENSAGEM
========================================================= */

function mostrarMensagem(
    texto,
    erro = false
) {

    if (!message) {
        return;
    }


    message.textContent =
        texto;


    message.style.color =
        erro
            ? "#aaa"
            : "#ddd";


    setTimeout(
        function () {

            message.textContent =
                "";

        },
        3000
    );

}


/* =========================================================
   INICIAR
========================================================= */

renderizarPerfil();