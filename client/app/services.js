angular.module('image-services', [])
  .factory('Uploads', function ($http) {

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
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined},
        enctype: 'multipart/form-data'
      })
      .success(function() {
        console.log('Success!!!!');
      })
      .error(function() {

      });
    };

    return {
      getAll: getAll,
      addOne: addOne
  };
})
