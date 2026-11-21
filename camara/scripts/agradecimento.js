const dados = new URLSearchParams(window.location.search);
const lista = document.getElementById("dados");

const campos = {
  nome: "Nome",
  sobrenome: "Sobrenome",
  email: "E-mail",
  celular: "Celular",
  empresa: "Empresa/organização",
  data: "Data e hora",
};

for (const [campo, rotulo] of Object.entries(campos)) {
  const item = document.createElement("li");
  item.textContent = `${rotulo}: ${dados.get(campo) ?? ""}`;
  lista.appendChild(item);
}
