// Variabels for create the 3D Objects
let scene, camera, renderer;

//let NUMBER_OF_BARS;

// The grid for the real 3D Visualizer
// Array of LinkeList with the size of NUMBER_OF_BARS
let gridBars = []

// The THREE.Group() where to store all the bars for the visualizer
let audioGroup;

// The Object rappreseting the actual bar of the Grid Visualizer
let barGeometry;

function setupThreeSystem() {

    //NUMBER_OF_BARS = numberOfBars;
    for (let i = 0; i < NUMBER_OF_BARS; i++) {
        gridBars[i] = new LinkedList();
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
}

function getGridSize() {
    return gridBars.length;
}

function getAudioGroup() {
    return audioGroup;
}

// Return a new Material for the Object3D
// RGBToHex(color.r, color.g, color.b)
function generateMaterial() {
    return new THREE.MeshPhongMaterial({
        color: new THREE.Color(),
        specular: 0xffffff
    });
}

function generateBar(material) {
    return new THREE.Mesh(barGeometry, material);
}

function tranformBar(bar, array, index, step) {
    // Scale the object
    let value = array[(Math.floor(Math.random() * 10) + 1) * step] / 8;
    value = value < 1 ? 1 : value;
    bar.scale.y = value;

    // Create a Bounding Box to calculate the actual dimensions
    let BB = new THREE.Box3().setFromObject(bar);
    let heightBar = BB.getSize().y;

    // Calculate the z position where to put bars
    let z = index == 0 ? 1.5 : gridBars[index - 1].getLast().data.position.z - 0.3;

    // Set the position for the bars
    bar.position.set(2, bar.position.y + heightBar / 2, z);

    return bar;
}

function addToGridVisualizer(bar, index) {
    // Create the node rappresent the bar for the linked list
    let barNode = new Node(bar);

    // Get the head of the linkelist
    let head = gridBars[index].getFirst();

    // Control that head is not null and is to distante
    if (gridBars[index].size < NUMBER_OF_BARS) {
        // Add the bar to the LinkedList
        gridBars[index].add(barNode);
    } else {
        // Before remove the head from the scene
        gridBars[index].remove();
        audioGroup.remove(head.data);
        gridBars[index].add(barNode);
    }

    // Add the created bar to the scene
    audioGroup.add(bar);
}

function translateGrid(index) {
    // Iterate through the bars and translate them
    let head = gridBars[index].getFirst();
    let node = head;
    while (node != null) {
        let x = node.data.position.x - 0.3;
        node.data.position.set(x, node.data.position.y, node.data.position.z);
        node = node.next;
    }
}

function initThreeSystem(material, array, step) {
    for (let i = 0; i < getGridSize(); i++) {
        // Create the geometry for the bar
        let bar = generateBar(material); /// three-system -> genearteBar()

        /// bar = three-system -> tranformBar(bar)
        bar = tranformBar(bar, array, i, step);

        /// three-system -> addToGridVisualizer(bar)
        addToGridVisualizer(bar, i);

        /// three-system -> translateGrid()
        translateGrid(i);
    }
}


/**
 * Function to render the acutal scene
 */
function render() {
    renderer.render(scene, camera);
}