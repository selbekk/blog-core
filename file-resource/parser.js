var marked = require('marked');

exports.parse = function(markdown, slug) {
    markdown = markdown.trim();

    var title = markdown.split('\n')[0];
    title = title.substring(title.indexOf('# ') + 2);

    return { slug: slug.split('.md')[0], title: title, body: marked(markdown) };
};
