let gulp    = require('gulp'),
    webpack = require('webpack-stream'),
    config  = require('./config'),
    sass    = require('gulp-sass')

gulp.task('scss', () => {
    return gulp.src(config.input.scss)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(config.output.css));
})

gulp.task('js', () => {
    return gulp.src(config.input.js)
        .pipe(webpack(config.webpack))
        .pipe(gulp.dest(config.output.js));
})

gulp.task('watch', () => {
    gulp.watch(config.input.scss, ['scss']);
    gulp.watch(config.input.js, ['js']);
})

gulp.task('build', ['scss', 'js'])