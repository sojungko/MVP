angular.module('image-services', [])
  .factory('Uploads', function ($http) {

    var getAll = function () {
      return $http({
        method: 'GET',
        url: '/viewall'
      })
    };

    var addOne = function (image) {
      var req = {
       method: 'POST',
       url: '/upload',
       data: image
      }
      return $http(req).then(function(results) {
        console.log('RESULTS AFTER POST : ', results);
      });
    };

    return {
      getAll: getAll,
      addOne: addOne
  };
})
