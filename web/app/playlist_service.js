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

      durationInMinutes() {
        var minutes = Math.floor(this.duration / 60000);
        var seconds = ((this.duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
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
      Playlist.play(Playlist.currentTrackIndex + 1);
    };

    this.previousTrack = function () {
      Playlist.play(Playlist.currentTrackIndex - 1);
    };

    this.play = function (trackIndex) {
      Playlist.currentTrack = Playlist.tracklist[trackIndex];
      Playlist.currentTrackIndex = trackIndex;

      Playlist.isPlaying = true;
      $rootScope.$broadcast('player:play', Playlist.currentTrack);
    };

    this.playPause = function () {
      if (Playlist.currentTrack) {
        if (Playlist.isPlaying) {
          $rootScope.$broadcast('player:pause');
        } else {
          $rootScope.$broadcast('player:unpause');
        }
        Playlist.isPlaying = !Playlist.isPlaying;
      } else {
        Playlist.play(0);
      }
    };

    ipc.on('MediaPlayPause', function () {
      Playlist.playPause();
      $rootScope.$apply();
    });

    ipc.on('MediaNextTrack', function () {
      Playlist.nextTrack();
      $rootScope.$apply();
    });

    ipc.on('MediaPreviousTrack', function () {
      Playlist.previousTrack();
      $rootScope.$apply();
    });
  })
;