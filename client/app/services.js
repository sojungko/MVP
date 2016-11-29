angular.module('image-services', [])
  .factory('Uploads', function ($http, 'ajaxService') {

    var getAll = function () {
      return $http({
        method: 'GET',
        url: '/viewall'
      })
    };

    var addOne = function (image) {
      var fd = new FormData();
      fd.append('file', image);
      $http.post('/upload', fd, {
        headers: {
        'Content-Type': undefined
        },
        transformRequest: angular.identity,
        params: {
          fd
        }
      })
      .success(function(res) {
        console.log('Success posting : ', res);

      })
      .error(function(err) {
        console.log('Error posting : ', err);
      });
    };

    return {
      getAll: getAll,
      addOne: addOne
  };
})
