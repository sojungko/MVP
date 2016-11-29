angular.module('image-viewall', [])
  .controller('viewController', function($scope, Uploads) {
    $scope.data = {};
    var viewAll = function() {
      Uploads.getAll()
        .then(function(imageArr) {
          console.log('Image : ', imageArr.data);
          $scope.data.images = imageArr.data;
        })
        .catch(function(err) {
          console.log('Error viewing images : ', err)
        })
    }
    viewAll();
})
