/* =========================================================
   PROTEÇÃO DO PERFIL
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href = "login.html";

}


/* =========================================================
   USUÁRIO LOCAL
========================================================= */

const dadosSalvos =
    localStorage.getItem("usuario");


if (!dadosSalvos) {

    window.location.href = "login.html";

} else {

    const usuarioLocal =
        JSON.parse(dadosSalvos);


    if (!usuarioLocal.id) {

        alert("Não foi possível identificar sua conta.");

        window.location.href = "login.html";

    } else {

        carregarPerfil(usuarioLocal.id);

    }

}


/* =========================================================
   CARREGAR PERFIL DO BANCO
========================================================= */

async function carregarPerfil(id) {

    try {

        const resposta =
            await fetch(
                `http://localhost:3000/api/usuario/${id}`
            );


        const dados =
            await resposta.json();


        if (!resposta.ok) {

            alert(
                dados.error ||
                "Não foi possível carregar o perfil."
            );

            return;

        }


        const usuarioBanco =
            dados.user;


        /* =================================================
           PADRONIZAR DADOS
        ================================================= */

        const usuario = {

            id:
                usuarioBanco.id,

            username:
                usuarioBanco.username || "",

            email:
                usuarioBanco.email || "",

            displayName:
                usuarioBanco.display_name ||
                usuarioBanco.username ||
                "",

            bio:
                usuarioBanco.bio || "",

            avatar:
                usuarioBanco.avatar || ""

        };


        /* =================================================
           ATUALIZAR CACHE LOCAL
        ================================================= */

        localStorage.setItem(
            "usuario",
            JSON.stringify(usuario)
        );


        /* =================================================
           ELEMENTOS
        ================================================= */

        const avatar =
            document.getElementById(
                "profile-avatar"
            );

        const avatarLetter =
            document.getElementById(
                "avatar-letter"
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


        /* =================================================
           RENDERIZAR PERFIL
        ================================================= */

        function renderizarPerfil() {

            const nome =
                usuario.displayName ||
                usuario.username ||
                "Usuário";


            const username =
                usuario.username ||
                "usuario";


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


            /* =================================================
               FORMULÁRIO
            ================================================= */

            if (usernameInput) {

                usernameInput.value =
                    usuario.username || "";

            }


            if (displayInput) {

                displayInput.value =
                    usuario.displayName ||
                    usuario.username ||
                    "";

            }


            if (bioInput) {

                bioInput.value =
                    usuario.bio || "";

            }


            if (emailInput) {

                emailInput.value =
                    usuario.email || "";

            }


            carregarAvatar();

        }


        /* =================================================
           AVATAR
        ================================================= */

        function carregarAvatar() {

            if (!avatar) {
                return;
            }


            avatar.innerHTML = "";


            if (usuario.avatar) {

                const imagem =
                    document.createElement("img");


                imagem.src =
                    usuario.avatar;


                imagem.alt =
                    "Avatar do usuário";


                avatar.appendChild(
                    imagem
                );


                if (avatarLetter) {

                    avatarLetter.textContent =
                        "";

                }

            } else {

                if (avatarLetter) {

                    avatarLetter.textContent =
                        (
                            usuario.displayName ||
                            usuario.username ||
                            "U"
                        )
                        .charAt(0)
                        .toUpperCase();

                }

            }

        }


        renderizarPerfil();


        /* =================================================
           ALTERAR AVATAR
        ================================================= */

        if (
            changeAvatar &&
            avatarInput
        ) {

            changeAvatar.addEventListener(
                "click",
                () => {

                    avatarInput.click();

                }
            );


            avatarInput.addEventListener(
                "change",
                () => {

                    const file =
                        avatarInput.files[0];


                    if (!file) {
                        return;
                    }


                    if (
                        !file.type.startsWith(
                            "image/"
                        )
                    ) {

                        mostrarMensagem(
                            "Escolha uma imagem válida.",
                            true
                        );

                        return;

                    }


                    const reader =
                        new FileReader();


                    reader.onload =
                        async event => {

                            usuario.avatar =
                                event.target.result;


                            renderizarPerfil();


                            await salvarPerfil(
                                true
                            );

                        };


                    reader.readAsDataURL(
                        file
                    );

                }
            );

        }


        /* =================================================
           ABRIR EDITOR
        ================================================= */

        if (
            editProfile &&
            editor
        ) {

            editProfile.addEventListener(
                "click",
                () => {

                    editor.classList.add(
                        "active"
                    );


                    editor.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                }
            );

        }


        /* =================================================
           FECHAR EDITOR
        ================================================= */

        if (
            closeEditor &&
            editor
        ) {

            closeEditor.addEventListener(
                "click",
                () => {

                    editor.classList.remove(
                        "active"
                    );

                }
            );

        }


        /* =================================================
           SALVAR PERFIL
        ================================================= */

        if (saveButton) {

            saveButton.addEventListener(
                "click",
                async () => {

                    const novoUsername =
                        usernameInput.value.trim();


                    const novoDisplay =
                        displayInput.value.trim();


                    const novaBio =
                        bioInput.value.trim();


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


                    await salvarPerfil();

                }
            );

        }


        /* =================================================
           SALVAR NO BANCO
        ================================================= */

        async function salvarPerfil(
            avatarAutomatico = false
        ) {

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
                                        usuario.avatar

                                })

                        }
                    );


                const dados =
                    await resposta.json();


                if (!resposta.ok) {

                    mostrarMensagem(
                        dados.error ||
                        "Não foi possível salvar o perfil.",
                        true
                    );

                    return;

                }


                const usuarioAtualizado = {

                    id:
                        dados.user.id,

                    username:
                        dados.user.username,

                    email:
                        dados.user.email,

                    displayName:
                        dados.user.display_name || "",

                    bio:
                        dados.user.bio || "",

                    avatar:
                        dados.user.avatar || ""

                };


                Object.assign(
                    usuario,
                    usuarioAtualizado
                );


                localStorage.setItem(
                    "usuario",
                    JSON.stringify(usuario)
                );


                renderizarPerfil();


                mostrarMensagem(
                    avatarAutomatico
                        ? "Avatar atualizado."
                        : "Perfil atualizado com sucesso."
                );


            } catch (error) {

                console.error(
                    "Erro ao salvar perfil:",
                    error
                );


                mostrarMensagem(
                    "Não foi possível conectar ao servidor.",
                    true
                );

            }

        }


        /* =================================================
           MENSAGEM
        ================================================= */

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
                () => {

                    message.textContent =
                        "";

                },
                3000
            );

        }

    }

}