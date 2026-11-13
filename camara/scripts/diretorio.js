const urlMembros = "dados/membros.json";
const containerMembros = document.getElementById("membros");
const botaoGrade = document.getElementById("grade");
const botaoLista = document.getElementById("lista");

const niveis = {
  1: "Membro",
  2: "Prata",
  3: "Ouro",
};

async function buscarMembros() {
  try {
    const resposta = await fetch(urlMembros);

    if (!resposta.ok) {
      throw new Error(`Erro ${resposta.status}`);
    }

    const membros = await resposta.json();
    mostrarMembros(membros);
  } catch (erro) {
    containerMembros.innerHTML =
      "<p>Não foi possível carregar o diretório de membros.</p>";
    console.error(erro);
  }
}

function criarLinha(rotulo, conteudo) {
  const linha = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = `${rotulo}: `;
  linha.append(strong, conteudo);
  return linha;
}

function mostrarMembros(membros) {
  containerMembros.innerHTML = "";

  membros.forEach((membro) => {
    const card = document.createElement("article");
    card.classList.add("membro");

    const imagem = document.createElement("img");
    imagem.src = `imagens/${membro.imagem}`;
    imagem.alt = `Logo de ${membro.nome}`;
    imagem.width = 80;
    imagem.height = 80;
    imagem.loading = "lazy";

    const nome = document.createElement("h2");
    nome.textContent = membro.nome;

    const slogan = document.createElement("p");
    slogan.classList.add("slogan");
    slogan.textContent = membro.slogan;

    const nivel = document.createElement("p");
    nivel.classList.add("nivel", `nivel-${membro.nivel}`);
    nivel.textContent = niveis[membro.nivel];

    const site = document.createElement("a");
    site.href = membro.site;
    site.textContent = membro.site.replace(/^https?:\/\//, "");

    const info = document.createElement("div");
    info.classList.add("info");
    info.append(
      criarLinha("Endereço", membro.endereco),
      criarLinha("Telefone", membro.telefone),
      criarLinha("Site", site),
    );

    card.append(imagem, nome, slogan, nivel, info);
    containerMembros.appendChild(card);
  });
}

function mudarVisualizacao(visualizacao) {
  containerMembros.classList.toggle("grade", visualizacao === "grade");
  containerMembros.classList.toggle("lista", visualizacao === "lista");
  botaoGrade.setAttribute("aria-pressed", visualizacao === "grade");
  botaoLista.setAttribute("aria-pressed", visualizacao === "lista");
}

botaoGrade.addEventListener("click", () => mudarVisualizacao("grade"));
botaoLista.addEventListener("click", () => mudarVisualizacao("lista"));

buscarMembros();
