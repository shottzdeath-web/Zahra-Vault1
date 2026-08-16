const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const usuarioSalvo = JSON.parse(localStorage.getItem("usuario"));

    if (!usuarioSalvo) {
        alert("Nenhuma conta cadastrada.");
        return;
    }

    if (
        email === usuarioSalvo.email &&
        password === usuarioSalvo.password
    ) {
        localStorage.setItem("logado", "true");

        window.location.href = "home.html";
    } else {
        alert("E-mail ou senha incorretos.");
    }
});