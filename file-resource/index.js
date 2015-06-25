var fs = require('fs'),
    Q = require('q');

var get = function(id) {
    var deferred = Q.defer();

    fs.readFile('./content/' + id, { encoding: 'utf-8' }, function(err, file) {
        if(err) {
            return deferred.reject(err);
        }

        deferred.resolve(file);
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