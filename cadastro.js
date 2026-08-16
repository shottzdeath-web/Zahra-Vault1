const cadastroForm = document.getElementById("cadastroForm");

cadastroForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuario = {
        nome: nome,
        email: email,
        senha: senha
    };

    localStorage.setItem("usuario", JSON.stringify(usuario));

    localStorage.setItem("logado", "true");

    window.location.href = "home.html";
});