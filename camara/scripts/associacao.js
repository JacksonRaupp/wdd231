document.getElementById("data").value = new Date().toLocaleString("pt-BR");

document.querySelectorAll("[data-modal]").forEach((botao) => {
  botao.addEventListener("click", () => {
    document.getElementById(botao.dataset.modal).showModal();
  });
});

document.querySelectorAll(".fechar").forEach((botao) => {
  botao.addEventListener("click", () => botao.closest("dialog").close());
});
