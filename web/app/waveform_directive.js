angular.module('soundcloud-player')
  .directive('waveform', function () {
    return {
      restrict: 'A',
      require:  '^player',
      link:     function (scope, elm, attr, playerCtrl) {
        var gradient,
            waveform,
            width = 380;

        waveform = new Waveform({
          container:   elm[0],
          height:      40,
          width:       width,
          interpolate: true
        });

        gradient = waveform.context.createLinearGradient(0, 0, 0, waveform.height);
        gradient.addColorStop(0.0, "#ECE9E6");
        gradient.addColorStop(1.0, "#fff");
        waveform.innerColor = gradient;

        scope.$watch('Playlist.currentTrack', repaint);
        function repaint(track) {
          if (track) {
            waveform.dataFromSoundCloudTrack(track);
            elm.find('canvas')[0].addEventListener('click', function (event) {
              var percent = Math.floor(event.layerX / width * 100) / 100;
              var newTime = Math.floor(scope.Playlist.currentTrack.duration * percent) / 60000;

              playerCtrl.setCurrentTime(newTime * 60);
            });
          }
        }
      }
    }
  }
);