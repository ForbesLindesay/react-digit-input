'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');

var b = browserify({
  entries: './lib/demo/client.js',
  debug: true,
  transform: [require('sourceify')],
});

b.bundle()
  .pipe(source('index.js'))
  .pipe(buffer())
  .pipe(sourcemaps.init({loadMaps: true}))
  .pipe(uglify())
  .on('error', log.error)
  .pipe(
    sourcemaps.mapSources(function (sourcePath) {
      // fixes some of the mess that sourceify makes
      return sourcePath.replace(/^(\.\.\/)*source\/lib\//, '');
    }),
  )
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./demo/'));
