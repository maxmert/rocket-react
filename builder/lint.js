'use strict';

var gulp         = require('gulp');
var jscs         = require('gulp-jscs');
var jshint       = require('gulp-jshint');
var stylish      = require('jshint-stylish');
var notify       = require('gulp-notify');
var plumber      = require('gulp-plumber');
var join         = require('path').join;

var pathes       = require('./pathes.js');
var isProduction = require('./common.js').isProduction();

var jsCsBuilder = function() {
    if (!isProduction) {
        return gulp
            .src(pathes.js.lint)
            .pipe(jscs(join(pathes.base, '.jscsrc'), {
                esnext: true,
                esprima: 'esprima-fb'
            }));
    }
};

var jsHintBuilder = function() {
    if (!isProduction) {
        return gulp
            .src(pathes.js.lint)
            .pipe(jshint({ linter: require('jshint-jsx').JSXHINT }))
            .pipe(jshint.reporter(stylish));
    }
};

module.exports = {
    jsCs: jsCsBuilder,
    jsHint: jsHintBuilder
};
