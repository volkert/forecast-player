const ipc = require('ipc');

angular.module('forecast-player', [])
  .config(function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      'https://api.soundcloud.com/**'
    ]);
  })
  .run(function ($rootScope, SoundCloud, Playlist) {
    $rootScope.SoundCloud = SoundCloud;
    $rootScope.Playlist = Playlist;

    Playlist.loadFavourites();
  })

  .filter('timeInMinutes', function () {
    return function (input) {
      if (typeof input === 'undefined') {
        input = 0;
      }
      var time = Math.floor(input);
      var minutes = Math.floor(time / 60);
      var seconds = time % 60;
      return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }
  })
;
