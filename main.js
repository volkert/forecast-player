'use strict';

require('crash-reporter').start();

var
  app            = require('app'),
  IndexWindow    = require('./src/index-window'),
  globalShortcut = require('global-shortcut'),
  indexWindow
  ;

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate-with-no-open-windows', function () {
  if (!indexWindow) {
    openIndexWindow();
  }
});

app.on('ready', function () {
  var protocol = require('protocol');

  openIndexWindow();

  protocol.registerProtocol('soundcloud-player', IndexWindow.callback);

  ['MediaPlayPause', 'MediaNextTrack', 'MediaPreviousTrack'].forEach(function (shortcut) {
    globalShortcut.register(shortcut, function () {
      indexWindow.send(shortcut);
    });
  });
});

function openIndexWindow() {
  indexWindow = IndexWindow.open();

  indexWindow.on('close', function () {
    indexWindow = null;
  });
}

