/* =========================================================
   ZVORY
   CHAT JS
========================================================= */

const conversations = document.querySelectorAll(".conversation");

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
   ABRIR CONVERSA
========================================================= */

conversations.forEach(conversation => {

    conversation.addEventListener("click", () => {

        conversations.forEach(item => {
            item.classList.remove("active");
        });

        conversation.classList.add("active");

        const user =
            conversation.dataset.user;

        const status =
            conversation.dataset.status;

        const avatar =
            user.charAt(0).toUpperCase();

        headerName.textContent = user;
        headerAvatar.textContent = avatar;

        headerStatus.textContent =
            status === "online"
                ? "online"
                : "offline";

        headerStatus.style.color =
            status === "online"
                ? "#54d17d"
                : "#777c86";

        headerOnline.style.display =
            status === "online"
                ? "block"
                : "none";


        /* MOBILE */

        if (window.innerWidth <= 700) {

            conversationPanel.classList.add("hidden");

            chatPanel.classList.add("mobile-active");

        }

    });

});


/* =========================================================
   VOLTAR NO CELULAR
========================================================= */

backBtn.addEventListener("click", () => {

    chatPanel.classList.remove("mobile-active");

    conversationPanel.classList.remove("hidden");

});


/* =========================================================
   ENVIAR MENSAGEM
========================================================= */

messageForm.addEventListener("submit", event => {

    event.preventDefault();

    const text =
        messageInput.value.trim();

    if (!text) return;

    createMessage(text);

    messageInput.value = "";

    scrollMessages();

});


/* =========================================================
   CRIAR MENSAGEM
========================================================= */

function createMessage(text) {

    const message =
        document.createElement("div");

    message.className =
        "message sent";

    const bubble =
        document.createElement("div");

    bubble.className =
        "bubble";

    bubble.textContent =
        text;

    const time =
        document.createElement("span");

    time.className =
        "message-time";

    time.textContent =
        getCurrentTime();

    message.appendChild(bubble);

    message.appendChild(time);

    messages.appendChild(message);

}


/* =========================================================
   HORÁRIO
========================================================= */

function getCurrentTime() {

    const now =
        new Date();

    return now.toLocaleTimeString(
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

    messages.scrollTo({
        top: messages.scrollHeight,
        behavior: "smooth"
    });

}


/* =========================================================
   PESQUISA
========================================================= */

searchInput.addEventListener("input", () => {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    conversations.forEach(conversation => {

        const user =
            conversation.dataset.user
                .toLowerCase();

        conversation.style.display =
            user.includes(search)
                ? "flex"
                : "none";

    });

});


/* =========================================================
   MENU
========================================================= */

moreBtn.addEventListener("click", event => {

    event.stopPropagation();

    const rect =
        moreBtn.getBoundingClientRect();

    moreMenu.style.top =
        `${rect.bottom + 7}px`;

    moreMenu.style.right =
        `${window.innerWidth - rect.right}px`;

    moreMenu.classList.toggle("show");

});


document.addEventListener("click", () => {

    moreMenu.classList.remove("show");

});


moreMenu.addEventListener("click", event => {

    event.stopPropagation();

});


/* =========================================================
   LIMPAR CONVERSA
========================================================= */

clearChatBtn.addEventListener("click", () => {

    const confirmed =
        confirm("Limpar todas as mensagens desta conversa?");

    if (!confirmed) return;

    messages.innerHTML = "";

    moreMenu.classList.remove("show");

});


/* =========================================================
   BLOQUEAR
========================================================= */

blockBtn.addEventListener("click", () => {

    alert("Sistema de bloqueio será conectado ao backend.");

    moreMenu.classList.remove("show");

});


/* =========================================================
   CHAMADA DE VOZ
========================================================= */

voiceBtn.addEventListener("click", () => {

    alert("Chamadas de voz serão conectadas ao sistema da Zvory.");

});


/* =========================================================
   NOVA CONVERSA
========================================================= */

newChatBtn.addEventListener("click", () => {

    alert("A busca de usuários será conectada ao backend.");

});


/* =========================================================
   ENTER PARA ENVIAR
========================================================= */

messageInput.addEventListener("keydown", event => {

    if (
        event.key === "Enter" &&
        !event.shiftKey
    ) {

        event.preventDefault();

        messageForm.requestSubmit();

    }

});


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

scrollMessages();