angular.module('soundcloud-player')
  .service('Playlist', function ($window, $rootScope, SoundCloud) {
    'use strict';

    class Track {
      constructor(data) {
        for (let prop in data) {
          this[prop] = data[prop];
        }
      }

      stream() {
        return `${this.stream_url}?oauth_token=${SoundCloud.oauthToken}`
      }
    }

    var Playlist = this;

    Playlist.tracklist = [];
    Playlist.currentTrack = null;
    Playlist.currentTrackIndex = null;
    Playlist.isPlaying = false;
    Playlist.pauseTime = null;

    this.loadFavourites = function () {
      SoundCloud
        .get('/users/me/favorites')
        .then(function (favs) {
          var tracklist = [];

          for (let fav of favs) {
            tracklist.push(new Track(fav))
          }

          Playlist.tracklist = tracklist;
        })
      ;
    };

    this.nextTrack = function () {

    };

    this.previousTrack = function () {

    };

    this.play = function (trackIndex) {
      Playlist.currentTrack = Playlist.tracklist[trackIndex];
      Playlist.currentTrackIndex = trackIndex;

      Playlist.isPlaying = true;
      $rootScope.$broadcast('player:play', Playlist.currentTrack.stream());
    };

    this.pause = function () {
      Playlist.isPlaying = false;
      $rootScope.$broadcast('player:pause');
    };
    
    this.unpause = function () {
      Playlist.isPlaying = true;
      $rootScope.$broadcast('player:unpause');
    }
  })
;