(() => {

    console.log("perfil.js carregado");


    /* =========================================================
       CONFIGURAÇÃO
    ========================================================= */

    const API = "http://localhost:3000";


    /* =========================================================
       PROTEÇÃO
    ========================================================= */

    const logado =
        localStorage.getItem("logado");

    if (logado !== "true") {

        window.location.href =
            "login.html";

        return;

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

        return;

    }


    try {

        usuario =
            JSON.parse(dadosSalvos);

    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );

        return;

    }


    if (!usuario || !usuario.id) {

        console.error(
            "ID do usuário não encontrado."
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
       RENDERIZAR
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
            username;


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
       AVATAR
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

            const letra =
                document.createElement(
                    "span"
                );


            letra.textContent =
                (
                    usuario.displayName ||
                    usuario.display_name ||
                    usuario.username ||
                    "U"
                )
                .charAt(0)
                .toUpperCase();


            letra.id =
                "avatar-letter";


            avatar.appendChild(
                letra
            );

        }

    }


    /* =========================================================
       EDITAR PERFIL
    ========================================================= */

    if (editProfile) {

        editProfile.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "Editar perfil clicado"
                );


                if (editor) {

                    editor.classList.add(
                        "active"
                    );

                }

            }
        );

    } else {

        console.error(
            "Botão editar perfil não encontrado."
        );

    }


    /* =========================================================
       FECHAR EDITOR
    ========================================================= */

    if (closeEditor) {

        closeEditor.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


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

    if (
        changeAvatar &&
        avatarInput
    ) {

        changeAvatar.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                console.log(
                    "Alterar avatar clicado"
                );


                avatarInput.click();

            }
        );


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
                    async function (event) {

                        usuario.avatar =
                            event.target.result;


                        renderizarAvatar();

                        salvarLocal();


                        const sucesso =
                            await salvarNoBanco();


                        if (sucesso) {

                            mostrarMensagem(
                                "Avatar atualizado."
                            );

                        } else {

                            mostrarMensagem(
                                "Avatar salvo localmente, mas não sincronizado.",
                                true
                            );

                        }

                    };


                leitor.onerror =
                    function () {

                        mostrarMensagem(
                            "Não foi possível carregar a imagem.",
                            true
                        );

                    };


                leitor.readAsDataURL(
                    arquivo
                );

            }
        );

    } else {

        console.error(
            "Botão ou campo do avatar não encontrado."
        );

    }


    /* =========================================================
       SALVAR PERFIL
    ========================================================= */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            async function (event) {

                event.preventDefault();


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


                renderizarPerfil();

                salvarLocal();


                const sucesso =
                    await salvarNoBanco();


                if (sucesso) {

                    mostrarMensagem(
                        "Perfil atualizado com sucesso."
                    );

                } else {

                    mostrarMensagem(
                        "Salvo localmente, mas não sincronizado com o banco.",
                        true
                    );

                }

            }
        );

    }


    /* =========================================================
       SALVAR NO BANCO
    ========================================================= */

    async function salvarNoBanco() {

        if (!usuario || !usuario.id) {

            console.error(
                "ID do usuário inexistente."
            );

            return false;

        }


        try {

            const resposta =
                await fetch(
                    `${API}/api/usuario/${usuario.id}`,
                    {

                        method:
                            "PUT",

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
                                    usuario.displayName ||
                                    usuario.display_name ||
                                    usuario.username,

                                bio:
                                    usuario.bio ||
                                    "",

                                avatar:
                                    usuario.avatar ||
                                    ""

                            })

                    }
                );


            const dados =
                await resposta.json();


            if (!resposta.ok) {

                console.error(
                    "Erro do backend:",
                    dados.error
                );

                return false;

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

                renderizarPerfil();

            }


            console.log(
                "Perfil sincronizado com o banco."
            );


            return true;


        } catch (error) {

            console.error(
                "Erro ao conectar ao backend:",
                error
            );

            return false;

        }

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

})();