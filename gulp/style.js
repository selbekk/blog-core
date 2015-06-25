var concat = require('gulp-concat'),
    config = require('./config'),
    gulp = require('gulp'),
    less = require('gulp-less'),
    minify = require('gulp-minify-css'),
    prefixer = require('gulp-autoprefixer');


exports.build = function() {
    return gulp.src(config.PATHS.LESS)
        .pipe(less())
        .pipe(prefixer({ browsers: ['last 2 versions'] }))
        .pipe(minify())
        .pipe(concat('styles.min.css'))
        .pipe(gulp.dest(config.PATHS.DIST));
};