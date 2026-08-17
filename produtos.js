const produtos = [

    {
        id: 1,
        nome: "Roblox Premium",
        categoria: "roblox",
        descricao: "Produto digital para Roblox.",
        preco: 19.90,
        imagem: "IMAGEM"
    },

    {
        id: 2,
        nome: "Minecraft Deluxe",
        categoria: "minecraft",
        descricao: "Produto digital para Minecraft.",
        preco: 29.90,
        imagem: "IMAGEM"
    },

    {
        id: 3,
        nome: "Discord Design",
        categoria: "discord",
        descricao: "Serviço digital para Discord.",
        preco: 24.90,
        imagem: "IMAGEM"
    },

    {
        id: 4,
        nome: "Gift Card",
        categoria: "gift-cards",
        descricao: "Código digital para utilização.",
        preco: 49.90,
        imagem: "IMAGEM"
    },

    {
        id: 5,
        nome: "Roblox Ultimate",
        categoria: "roblox",
        descricao: "Produto premium para Roblox.",
        preco: 59.90,
        imagem: "IMAGEM"
    },

    {
        id: 6,
        nome: "Minecraft Premium",
        categoria: "minecraft",
        descricao: "Recurso digital para Minecraft.",
        preco: 39.90,
        imagem: "IMAGEM"
    }

];


const productsContainer =
    document.getElementById("products-container");

const searchInput =
    document.getElementById("product-search");

const categoryFilter =
    document.getElementById("category-filter");

const productsMessage =
    document.getElementById("products-message");


function formatarPreco(preco) {

    return preco.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


function mostrarProdutos(lista) {

    productsContainer.innerHTML = "";


    if (lista.length === 0) {

        productsMessage.style.display = "block";

        return;

    }


    productsMessage.style.display = "none";


    lista.forEach(produto => {

        const card =
            document.createElement("div");

        card.className = "product-card";


        card.innerHTML = `

            <div class="product-image">

                <span>
                    ${produto.imagem}
                </span>

            </div>


            <div class="product-info">

                <small>
                    ${produto.categoria}
                </small>

                <h3>
                    ${produto.nome}
                </h3>

                <p>
                    ${produto.descricao}
                </p>

                <strong>
                    ${formatarPreco(produto.preco)}
                </strong>

                <button
                    class="buy-button"
                    data-id="${produto.id}"
                >
                    Comprar
                </button>

            </div>

        `;


        productsContainer.appendChild(card);

    });


    document
        .querySelectorAll(".buy-button")
        .forEach(button => {

            button.addEventListener(
                "click",
                comprarProduto
            );

        });

}


function filtrarProdutos() {

    const pesquisa =
        searchInput.value
            .toLowerCase()
            .trim();

    const categoria =
        categoryFilter.value;


    const resultados =
        produtos.filter(produto => {

            const correspondePesquisa =
                produto.nome
                    .toLowerCase()
                    .includes(pesquisa) ||

                produto.descricao
                    .toLowerCase()
                    .includes(pesquisa);


            const correspondeCategoria =
                categoria === "todos" ||
                produto.categoria === categoria;


            return (
                correspondePesquisa &&
                correspondeCategoria
            );

        });


    mostrarProdutos(resultados);

}


/* =========================================================
   ADICIONAR AO CARRINHO
========================================================= */

function comprarProduto(event) {

    const logado =
        localStorage.getItem("logado");

    if (logado !== "true") {

        alert(
            "Entre na sua conta para adicionar produtos ao carrinho."
        );

        window.location.href = "login.html";

        return;
    }


    const id =
        Number(event.currentTarget.dataset.id);


    const produto =
        produtos.find(item => item.id === id);


    if (!produto) {
        return;
    }


    const carrinhoSalvo =
        localStorage.getItem("carrinho");


    const carrinho =
        carrinhoSalvo
            ? JSON.parse(carrinhoSalvo)
            : [];


    carrinho.push(produto);


    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );


    window.location.href =
        "carrinho.html";

}


/* =========================================================
   FILTROS
========================================================= */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filtrarProdutos
    );

}


if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filtrarProdutos
    );

}


mostrarProdutos(produtos);