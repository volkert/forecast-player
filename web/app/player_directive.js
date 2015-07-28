angular.module('soundcloud-player')
  .directive('player', function ($interval) {
    return {
      restrict:      'A',
      link:          function (scope, elm) {
        var audio        = elm.find('audio'),
            timeInterval = null,
            pauseTime    = null;

        scope.$on('player:play', function ($event, track) {
          $interval.cancel(timeInterval);

          audio.attr('src', track.stream());
          audio[0].play();

          timeInterval = $interval(function () {
            scope.timeElapsed = audio[0].currentTime;
          }, 500);
        });

        scope.$on('player:pause', function () {
          pauseTime = audio.currentTime;
          audio[0].pause();
        });

        scope.$on('player:unpause', function () {
          audio.currentTime = pauseTime;
          audio[0].play();
        });

        scope.setCurrentTime = function (currentTime) {
          audio[0].currentTime = currentTime;
        }
      }, controller: function ($scope) {
        this.setCurrentTime = function (currentTime) {
          $scope.setCurrentTime(currentTime);
        }
      }
    }
  })
;