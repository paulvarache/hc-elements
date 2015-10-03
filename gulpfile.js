var gulp = require('gulp');
var babel = require('gulp-babel');

gulp.task('copy', function () {
  return gulp.src('src/**/*.html')
    .pipe(gulp.dest('.'));
});

gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('.'));
});

gulp.task('default', function () {
  gulp.watch('src/**/*', ['copy', 'babel']);
});
