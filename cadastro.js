const cadastroForm = document.getElementById("cadastroForm");

cadastroForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("As senhas não são iguais.");
        return;
    }

    const usuario = {
        username: username,
        email: email,
        password: password
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));
    localStorage.setItem("logado", "true");

    window.location.href = "home.html";
});