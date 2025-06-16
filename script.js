// ----------------------
// 1. Contador “Juntos há”
// ----------------------
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
setInterval(atualizarTempo, 1_000);
atualizarTempo();

// ----------------------
// 2. Lista de eventos
// ----------------------
const eventosFixos = [
  new Date("2025-06-12T00:00:00"), // Dia dos Namorados
  new Date("2025-07-17T00:00:00"), // Aniversário Marjorie
];

// Gera n mesversários a partir do mês do início
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

// 12 primeiros mesversários (1 ano)
const aniversariosMeses = criarAniversariosMeses(inicio.getMonth() + 1, 12);

let todosEventos = [...eventosFixos, ...aniversariosMeses];
todosEventos.sort((a, b) => a - b);

// ----------------------
// 3. Descobrir o próximo evento
// ----------------------
function proximoEvento() {
  const agora = new Date();
  for (const evento of todosEventos) {
    if (evento > agora) return evento;
  }
  // se todos passaram, gera para o próximo ano
  const proxAnoEventos = todosEventos.map(
    (d) => new Date(d.getFullYear() + 1, d.getMonth(), d.getDate())
  );
  return proxAnoEventos[0];
}

const proximoEventoSpan = document.getElementById("proximoEvento");

// ----------------------
// 4. Contagem regressiva + rótulo correto
// ----------------------
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

  // Datas que merecem rótulos “especiais”
  const nomesEventosEspeciais = {
    "2025-06-12": "Dia dos Namorados",
    "2025-07-17": "Aniversário da Marjorie",
  };

  let nomeEvento = nomesEventosEspeciais[evento.toISOString().slice(0, 10)];

  // Se não for especial, trata como mesversário / aniversário de namoro
  if (!nomeEvento) {
    const diffMeses =
      (evento.getFullYear() - inicio.getFullYear()) * 12 +
      (evento.getMonth() - inicio.getMonth());

    if (diffMeses === 12) {
      nomeEvento = "Primeiro aniversário de namoro";
    } else {
      const textoMes = diffMeses === 1 ? "mês" : "meses";
      nomeEvento = `Aniversário de ${diffMeses} ${textoMes} de namoro`;
    }
  }

  proximoEventoSpan.innerText =
    `${nomeEvento} em ${dias} dias, ${horas} horas, ` +
    `${minutos} minutos e ${segundos} segundos`;
}
setInterval(atualizarContagemRegressiva, 1_000);
atualizarContagemRegressiva();

// ----------------------
// 5. Efeitos visuais e interações (iguais)
// ----------------------

// Corações animados
const coracoesContainer = document.getElementById("coraçoesContainer");
function criarCoracao() {
  const coracao = document.createElement("span");
  coracao.innerText = "❤️";
  coracao.style.left = `${Math.random() * 100}%`;
  coracao.style.animationDuration = `${Math.random() * 2 + 4}s`;
  coracoesContainer.appendChild(coracao);
  setTimeout(() => coracao.remove(), 6_000);
}
setInterval(criarCoracao, 300);

// Depoimento toggle
const botaoDepoimento = document.getElementById("botaoDepoimento");
const depoimento   = document.getElementById("depoimento");
botaoDepoimento.addEventListener("click", () => {
  const oculto = depoimento.style.display === "none" || !depoimento.style.display;
  depoimento.style.display = oculto ? "block" : "none";
  botaoDepoimento.innerText = oculto
    ? "Esconder depoimento"
    : "Mostrar depoimento";
});

// Música play/pause
const botaoMusica = document.getElementById("botaoMusica");
const musica      = document.getElementById("musica");
botaoMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    botaoMusica.classList.remove("pausado");
  } else {
    musica.pause();
    botaoMusica.classList.add("pausado");
  }
});
