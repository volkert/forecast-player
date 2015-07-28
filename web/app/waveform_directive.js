angular.module('soundcloud-player')
  .directive('waveform', function () {
    return {
      restrict: 'A',
      require:  '^player',
      link:     function (scope, elm, attr, playerCtrl) {
        var gradient,
            waveform,
            ctx,
            canvas,
            height = 40,
            width  = 380;

        waveform = new Waveform({
          container:   elm[0],
          height:      height,
          width:       width,
          interpolate: true
        });

        ctx = waveform.context;
        gradient = ctx.createLinearGradient(0, 0, 0, waveform.height);
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

        scope.$watch('timeElapsed', function (timeElapsed) {
          if (timeElapsed && ctx) {
            var timeTotal = scope.Playlist.currentTrack.duration / 1000;
            var percent = timeElapsed / (timeTotal / 100) * 100;
            percent = Math.round(percent) / 10000;

            waveform.update({ data: waveform.data });

            ctx.globalAlpha = 0.3;
            gradient = ctx.createLinearGradient(0, 0, waveform.height, width * percent);
            gradient.addColorStop(0.0, "#fe8c00");
            gradient.addColorStop(1.0, "#f83600");

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width * percent, waveform.height);
            ctx.globalAlpha = 1.0;
          }
        });
      }
    }
  }
);