var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();



gulp.task('sass', function () {
    return gulp.src([
        './scss/*.scss',
        './scss/components/*.scss',
        '!./scss/_*.scss',
        '!./scss/components/_*.scss'
    ])
        .pipe(sass.sync({ outputStyle: 'compressed' })
            .on('error', sass.logError))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('compress', function () {
    return gulp.src(['./assets/js/*.js', '!./assets/js/*.min.js'])
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./assets/js'))
        .pipe(browserSync.stream());
});


gulp.task('watch', function () {
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./scss/*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch('./scss/components/_*.scss', gulp.series('sass')).on('change', browserSync.reload);
    gulp.watch('./assets/js/*.js', gulp.series('compress')).on('change', browserSync.reload);
});

gulp.task('default', gulp.parallel(['sass', 'compress', 'watch']));