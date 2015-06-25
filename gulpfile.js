var gulp = require('gulp');
var style = require('./gulp/style');

gulp.task('build:style', style.build);

gulp.task('default', ['build:style']);
