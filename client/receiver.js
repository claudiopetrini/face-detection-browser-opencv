// MODIFY THIS TO THE APPROPRIATE URL IF IT IS NOT BEING RUN LOCALLY
var socket = io.connect('http://localhost:8080');

var canvasFace = document.getElementById('canvas-face');
var context = canvasFace.getContext('2d');
var img = new Image();

// show loading notice
context.fillStyle = '#333';
context.fillText('Loading...', canvasFace.width / 2 - 30, canvasFace.height / 3);

socket.on('frame', function (data) {
	// Reference: http://stackoverflow.com/questions/24107378/socket-io-began-to-support-binary-stream-from-1-0-is-there-a-complete-example-e/24124966#24124966
	var uint8Arr = new Uint8Array(data.buffer);
	var str = String.fromCharCode.apply(null, uint8Arr);
	var base64String = btoa(str);

	img.onload = function () {
		context.drawImage(this, 0, 0, canvasFace.width, canvasFace.height);
	};
	img.src = 'data:image/png;base64,' + base64String;
});