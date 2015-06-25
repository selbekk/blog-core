var express = require('express'),
    log = require('logbekk')();

var app = express();

app.set('port', process.env.PORT || 4000);

app.get('/', function(req, res) {
  res.json({server: 'up and running!'});
});

app.listen(app.get('port'), function() {
  log.info('server launched on port {}', app.get('port'));
});
