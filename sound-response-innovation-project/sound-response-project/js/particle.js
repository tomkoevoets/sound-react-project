class Particle{
    constructor(volume) {
        // Create particle with scale based on volume
        this.pos = p5.Vector.random2D().mult(100);
        this.vel = createVector(0,0);
        this.acc = this.pos.copy().mult(random(0.0001, 0.00001));
        this.num = int(random(1, 5));
        this.scale1 = volume * 0.5;
        this.scale2 = volume * 2.5;
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
    update(freq) {
        this.vel.add(this.acc);
        for(var i = 0; i < freq; i++){
            // Increase velocity based on frequency
            this.pos.add(this.vel);
        }
    }
    edges() {
        // Remove particles that have moved off the canvas
        if(this.pos.x < -width/2 - 5 || this.pos.x > width/2 + 5 || this.pos.y < -height/2 - 5 || this.pos.y > height/2 + 5) {
            return true;
        } else {
            return false;
        }
    }
    show() {
        if(this.num == 1) {
            drawCross(this.color, this.pos.x, this.pos.y, 10, 2.5, this.scale1, this.scale2);
        }
        else if(this.num == 2) {
            drawCircle(this.color, this.pos.x, this.pos.y, 7.5, this.scale1, this.scale2);
        }
        else if(this.num == 3) {
            drawRectangle(this.color, this.pos.x, this.pos.y, 10, 5, this.scale1, this.scale2);
        }
        else {
            drawSquare(this.color, this.pos.x, this.pos.y, 7.5, this.scale1, this.scale2);
        }
    }
}

function drawCircle(color, x, y, size, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    stroke(color);
    noFill();
    ellipse(0, 0, size);
    pop();
}

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

function drawSquare(color, x, y, size, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    fill(color);
    noStroke();
    square(0, 0, size);
    pop();
}

function drawRectangle(color, x, y, size1, size2, scale1, scale2){
    push();
    translate(x, y);
    scale(random(scale1, scale2));
    fill(color);
    noStroke();
    rect(0, 0, size1, size2, 20);
    pop();
}


// function drawStar(color, x, y, size, scale1, scale2) {
//     push();
//     translate(x, y);
//     scale(random(scale1, scale2));
//     stroke(color);
//     noFill();
//     beginShape();
//     for (let i = 0; i < 5; i++) {
//         let angle = TWO_PI / 5 * i;
//         let sx = cos(angle) * size;
//         let sy = sin(angle) * size;
//         vertex(sx, sy);
//         angle += TWO_PI / 10;
//         sx = cos(angle) * size / 2;
//         sy = sin(angle) * size / 2;
//         vertex(sx, sy);
//     }
//     endShape(CLOSE);
//     pop();
// }

// function drawTriangle(color, x, y, size, scale1, scale2) {
//     push();
//     translate(x, y);
//     scale(random(scale1, scale2));
//     fill(color);
//     noStroke();
//     beginShape();
//     vertex(-size, size);
//     vertex(size, size);
//     vertex(0, -size);
//     endShape(CLOSE);
//     pop();
// }

// function drawPentagon(color, x, y, size, scale1, scale2) {
//     push();
//     translate(x, y);
//     scale(random(scale1, scale2));
//     fill(color);
//     noStroke();
//     beginShape();
//     for (let i = 0; i < 5; i++) {
//         let angle = TWO_PI / 5 * i - PI / 2;
//         let sx = cos(angle) * size;
//         let sy = sin(angle) * size;
//         vertex(sx, sy);
//     }
//     endShape(CLOSE);
//     pop();
// }

// function drawEllipse(color, x, y, size1, size2, scale1, scale2) {
//     push();
//     translate(x, y);
//     scale(random(scale1, scale2));
//     fill(color);
//     noStroke();
//     ellipse(0, 0, size1, size2);
//     pop();
// }