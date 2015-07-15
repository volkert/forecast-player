angular.module('soundcloud-player')
  .service('Playlist', function (SoundCloud) {
    'use strict';


    class Track {
      constructor(data) {
        for(let prop in data) {
          this[prop] = data[prop];
        }
      }
    }


    var Playlist = this;

    Playlist.tracklist = [];
    Playlist.currentTrack = null;

    this.loadFavourites = function () {
      SoundCloud
        .get('/users/me/favorites')
        .then(function (favs) {
          var tracklist = [];

          for(let fav of favs) {
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
      console.log(Playlist.currentTrack);
    };
  })
;