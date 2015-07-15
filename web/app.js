const ipc = require('ipc');

angular.module('soundcloud-player', [])
  .run(function ($rootScope, SoundCloud) {
    $rootScope.SoundCloud = SoundCloud;

    SoundCloud.favs().then(function (favs) {
      console.log(favs[0]);
      $rootScope.favs = favs;
    });
  })
;
