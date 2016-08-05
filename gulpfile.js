const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('js/app.js')
        .pipe(babel({
            presets: ['react']
        }))
        .pipe(gulp.dest('js/out'));
});