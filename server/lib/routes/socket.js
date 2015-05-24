var cv = require('opencv'),
  async = require('async');

module.exports = function (socket) {
  socket.on('img', function (base64) {
    var output = base64.replace(/^data:image\/(png|jpeg);base64,/, "");
    var buffer = new Buffer(output, 'base64');

    async.auto({
      readFromSocket: readFromSocket(buffer),
      face: ['readFromSocket', detect(cv.FACE_CASCADE)],
      eyes: ['readFromSocket', detect('./node_modules/opencv/data/haarcascade_mcs_eyepair_small.xml')]
    }, emitFrame(socket));
  })
}

var readFromSocket = function (buffer) {
  return function (callback) {
    cv.readImage(buffer, function (err, mat) {
      callback(err, mat);
    });
  }
}

var detect = function (haarfile) {
  return function (callback, results) {
    var im = results['readFromSocket'];
    im.detectObject(haarfile, {}, function (err, faces) {
      if (err) callback(err);

      for (var i = 0; i < faces.length; i++) {
        face = faces[i];
        im.ellipse(face.x + face.width / 2, face.y + face.height / 2, face.width / 2, face.height / 2);
      }
      callback(null, im);
    });
  }
}

var emitFrame = function (socket) {
  return function (err, results) {
    if (err) {

    } else {
      var im = results['eyes'];
      socket.emit('frame', {
        buffer: im.toBuffer()
      });
    }
  }
}