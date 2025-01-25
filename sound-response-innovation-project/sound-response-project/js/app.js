let data;
let windowW = window.innerWidth;
let windowH = window.innerHeight;

let col1;
let col2;
let col3;
let col4;

let particles = [];
let maxDistance = 100;
let mask = [];
let loopCount = 0; // Loop through mask images
let nFrames = 12000;

// Preload mask images
function preload(){
    document.body.style.overflow = 'hidden';
    for(i = 0; i < 251; i++) {
        mask[i] = loadImage('assets/Mask_002_00' + i + '.png');
    }
}

// Setup function
function setup(){
    data = new Data();
   
    rectMode(CENTER); // spawn particles in the center of the screen
    imageMode(CORNER); // set the mask image to the corner of the screen
    createCanvas(windowW - 1, windowH - 1); // create canvas with window width and height

    // Wait for an interaction with the page before requesting the Audio Context to avoid errors
    getAudioContext().suspend();
}

// Draw function to display particles
function draw(){
    data.update();
    
    background(178, 83, 62, 30);
    let timing = (frameCount) / nFrames; 
    
    let vol = data.output.sounds.volume;
    let freq = data.output.sounds.frequency;

    // Map volume for particle size
    let volume = map(vol, 0, 1, 1, 20);

    // Map frequency for particle acceleration
    let frequency = map(freq, 100, 2000, 1, 20);

    // rgb(0, 184, 169)
    // rgb(248, 243, 212)
    // rgb(246, 65, 108)
    // rgb(255, 222, 125)

    // rgb(255, 154, 0)
    // rgb(24, 111, 101)
    // rgb(181, 203, 153)
    // rgb(178, 83, 62)
    // rgb(252, 224, 155)

    // rgb(0, 26, 110)
    // rgb(7, 71, 153)
    // rgb(0, 153, 144)
    // rgb(225, 255, 187)


    // Set colors based on volume
    if(vol >= .15){
        // Red colors for loud volume
        col1 = color(255, 0, 0);
        col2 = color(227, 11, 92);
        col3 = color(225, 49, 49);
        col4 = color(233, 30, 70);
    }
    else {
        // my colors for normal volume aqua style
        col1 = color(0, 26, 110);
        col2 = color(7, 71, 153);
        col3 = color(0, 153, 144);
        col4 = color(225, 255, 187);
    }

    // Draw particles using p5.js push and pop functions
    push();
    // Rotate screen center
    translate(windowW / 2, windowH / 2);
    var x = 0 + 10 * cos(360 * timing);
    var y = 0 + 175 * sin(360 * timing);
    translate(x, y);

    // Spawn new particles when noise is detected
    if(vol > .04){
        for(var i = 0; i < 3; i++){
            if(particles.length < 100){
                var p = new Particle(volume);
                particles.push(p);
            }   
        }
    }

    // Display and move all existing particles using volume and frequency
    for(var i = particles.length - 1; i >= 0; i--) {
        if(!particles[i].edges()) {
            particles[i].update(frequency);
            particles[i].show(volume);
        } else {
            particles.splice(i, 1);
        }
    }  

    // Randomly spawn a particle every 8 seconds if no noise is detected
    if(particles.length == 0 && second() % 8 == 0){
        var p = new Particle(8);
        particles.push(p);
    }
    pop(); // use pop to reset the transformation matrix

    // Loop through mask images
    image(mask[loopCount], 0, 0, windowW, windowH);
    if(loopCount < mask.length - 1){
        loopCount++;
    }
    else {
        loopCount = 0;
    }
}

// This part makes sure there's been an interaction with the page before audio elements
// are activated. This prevents errors.
let overlayEl = document.querySelector('.overlay');
overlayEl.addEventListener('mouseup', (e) => {
    overlayEl.classList.add('overlay-hidden');
    data.startInput();
});