angular.module('image-viewall', [])
  .controller('viewController', function($scope, Uploads) {
    $scope.data = {};
    var viewAll = function() {
      Uploads.getAll()
        .then(function(imageArr) {
          console.log('Image arr : ', imageArr);
          $scope.data.images = imageArr;
        })
        .catch(function(err) {
          console.log('Error viewing images : ', err)
        })
    }
    viewAll();
})
