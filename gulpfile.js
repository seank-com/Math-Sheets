/*jslint indent: 2, node: true, nomen: true */

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  preprocess = require('gulp-preprocess'),
  jslint = require('gulp-jslint'),
  clean = require('gulp-clean'),
  merge = require('gulp-merge'),
  uglify = require('gulp-uglify'),
  _scriptGlob = [
    'src/addition.js',
    'src/subtraction.js',
    'src/multiplication.js',
    'src/division.js',
    'src/unittests.js',
    'src/math.js'
  ],
  _markupGlob = 'src/*.htm';

gulp.task('clean', function () {
  "use strict";

  return gulp.src(['build/debug/*', 'build/prod/*'], {read: false}).
    pipe(clean());
});

gulp.task('build', function () {
  "use strict";

  return gulp.src('gulpfile.js').
    pipe(jslint());
});

gulp.task('scripts', ['clean'], function () {
  "use strict";

  return merge(
    gulp.src(_scriptGlob).
      pipe(jslint()),
    gulp.src(_scriptGlob).
      pipe(preprocess({context: { DEBUG: true}})).
      pipe(gulp.dest('build/debug/')),
    gulp.src(_scriptGlob).
      pipe(concat('math.js')).
      pipe(preprocess({context: { PROD: true}})).
      pipe(gulp.dest('build/prod/')).
      pipe(uglify({
        warnings: true,
        mangle: {
          toplevel: true,
          screw_ie8: true
        },
        compress: {
          screw_ie8: true
        }
      })).
      pipe(rename({ extname: '.min.js' })).
      pipe(gulp.dest('build/prod/'))
  );
});

gulp.task('markup', ['clean'], function () {
  "use strict";

  return merge(
    gulp.src(_markupGlob).
      pipe(preprocess({context: { DEBUG: true}})).
      pipe(gulp.dest('build/debug/')),
    gulp.src(_markupGlob).
      pipe(preprocess({context: { PROD: true}})).
      pipe(gulp.dest('build/prod/'))
  );
});

gulp.task('default', ['build', 'scripts', 'markup']);
