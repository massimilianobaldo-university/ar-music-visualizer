// Constants
const NUMBER_OF_BARS = 12;

function initialize() {
    /// three-system -> setup(NUMBER_OF_BARS)
    setupThreeSystem();

    /// ar-sysetm -> setup()
    setupArSystem();

    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');

        // Asking the audio to the User
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (audioStream) {
                /// already create in the three-sysetm -> setup

                let audioGroup = getAudioGroup(); /// three-sysetm -> getAudioGroup()

                // build markerControls
                let markerControls = generateMarkerControls(audioGroup) /// ar-sysem -> generateMarkerControls(audioGroup)*/

                /// already create in the three-sysetm -> setup

                //// audio-system -> setup
                setupAudioSystem(audioStream);

                // The render Loop for the processor system
                function animate() {
                    requestAnimationFrame(animate);
                    
                    let array = getFrequencyAudio();

                    let step = Math.round(array.length / NUMBER_OF_BARS);

                    // The difficul part
                    // For every element in the array, i need the last one
                    // I generate a new one
                    // I attached to the end of the list

                    // Generate a Random Color
                    // let color = goldRatioColors();

                    // Create a material
                    let material = generateMaterial(); /// three-system -> genearteMaterial()

                    initThreeSystem(material, array, step);

                    // Render the changes
                    update();
                    /// three-system ->render();
                    render();
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

