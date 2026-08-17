const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("As senhas não são iguais.");
            return;
        }

        const usuarioExistente = JSON.parse(localStorage.getItem("usuario"));

        if (usuarioExistente && usuarioExistente.email === email) {
            alert("Já existe uma conta cadastrada com este e-mail.");
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

}