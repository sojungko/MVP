angular.module('image-services', [])
  .factory('Uploads', function ($http) {

    var getAll = function () {
      return $http({
        method: 'GET',
        url: '/viewall'
      })
    };

    var addOne = function (image) {
      return $http({
        method: 'POST',
        url: '/upload',
        data: image
      });
    };

    return {
      getAll: getAll,
      addOne: addOne
  };
})
