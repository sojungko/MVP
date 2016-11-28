angular.module('image-uploader', []);
.config(function($routeProvider, $httpProvider) {
  $routeProvider
  .when('/viewall', {
    templateUrl: './viewall.html',
    controller: 'imageController'
  });
})


module.exports = function(app) {
  var multer = require('multer');
  var upload = multer({ dest: __dirname+'./public/uploads' }, uploadImage)

  app.use(require('body-parser').urlencoded({extended: true}));


  app.post('/', upload.single(''))

  function uploadImage(req, res) {
    var myFile = req.file;

    var originalname = myFile.originalname;
    var filename = myFile.filename;
    var path = myFile.path;
    var destination = myFile.destination;
    var size = myFile.size;
    var mimetype = myFile.mimetype;
  }

}
