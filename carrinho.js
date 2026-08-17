const logado = localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href = "login.html";

}


const cartItems =
    document.getElementById("cart-items");

const cartEmpty =
    document.getElementById("cart-empty");

const cartTotal =
    document.getElementById("cart-total");

const checkoutButton =
    document.getElementById("checkout-button");


function carregarCarrinho() {

    const carrinhoSalvo =
        localStorage.getItem("carrinho");

    const carrinho =
        carrinhoSalvo
            ? JSON.parse(carrinhoSalvo)
            : [];


    cartItems.innerHTML = "";


    if (carrinho.length === 0) {

        cartEmpty.style.display = "block";

        cartTotal.textContent = "R$ 0,00";

        checkoutButton.disabled = true;

        return;
    }


    cartEmpty.style.display = "none";

    checkoutButton.disabled = false;


    let total = 0;


    carrinho.forEach((produto, index) => {

        total += produto.preco;


        const item =
            document.createElement("div");

        item.className = "cart-item";


        item.innerHTML = `

            <div class="cart-item-info">

                <span class="cart-item-category">
                    ${produto.categoria}
                </span>

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.descricao}
                </p>

            </div>


            <div class="cart-item-right">

                <strong>
                    ${formatarPreco(produto.preco)}
                </strong>

                <button
                    class="remove-cart-item"
                    data-index="${index}"
                >
                    Remover
                </button>

            </div>

        `;


        cartItems.appendChild(item);

    });


    cartTotal.textContent =
        formatarPreco(total);


    document
        .querySelectorAll(".remove-cart-item")
        .forEach(button => {

            button.addEventListener(
                "click",
                removerProduto
            );

        });

}


function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function removerProduto(event) {

    const index =
        Number(event.currentTarget.dataset.index);


    const carrinho =
        JSON.parse(
            localStorage.getItem("carrinho")
        );


    carrinho.splice(index, 1);


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    carregarCarrinho();

}


checkoutButton.addEventListener(
    "click",
    function() {

        const carrinho =
            JSON.parse(
                localStorage.getItem("carrinho")
            );


        if (!carrinho || carrinho.length === 0) {

            return;

        }


        window.location.href =
            "checkout.html";

    }
);


carregarCarrinho();


/* =========================================================
   LOGOUT
========================================================= */

const logout =
    document.getElementById("logout");

const footerLogout =
    document.getElementById("footer-logout");


function sair() {

    localStorage.removeItem("logado");

    window.location.href = "index.html";

}


if (logout) {

    logout.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            sair();

        }
    );

}


if (footerLogout) {

    footerLogout.addEventListener(
        "click",
        function(event) {

            event.preventDefault();

            sair();

        }
    );

}