(function () {
	var canvas = document.getElementById('canvas');
	var width = 640;
	var height = 480;

	function takepicture(video) {
		return function () {

			var context = canvas.getContext('2d');
			if (width && height) {
				canvas.width = width;
				canvas.height = height;
				context.drawImage(video, 0, 0, width, height);
				var jpgQuality = 0.6;
				var theDataURL = canvas.toDataURL('image/jpeg', jpgQuality);
				socket.emit('img', theDataURL);
			}
		}
	}

	navigator.getMedia = (navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia);

	navigator.getMedia(
		// constraints
		{
			video: true,
			audio: false
		},

		// success callback
		function (mediaStream) {
			var video = document.getElementsByTagName('video')[0];
			video.src = window.URL.createObjectURL(mediaStream);
			video.play();
			setInterval(takepicture(video), 1000 / 10)

		},
		//handle error
		function (error) {
			console.log(error);
		})
})();