const botaoHamburguer = document.getElementById("botao-hamburguer");
const menu = document.getElementById("menu");

botaoHamburguer.addEventListener("click", () => {
  menu.classList.toggle("aberto");

  botaoHamburguer.setAttribute(
    "aria-expanded",
    menu.classList.contains("aberto"),
  );
});
