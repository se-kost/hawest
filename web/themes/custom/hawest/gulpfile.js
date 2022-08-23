var gulp = require('gulp');
var plumber          = require('gulp-plumber');
var sass             = require('gulp-sass');
var sassGlob         = require('gulp-sass-glob');
var sourcemaps       = require("gulp-sourcemaps");
var stripCssComments = require('gulp-strip-css-comments');
var notify           = require("gulp-notify");
var autoprefixer     = require('gulp-autoprefixer');
var browserSync      = require('browser-sync').create();
var concat           = require('gulp-concat');

/* Main SASS task */
gulp.task('css', function () {
  return gulp.src([
    './scss/**/*.s*ss'
  ])
    .pipe(plumber(({
      errorHandler: notify.onError('SASS error: <%= error.message %>')
    })))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(stripCssComments())
    .pipe(sass({
      style: 'expanded',
      sourceComments: 'map',
      sourceMap: 'scss',
      outputStyle: 'nested'
    }))
    .pipe(sass.sync())
    .pipe(autoprefixer({
      overrideBrowserslist:  ['last 2 versions'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

/* Task for Js concat */
gulp.task('js', function() {
  return gulp.src([
    './js/custom.js'
  ])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./dist/'));
});

/* Task for watch */
gulp.task('watch', function() {
  gulp.watch('./scss/**/*.s*ss', gulp.series('css')),
    gulp.watch('./js/custom.js', gulp.series('js'));
  return;
});
