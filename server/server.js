var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var upload = multer({ dest: __dirname+ '../public/uploads' }, uploadImage);

var app = express();
app.disable('x-powered-by');

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../client')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/image-uploader');

var Image = mongoose.model('Image', {
  title: {
    type: String
  },
  image: String
});

app.get('/viewall', function(req, res) {
  res.send();
})

app.post('/', upload.any(), function(req, res, next) {
  if(req.files) {
    req.files.forEach(function(file) {
      var filename = (new Date).valueOf() + '-' + file.originalname
      fs.rename(file.path, '../public/uploads/'+filename, function(err) {
        if(err) {
          console.log('Error uploading : ', err)
        } else {
          console.log('Image uploaded!')
          var image = new Image({
            title: req.body.title,
            image: filename
          });

          model.save(function(err, results) {
            if(err) {
              console.log('Error saving to database! : ', err);
            } else {
              res.send(results);
            }
          })
        }

      });
    })
  }
});

  function uploadImage(req, res) {
    var myFile = req.file;

    var originalname = myFile.originalname;
    var filename = myFile.filename;
    var path = myFile.path;
    var destination = myFile.destination;
    var size = myFile.size;
    var mimetype = myFile.mimetype;
  }



app.use(function(req, res, next) {
  console.log('Looking for URL : ' + req.url);
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port'));
})

module.exports = app;
