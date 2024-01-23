const state = {
  view: {
    squares: document.querySelectorAll(".square"),
    enemy: document.querySelector(".enemy"),
    tempo: document.querySelector("#tempo"),
    pontuacao: document.querySelector("#pontuacao"),
    vidasRestante: document.querySelector("#vidas-restante"),
  },
  values: {
    velocidadeJogo: 600,
    acertouPosicao: 0,
    resultado: 0,
    tempoCorrido: 60,
    vidasRestante: 3,
  },
  actions: {
    tempoId: null,
    contagemRegressivaDoTempo: null,
  },
};

function iniciarGame() {
  state.values.tempoCorrido = 60;
  state.values.vidasRestante = 3;
  state.values.resultado = 0;
  state.view.tempo.textContent = state.values.tempoCorrido;
  state.view.vidasRestante.textContent = state.values.vidasRestante;
  state.view.pontuacao.textContent = state.values.resultado;
  state.actions.tempoId = setInterval(sortearInimigo, 1000);
  state.actions.contagemRegressivaDoTempo = setInterval(
    contagemRegressiva,
    1000
  );
}

function sortearInimigo() {
  state.view.squares.forEach((square) => {
    square.classList.remove("enemy");
  });

  let sorteandoInimigo = Math.floor(Math.random() * 9);
  let sortearInimigo = state.view.squares[sorteandoInimigo];
  sortearInimigo.classList.add("enemy");
  state.values.acertouPosicao = sortearInimigo.id;
}

function addListenerHitBox() {
  state.view.squares.forEach((square) => {
    square.addEventListener("mousedown", () => {
      if (square.id === state.values.acertouPosicao) {
        state.values.resultado++;
        state.view.pontuacao.textContent = state.values.resultado;
        state.values.acertouPosicao = null;
        somFundo();
      } else {
        state.values.vidasRestante--;
        state.view.vidasRestante.textContent = state.values.vidasRestante;
      }
    });
  });
}

function contagemRegressiva() {
  state.values.tempoCorrido--;
  state.view.tempo.textContent = state.values.tempoCorrido;

  if (state.values.tempoCorrido <= 0 || state.values.vidasRestante <= 0) {
    clearInterval(state.actions.contagemRegressivaDoTempo);
    clearInterval(state.actions.tempoId);

    alert("Game Over! O seu resultado foi: " + state.values.resultado);

  iniciarGame();
  }
}

function somFundo() {
  let audio = new Audio("./src/som/src_audios_hit.m4a");
  audio.volume = 0.2;
  audio.play();
}

function main() {
  addListenerHitBox();
  iniciarGame();
}

main();
