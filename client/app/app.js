angular.module('image-uploader', ['image-viewall', 'image-upload', 'ngRoute'])

  .config(function($routeProvider) {
    $routeProvider
    .when('/upload', {
      templateUrl: 'app/upload/upload.html',
      controller: 'uploadController'
    })
    .when('/viewall', {
      templateUrl: 'app/viewall/viewall.html',
      controller: 'viewController'
    })
  })
