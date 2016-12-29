"use strict";

//https://syropia.net/journal/javascript-testing-with-jasmine-and-gulp-redux
//https://github.com/karma-runner/gulp-karma
//http://orizens.com/wp/topics/my-setup-for-testing-js-with-jasmine-karma-phantomjs-angularjs/
//https://julienrenaux.fr/2014/05/25/introduction-to-gulp-js-with-practical-examples/

var gulp = require('gulp'),
    karma_server = require('karma').Server,
    uglify = require('gulp-uglify'),
    pump = require('pump'),
    rename = require('gulp-rename'),
    header = require("gulp-header"),
    fs = require('fs'),
    del = require('del');

gulp.task('default', function () {

});

gulp.task('tests', function (done) {
    new karma_server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

gulp.task('tdd', function (done) {
    new karma_server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

var getVersion = function () {
    return fs.readFileSync('Version');
};

var getCopyright = function () {
    return fs.readFileSync('Copyright');
};

gulp.task('clean', function (done) {
    return del(['dist']);
});

gulp.task('copy', ['clean'], function () {
    gulp.src('src/*.js')
        .pipe(gulp.dest('dist'))
});

gulp.task('minify', ['copy'], function (cb) {
    pump([
            gulp.src('src/*.js'),
            uglify(),
            rename({
                suffix: '.min'
            }),
            gulp.dest('dist')
        ],
        cb
    );
});

gulp.task('add-header', ['minify'], function () {
    gulp.src('dist/*.js')
        .pipe(header(getCopyright(), {
            version: getVersion()
        }))
        .pipe(gulp.dest('dist'))
});

gulp.task('default', ['clean', 'tests', 'copy', 'minify', 'add-header']);