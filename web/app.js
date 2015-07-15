const ipc = require('ipc');

angular.module('soundcloud-player', [])
  .run(function ($rootScope, SoundCloud, Playlist) {
    $rootScope.SoundCloud = SoundCloud;
    $rootScope.Playlist = Playlist;

    Playlist.loadFavourites();
  })
;
