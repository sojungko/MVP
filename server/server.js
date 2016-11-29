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


app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});


app.get('/viewall', function(req, res) {
  console.log(req.body)
  fs.readdir(path.join(__dirname, '../public/uploads'), function(err, files) {
    if(err) {
      console.log('Error reading image names : ', err);
    } else {
      console.log('Read files ~~~: ', files);
      res.json(files);
    }
  })
});

app.post('/upload', upload.any(), function(req, res, next) {
  console.log(req.body)
  if(req.files) {
    req.files.forEach(function(file) {
      var filename = (new Date).valueOf() + '-' + file.originalname;
      fs.rename(file.path, '../public/uploads/'+filename, function(err) {
        if(err) {
          console.log('Error uploading image : ', err)
        } else {
          console.log('Image uploaded! : ', file);
          res.send('hello world');
        }
      });
    })
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
