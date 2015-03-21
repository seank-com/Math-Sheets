/*jslint indent: 2, node: true, nomen: true */

var gulp = require('gulp'),
  rename = require('gulp-rename'),
  concat = require('gulp-concat'),
  preprocess = require('gulp-preprocess'),
  jslint = require('gulp-jslint'),
  clean = require('gulp-clean'),
  merge = require('gulp-merge'),
  uglify = require('gulp-uglify'),
  _jslintGlob = [
    'gulpfile.js',
    'src/*.js'
  ],
  _scriptsGlob = [
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

gulp.task('jslint', function () {
  "use strict";

  return gulp.src(_jslintGlob).
    pipe(jslint());
});

gulp.task('scripts', ['clean', 'jslint'], function () {
  "use strict";

  return merge(
    gulp.src(_scriptsGlob).
      pipe(preprocess({context: { DEBUG: true}})).
      pipe(gulp.dest('build/debug/')),
    gulp.src(_scriptsGlob).
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

gulp.task('watch', function () {
  "use strict";

  gulp.watch(_jslintGlob, ['jslint']);
});

gulp.task('default', ['jslint', 'scripts', 'markup']);
