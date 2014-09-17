'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    webserver = require('gulp-webserver');

gulp.task('lint', function() {
    return gulp.src('./lib/game/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});

gulp.task('watch', function() {
    gulp.watch('./lib/game/**/*.js', ['lint']);
});

gulp.task('server', function() {
    gulp.src('.')
        .pipe(webserver({
            host: '127.0.0.1',
            port: 8080,
            livereload: true
        }));
});
