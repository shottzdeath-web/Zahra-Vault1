console.log("Zahra Vault carregada!");
const sellerButton = document.querySelector(".seller-button");
sellerButton.addEventListener("click", function() {

    alert("Em breve você poderá vender na Zahra Vault!");

});
const sellerButton = document.querySelector(".seller-button");
const message = document.querySelector("#message");

sellerButton.addEventListener("click", function() {

    message.textContent = "Em breve você poderá vender na Zahra Vault!";

    message.style.opacity = "1";
    message.style.transform = "translateY(0)";

});