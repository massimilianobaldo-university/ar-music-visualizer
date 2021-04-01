# AR Music Visualizer
The main idea is to create an AR system based on fidual markers to show a 3D Visualizer of the audio coming from the microphone.

## Tecnologies
Actually the project is based using native HTML, CSS and JS.
Moreover, the JS libraries are:

- JsArtoolkit
- Three.js
- Threex.js (Main Core of AR.js)

## Usage
Actually the app is in deployment, so will be soon avaiable.

## Development
To develop the app in locclay, you need to clone this repo.  
So launch the command `git clone https://github.com/massimilianobaldo/ar-music-visualizer.git`  
After this, you need to host the app beacuse the usage of video and mic need to be requested from a secure host.
I acctuali reccomendo to use serve.

If you dont'have it:
- Install Node.js
- Run `npm install -g serve`
- Inside the folder of the project, run `serve .` (the dot indicate the actual path to host)

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





## Bibiografy

- [Web Audio Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API#audio_workers)

- [Started Project](https://github.com/Raathigesh/HTML5AudioVisualizer)

- [Examples of Ar.js](https://github.com/stemkoski/AR-Examples)

- [Visualizer Example](https://github.com/wayou/3D_Audio_Spectrum_VIsualizer)

## TODO

- [x] Create the random color for the bars
- [ ] Structurize the project folder
- [ ] Possible use of a bundler or task runner
