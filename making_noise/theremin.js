const appContents = document.querySelector(".app-contents");
const startMessage = document.querySelector(".start-message");
let isAppInit = false;
appContents.style.display = "none";

window.addEventListener("keydown", init);
window.addEventListener("click", init);

function init() {
  if (isAppInit) {
    return;
  }

  appContents.style.display = "block";
  document.body.removeChild(startMessage);

  // create web audio api context
  const AudioContext = window.AudioContext || window.webkitAudioContext;
  const audioCtx = new AudioContext();

  // create Oscillator and gain node
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  // connect oscillator to gain node to speakers
  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  // create initial theremin frequency and volume values
  const WIDTH = window.innerWidth;
  const HEIGHT = window.innerHeight;

  const maxFreq = 6000;
  const maxVol = 0.02;
  const initialVol = 0.001;

  // set options for the oscillator
  oscillator.detune.value = 100; // value in cents
  oscillator.start(0);

  oscillator.onended = function () {
    console.log("Your tone has now stopped playing!");
  };

  gainNode.gain.value = initialVol;
  gainNode.gain.minValue = initialVol;
  gainNode.gain.maxValue = initialVol;

  // Mouse pointer coordinates
  let CurX;
  let CurY;

  // Get new mouse pointer coordinates when mouse is moved
  // then set new gain and pitch values
  document.onmousemove = updatePage;

  function updatePage(e) {
    KeyFlag = false;

    for (var i = 0; i < particles.length; i++) {
      particles[i].giveCoords();
      CurX = particles[i].pos.x;   //tääl menee koodaus, ehkä toimiisssjgijiogjsijgios EI TOIMI KOSKA EN TEE IKINÄ NIITÄ PARTIKKELEJA
      CurY = particles[i].pos.y;

    oscillator.frequency.value = (CurX / WIDTH) * maxFreq;
    gainNode.gain.value = (CurY / HEIGHT) * maxVol;

    canvasDraw();
    }
  }

  // mute button
  const mute = document.querySelector(".mute");

  mute.onclick = function () {
    if (mute.getAttribute("data-muted") === "false") {
      gainNode.disconnect(audioCtx.destination);
      mute.setAttribute("data-muted", "true");
      mute.innerHTML = "Unmute";
    } else {
      gainNode.connect(audioCtx.destination);
      mute.setAttribute("data-muted", "false");
      mute.innerHTML = "Mute";
    }
  };

  // canvas visualization
  function random(number1, number2) {
    return number1 + (Math.floor(Math.random() * (number2 - number1)) + 1);
  }

  const canvas = document.querySelector(".canvas");
  const canvasCtx = canvas.getContext("2d");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  function canvasDraw() {
    if (KeyFlag) {
      rX = KeyX;
      rY = KeyY;
    } else {
      rX = CurX;
      rY = CurY;
    }

    rC = Math.floor((gainNode.gain.value / maxVol) * 30);

    canvasCtx.globalAlpha = 0.2;

    for (let i = 1; i <= 15; i = i + 2) {
      canvasCtx.beginPath();
      canvasCtx.fillStyle =
        "rgb(" +
        100 +
        i * 10 +
        "," +
        Math.floor((gainNode.gain.value / maxVol) * 255) +
        "," +
        Math.floor((oscillator.frequency.value / maxFreq) * 255) +
        ")";
      canvasCtx.arc(
        rX + random(0, 50),
        rY + random(0, 50),
        rC / 2 + i,
        (Math.PI / 180) * 0,
        (Math.PI / 180) * 360,
        false
      );
      canvasCtx.fill();
      canvasCtx.closePath();
    }
  }

  // clear screen
  const clear = document.querySelector(".clear");

  clear.onclick = function () {
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  };

  isAppInit = true;
}
