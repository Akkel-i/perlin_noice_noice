// tee sliderit sivulle että voi hallita
var increment = 0.1;
var scl = 10; //scale
var columns;
var rows;

var zOffset = 0.0001;
let sliderValue1 = zOffset;
var vectorMag = 0.3;


var fr;

var particles = [];

var flowfield;

// Mouse pointer coordinates
let CurX;
let CurY;

document.addEventListener('DOMContentLoaded', function() {
  const playButton = document.getElementById('button');

  playButton.addEventListener('click', function() {
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

//function updatePage(e) {


  for (var i = 0; i < particles.length; i++) {
    particles[i].giveCoords();
    CurX = particles[i].pos.x;  
    CurY = particles[i].pos.y;

  oscillator.frequency.value = (CurX / WIDTH) * maxFreq;
  gainNode.gain.value = (CurY / HEIGHT) * maxVol;
  console.log(CurX);
  console.log(CurY);
  }

//}

});
});

function setup() {
    var theCanvas = createCanvas(1000, 600);
    theCanvas.position((width / 3), (height / 4));
    theCanvas.parent('container');
    colorMode(HSB, 255);
    columns = floor(width / scl);
    rows = floor(height / scl);

    fr = createP('');

    flowfield = new Array(columns * rows);

    // kuinka monta pikseliä tulee kuinka monta looppia
    for (var i = 0; i < 5; i++) {
        particles[i] = new Particle();
    }
    background(200);
    //background(255);




  }



function draw() {



    var yOffset = 0;

    for (var y = 0; y < rows; y++) {
        var xOffset = 0;
        for (var x = 0; x < columns; x++) {

            var index = x + y * columns;
            var angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 4; // vektorien suunnan laskentaa
            var v = p5.Vector.fromAngle(angle);
            v.setMag(vectorMag); // kuinka vahva flow field vektorien vetovoima on

      
            flowfield[index] = v;
            xOffset += increment;

        }
        yOffset += increment;

        zOffset += sliderValue1; // kuinka nopeasti flowfield vektorit liikkuvat
    }


    
    for (var i = 0; i < particles.length; i++) {
        particles[i].follow(flowfield);
        particles[i].update();
        particles[i].edges();
        particles[i].show();

    }

    //updatePage();
    fr.html(floor(frameRate())); //näyttää frames per second


//




//


    //slider asetukset

  const slider1 = document.getElementById("slider1");
  const slider1ValueDisplay = document.getElementById("slider1-value");

  const slider2 = document.getElementById("slider2");
  const slider2ValueDisplay = document.getElementById("slider2-value");


  let sliderValue2 = v;

  slider1.addEventListener("input", function () {
    sliderValue1 = parseFloat(slider1.value);
    slider1ValueDisplay.textContent = sliderValue1;
    zOffset += sliderValue1;
  });

  slider2.addEventListener("input", function () {
    sliderValue2 = parseFloat(slider2.value);
    slider2ValueDisplay.textContent = sliderValue2;
    vectorMag = sliderValue2;
  });





}