var marked = require('marked');

exports.parse = function(markdown, slug) {
    markdown = markdown.trim();

    var lines = markdown.split('\n');

    var title = lines[0];
    title = title.substring(title.indexOf('# ') + 2);

    var content = lines.slice(1).join('\n');

    return { slug: slug.split('.md')[0], title: title, body: marked(content) };
};
