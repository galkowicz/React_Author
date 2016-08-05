const gulp = require('gulp');
const babel = require('gulp-babel');
const watch = require('gulp-watch');

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
