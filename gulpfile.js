'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var log = require('gulplog');
var envify = require('envify/custom');

var b = browserify({
  entries: './lib/demo/client.js',
  debug: true,
  transform: [
    [
      envify({
        NODE_ENV: 'production',
      }),

      {
        global: true,
      },
    ],
    [require('uglifyify'), {global: true}],
    require('sourceify'),
  ],
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
