/**
 * This is the system that manages the Augmented Reality.
 * All the operation realated to the creation and the inizialitazion of the AR are here.
 * @namespace
 */
let ArSystem = {
    // Core variables of AR.js system
    /** The source rappresents the input where the AR system needs to create the 3D Object */
    arToolkitSource: null,
    /** The context rappresents what the system has to recognize for the creation of the 3D Object */
    arToolkitContext: null,

    /**
    * Function to udpate the artoolkit on every frame
    */
    update() {
        if (arToolkitSource.ready !== false)
            arToolkitContext.update(arToolkitSource.domElement);
    },

    /**
     * Funtion the prepare the entire system.
     * Needs to be launch only one time.
     */
    setup() {
        ///// Setup arToolkitSource /////

        arToolkitSource = new THREEx.ArToolkitSource({
            sourceType: 'webcam',
            sourceWidth: window.innerWidth - 10,
            sourceHeight: window.innerHeight - 10,
            // resolution displayed for the source
            displayWidth: window.innerWidth,
            displayHeight: window.innerHeight
        });

        function onResize() {
            arToolkitSource.onResizeElement()
            arToolkitSource.copyElementSizeTo(renderer.domElement)
            if (arToolkitContext.arController !== null) {
                arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas)
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
            detectionMode: 'mono',
        });

        // Copy projection matrix to camera when initialization complete
        arToolkitContext.init(function onCompleted() {
            camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
        });
    },

    /**
     * This function associate what the system needs to recognize with where it has to generate the 3d Object
     * @param {THREE.Group()} audioGroup - Is the group which rappresent the 3d Object to augment
     * @returns The controller of the AR system
     */
    generateMarkerControls(audioGroup) {
        return new THREEx.ArMarkerControls(arToolkitContext, audioGroup, {
            type: 'pattern', patternUrl: "./data/hiro.patt",
        });
    }
}