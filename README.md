# AR Music Visualizer
The main idea is to create an AR system based on fiducial markers to show a 3D Visualizer of the audio coming from the microphone.

## Tecnologies
Actually the project is based using native HTML, CSS and JS.
Moreover, the JS libraries are:

- [AR.js](https://ar-js-org.github.io/AR.js-Docs/)
- [Three.js](https://threejs.org/)

## Usage
To use the app, you need to have the Hiro pattern and a device with a cam and a microphone. You can find the Hiro pattern [here](https://github.com/massimilianobaldo/ar-music-visualizer/blob/main/Hiro-QRCode.pdf).

Now, you can scan the QRCode to access to the app or you can use this [link](https://baldomassimiliano.com/ar-music-visualizer).
The app works on any browser with WebGL and WebRTC. So android works. Windows mobile works. 
IOS doesn't work unfortunately. IOS safari doesn't support WebRTC at the moment. Apple is 
currently working on it tho. Let's hope they join the party soon.

## Development
To develop the app in localy, you need to clone this repo.  
So launch the command `git clone https://github.com/massimilianobaldo/ar-music-visualizer.git`  
After this, you have to run `npm install` (or `yarn install` if you prefer).  
Once you have done that, launch `npm start` (or `yarn start`) and follow the path that will display on the screen. Make sure to have a cam!

## Understanding the code
Even if I try to insert more useful comments as I can, the code is still a pretty mess.
So I decied to write this line to help you undertand the code.

All the project is base for three main componets:
- Take the audio stream incoming from the microphone
- Create the grid visualizer
- Find the fidual marker to reproduce the visualizer

The initialize function contains the core of the system.
Inside that function, there is a important *if* which is `if (navigator.mediaDevices)`.
Suddenly, the all logic of the app is in the Promise

```javascript
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function (audioStream) {...})
```

Inside that if, it takes live the app. I implement a kind a "namespace" in Javascript, in a such way that the code can be splitted in three different system for three differents tasks:
- All code for the incoming-audio is in the *AudioSystem.js*.
- All the code for the Ar system is in the *ArSystem.js*.
- All the cose for drawing 3D Object is in the *ThreeSystem.js*.

All the system have in common one function:
- `setup()` which has to run only one time, inside that function there are all the steps to prepare the system.

Finally, all the components are inside the *index.js* file.

## Documentation
For more details of the code, you can run `npm run generate-doc`.  
This command create a `.out` dir which host all the documentation.  
Once you have done that, run `serve ./out/` and follow the path to access on the documetation.

## Bibiografy

- [Web Audio Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#audio_workers)

- [Started Project](https://github.com/Raathigesh/HTML5AudioVisualizer)

- [Examples of Ar.js](https://github.com/stemkoski/AR-Examples)

- [Visualizer Example](https://github.com/wayou/3D_Audio_Spectrum_VIsualizer)

- [Gradient Mesh Three.js](http://darrendev.blogspot.com/2016/03/gradients-in-threejs.html)

- [AR-Code Generator](https://jeromeetienne.github.io/AR.js/three.js/examples/arcode.html)

## TODO

If you wanna contribute, these can be possible features:

- [ ] Adjust the initial dimesion of the canvas
- [ ] Create the heatmap for the colors
- [ ] Structurize the project folder
