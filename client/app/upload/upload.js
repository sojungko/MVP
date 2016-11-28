angular.module('image-upload', [])
  .controller('uploadController', function($scope, Uploads) {
    $scope.image = {};
    $scope.submit = function() {
      Uploads.addOne($scope.image)
        .then(function(res) {
          $scope.images = res.data;
        })
        .catch(function(err) {
          console.log('Error posting image');
        });
    }
})
