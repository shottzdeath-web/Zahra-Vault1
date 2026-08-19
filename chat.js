/* =========================================================
   ZVORY
   CHAT JS
   PROTÓTIPO FUNCIONAL
========================================================= */


/* =========================================================
   ELEMENTOS
========================================================= */

const conversations =
    document.querySelectorAll(".conversation");

const conversationPanel =
    document.querySelector(".conversations");

const chatPanel =
    document.querySelector(".chat");

const backBtn =
    document.getElementById("backBtn");

const headerName =
    document.getElementById("headerName");

const headerAvatar =
    document.getElementById("headerAvatar");

const headerStatus =
    document.getElementById("headerStatus");

const headerOnline =
    document.getElementById("headerOnline");

const messageForm =
    document.getElementById("messageForm");

const messageInput =
    document.getElementById("messageInput");

const messages =
    document.getElementById("messages");

const searchInput =
    document.getElementById("searchInput");

const moreBtn =
    document.getElementById("moreBtn");

const moreMenu =
    document.getElementById("moreMenu");

const clearChatBtn =
    document.getElementById("clearChatBtn");

const blockBtn =
    document.getElementById("blockBtn");

const voiceBtn =
    document.getElementById("voiceBtn");

const newChatBtn =
    document.getElementById("newChatBtn");


/* =========================================================
   ESTADO
========================================================= */

let currentUser = "Isabela";

let blockedUsers =
    JSON.parse(
        localStorage.getItem("zvory_blocked_users") || "[]"
    );


/* =========================================================
   MENSAGENS INICIAIS
========================================================= */

const defaultMessages = {

    Isabela: [
        {
            type: "received",
            text: "Oii",
            time: "14:40"
        },
        {
            type: "sent",
            text: "Oii, tudo bem?",
            time: "14:41"
        },
        {
            type: "received",
            text: "Tudo sim ❤️",
            time: "14:42"
        }
    ],

    João: [
        {
            type: "received",
            text: "Beleza, depois te falo",
            time: "13:21"
        }
    ],

    Maria: [
        {
            type: "received",
            text: "Enviou uma imagem",
            time: "11:08"
        }
    ]

};


/* =========================================================
   CARREGAR MENSAGENS
========================================================= */

function loadMessages(user) {

    const saved =
        localStorage.getItem(
            `zvory_chat_${user}`
        );

    if (saved) {

        return JSON.parse(saved);

    }

    return defaultMessages[user]
        ? [...defaultMessages[user]]
        : [];

}


/* =========================================================
   SALVAR MENSAGENS
========================================================= */

function saveMessages(user, data) {

    localStorage.setItem(
        `zvory_chat_${user}`,
        JSON.stringify(data)
    );

}


/* =========================================================
   ABRIR CONVERSA
========================================================= */

function openConversation(conversation) {

    conversations.forEach(item => {

        item.classList.remove("active");

    });

    conversation.classList.add("active");


    const user =
        conversation.dataset.user;

    const status =
        conversation.dataset.status;

    currentUser = user;


    /* AVATAR */

    const avatar =
        user.charAt(0).toUpperCase();


    headerName.textContent =
        user;

    headerAvatar.textContent =
        avatar;


    /* STATUS */

    if (blockedUsers.includes(user)) {

        headerStatus.textContent =
            "bloqueado";

        headerStatus.style.color =
            "#777c86";

    }

    else {

        headerStatus.textContent =
            status === "online"
                ? "online"
                : "offline";

        headerStatus.style.color =
            status === "online"
                ? "#54d17d"
                : "#777c86";

    }


    /* ONLINE */

    headerOnline.style.display =
        status === "online" &&
        !blockedUsers.includes(user)
            ? "block"
            : "none";


    /* CARREGAR MENSAGENS */

    renderMessages(user);


    /* MOBILE */

    if (window.innerWidth <= 700) {

        conversationPanel.classList.add(
            "hidden"
        );

        chatPanel.classList.add(
            "mobile-active"
        );

    }


    scrollMessages();

}


/* =========================================================
   EVENTOS DAS CONVERSAS
========================================================= */

conversations.forEach(conversation => {

    conversation.addEventListener(
        "click",
        () => {

            openConversation(
                conversation
            );

        }
    );

});


/* =========================================================
   RENDERIZAR MENSAGENS
========================================================= */

function renderMessages(user) {

    messages.innerHTML = "";


    const data =
        loadMessages(user);


    /* DATA */

    const dateDivider =
        document.createElement("div");

    dateDivider.className =
        "date-divider";

    const dateText =
        document.createElement("span");

    dateText.textContent =
        "Hoje";

    dateDivider.appendChild(
        dateText
    );

    messages.appendChild(
        dateDivider
    );


    /* MENSAGENS */

    data.forEach(item => {

        createMessageElement(
            item.type,
            item.text,
            item.time
        );

    });

}


/* =========================================================
   CRIAR ELEMENTO DE MENSAGEM
========================================================= */

function createMessageElement(
    type,
    text,
    time
) {

    const message =
        document.createElement("div");

    message.className =
        `message ${type}`;


    const bubble =
        document.createElement("div");

    bubble.className =
        "bubble";

    bubble.textContent =
        text;


    const messageTime =
        document.createElement("span");

    messageTime.className =
        "message-time";

    messageTime.textContent =
        time;


    message.appendChild(
        bubble
    );

    message.appendChild(
        messageTime
    );


    messages.appendChild(
        message
    );

}


/* =========================================================
   ENVIAR MENSAGEM
========================================================= */

messageForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        const text =
            messageInput.value
                .trim();


        if (!text)
            return;


        if (
            blockedUsers.includes(
                currentUser
            )
        ) {

            alert(
                "Você bloqueou este usuário."
            );

            return;

        }


        const time =
            getCurrentTime();


        const data =
            loadMessages(
                currentUser
            );


        data.push({

            type: "sent",

            text: text,

            time: time

        });


        saveMessages(
            currentUser,
            data
        );


        createMessageElement(
            "sent",
            text,
            time
        );


        updateConversationPreview(
            currentUser,
            text,
            time
        );


        messageInput.value = "";


        scrollMessages();

    }
);


/* =========================================================
   HORÁRIO
========================================================= */

function getCurrentTime() {

    return new Date()
        .toLocaleTimeString(
            "pt-BR",
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );

}


/* =========================================================
   SCROLL
========================================================= */

function scrollMessages() {

    requestAnimationFrame(() => {

        messages.scrollTo({

            top:
                messages.scrollHeight,

            behavior:
                "smooth"

        });

    });

}


/* =========================================================
   ATUALIZAR PRÉVIA DA CONVERSA
========================================================= */

function updateConversationPreview(
    user,
    text,
    time
) {

    conversations.forEach(
        conversation => {

            if (
                conversation.dataset.user
                !== user
            ) {

                return;

            }


            const preview =
                conversation.querySelector(
                    ".conversation-info span"
                );

            const timeElement =
                conversation.querySelector(
                    "time"
                );


            if (preview) {

                preview.textContent =
                    text;

            }


            if (timeElement) {

                timeElement.textContent =
                    time;

            }

        }
    );

}


/* =========================================================
   PESQUISA
========================================================= */

searchInput.addEventListener(
    "input",
    () => {

        const search =
            searchInput.value
                .toLowerCase()
                .trim();


        conversations.forEach(
            conversation => {

                const user =
                    conversation.dataset.user
                        .toLowerCase();


                conversation.style.display =
                    user.includes(search)
                        ? "flex"
                        : "none";

            }
        );

    }
);


/* =========================================================
   VOLTAR NO CELULAR
========================================================= */

backBtn.addEventListener(
    "click",
    () => {

        chatPanel.classList.remove(
            "mobile-active"
        );

        conversationPanel.classList.remove(
            "hidden"
        );

    }
);


/* =========================================================
   MENU
========================================================= */

moreBtn.addEventListener(
    "click",
    event => {

        event.stopPropagation();


        const rect =
            moreBtn.getBoundingClientRect();


        moreMenu.style.top =
            `${rect.bottom + 7}px`;


        moreMenu.style.right =
            `${window.innerWidth - rect.right}px`;


        moreMenu.classList.toggle(
            "show"
        );

    }
);


/* =========================================================
   FECHAR MENU
========================================================= */

document.addEventListener(
    "click",
    () => {

        moreMenu.classList.remove(
            "show"
        );

    }
);


moreMenu.addEventListener(
    "click",
    event => {

        event.stopPropagation();

    }
);


/* =========================================================
   LIMPAR CONVERSA
========================================================= */

clearChatBtn.addEventListener(
    "click",
    () => {

        const confirmed =
            confirm(
                "Limpar todas as mensagens desta conversa?"
            );


        if (!confirmed)
            return;


        localStorage.removeItem(
            `zvory_chat_${currentUser}`
        );


        renderMessages(
            currentUser
        );


        updateConversationPreview(
            currentUser,
            "Nenhuma mensagem",
            ""
        );


        moreMenu.classList.remove(
            "show"
        );


        scrollMessages();

    }
);


/* =========================================================
   BLOQUEAR USUÁRIO
========================================================= */

blockBtn.addEventListener(
    "click",
    () => {

        const alreadyBlocked =
            blockedUsers.includes(
                currentUser
            );


        if (alreadyBlocked) {

            blockedUsers =
                blockedUsers.filter(
                    user =>
                        user !== currentUser
                );


            alert(
                `${currentUser} foi desbloqueado.`
            );

        }

        else {

            blockedUsers.push(
                currentUser
            );


            alert(
                `${currentUser} foi bloqueado.`
            );

        }


        localStorage.setItem(
            "zvory_blocked_users",
            JSON.stringify(
                blockedUsers
            )
        );


        const activeConversation =
            [...conversations].find(
                conversation =>
                    conversation.dataset.user
                    === currentUser
            );


        if (activeConversation) {

            openConversation(
                activeConversation
            );

        }


        moreMenu.classList.remove(
            "show"
        );

    }
);


/* =========================================================
   CHAMADA DE VOZ
========================================================= */

voiceBtn.addEventListener(
    "click",
    () => {

        alert(
            `Chamada de voz com ${currentUser} será conectada ao sistema da Zvory.`
        );

    }
);


/* =========================================================
   NOVA CONVERSA
========================================================= */

newChatBtn.addEventListener(
    "click",
    () => {

        const user =
            prompt(
                "Digite o nome do usuário:"
            );


        if (!user)
            return;


        const cleanName =
            user.trim();


        if (!cleanName)
            return;


        alert(
            `A busca real por ${cleanName} será conectada ao backend.`
        );

    }
);


/* =========================================================
   ENTER PARA ENVIAR
========================================================= */

messageInput.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            messageForm.requestSubmit();

        }

    }
);


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

const firstConversation =
    document.querySelector(
        ".conversation.active"
    );


if (firstConversation) {

    openConversation(
        firstConversation
    );

}