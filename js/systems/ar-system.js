// Core variables of AR.js system
let arToolkitSource, arToolkitContext;

/**
 * Function to udpate the artoolkit on every frame
 */
function update() {
    if (arToolkitSource.ready !== false)
        arToolkitContext.update(arToolkitSource.domElement);
}

function setupArSystem() {
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
}

function generateMarkerControls(audioGroup) {
    return new THREEx.ArMarkerControls(arToolkitContext, audioGroup, {
        type: 'pattern', patternUrl: "./data/hiro.patt",
    });
}