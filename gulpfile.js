const gulp = require('gulp');
const rimraf = require('rimraf');
const { src, dest, task, series} = gulp;

task('clean', (cb) => {
  rimraf('dist/src', cb);
});

task('components', () => {
  return src('components/**/*.*')
    .pipe(dest('dist/src/components/'));
});

task('icons', () => {
  return src('icons/**/*.*')
    .pipe(dest('dist/src/icons/'));
});

task('utils', () => {
  return src('utils/**/*.*')
    .pipe(dest('dist/src/utils/'));
});

task('readme', () => {
  return src('./README.md')
    .pipe(dest('dist/'));
});

exports.default = series('clean', 'components', 'icons', 'utils', 'readme');
