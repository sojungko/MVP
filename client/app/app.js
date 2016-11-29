angular.module('image-uploader', ['image-viewall', 'image-upload', 'image-services','ngRoute'])

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
    .when('/uploaded', {
      templateUrl: 'app/viewall/viewall.html',
      controller: 'viewController'
    })
  })
