angular.module('image-viewall', [])
  .controller('viewController', function($scope, Uploads) {
    $scope.data = {};
    var viewAll = function() {
      Uploads.getAll()
        .then(function(imageArr) {
          console.log('Image : ', imageArr[0].image);
          $scope.data.images = imageArr;
        })
        .catch(function(err) {
          console.log('Error viewing images : ', err)
        })
    }
    viewAll();
})
