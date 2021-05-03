// Constants
const NUMBER_OF_BARS = 10;
const FRAME_TO_SKIP = 5;

function initialize() {
    /// three-system -> setup(NUMBER_OF_BARS)
    ThreeSystem.setup();

    /// ar-sysetm -> setup()
    ArSystem.setup();

    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');

        // Asking the audio to the User
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (audioStream) {
                /// already create in the three-sysetm -> setup

                let audioGroup = ThreeSystem.getAudioGroup(); /// three-sysetm -> getAudioGroup()

                // build markerControls
                let markerControls = ArSystem.generateMarkerControls(audioGroup) /// ar-sysem -> generateMarkerControls(audioGroup)*/

                /// already create in the three-sysetm -> setup

                //// audio-system -> setup
                AudioSystem.setup(audioStream);

                // The render Loop for the processor system
                function animate() {
                    requestAnimationFrame(animate);
                    
                    let arrayOfFrequencies = AudioSystem.getFrequencyAudio();

                    let step = Math.round(arrayOfFrequencies.length / NUMBER_OF_BARS);

                    // The difficul part
                    // For every element in the array, i need the last one
                    // I generate a new one
                    // I attached to the end of the list

                    // Generate a Random Color
                    // let color = goldRatioColors();
                    ThreeSystem.initialize(arrayOfFrequencies, step);

                    // Render the changes
                    ArSystem.update();
                    /// three-system ->render();
                    ThreeSystem.render();
                }
                animate();
            })
            // Manage the error
            .catch(function (err) {
                console.log('The following gUM error occurred: ' + err);
            });
        // Fail access to User Media
    } else {
        console.log('getUserMedia not supported on your browser!');
    }
}

// Launch the entire system
initialize();

