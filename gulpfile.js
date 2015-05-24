'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var less                    = require('gulp-less');
var gutil = require('gulp-util');

var browserSync             = require('browser-sync');
var reload                  = browserSync.reload;
var notify                  = require('gulp-notify');
var plumber                 = require('gulp-plumber');

gulp.task('styles', function() {
    var browsers = [
        'last 2 versions',
    ];
    return gulp.src('src/less/*')
        .pipe(plumber())
        .pipe(less({ noCache: true }))
        .pipe($.postcss([
            require('autoprefixer-core')({
                browsers: browsers
            })
        ]))
        .pipe(gulp.dest('src/css'))
        .pipe(notify({ message: 'CSS task complete' }));
});

gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe($.imagemin({
            svgoPlugins: [{
                convertPathData: false
            }]
        }))
        .pipe(gulp.dest('src/images-min'))
        .pipe(notify({ message: 'Image task complete' }));
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/*.html', reload);
    gulp.watch('src/less/*', ['styles']);
    gulp.watch('src/js/*', ['js']);
    gulp.watch('src/images/*', ['images']);
});

gulp.task('browser-sync', function() {
    browserSync.init(['src/css/*', 'src/js/*'], {
        server: {
            baseDir: ["src"]
        }
    });
});

gulp.task('default', ['styles', 'images', 'watch', 'browser-sync']);