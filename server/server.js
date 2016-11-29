var express = require('express');
var path = require('path');
var multer = require('multer');
var fs = require('fs');
var request = require('request');
var mongoose = require('mongoose');
var cloudinary = require('cloudinary');

var upload = multer({ dest: __dirname+ '../public/uploads' });

var app = express();
app.disable('x-powered-by');

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

cloudinary.config({
  cloud_name: 'hcjnmilpd',
  api_key: '138323914321937',
  api_secret: 'cxqF1L8C-l-Tw1v6ZUrTWNWINuw'
});

var mongo = process.env.MONGODB_URI || 'mongodb://localhost:27017/image-uploader'
mongoose.connect(mongo);

var Schema = mongoose.Schema;
var Image = mongoose.model('Image', new Schema({ image: String }));

app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../client')));
app.use(multer({ dest: __dirname+ '../public/uploads' }).single('image'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.get('/viewall', function(req, res) {
  Image.find({}, function(err, docs) {
    if(err) {
      console.log('Error saving to database : ', err);
    } else {
      console.log('DOCS : ', docs);
      res.send(docs);
    }
  })

  // fs.readdir(path.join(__dirname, '../public/uploads'), function(err, files) {
  //   if(err) {
  //     console.log('Error reading image names : ', err);
  //   } else {
  //     console.log('Read files : ', files);
  //     res.json(files);
  //   }
  // });
})

// app.post('/upload', upload.single('image'), function(req, res, next) {
//   if(req.file) {
//     var file = req.file;
//     var filename = (new Date).valueOf() + '-' + file.originalname;
//     file.save(function(err, image) {
//       if(err) {
//         console.log('Error posting image : ', err)
//       } else {
//         res.end(image);
//       }
//     })
//
//     fs.writeFile(path.join(__dirname, '/uploads/',filename), filename, function(err, results) {
//       if(err) {
//         console.log('Error uploading image : ', err)
//       } else {
//         res.end();
//         console.log('Image uploaded!')
//       }
//     });
//   }
// });

app.post('/upload', upload.single('image'), function(req, res){
  cloudinary.uploader.upload(req.file.path, function(result) {
    console.log('IMAGE URL : ', result.url);
    var image = new Image({ image: result.url });
    image.save(function(err, results) {
      if(err) {
        console.log('ERROR SAVING IMAGE TO DATABASE :', err)
      } else {
        console.log(results);
      }
    })
    res.status(200).redirect('/')
  });


});


app.use(function(req, res, next) {
  console.log('Looking for URL : ' + req.url);
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port'));
})

module.exports = app;
