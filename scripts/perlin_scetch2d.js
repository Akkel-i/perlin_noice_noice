
var increment = 0.01;


function setup() {
    createCanvas(200, 200);
    pixelDensity(1);
}

function draw() {

    var YOffset = 0;
    loadPixels();
    for (var y = 0; y < width; y++) {
        var xOffset = 0;
        for (var x = 0; x < width; x++) {

            var index = (x + y * width) * 4;
            var r = noise(xOffset, YOffset) * 255;
            pixels[index + 0] = r;
            pixels[index + 1] = r;
            pixels[index + 2] = r;
            pixels[index + 3] = 255;

            xOffset += increment;
        }
        YOffset += increment;
    }

    updatePixels();

}