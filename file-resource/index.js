var fs = require('fs'),
    Q = require('q'),
    parser = require('./parser');

var get = function(id) {
    var deferred = Q.defer();

    if(!id.trim().endsWith('.md')) {
        id = id + '.md';
    }

    fs.readFile('./content/' + id, { encoding: 'utf-8' }, function(err, content) {
        if(err) {
            return deferred.reject(err);
        }

        deferred.resolve(parser.parse(content, id));
    });

    return deferred.promise;
};

var getAll = function() {
    var deferred = Q.defer();

    fs.readdir('./content', function(err, files) {
        if(err) {
            return deferred.reject(err);
        }

        Q.all(files.map((file) => get(file)))
            .then((contents) => deferred.resolve(contents))
            .catch((err) => deferred.reject(err));

    });

    return deferred.promise;
};

module.exports = {
    getAll,
    get
};