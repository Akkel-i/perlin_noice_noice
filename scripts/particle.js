
function Particle() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    //this.vel = p5.Vector.random2D(); random vauhti
    this.acc = createVector(0, 0);
    this.maxspeed = 2;
    this.h = 0;

    this.prevPos = this.pos.copy();

    const self = this;

    this.update = function () {
        this.vel.add(this.acc);
        this.vel.limit(this.maxspeed);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.follow = function (vectors) {
        var x = floor(this.pos.x / scl);
        var y = floor(this.pos.y / scl);
        var index = x + y * columns;
        var force = vectors[index];
        this.applyForce(force);

    }

    this.applyForce = function (force) {
        this.acc.add(force);
    }

    this.show = function () {
        stroke(this.h, 255, 255, 5);
        //stroke(0, 5) // väri, alfa
        this.h += 1;
        if (this.h > 255) {
            this.h = 0
        }
        strokeWeight(1);
        //point(this.pos.x, this.pos.y); // vain pixeli.. alla viiva paikan ja edellisen paikan välillä
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y)
        this.updatePrev();
    }

    this.updatePrev = function() {
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
    }
    //kierrättää pikselit takaisin reunoilta
    this.edges = function () {
        if (this.pos.x > width) {
            this.pos.x = 0;
            this.updatePrev();
        }
        if (this.pos.x < 0) {
            this.pos.x = width;
            this.updatePrev();
        }
        if (this.pos.y > height) {
            this.pos.y = 0;
            this.updatePrev();
        }
        if (this.pos.y < 0) {
            this.pos.y = height;
            this.updatePrev();
        }
    }


    const slider3 = document.getElementById("slider3");
    const slider3ValueDisplay = document.getElementById("slider3-value");

    let sliderValue3 = this.maxspeed;

    slider3.addEventListener("input", function () {
        sliderValue3 = parseFloat(slider3.value);
        slider3ValueDisplay.textContent = sliderValue3;
        self.maxspeed = sliderValue3;
    });




}