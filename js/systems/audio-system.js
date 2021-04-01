let analyser;

// This funtion will be used only one time to setup the entire system
function setupAudioSystem(audioStream) {

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
    analyser.connect(audioCtx.destination);
}

function getFrequencyAudio() {
    let array = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(array);
    return array;
}