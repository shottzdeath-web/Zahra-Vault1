/* =========================================================
   PROTEÇÃO DA CONTA
========================================================= */

const logado = localStorage.getItem("logado");

if (logado !== "true") {

    window.location.href = "login.html";

}


/* =========================================================
   ELEMENTOS
========================================================= */

const ordersContainer =
    document.getElementById("orders-container");

const ordersEmpty =
    document.getElementById("orders-empty");


/* =========================================================
   FORMATAR PREÇO
========================================================= */

function formatarPreco(valor) {

    return Number(valor).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* =========================================================
   CARREGAR PEDIDOS
========================================================= */

function carregarPedidos() {

    const pedidosSalvos =
        localStorage.getItem("pedidos");


    const pedidos =
        pedidosSalvos
            ? JSON.parse(pedidosSalvos)
            : [];


    ordersContainer.innerHTML = "";


    /* =====================================================
       NENHUM PEDIDO
    ===================================================== */

    if (pedidos.length === 0) {

        ordersEmpty.style.display = "block";

        return;

    }


    ordersEmpty.style.display = "none";


    /* =====================================================
       MOSTRAR PEDIDOS
    ===================================================== */

    pedidos.forEach(pedido => {

        const orderCard =
            document.createElement("article");

        orderCard.className = "order-card";


        let produtosHTML = "";


        /* =================================================
           PEDIDOS CRIADOS PELO CHECKOUT
        ================================================= */

        if (Array.isArray(pedido.produtos)) {

            produtosHTML =
                pedido.produtos
                    .map(produto => {

                        return `

                            <div class="order-product">

                                <div>

                                    <span class="order-category">
                                        ${produto.categoria}
                                    </span>

                                    <h4>
                                        ${produto.nome}
                                    </h4>

                                    <p>
                                        ${produto.descricao}
                                    </p>

                                </div>

                                <strong>
                                    ${formatarPreco(produto.preco)}
                                </strong>

                            </div>

                        `;

                    })
                    .join("");

        }


        /* =================================================
           PEDIDOS ANTIGOS / COMPATIBILIDADE
        ================================================= */

        else if (pedido.produto) {

            produtosHTML = `

                <div class="order-product">

                    <div>

                        <span class="order-category">
                            Produto
                        </span>

                        <h4>
                            ${pedido.produto}
                        </h4>

                    </div>

                    <strong>
                        ${pedido.valor || "R$ 0,00"}
                    </strong>

                </div>

            `;

        }


        /* =================================================
           CARD DO PEDIDO
        ================================================= */

        orderCard.innerHTML = `

            <div class="order-header">

                <div>

                    <span class="order-label">
                        PEDIDO
                    </span>

                    <h3>
                        #${pedido.id}
                    </h3>

                </div>


                <span class="order-status">
                    ${pedido.status || "Processando"}
                </span>

            </div>


            <div class="order-products