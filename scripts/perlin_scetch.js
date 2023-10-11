//var xOffset1 = 0;
//var xOffset2 = 10000;

var increment = 0.01;
var start = 0;

function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(51);
    stroke(255);
    noFill()
    beginShape();
    var xOffset1 = start;
    for (var x = 0; x < width; x++){
        stroke(255);
        var y = noise(xOffset1) * height;
        vertex(x, y);

        xOffset1 += increment;
    }
    endShape();

    start += increment;
/* 
    var x = random(width);
    var x = map(noise(xOffset1), 0, 1, 0, width);
    var y = map(noise(xOffset2), 0, 1, 0, height);

    xOffset1 += 0.02;
    xOffset2 += 0.02;

    ellipse(x, y, 24, 24) */
    
    //noLoop();
}