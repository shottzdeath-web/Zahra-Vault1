/* =========================================================
   PROTEÇÃO DO PERFIL
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {
    window.location.href = "login.html";
}


/* =========================================================
   USUÁRIO
========================================================= */

const dadosSalvos = localStorage.getItem("usuario");

if (!dadosSalvos) {

    window.location.href = "login.html";

} else {

    const usuario = JSON.parse(dadosSalvos);


    /* =====================================================
       ELEMENTOS
    ===================================================== */

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


    /* =====================================================
       CARREGAR PERFIL
    ===================================================== */

    const username =
        usuario.username || "usuario";

    const nome =
        usuario.displayName ||
        usuario.username ||
        "Usuário";

    const bio =
        usuario.bio ||
        "Este usuário ainda não adicionou uma bio.";


    if (displayName) {
        displayName.textContent = nome;
    }

    if (usernameDisplay) {
        usernameDisplay.textContent =
            "@" + username;
    }

    if (bioDisplay) {
        bioDisplay.textContent = bio;
    }

    if (bioDetails) {
        bioDetails.textContent = bio;
    }

    if (infoUsername) {
        infoUsername.textContent = username;
    }

    if (infoEmail) {
        infoEmail.textContent =
            usuario.email || "—";
    }


    /* =====================================================
       FORMULÁRIO
    ===================================================== */

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


    /* =====================================================
       AVATAR
    ===================================================== */

    function carregarAvatar() {

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
                "Avatar do usuário";

            avatar.appendChild(imagem);

        } else {

            if (avatarLetter) {

                avatarLetter.textContent =
                    username
                        .charAt(0)
                        .toUpperCase();

            }

        }

    }

    carregarAvatar();


    /* =====================================================
       ALTERAR AVATAR
    ===================================================== */

    if (changeAvatar && avatarInput) {

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


                if (!file.type.startsWith("image/")) {

                    mostrarMensagem(
                        "Escolha uma imagem válida.",
                        true
                    );

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    event => {

                        usuario.avatar =
                            event.target.result;

                        carregarAvatar();

                        localStorage.setItem(
                            "usuario",
                            JSON.stringify(usuario)
                        );

                        mostrarMensagem(
                            "Avatar atualizado."
                        );

                    };


                reader.readAsDataURL(file);

            }
        );

    }


    /* =====================================================
       ABRIR EDITOR
    ===================================================== */

    if (editProfile && editor) {

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


    /* =====================================================
       FECHAR EDITOR
    ===================================================== */

    if (closeEditor && editor) {

        closeEditor.addEventListener(
            "click",
            () => {

                editor.classList.remove(
                    "active"
                );

            }
        );

    }


    /* =====================================================
       SALVAR
    ===================================================== */

    if (saveButton) {

        saveButton.addEventListener(
            "click",
            () => {

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


                localStorage.setItem(
                    "usuario",
                    JSON.stringify(usuario)
                );


                if (displayName) {

                    displayName.textContent =
                        usuario.displayName;

                }

                if (usernameDisplay) {

                    usernameDisplay.textContent =
                        "@" +
                        usuario.username;

                }

                if (bioDisplay) {

                    bioDisplay.textContent =
                        usuario.bio ||
                        "Este usuário ainda não adicionou uma bio.";

                }

                if (bioDetails) {

                    bioDetails.textContent =
                        usuario.bio ||
                        "Este usuário ainda não adicionou uma bio.";

                }

                if (infoUsername) {

                    infoUsername.textContent =
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