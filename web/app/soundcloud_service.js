angular.module('forecast-player')
  .service('SoundCloud', function ($window, $q) {
    var SC           = $window.SC,
        localStorage = $window.localStorage,
        SoundCloud   = this;

    SoundCloud.oauthToken = null;

    ipc.on('index:save-token', function (token) {
      localStorage.setItem('soundcloud-token', token);
      $window.location.reload();
    });

    this.initialized = false;

    this.login = function () {
      ipc.send('index:open-login');
    };

    this.init = function () {
      var token = localStorage.getItem('soundcloud-token');
      if(token) {
        SC.initialize({ access_token: token });
        SC._baseUrl = 'http://connect.soundcloud.com';

        SoundCloud.oauthToken = token;
        SoundCloud.initialized = true;
      }
    };

    this.get = function (url) {
      if (SoundCloud.initialized) {
        var deferred = $q.defer();
        SC.get(url, function (response, error) {
          if (response) {
            deferred.resolve(response);
          } else {
            deferred.reject(error);
            SoundCloud.initialized = false;
          }
        });
        return deferred.promise;
      } else {
        return $q.reject();
      }
    };

    this.init();
  })
;