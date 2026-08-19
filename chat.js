/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href = "login.html";

}


/* =========================================================
   ELEMENTOS
========================================================= */

const conversationList =
    document.getElementById("conversationList");

const conversations =
    document.querySelectorAll(".conversation");

const conversationTabs =
    document.querySelectorAll(".conversation-tab");

const currentName =
    document.getElementById("currentName");

const currentStatus =
    document.getElementById("currentStatus");

const currentAvatar =
    document.getElementById("currentAvatar");

const infoName =
    document.getElementById("infoName");

const infoAvatar =
    document.getElementById("infoAvatar");

const infoRole =
    document.getElementById("infoRole");

const messages =
    document.getElementById("messages");

const messageInput =
    document.getElementById("messageInput");

const sendButton =
    document.getElementById("sendButton");

const chatSearch =
    document.getElementById("searchInput");


/* =========================================================
   USUÁRIO
========================================================= */

const dadosSalvos =
    localStorage.getItem("usuario");


if (dadosSalvos) {

    try {

        const usuario =
            JSON.parse(dadosSalvos);


        const nome =
            usuario.display_name ||
            usuario.displayName ||
            usuario.username ||
            "Usuário";


        const inicial =
            nome
                .charAt(0)
                .toUpperCase();


        document
            .querySelectorAll(
                "#sidebarUsername, #messageUsername"
            )
            .forEach(element => {

                element.textContent = nome;

            });


        document
            .querySelectorAll(
                "#sidebarAvatar, #railAvatar, #topAvatar"
            )
            .forEach(element => {

                element.textContent = inicial;

            });


    } catch (error) {

        console.error(
            "Erro ao carregar usuário:",
            error
        );

    }

}



/* =========================================================
   TROCAR CONVERSA
========================================================= */

conversations.forEach(conversation => {

    conversation.addEventListener(
        "click",
        () => {

            conversations.forEach(item => {

                item.classList.remove("active");

            });


            conversation.classList.add("active");


            const nome =
                conversation.dataset.name ||
                "Conversa";


            currentName.textContent =
                nome;


            infoName.textContent =
                nome;


            currentAvatar.textContent =
                nome
                    .charAt(0)
                    .toUpperCase();


            infoAvatar.textContent =
                nome
                    .charAt(0)
                    .toUpperCase();


            if (nome === "Zvory") {

                currentStatus.textContent =
                    "Equipe · Online";

                infoRole.textContent =
                    "Equipe oficial";

            } else {

                currentStatus.textContent =
                    "Membro · Online";

                infoRole.textContent =
                    "Membro da comunidade";

            }


            /* MOBILE */

            if (
                window.innerWidth <= 760
            ) {

                const main =
                    document.querySelector(
                        ".conversation-main"
                    );

                const sidebar =
                    document.querySelector(
                        ".conversation-sidebar"
                    );


                main.classList.add(
                    "mobile-open"
                );

                sidebar.classList.add(
                    "chat-open"
                );

            }


        }
    );

});



/* =========================================================
   VOLTAR NO MOBILE
========================================================= */

document
    .querySelector(".conversation-top")
    ?.addEventListener(
        "click",
        event => {

            if (
                window.innerWidth <= 760 &&
                event.target ===
                document.querySelector(
                    ".conversation-top"
                )
            ) {

                voltarConversas();

            }

        }
    );


function voltarConversas() {

    const main =
        document.querySelector(
            ".conversation-main"
        );

    const sidebar =
        document.querySelector(
            ".conversation-sidebar"
        );


    main.classList.remove(
        "mobile-open"
    );

    sidebar.classList.remove(
        "chat-open"
    );

}



/* =========================================================
   PESQUISA
========================================================= */

if (chatSearch) {

    chatSearch.addEventListener(
        "input",
        () => {

            const termo =
                chatSearch.value
                    .toLowerCase()
                    .trim();


            conversations.forEach(
                conversation => {

                    const nome =
                        (
                            conversation.dataset.name ||
                            ""
                        )
                        .toLowerCase();


                    if (
                        nome.includes(termo)
                    ) {

                        conversation.style.display =
                            "flex";

                    } else {

                        conversation.style.display =
                            "none";

                    }

                }
            );

        }
    );

}



/* =========================================================
   ABAS
========================================================= */

