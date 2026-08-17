const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value;

        const dadosSalvos = localStorage.getItem("usuario");

        if (!dadosSalvos) {
            alert("Nenhuma conta cadastrada.");
            return;
        }

        const usuarioSalvo = JSON.parse(dadosSalvos);

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

}