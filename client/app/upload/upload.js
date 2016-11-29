angular.module('image-upload', [])
  .controller('uploadController', function($scope, Uploads) {
    $scope.image = {};
    $scope.submit = function() {
      console.log("HIT SUBMIT")
      Uploads.addOne($scope.image)
        // .then(function(res) {
        //   console.log('UPLOADCONTROLLER IMAGE : ', res.data);
        //   $scope.image = res.data.originalname;
        // })
        // .catch(function(err) {
        //   console.log('Error posting image : ', err);
        // });
    };
    // $scope.readFile = function(elem) {
    //   var file = elem.files[0];
    //   var reader= new FileReader();
    //   reader.onload = function() {
    //     $scope.$apply(function() {
    //       $scope.file = file;
    //       $scope.imageUrl = reader.result;
    //     })
    //   }
    //   reader.readAsDataURL(file);
    // }
})
