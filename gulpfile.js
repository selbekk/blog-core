var config = require('./gulp/config'),
    gulp = require('gulp'),
    style = require('./gulp/style');

gulp.task('build:style', style.build);

gulp.task('watch', function() {
    gulp.watch(config.PATHS.LESS.ALL);
});

gulp.task('default', ['build:style']);
