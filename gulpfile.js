let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

const cssFiles = [
    'markup/scss/style.scss',
    'markup/scss/media.scss'
]

gulp.task('scss', function(){
    return gulp.src(cssFiles)
    .pipe(concat('all.css'))
    .pipe(sass({outputStyle:'compressed'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('markup/css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('html', function(){
   return gulp.src('markup/*.html')
   .pipe(browserSync.reload({stream:true}))
});

gulp.task('browser-sync', function(){
    browserSync.init({
        server:{
            baseDir:"markup/"
        },
        browser: "chrome",
        proxy: false,
        port:'3000',
        notify: false
    });
});

gulp.task('watch', function(){
    gulp.watch('markup/scss/**/*.scss', gulp.parallel('scss'));
    gulp.watch('markup/*.html', gulp.parallel('html'));
});

gulp.task('default',gulp.parallel('scss', 'browser-sync', 'watch'));