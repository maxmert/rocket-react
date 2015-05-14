'use strict';

var gulp         = require('gulp');
var watchify     = require('watchify');
var browserify   = require('browserify');
var babelify     = require('babelify');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var source       = require('vinyl-source-stream');

var Logger       = require('../libs/logger.js');
var isProduction = require('./common.js').isProduction();
var pathes       = require('./pathes.js');

var logger       = new Logger('builder');

var builder = function() {
    var bundler = browserify(pathes.js.src, {
        debug: !isProduction,
        cache: {},
        packageCache: {},
        fullPaths: !isProduction
    })
    .transform(babelify);

    var rebundle = function() {
        logger.log('started building `js`');

        var start = Date.now();

        bundler.bundle()
            .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
            .pipe(source('app.js'))
            .pipe(gulp.dest(pathes.js.dest))
            .pipe(notify(function() {
                logger.log('finished building `js` in *' + (Date.now() - start) + 'ms*');
            }))
    }

    rebundle();

    return {
        rebundle: rebundle,
        bundler: bundler
    }
}

var watcher = function() {
    var build   = builder();
    var bundler = watchify(build.bundler);
    bundler.on('update', build.rebundle);
}

module.exports = {
    builder: builder,
    watcher: watcher
}
