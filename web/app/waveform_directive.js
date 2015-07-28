angular.module('soundcloud-player')
  .directive('waveform', function () {
    return {
      restrict: 'A',
      link:     function (scope, elm) {
        var waveform = new Waveform({
          container:   elm[0],
          innerColor:  '#fff',
          height:      40,
          width:       380,
          interpolate: true
        });

        var gradient = waveform.context.createLinearGradient(0, 0, 0, waveform.height);
        gradient.addColorStop(0.0, "#ECE9E6");
        gradient.addColorStop(1.0, "#fff");
        waveform.innerColor = gradient;

        scope.$watch('Playlist.currentTrack', repaint);

        function repaint(track) {
          if(track) {
            waveform.dataFromSoundCloudTrack(track);
          }
        }
      }
    }
  }
);