var
  remote = require('remote'),
  Menu   = remote.require('menu');

(function buildMenu() {
  var template = [
    {
      label:   'SoundCloud Player',
      submenu: [
        {
          label:    'About SoundCloud Player',
          selector: 'orderFrontStandardAboutPanel:'
        },
        {
          type: 'separator'
        },
        {
          label:       'Hide Electron',
          accelerator: 'Command+H',
          selector:    'hide:'
        },
        {
          label:       'Hide Others',
          accelerator: 'Command+Shift+H',
          selector:    'hideOtherApplications:'
        },
        {
          label:    'Show All',
          selector: 'unhideAllApplications:'
        },
        {
          type: 'separator'
        },
        {
          label:       'Quit',
          accelerator: 'Command+Q',
          selector:    'terminate:'
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          label: 'Undo',
          accelerator: 'Command+Z',
          selector: 'undo:'
        },
        {
          label: 'Redo',
          accelerator: 'Shift+Command+Z',
          selector: 'redo:'
        },
        {
          type: 'separator'
        },
        {
          label: 'Cut',
          accelerator: 'Command+X',
          selector: 'cut:'
        },
        {
          label: 'Copy',
          accelerator: 'Command+C',
          selector: 'copy:'
        },
        {
          label: 'Paste',
          accelerator: 'Command+V',
          selector: 'paste:'
        },
        {
          label: 'Select All',
          accelerator: 'Command+A',
          selector: 'selectAll:'
        }
      ]
    },
    {
      label:   'View',
      submenu: [
        {
          label:       'Reload',
          accelerator: 'Command+R',
          click:       function () {
            remote.getCurrentWindow().reload();
          }
        },
        {
          label:       'Toggle DevTools',
          accelerator: 'Alt+Command+I',
          click:       function () {
            remote.getCurrentWindow().toggleDevTools();
          }
        }
      ]
    },
    {
      label:   'Window',
      submenu: [
        {
          label:       'Minimize',
          accelerator: 'Command+M',
          selector:    'performMiniaturize:'
        },
        {
          label:       'Close',
          accelerator: 'Command+W',
          selector:    'performClose:'
        },
        {
          type: 'separator'
        },
        {
          label:    'Bring All to Front',
          selector: 'arrangeInFront:'
        }
      ]
    },
    {
      label:   'Help',
      submenu: []
    }
  ];

  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
})();