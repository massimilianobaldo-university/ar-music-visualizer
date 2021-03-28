//constants
const NUMBER_OF_BARS = 15;

// Variabels for create the 3D Objects
let scene, camera, renderer;

// Core variables of AR.js system
let arToolkitSource, arToolkitContext;

// The real 3D Visualizer
let bars = new LinkedList();

// The THREE.Group() where to store all the bars for the visualizer
let audioVisualizer;

/**
 * Functio to udpate the artoolkit on every frame
 */
function update() {
    if (arToolkitSource.ready !== false)
        arToolkitContext.update(arToolkitSource.domElement);
}

/**
 * Function to render the acutal scene
 */
function render() {
    renderer.render(scene, camera);
}

function initialize() {
    scene = new THREE.Scene();

    let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
    scene.add(ambientLight);

    camera = new THREE.Camera();
    scene.add(camera);

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });

    renderer.setClearColor(new THREE.Color('lightgrey'), 0)
    renderer.setSize(1920, 1080);
    renderer.domElement.style.position = 'absolute'
    renderer.domElement.style.top = '0px'
    renderer.domElement.style.left = '0px'
    document.body.appendChild(renderer.domElement);

    ///// Setup arToolkitSource /////

    arToolkitSource = new THREEx.ArToolkitSource({
        sourceType: 'webcam',
    });

    function onResize() {
        arToolkitSource.onResize()
        arToolkitSource.copySizeTo(renderer.domElement)
        if (arToolkitContext.arController !== null) {
            arToolkitSource.copySizeTo(arToolkitContext.arController.canvas)
        }
    }

    arToolkitSource.init(function onReady() {
        onResize()
    });

    // Handle the resize event
    window.addEventListener('resize', function () {
        onResize()
    });

    ///// setup arToolkitContext /////

    // Create atToolkitContext
    arToolkitContext = new THREEx.ArToolkitContext({
        cameraParametersUrl: './data/camera_para.dat',
        detectionMode: 'mono'
    });

    // Copy projection matrix to camera when initialization complete
    arToolkitContext.init(function onCompleted() {
        camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
    });

    ///// Setup markerRoots /////

    if (navigator.mediaDevices) {
        console.log('getUserMedia supported.');

        // Asking the audio to the User
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (audioStream) {

                // build markerControls
                audioVisualizer = new THREE.Group();
                scene.add(audioVisualizer);

                let markerControls1 = new THREEx.ArMarkerControls(arToolkitContext, audioVisualizer, {
                    type: 'pattern', patternUrl: "./data/hiro.patt",
                })

                // Create a bar
                let barGeometry = new THREE.BoxGeometry(0.15, 0.2, 0.15);

                ///// Getting and Processing the Audio Stream from Microphone /////

                // Create the audio context
                let audioCtx = new AudioContext();

                // Create the stream node 
                let source = audioCtx.createMediaStreamSource(audioStream);

                // Create the analyzer node
                let analyser = audioCtx.createAnalyser();
                analyser.smoothingTimeConstant = 0.3;
                analyser.fftSize = 512;

                // Connect the source to the analyzer
                source.connect(analyser);
                // and to destination
                analyser.connect(audioCtx.destination);

                // The render Loop for the processor system
                function animate() {
                    requestAnimationFrame(animate);
                    let array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);

                    let step = Math.round(array.length / NUMBER_OF_BARS);

                    // Generate a Random Color
                    let color = goldRatioColors();

                    // Create a material
                    let material = new THREE.MeshPhongMaterial({
                        color: new THREE.Color(RGBToHex(color.r, color.g, color.b)),
                        specular: 0xffffff
                    });

                    // Create the geometry for the bar
                    let bar = new THREE.Mesh(barGeometry, material);

                    // Scale the object
                    let value = array[(Math.floor(Math.random() * 10) + 1) * step] / 6;
                    value = value < 1 ? 1 : value;
                    bar.scale.y = value;

                    // Create a Bounding Box to calculate the actual dimensions
                    let BB = new THREE.Box3().setFromObject(bar);
                    let heightBar = BB.getSize().y;

                    // Set the position for the bars
                    bar.position.set(2.5, bar.position.y + heightBar/2, 0);

                    // Create the node rappresent the bar for the linked list
                    let barNode = new Node(bar);

                    // Get the head of the linkelist
                    let head = bars.getFirst();

                    // Control that head is not null and is to distante
                    if (head == null || head.data.position.x > -2.5) {
                        // Add the bar to the LinkedList
                        bars.add(barNode);
                    } else {
                        // Before remove the head from the scene
                        bars.remove();
                        audioVisualizer.remove(head.data);
                        bars.add(barNode);
                    }

                    // Add the created bar to the scene
                    audioVisualizer.add(bar);

                    // Iterate through the bars and translate them
                    let node = bars.getFirst();
                    while (node != null) {
                        let x = node.data.position.x - 0.22;
                        node.data.position.set(x, node.data.position.y, 0);
                        node = node.next;
                    }

                    // Render the changes
                    update();
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