let ArSystem = {
    // Core variables of AR.js system
    arToolkitSource: null, 
    arToolkitContext: null,

    /**
    * Function to udpate the artoolkit on every frame
    */
    update() {
    if (arToolkitSource.ready !== false)
        arToolkitContext.update(arToolkitSource.domElement);
    },

    setup() {
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
    },

    generateMarkerControls(audioGroup) {
        return new THREEx.ArMarkerControls(arToolkitContext, audioGroup, {
            type: 'pattern', patternUrl: "./data/hiro.patt",
        });
    }
}