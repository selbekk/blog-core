var exphbs = require('express-handlebars'),
    express = require('express'),
    log = new (require('logbekk'))(),
    resource = require('./file-resource');

var app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 4000);

app.use('/assets', express.static('dist'));

app.get('/', (req, res) => {
    resource.getAll()
        .then((articles) => {
            res.render('index', { title: 'My awesome blog', articles: articles });
        })
        .catch((err) => console.log('error', err)); // TODO: Handle errors in a better way (middleware)
});

app.get('/:slug', (req, res, next) => {
    resource.get(req.params.slug)
        .then((article) => {
            if(article) {
                res.render('article', { title: article.title, article: article });
            }
            else {
                var error = new Error('Not found');
                error.status = 404;
                next(error);
            }
        })
        .catch(next);
});


app.listen(app.get('port'), () => log.info('server launched on port {}', app.get('port')));
