# face-detection-browser-opencv

Real-time face detection using WebRTC, OpenCV, Node.js, and WebSockets.

Similar to [face-detection-node-opencv](https://github.com/claudiopetrini/face-detection-node-opencv) but this time:

- camera acquisition is made with WebRTC on the browser
- the image is sent to the server via web socket for processing
- the processed image is rendered on the client

## Requirements

* [Node.js](http://nodejs.org/)
* [OpenCV 2.4.9 - 2.4.11](http://opencv.org/)
* A webcam, e.g. laptop-integrated webcam, USB webcam

## Installing Node.js packages

* Navigate to the `server` directory
* To install the packages: `npm install`

## Running the demo

* Make sure you are still in the `server` directory
* To run the server: `node server.js`
* To run the demo locally, open a browser and go to `localhost:8080`

The app should be up and running!
