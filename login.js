const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        alert("Nenhuma conta cadastrada.");
        return;
    }

    if (email === usuarioSalvo.email && senha === usuarioSalvo.senha) {

        localStorage.setItem("logado", "true");

        window.location.href = "home.html";

    } else {
        alert("E-mail ou senha incorretos.");
    }
});