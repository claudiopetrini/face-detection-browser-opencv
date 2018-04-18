const express = require('express');
const http = require('http');
const morgan = require('morgan');

const configServer = require('./lib/config/server');

const app = express();
app.set('port', configServer.httpPort);
app.use(express.static(configServer.staticFolder));
app.use(morgan('dev'));

require('./lib/routes').serveIndex(app, configServer.staticFolder);

const server = http.createServer(app);
server.listen(app.get('port'), () => {
  console.log(`HTTP server listening on port  ${app.get('port')}`);
});

const io = require('socket.io')(server);
io.on('connection', require('./lib/routes/socket'));

module.exports.app = app;
