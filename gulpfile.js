const gulp = require('gulp');
const sass = require('gulp-sass')(require('node-sass'));
const browserSync = require('browser-sync').create();
//compile scss into css
function style() {
    return gulp.src('app/sass/**/*.sass')
    .pipe(sass().on('error',sass.logError))
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.stream());
}
function watch() {
    browserSync.init({
        server: {
           baseDir: "./app",
        }
    });
    gulp.watch('app/sass/**/*.sass', style)
    gulp.watch('app/*.html').on('change',browserSync.reload);
    gulp.watch('app/js/**/*.js').on('change', browserSync.reload);
}
exports.style = style;
exports.watch = watch;