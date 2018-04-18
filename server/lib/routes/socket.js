const cv = require('opencv');
const async = require('async');

function readFromSocket(buffer) {
  return function readFromSocketFn(callback) {
    return cv.readImage(buffer, callback);
  };
}

function detect(haarfile) {
  return function detectFn(results, callback) {
    const im = results.readFromSocket;
    im.detectObject(haarfile, {}, (err, faces) => {
      if (err) {
        return callback(err);
      }
      for (let i = 0; i < faces.length; i += 1) {
        const face = faces[i];
        im.ellipse(face.x + (face.width / 2), face.y + (face.height / 2), face.width / 2, face.height / 2);
      }
      return callback(null, im);
    });
  };
}

function emitFrame(socket) {
  return function emitFrameFn(err, results) {
    if (err) {
      return socket.emit('error', {
        message: err.message,
      });
    }
    const im = results.eyes;
    return socket.emit('frame', {
      buffer: im.toBuffer(),
    });
  };
}


module.exports = function socketIo(socket) {
  socket.on('img', (base64) => {
    const output = base64.replace(/^data:image\/(png|jpeg);base64,/, '');
    const buffer = Buffer.from(output, 'base64');

    async.auto({
      readFromSocket: readFromSocket(buffer),
      face: ['readFromSocket', detect(cv.FACE_CASCADE)],
      eyes: ['readFromSocket', detect('./node_modules/opencv/data/haarcascade_mcs_eyepair_small.xml')]
    }, emitFrame(socket));
  });
}
