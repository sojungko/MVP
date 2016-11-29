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
      $http({
        method: 'POST',
        url: '/upload',
        transformRequest: angular.identity,
        headers: {
          'Content-Type': undefined
        },
        enctype: 'multipart/form-data',
        data: fd
      })
      .then(function(resp) {
        return resp;
        console.log('Success!!!! : ', resp.data);
      })
      .catch(function(err) {
        console.log('Error in addOne : ', err)
      });
    };

    return {
      getAll: getAll,
      addOne: addOne
  };
})
