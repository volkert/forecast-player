angular.module('soundcloud-player')
  .directive('player', function () {
    return {
      restrict: 'A',
      link:     function (scope, elm) {
        var audio = elm.find('audio'),
            pauseTime = null;
        
        audio[0].addEventListener('timeupdate', function () {
          console.log(audio[0].currentTime);
        });
        
        scope.$on('player:play', function ($event, track) {
          audio.attr('src', track.stream());
          audio[0].play();
        });

        scope.$on('player:pause', function () {
          pauseTime = audio.currentTime;
          audio[0].pause();
        });

        scope.$on('player:unpause', function () {
          audio.currentTime = pauseTime;
          audio[0].play();
        });
      }
    }
  })
;