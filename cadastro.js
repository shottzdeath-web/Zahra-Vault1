const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {

    cadastroForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const username =
            document.getElementById("username").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;

        const confirmPassword =
            document.getElementById("confirm-password").value;


        /* =====================================================
           VALIDAR SENHAS
        ===================================================== */

        if (password !== confirmPassword) {

            alert("As senhas não são iguais.");
            return;

        }


        /* =====================================================
           ENVIAR CADASTRO PARA O BACKEND
        ===================================================== */

        try {

            const resposta = await fetch(
                "http://localhost:3000/api/cadastro",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        username: username,
                        email: email,
                        password: password
                    })
                }
            );


            const dados = await resposta.json();


            /* =================================================
               ERRO
            ================================================= */

            if (!resposta.ok) {

                alert(
                    dados.error ||
                    "Não foi possível criar a conta."
                );

                return;

            }


            /* =================================================
               LOGIN LOCAL TEMPORÁRIO
            ================================================= */

            localStorage.setItem(
                "usuario",
                JSON.stringify(dados.user)
            );

            localStorage.setItem(
                "logado",
                "true"
            );


            /* =================================================
               IR PARA HOME
            ================================================= */

            window.location.href = "home.html";


        } catch (error) {

            console.error(
                "Erro ao conectar com o backend:",
                error
            );

            alert(
                "Não foi possível conectar ao servidor."
            );

        }

    });

}