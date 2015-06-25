var exphbs = require('express-handlebars'),
    express = require('express'),
    log = new (require('logbekk'))();

var articles = [
    { slug: 'node-article', category: 'node', title: 'node article', body: 'the body is short or long. and about node.' },
    { slug: 'frontend-article', category: 'frontend', title: 'frontend article', body: 'a frontend body.' },
    { slug: 'mad-science-article', category: 'mad-science', title: 'CRAZY', body: 'incredible science.' }
];

var categories = articles.map((article) => { return { name: article.category.replace(/-/g, ' '), slug: article.category } });

var app = express();
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 4000);

app.use('/assets', express.static('dist'));

app.get('/', (req, res) => {
    res.render('index', { title: 'My awesome blog', categories: categories, articles: articles });
});

app.get('/category/:slug', (req, res, next) => {
    var category = req.params.slug.toLowerCase();
    var hits = articles.filter((article) => article.category === category);
    if(hits.length) {
        return res.render('category', {title: category, categories: categories, articles: hits });
    }
});

app.get('/:slug', (req, res, next) => {
    var hits = articles.filter((article) => article.slug === req.params.slug.toLowerCase());
    if(hits.length) {
        var article = hits[0];
        return res.render('article', { title: article.title, categories: categories, article: article });
    }
});


app.listen(app.get('port'), () => log.info('server launched on port {}', app.get('port')));
