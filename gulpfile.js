'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

gulp.task('lint', function() {
    return gulp.src([
            './lib/game/**/*.js'
        ])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter(stylish))
        .pipe(jshint.reporter('fail'));
});
