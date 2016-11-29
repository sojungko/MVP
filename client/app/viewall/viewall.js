angular.module('image-viewall', [])
  .controller('viewController', function($scope, $http, Uploads) {
    $scope.data = {};
    var viewAll = function() {
      Uploads.getAll()
        .then(function(imageArr) {
          $scope.data.images = imageArr.data;
        })
        .catch(function(err) {
          console.log('Error viewing images : ', err)
        })
    }
    viewAll();
})
