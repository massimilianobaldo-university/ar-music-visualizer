/**
 * This is the system that manages the audio from the microphone stream.
 * All the operation realated to the audio (expect for verifing the audio permission) are inside this namespace.
 * @namespace
 */
let AudioSystem = {
    /**
     * Is the property to store the actual audio analyser.
     */
    analyser: null,

    /**
     * This function setup the entire system to analyze the audio.
     * This function needs to be launch only one time.
     * @param {MediaStream} audioStream - Is the audio incoming from the microphone. This variabile is returns from the promise in "navigator.mediaDevices.getUserMedia({ audio: true }).then"
     */
    setup(audioStream) {

        // Create the audio context
        let audioCtx = new AudioContext();
    
        // Create the stream node 
        let source = audioCtx.createMediaStreamSource(audioStream);
    
        // Create the analyzer node
        analyser = audioCtx.createAnalyser();
        analyser.smoothingTimeConstant = 0.3;
        analyser.fftSize = 512;
    
        // Connect the source to the analyzer
        source.connect(analyser);
        // and to destination
        // analyser.connect(audioCtx.destination);
    },

    /**
     * This function save the frequencies in the wave audio coming from the microphone.
     * @returns a Uint8Array array which contains the frequencies
     */
    getFrequencyAudio() {
        let array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        return array;
    }
}