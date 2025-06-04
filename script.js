const inicio = new Date("2025-06-03T12:55:00");
const relogio = document.getElementById("relacionamento");

function atualizarTempo() {
  const agora = new Date();
  let diff = agora - inicio;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= dias * (1000 * 60 * 60 * 24);

  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff -= horas * (1000 * 60 * 60);

  const minutos = Math.floor(diff / (1000 * 60));
  diff -= minutos * (1000 * 60);

  const segundos = Math.floor(diff / 1000);

  relogio.innerText = `${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

setInterval(atualizarTempo, 1000);
atualizarTempo();

// EVENTOS
const eventosFixos = [
  new Date("2025-06-12T00:00:00"), // Dia dos Namorados
  new Date("2025-07-17T00:00:00"), // Aniversário Marjorie
];

function criarAniversariosMeses(inicioMes, quantidade) {
  const datas = [];
  const anoBase = 2025;
  for (let i = 0; i < quantidade; i++) {
    let mes = inicioMes + i;
    let ano = anoBase;
    if (mes > 12) {
      mes -= 12;
      ano += 1;
    }
    datas.push(new Date(`${ano}-${String(mes).padStart(2, "0")}-03T00:00:00`));
  }
  return datas;
}

const aniversariosMeses = criarAniversariosMeses(7, 6);
let todosEventos = [...eventosFixos, ...aniversariosMeses];
todosEventos.sort((a, b) => a - b);

function proximoEvento() {
  const agora = new Date();
  for (const evento of todosEventos) {
    if (evento > agora) return evento;
  }
  const proxAnoEventos = todosEventos.map(
    (d) => new Date(d.getFullYear() + 1, d.getMonth(), d.getDate(), 0, 0, 0)
  );
  return proxAnoEventos[0];
}

const proximoEventoSpan = document.getElementById("proximoEvento");

function atualizarContagemRegressiva() {
  const agora = new Date();
  const evento = proximoEvento();
  let diff = evento - agora;

  const dias = Math.floor(diff / (1000 * 60 * 60 * 24));
  diff -= dias * (1000 * 60 * 60 * 24);

  const horas = Math.floor(diff / (1000 * 60 * 60));
  diff -= horas * (1000 * 60 * 60);

  const minutos = Math.floor(diff / (1000 * 60));
  diff -= minutos * (1000 * 60);

  const segundos = Math.floor(diff / 1000);

  const nomesEventos = {
    "2025-06-12": "Dia dos Namorados",
    "2025-07-17": "Primeiro aniversário da Marjorie namorando com você",
  };

  let nomeEvento = nomesEventos[evento.toISOString().slice(0, 10)];
  if (!nomeEvento) {
    const mes = evento.getMonth() + 1;
    nomeEvento = `Aniversário de ${mes} meses de namoro`;
  }

  proximoEventoSpan.innerText = `${nomeEvento} em ${dias} dias, ${horas} horas, ${minutos} minutos e ${segundos} segundos`;
}

setInterval(atualizarContagemRegressiva, 1000);
atualizarContagemRegressiva();

// Corações animados
const coracoesContainer = document.getElementById("coraçoesContainer");

function criarCoracao() {
  const coracao = document.createElement("span");
  coracao.innerText = "❤️";
  coracao.style.left = `${Math.random() * 100}%`;
  coracao.style.animationDuration = `${Math.random() * 2 + 4}s`;
  coracoesContainer.appendChild(coracao);

  setTimeout(() => coracao.remove(), 6000);
}

setInterval(criarCoracao, 300);

// Depoimento toggle
const botaoDepoimento = document.getElementById("botaoDepoimento");
const depoimento = document.getElementById("depoimento");

botaoDepoimento.addEventListener("click", () => {
  if (depoimento.style.display === "none" || depoimento.style.display === "") {
    depoimento.style.display = "block";
    botaoDepoimento.innerText = "Esconder depoimento";
  } else {
    depoimento.style.display = "none";
    botaoDepoimento.innerText = "Mostrar depoimento";
  }
});

// Música: botão coração para pausar/tocar e mudar cor
const botaoMusica = document.getElementById("botaoMusica");
const musica = document.getElementById("musica");

botaoMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    botaoMusica.classList.remove("pausado");
  } else {
    musica.pause();
    botaoMusica.classList.add("pausado");
  }
});
