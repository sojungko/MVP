angular.module('image-viewall', [])
  .controller('viewController', function($scope, Uploads) {
    $scope.data = {};
    var viewAll = function() {
      Uploads.getAll()
        .then(function(images) {
          $scope.data.images = images;
        })
        .catch(function(err) {
          console.log('Error viewing images')
        })
    }
    viewAll();
})
