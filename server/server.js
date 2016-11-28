var express = require('express');

var app = express();
app.disable('x-powered-by');

var bodyparser = require('body-parser');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true}));

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '../client/app'));


app.use(function(req, res, next) {
  console.log('Looking for URL : ' + req.url);
  next();
});

app.listen(app.get('port'), function() {
  console.log('Express started on http://localhost:' + app.get('port'));
})

module.exports = app;
