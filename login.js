const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function(event) {

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        /* =====================================================
           ENVIAR LOGIN PARA O BACKEND
        ===================================================== */

        try {

            const resposta = await fetch(
                "http://localhost:3000/api/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const dados = await resposta.json();


            /* =================================================
               VERIFICAR ERRO
            ================================================= */

            if (!resposta.ok) {

                alert(
                    dados.error ||
                    "E-mail ou senha incorretos."
                );

                return;

            }


            /* =================================================
               SALVAR USUÁRIO TEMPORARIAMENTE
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