import { lugares } from "../dados/lugares.mjs";

document.getElementById("lugares").innerHTML = lugares
  .map((lugar) => `
    <article class="lugar">
      <figure>
        <img src="imagens/${lugar.imagem}" alt="Foto de ${lugar.nome}" width="300" height="200" loading="lazy">
      </figure>
      <h2>${lugar.nome}</h2>
      <address>${lugar.endereco}</address>
      <p>${lugar.descricao}</p>
      <button type="button">Saiba mais</button>
    </article>`)
  .join("");

document.getElementById("creditos").innerHTML =
  "Créditos das fotos: " +
  lugares
    .map((lugar) => `<a href="${lugar.fonte}">${lugar.nome}</a> - ${lugar.credito.replace("Foto: ", "")}`)
    .join("; ") +
  ".";

const agora = Date.now();
const ultimaVisita = Number(localStorage.getItem("ultimaVisita"));
let mensagem;

if (!ultimaVisita) {
  mensagem = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
} else {
  const dias = Math.floor((agora - ultimaVisita) / 86400000);

  if (dias < 1) {
    mensagem = "Já voltou? Que legal!";
  } else {
    mensagem = `Seu último acesso foi há ${dias} ${dias === 1 ? "dia" : "dias"}.`;
  }
}

document.getElementById("mensagem-visita").textContent = mensagem;
localStorage.setItem("ultimaVisita", agora);
