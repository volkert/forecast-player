angular.module('soundcloud-player')
  .directive('player', function () {
    return {
      restrict: 'A',
      link:     function (scope, elm) {
        var audio = elm[0],
            pauseTime = null;

        scope.$on('player:play', function ($event, source) {
          elm.attr('src', source);
          audio.play();
        });

        scope.$on('player:pause', function () {
          pauseTime = audio.currentTime;
          audio.pause();
        });

        scope.$on('player:unpause', function () {
          audio.currentTime = pauseTime;
          audio.play();
        });
      }
    }
  })
;