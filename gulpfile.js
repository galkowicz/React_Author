const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');

gulp.task('babel', function() {
    return gulp.src('js/app.js')
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('js/out'));
});

gulp.task('watch', function() {
    console.log('my watch begins...');
    gulp.watch('js/*.js', ['babel']);
});

var onError = function (err) {
    console.log(err);
    this.emit('end');
};

gulp.src('js/*.js')
    .pipe(plumber({
        errorHandler: onError
    }))
    .pipe(babel())
    .pipe(gulp.dest('js/out'));