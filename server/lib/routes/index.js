exports.serveIndex = function serveIndex(app, staticFolder) {
  app.get('*', (req, res) => {
    res.sendFile('index.html', {
      root: staticFolder,
    });
  });
};
