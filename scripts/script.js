const raiz = document.documentElement;
const botao = document.querySelector("#trocar-tema");

const salvo = localStorage.getItem("tema");
if (salvo) raiz.dataset.tema = salvo;

botao.addEventListener("click", () => {
  let novo;

  if (raiz.dataset.tema === "claro") {
    novo = "escuro";
  } else {
    novo = "claro";
  }

  raiz.dataset.tema = novo;
  localStorage.setItem("tema", novo);
});
