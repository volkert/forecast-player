const ipc = require('ipc');

angular.module('soundcloud-player', [])
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
;
