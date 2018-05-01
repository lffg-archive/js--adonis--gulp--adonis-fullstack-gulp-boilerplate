'use strict'

const gulp     = require('gulp')

const babel    = require('gulp-babel')
const uglify   = require('gulp-uglify')

const scss     = require('gulp-sass')
const prefixer = require('gulp-autoprefixer')

const rename   = require('gulp-rename')
const plumber  = require('gulp-plumber')

/**
 * Gulp JavaScript task.
 * 
 * From: ./resources/assets/js/index.js
 * To:   ./public/js/index.min.js
 */
gulp.task('js', () => {
  gulp.src('./resources/assets/js/index.js')
    .pipe(plumber())
    .pipe(babel({
      presets: ['env']
    }))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/js'));
})

/**
 * Gulp CSS task.
 * 
 * From: ./resources/assets/scss/index.scss
 * To:   ./public/css/index.min.css
 */
gulp.task('css', () => {
  gulp.src('./resources/assets/scss/index.scss')
    .pipe(plumber())
    .pipe(scss({
      outputStyle: 'compressed'
    }))
    .pipe(prefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/css'))
})

/**
 * Gulp watch task.
 */
gulp.task('watch', () => {
  gulp.watch('./resources/assets/js/**/*.js', ['js'])
  gulp.watch('./resources/assets/scss/**/*.scss', ['css'])
})

/**
 * Gulp build task.
 */
gulp.task('build', ['js', 'css'])

/**
 * Gulp default task.
 */
gulp.task('default', ['watch', 'build'])
