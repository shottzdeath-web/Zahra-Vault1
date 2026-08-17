/* =========================================================
   PROTEÇÃO DE LOGIN
========================================================= */

const logado =
    localStorage.getItem("logado");


if (logado !== "true") {

    window.location.href =
        "login.html";

}


/* =========================================================
   ELEMENTOS
========================================================= */

const cartItems =
    document.getElementById("cart-items");

const cartEmpty =
    document.getElementById("cart-empty");

const cartTotal =
    document.getElementById("cart-total");

const checkoutButton =
    document.getElementById("checkout-button");


/* =========================================================
   FORMATAÇÃO DE PREÇO
========================================================= */

function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {

        style: "currency",

        currency: "BRL"

    });

}


/* =========================================================
   CARREGAR CARRINHO
========================================================= */

function carregarCarrinho() {

    const carrinhoSalvo =
        localStorage.getItem("carrinho");


    const carrinho =
        carrinhoSalvo
            ? JSON.parse(carrinhoSalvo)
            : [];


    cartItems.innerHTML = "";


    if (carrinho.length === 0) {

        cartEmpty.style.display =
            "block";

        cartTotal.textContent =
            "R$ 0,00";

        checkoutButton.disabled =
            true;

        return;

    }


    cartEmpty.style.display =
        "none";

    checkoutButton.disabled =
        false;


    let total = 0;


    carrinho.forEach(
        (produto, index) => {

            total += produto.preco;


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "cart-item";


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

        }
    );


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


/* =========================================================
   REMOVER PRODUTO
========================================================= */

function removerProduto(event) {

    const index =
        Number(
            event.currentTarget.dataset.index
        );


    const carrinho =
        JSON.parse(
            localStorage.getItem(
                "carrinho"
            )
        );


    carrinho.splice(index, 1);


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    carregarCarrinho();

}


/* =========================================================
   IR PARA CHECKOUT
========================================================= */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            const carrinhoSalvo =
                localStorage.getItem(
                    "carrinho"
                );


            const carrinho =
                carrinhoSalvo
                    ? JSON.parse(
                        carrinhoSalvo
                    )
                    : [];


            if (
                carrinho.length === 0
            ) {

                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


/* =========================================================
   INICIALIZAÇÃO
========================================================= */

carregarCarrinho();