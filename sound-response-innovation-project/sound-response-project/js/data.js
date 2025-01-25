// Data class for handling input and output data
class Data {
    constructor() {
        this.output = new Output();
        this.analysis = new Analysis();
        this.input = new Input();
    }
    startInput() {
        userStartAudio();
        this.input.mic = new p5.AudioIn(); // Create an Audio input
        this.input.mic.start( () => {
            this.analysis.pitchDetector = ml5.pitchDetection('models/pitchmodel', getAudioContext(), this.input.mic.stream, () => { this.analysis.loaded = true; }); // Create a pitch detector using the Audio input
        });
    }
    // Update function to get the volume and frequency from the input 
    update() {
        if(this.analysis.loaded){
            this.analysis.pitchDetector.getPitch((err, frequency) => {
               if(frequency){
                this.output.sounds.frequency += (frequency - this.output.sounds.frequency) * 0.05;
               } else {
                this.output.sounds.frequency += (0 - this.output.sounds.frequency) * 0.05;
               }
            });
            this.output.sounds.volume += (this.input.mic.getLevel() - this.output.sounds.volume) * 0.05;
        }
    }
}

// Analysis class for handling the analysis of the input data
class Analysis {
    constructor(){
        this.pitchDetector = null;
        this.loaded = false;
    }
    handleResults(error, result){
        if (error) {
            console.error(error);
        }

        return result[0].label;
    }
}

// Input class for handling the microphone input 
class Input {
    constructor(){
        this.mic = null;
    }
}

// Output class for handling the output data
class Output {
    constructor(){
        this.sounds = {
            frequency: null,
            volume: null
        };
    }
}