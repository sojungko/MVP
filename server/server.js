var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var request = require('request');
var upload = multer({ dest: __dirname+ '../public/uploads' });


var app = express();
app.disable('x-powered-by');

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));
app.use(multer({ dest: __dirname+ '../public/uploads' }).single('image'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});



app.get('/viewall', function(req, res) {
  console.log(req.body)
  fs.readdir(path.join(__dirname, '../public/uploads'), function(err, files) {
    if(err) {
      console.log('Error reading image names : ', err);
    } else {
      console.log('Read files : ', files);
      res.json(files);
    }
  })
});


app.post('/upload', upload.single('image'), function(req, res, next) {
  if(req.file) {
    var file = req.file;
    var filename = (new Date).valueOf() + '-' + file.originalname;
    fs.writeFile('uploads/'+filename, file, function(err, results) {
      if(err) {
        console.log('Error uploading image : ', err)
      } else {
        res.end();
        console.log('Image uploaded!')
      }
    });

  }
});


app.use(function(req, res, next) {
  console.log('Looking for URL : ' + req.url);
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port'));
})

module.exports = app;
