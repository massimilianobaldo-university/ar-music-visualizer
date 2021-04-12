/**
 * This is the system that manages the Object to be draw in the AR System.
 * All the operation realated to create an object, add it to the canvas, transform it ecc.. are inside this namespace.
 * @namespace
 */
let ThreeSystem = {
    // Variabels for create the 3D Objects
    scene: null,
    camera: null,
    renderer: null,

    /**
    * This propety is useful to slow down the render operation.
    * If you need to slow down or fast up the reinderization, go to modify the global value FRAME_TO_SKIP.
    */
    frameCounter: 0,

    /** 
     * The data structure of the grid for the real 3D Visualizer.
     * It is compose in a Array of LinkeList, with the size of NUMBER_OF_BARS.
     */
    gridBars: [],

    // The THREE.Group() where to store all the bars for the visualizer
    audioGroup: null,

    // The Object rappreseting the actual bar of the Grid Visualizer
    barGeometry: null,

    setup() {

        for (let i = 0; i < NUMBER_OF_BARS; i++) {
            this.gridBars[i] = new LinkedList();
        }

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

        audioGroup = new THREE.Group();
        scene.add(audioGroup);

        barGeometry = new THREE.BoxGeometry(0.15, 0.2, 0.15);
    },

    getGridSize() {
        return this.gridBars.length;
    },

    getAudioGroup() {
        return audioGroup;
    },

    // Return a new Material for the Object3D
    // RGBToHex(color.r, color.g, color.b)
    generateMaterial() {
        return new THREE.MeshPhongMaterial({
            color: new THREE.Color(),
            specular: 0xffffff
        });
    },

    generateBar(material) {
        return new THREE.Mesh(barGeometry, material);
    },

    tranformBar(bar, array, index, step) {
        // Scale the object
        let value = array[(Math.floor(Math.random() * 10) + 1) * step] / 8;
        value = value < 1 ? 1 : value;
        bar.scale.y = value;

        // Create a Bounding Box to calculate the actual dimensions
        let BB = new THREE.Box3().setFromObject(bar);
        let heightBar = BB.getSize().y;

        // Calculate the z position where to put bars
        let z = index == 0 ? 1.5 : this.gridBars[index - 1].getLast().data.position.z - 0.3;

        // Set the position for the bars
        bar.position.set(2, bar.position.y + heightBar / 2, z);

        return bar;
    },

    addToGridVisualizer(bar, index) {
        // Create the node rappresent the bar for the linked list
        let barNode = new Node(bar);

        // Get the head of the linkelist
        let head = this.gridBars[index].getFirst();

        // Control that head is not null and is to distante
        // head == null || head.data.position.x > -2.5
        // this.gridBars[index].size < NUMBER_OF_BARS
        if (head == null || head.data.position.x > -2) {
            // Add the bar to the LinkedList
            this.gridBars[index].add(barNode);
        } else {
            // Before remove the head from the scene
            this.gridBars[index].remove();
            audioGroup.remove(head.data);
            this.gridBars[index].add(barNode);
        }

        // Add the created bar to the scene
        audioGroup.add(bar);
    },

    translateGrid(index) {
        // Iterate through the bars and translate them
        let head = this.gridBars[index].getFirst();
        let node = head;
        while (node != null) {
            let x = node.data.position.x - 0.05;
            node.data.position.set(x, node.data.position.y, node.data.position.z);
            node = node.next;
        }
    },

    initialize(array, step) {
        for (let i = 0; i < this.getGridSize(); i++) {
            // Create a material
            let material = this.generateMaterial(); /// three-system -> genearteMaterial()
            // Create the geometry for the bar
            let bar = this.generateBar(material); /// three-system -> genearteBar()

            /// bar = three-system -> tranformBar(bar)
            bar = this.tranformBar(bar, array, i, step);

            if (this.frameCounter % FRAME_TO_SKIP == 0) {
                /// three-system -> addToGridVisualizer(bar)
                this.addToGridVisualizer(bar, i);
            }

            /// three-system -> translateGrid()
            this.translateGrid(i);

        }
        this.frameCounter++;
    },

    /**
     * Function to render the acutal scene
     */
    render() {
        renderer.render(scene, camera);
    }
}