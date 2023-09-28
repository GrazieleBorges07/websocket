let socket = new WebSocket(WS_URL);
const body = document.querySelector("body");
const logo = document.getElementById("logo");
const messageDiv = document.getElementById("message");
const messageTop = document.getElementById("messageTop");

socket.addEventListener("message", handleServerMessage);

function handleServerMessage(event) {
  const data = JSON.parse(event.data);
  console.log("Mensagem recebida do servidor:", data);

  switch (data.status) {
    case STATUS.WIN:
      setClientState("win", data.code);
      break;
    case STATUS.LOSE:
      setClientState("lose");
      break;
  }
}

function setClientState(state, code = "") {
  // Início da animação
  body.className = "main";
  messageDiv.classList.toggle("hide-message", true);
  logo.classList.toggle("stop-spin", false);
  logo.classList.toggle("spin-animation", true);

  setTimeout(() => {
    if (state === "win") {
      let text = "Você Ganhou!";
      body.classList.add("win");
      messageDiv.innerText = code;
      messageTop.innerText = text;
      vibratePhone(1000);
    } else if (state === "lose") {
      let text = "Não foi dessa vez...";
      body.classList.add("lose");
      messageTop.innerText = text;
    }

    messageDiv.classList.toggle("show-message", state === "win");
    messageDiv.classList.toggle("hide-message", state !== "win");
    logo.classList.toggle("spin-animation", false);
    logo.classList.toggle("stop-spin", true);
  }, 4100);
}

function vibratePhone(timeMs) {
  if (navigator.vibrate) {
    navigator.vibrate(timeMs);
  }
}