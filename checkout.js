const logado = localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href = "login.html";

}


const checkoutItems =
    document.getElementById("checkout-items");

const checkoutTotal =
    document.getElementById("checkout-total");

const finishPurchase =
    document.getElementById("finish-purchase");


const carrinhoSalvo =
    localStorage.getItem("carrinho");


const carrinho =
    carrinhoSalvo
        ? JSON.parse(carrinhoSalvo)
        : [];


if (carrinho.length === 0) {

    alert("Seu carrinho está vazio.");

    window.location.href = "produtos.html";

}


let total = 0;


function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function carregarCheckout() {

    checkoutItems.innerHTML = "";

    total = 0;


    carrinho.forEach(produto => {

        total += produto.preco;


        const item =
            document.createElement("div");

        item.className = "checkout-item";


        item.innerHTML = `

            <div>

                <small>
                    ${produto.categoria}
                </small>

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.descricao}
                </p>

            </div>

            <strong>
                ${formatarPreco(produto.preco)}
            </strong>

        `;


        checkoutItems.appendChild(item);

    });


    checkoutTotal.textContent =
        formatarPreco(total);

}


finishPurchase.addEventListener(
    "click",
    function() {

        const payment =
            document.querySelector(
                'input[name="payment"]:checked'
            ).value;


        const usuario =
            JSON.parse(
                localStorage.getItem("usuario")
            );


        const pedido = {

            id:
                Date.now(),

            data:
                new Date().toLocaleString("pt-BR"),

            usuario:
                usuario.email,

            produtos:
                carrinho,

            total:
                total,

            pagamento:
                payment,

            status:
                "Processando"

        };


        const pedidosSalvos =
            localStorage.getItem("pedidos");


        const pedidos =
            pedidosSalvos
                ? JSON.parse(pedidosSalvos)
                : [];


        pedidos.push(pedido);


        localStorage.setItem(
            "pedidos",
            JSON.stringify(pedidos)
        );


        localStorage.removeItem("carrinho");


        alert(
            "Pedido criado com sucesso!"
        );


        window.location.href =
            "pedidos.html";

    }
);


carregarCheckout();