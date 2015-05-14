'use strict';

var gulp         = require('gulp');
var nodemon      = require('gulp-nodemon');

var Logger       = require('./libs/logger.js');
var isProduction = require('./builder/common.js').isProduction();
var js           = require('./builder/js.js');
var pathes       = require('./builder/pathes.js');
var livereload   = require('gulp-livereload');

var logger       = new Logger('builder');


gulp.task('js-builder', js.builder);
gulp.task('js-watcher', js.watcher);
gulp.task('js', function(options) {
    return options && options.watch ? gulp.tasks['js-watcher'].fn() : gulp.tasks['js-builder'].fn();
});

gulp.task('default', function() {
    logger.log('Running in %s mode', isProduction ? 'production' : 'development');

    gulp.tasks.js.fn();
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.tasks.js.fn({ watch: true });
    nodemon({
        ext: 'html js',
        exec: 'npm run babel-node -- server.js'
        // stdout: false
    })
    .on('readable', function() {
        this.stdout.on('data', function(chunk) {
            if (/^listening/.test(chunk)) {
                livereload.reload();
                logger.log('restarted `server`');
            }

            process.stdout.write(chunk);
        });
    });
})