conversationTabs.forEach(tab => {

    tab.addEventListener(
        "click",
        () => {

            conversationTabs.forEach(item => {

                item.classList.remove(
                    "active"
                );

            });


            tab.classList.add(
                "active"
            );


            const filter =
                tab.dataset.filter;


            conversations.forEach(
                conversation => {

                    if (
                        filter === "all"
                    ) {

                        conversation.style.display =
                            "flex";

                    } else {

                        /*
                         * FUTURAMENTE:
                         * verificar mensagens não lidas
                         */

                        conversation.style.display =
                            "none";

                    }

                }
            );

        }
    );

});



/* =========================================================
   ENVIAR MENSAGEM
========================================================= */

function enviarMensagem() {

    if (!messageInput) {
        return;
    }


    const texto =
        messageInput.value.trim();


    if (!texto) {
        return;
    }


    const usuario =
        localStorage.getItem("usuario");


    let nome =
        "Usuário";


    if (usuario) {

        try {

            const dados =
                JSON.parse(usuario);


            nome =
                dados.display_name ||
                dados.displayName ||
                dados.username ||
                "Usuário";

        } catch {}

    }


    const mensagem =
        document.createElement("div");


    mensagem.className =
        "message own";


    mensagem.innerHTML = `

        <div class="message-avatar">
            ${nome
                .charAt(0)
                .toUpperCase()}
        </div>

        <div class="message-body">

            <div class="message-meta">

                <strong>
                    ${escaparHTML(nome)}
                </strong>

                <span>
                    agora
                </span>

            </div>

            <p>
                ${escaparHTML(texto)}
            </p>

        </div>

    `;


    messages.appendChild(
        mensagem
    );


    messageInput.value = "";

    messageInput.style.height =
        "auto";


    messages.scrollTop =
        messages.scrollHeight;

}



/* =========================================================
   ENTER
========================================================= */

if (messageInput) {

    messageInput.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                enviarMensagem();

            }

        }
    );


    messageInput.addEventListener(
        "input",
        () => {

            messageInput.style.height =
                "auto";


            messageInput.style.height =
                Math.min(
                    messageInput.scrollHeight,
                    120
                ) + "px";

        }
    );

}



/* =========================================================
   BOTÃO ENVIAR
========================================================= */

if (sendButton) {

    sendButton.addEventListener(
        "click",
        enviarMensagem
    );

}



/* =========================================================
   NOVA CONVERSA
========================================================= */

const newChatButton =
    document.getElementById(
        "newChatButton"
    );


if (newChatButton) {

    newChatButton.addEventListener(
        "click",
        () => {

            alert(
                "A criação de conversas será conectada ao sistema de usuários."
            );

        }
    );

}



/* =========================================================
   HOME
========================================================= */

function abrirHome() {

    window.location.href =
        "home.html";

}


document
    .getElementById("homeButton")
    ?.addEventListener(
        "click",
        abrirHome
    );


document
    .getElementById("homeRail")
    ?.addEventListener(
        "click",
        abrirHome
    );



/* =========================================================
   PERFIL
========================================================= */

document
    .getElementById("profileButton")
    ?.addEventListener(
        "click",
        () => {

            window.location.href =
                "perfil.html";

        }
    );



/* =========================================================
   CONFIGURAÇÕES
========================================================= */

function abrirConfiguracoes() {

    window.location.href =
        "configuracoes.html";

}


document
    .getElementById("settingsButton")
    ?.addEventListener(
        "click",
        abrirConfiguracoes
    );


document
    .getElementById("sidebarSettings")
    ?.addEventListener(
        "click",
        abrirConfiguracoes
    );



/* =========================================================
   CHAMADA DE VOZ
========================================================= */

document
    .getElementById("voiceButton")
    ?.addEventListener(
        "click",
        () => {

            alert(
                "A chamada de voz será conectada ao sistema de voz da Zvory."
            );

        }
    );


document
    .getElementById("startVoice")
    ?.addEventListener(
        "click",
        () => {

            alert(
                "A chamada de voz será iniciada quando o sistema de voz estiver conectado."
            );

        }
    );



/* =========================================================
   CHAMADA DE VÍDEO
========================================================= */

document
    .getElementById("videoButton")
    ?.addEventListener(
        "click",
        () => {

            alert(
                "Chamadas de vídeo serão adicionadas posteriormente."
            );

        }
    );



/* =========================================================
   UTILIDADE
========================================================= */

function escaparHTML(texto) {

    const div =
        document.createElement("div");

    div.textContent =
        texto;

    return div.innerHTML;

}