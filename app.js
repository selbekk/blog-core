var express = require('express'),
    Logger = require('logbekk'), log = new Logger(),
    exphbs = require('express-handlebars');

var app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 4000);

app.use('/assets', express.static('dist'));

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(app.get('port'), () => log.info('server launched on port {}', app.get('port')));
