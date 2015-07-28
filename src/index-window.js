var
  BrowserWindow = require('browser-window'),
  app           = require('app'),
  ipc           = require('ipc'),
  url           = require('url'),
  LoginWindow   = require('./login-window'),
  loginWindow,
  indexWindow
  ;

module.exports = {
  callback: function (request) {
    var callbackUrl = url.parse(request.url),
        token       = callbackUrl.hash.split('&')[0].split('=')[1];

    indexWindow.webContents.send('index:save-token', token);
    loginWindow.close();
  },
  open:     function () {
    var win = new BrowserWindow({
      width:     400,
      height:    550,
      y:         200,
      x:         200,
      resizable: false
    });

    win.loadUrl('file://' + __dirname + '/../web/index.html');
    win.openDevTools({ detached: true });

    ipc.on('index:open-login', function () {
      loginWindow = LoginWindow();
    });

    indexWindow = win;

    return win;
  },
  send:     function (event, payload) {
    if (indexWindow) {
      indexWindow.webContents.send(event, payload);
    } else {
      console.error('no indexWindow to send message to');
    }
  }
};
