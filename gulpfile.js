"use strict";

//https://syropia.net/journal/javascript-testing-with-jasmine-and-gulp-redux
//https://github.com/karma-runner/gulp-karma
//http://orizens.com/wp/topics/my-setup-for-testing-js-with-jasmine-karma-phantomjs-angularjs/

var gulp = require('gulp');
var karma_server = require('karma').Server;

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

gulp.task('default', ['tests']);