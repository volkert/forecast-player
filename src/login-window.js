const
  BrowserWindow = require('browser-window')
  ;

module.exports = function () {
  var win = new BrowserWindow({
    width:     400,
    height:    450,
    resizable: false
  });

  var params = [
    'https://soundcloud.com/connect',
    '?client_id=cee5bcd6c4ed31b6370e29b4e5190808',
    '&response_type=token',
    '&display=popup',
    '&redirect_uri=soundcloud-player://callback'
  ];

  win.loadUrl(params.join(''));

  return win;
};