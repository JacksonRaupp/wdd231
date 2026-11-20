const chaveApi = "1546c6449c5f50b2ed070a37c466ac66";
const coordenadas = "lat=-15.6467&lon=-56.1325";
const urlTempo = `https://api.openweathermap.org/data/2.5/weather?${coordenadas}&units=metric&lang=pt_br&appid=${chaveApi}`;
const urlPrevisao = `https://api.openweathermap.org/data/2.5/forecast?${coordenadas}&units=metric&lang=pt_br&appid=${chaveApi}`;

async function buscarJson(url) {
  const resposta = await fetch(url);
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status}`);
  }
  return resposta.json();
}

async function mostrarTempo() {
  try {
    const dados = await buscarJson(urlTempo);
    document.getElementById("tempo").innerHTML = `
      <p><strong>${Math.round(dados.main.temp)}&deg;C</strong></p>
      <p>${dados.weather[0].description}</p>`;

    const previsao = await buscarJson(urlPrevisao);
    const dias = previsao.list
      .filter((item) => item.dt_txt.includes("12:00:00"))
      .slice(0, 3);

    document.getElementById("previsao").innerHTML = dias
      .map((dia) => {
        const nome = new Date(dia.dt * 1000).toLocaleDateString("pt-BR", { weekday: "long" });
        return `<li>${nome}: <strong>${Math.round(dia.main.temp)}&deg;C</strong></li>`;
      })
      .join("");
  } catch (erro) {
    document.getElementById("tempo").textContent = "Tempo indisponível.";
    console.error(erro);
  }
}

async function mostrarDestaques() {
  try {
    const membros = await buscarJson("dados/membros.json");
    const destaques = membros
      .filter((membro) => membro.nivel >= 2)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);

    document.getElementById("lista-destaques").innerHTML = destaques
      .map((membro) => `
        <article class="membro">
          <img src="imagens/${membro.imagem}" alt="Logo de ${membro.nome}" width="80" height="80" loading="lazy">
          <h3>${membro.nome}</h3>
          <p class="nivel nivel-${membro.nivel}">${membro.nivel === 3 ? "Ouro" : "Prata"}</p>
          <p>${membro.telefone}</p>
          <p>${membro.endereco}</p>
          <a href="${membro.site}">${membro.site.replace(/^https?:\/\//, "")}</a>
        </article>`)
      .join("");
  } catch (erro) {
    console.error(erro);
  }
}

mostrarTempo();
mostrarDestaques();
