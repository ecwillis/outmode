var gulp      = require('gulp'),
    uglify    = require('gulp-uglify'),
    prefix    = require('gulp-autoprefixer'),
    minifyCSS = require('gulp-minify-css'),
    umd_wrap  = require('gulp-wrap-umd'),
    stylus    = require('gulp-stylus'),
    rename    = require('gulp-rename'),
    jshint    = require('gulp-jshint'),
    stylish   = require('jshint-stylish');

// Because it's always best to have your code checked
// If this task fails, build will fail too
gulp.task('jshint', function() {

  gulp.src('source/ouibounce.js')
    .pipe( jshint( '.jshintrc' ) )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );

});

gulp.task('build', ['jshint'], function() {

    gulp.src('source/outmode.js')
        .pipe(umd_wrap({ namespace: 'outmode' }))
        .pipe(gulp.dest('build'))
        .pipe(uglify())
        .pipe(rename('outmode.min.js'))
        .pipe(gulp.dest('build'));

});



// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch('source/ouibounce.js', ['build']);
});
