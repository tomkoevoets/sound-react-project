// class to create particles based on volume of sound input
class Particle{
    constructor(volume) {
        // Create particle with scale based on volume
        this.pos = p5.Vector.random2D().mult(100); // position
        this.vel = createVector(0,0); // velocity
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001)); // acceleration
        this.num = int(random(1, 5)); // shape type
        this.scale1 = volume * 0.5; // scale 1 transform
        this.scale2 = volume * 2.5; // scale 2 transform
        // Set color based on shape type using switch statement
        switch (this.num) {
            case 1:
                this.color = col4;
                break;
            case 2:
                this.color = col1;
                break;
            case 3:
                this.color = col2;
                break;
            case 4:
                this.color = col3;
                break;
            default:
                this.color = col1;
                break;
        }
    }
    // Update function to move particles based on frequency
    update(freq) {
        this.vel.add(this.acc);
        for(var i = 0; i < freq; i++){
            // Increase velocity based on frequency
            this.pos.add(this.vel);
        }
    }
    // Check if particles have moved off the canvas
    edges() {
        // Remove particles that have moved off the canvas
        if(this.pos.x < -width/2 - 5 || this.pos.x > width/2 + 5 || this.pos.y < -height/2 - 5 || this.pos.y > height/2 + 5) {
            return true;
        } else {
            return false;
        }
    }
    // Display particles based on shape type
    show() {
        if(this.num == 1) {
            drawStar(this.color, this.pos.x, this.pos.y, 10, 2.5, this.scale1, this.scale2);
        }
        else if(this.num == 2) {
            drawCross(this.color, this.pos.x, this.pos.y, 7.5, this.scale1, this.scale2);
        }
        else if(this.num == 3) {
            drawRectangle(this.color, this.pos.x, this.pos.y, 10, 5, this.scale1, this.scale2);
        }
        else {
            drawSquare(this.color, this.pos.x, this.pos.y, 7.5, this.scale1, this.scale2);
        }
    }
}

// Function to draw a circle
function drawCircle(color, x, y, size, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    stroke(color);
    noFill();
    ellipse(0, 0, size);
    pop();
}

//  Function to draw a cross
function drawCross(color, x, y, size1, size2, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    fill(color);
    noStroke();
    rect(0, 0, size1, size2);
    rect(0, 0, size2, size1);
    pop();
}

// Function to draw a square
function drawSquare(color, x, y, size, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    fill(color);
    noStroke();
    square(0, 0, size);
    pop();
}

// Function to draw a rectangle
function drawRectangle(color, x, y, size1, size2, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    fill(color);
    noStroke();
    rect(0, 0, size1, size2, 20);
    pop();
}

// Function to draw a star
// this code is generated and thus not used in the project but a good example of how complex shapes can be drawn
function drawStar(color, x, y, size, scale1, scale2) {
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    stroke(color);
    noFill();
    beginShape();
    for (let i = 0; i < 5; i++) {
        let angle = TWO_PI / 5 * i;
        let sx = cos(angle) * size;
        let sy = sin(angle) * size;
        vertex(sx, sy);
        angle += TWO_PI / 10;
        sx = cos(angle) * size / 2;
        sy = sin(angle) * size / 2;
        vertex(sx, sy);
    }
    endShape(CLOSE);
    pop();
}
