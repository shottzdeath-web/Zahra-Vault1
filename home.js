const logado = localStorage.getItem("logado");
const dadosUsuario = localStorage.getItem("usuario");

if (logado !== "true" || !dadosUsuario) {

    window.location.href = "login.html";

} else {

    const usuario = JSON.parse(dadosUsuario);

    const username = document.getElementById("account-username");
    const email = document.getElementById("account-email");
    const avatar = document.getElementById("account-avatar");

    if (username) {
        username.textContent = usuario.username;
    }

    if (email) {
        email.textContent = usuario.email;
    }

    if (avatar) {
        avatar.textContent = usuario.username.charAt(0).toUpperCase();
    }
}


const logout = document.getElementById("logout");
const footerLogout = document.getElementById("footer-logout");

function sair() {

    localStorage.removeItem("logado");

    window.location.href = "index.html";
}


if (logout) {
    logout.addEventListener("click", function(event) {
        event.preventDefault();
        sair();
    });
}


if (footerLogout) {
    footerLogout.addEventListener("click", function(event) {
        event.preventDefault();
        sair();
    });
}