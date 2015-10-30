var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var browserSync = require('browser-sync');
var concat = require('gulp-concat');
var reload      = browserSync.reload;

gulp.task('vendors', function () {
    return gulp.src([
            'src/js/vendors/jquery.min.js',
            'src/js/vendors/bootstrap.min.js'
        ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(reload({stream: true}));
});

gulp.task('css', function () {
    return gulp.src('src/styles/**/*.css')
    .pipe(gulp.dest('dist/styles'))
    .pipe(reload({stream: true}));
});

gulp.task('browserify', function() {
    // Grabs the app.js file
    return browserify({
            entries: ['./src/js/app.js']
        })
        // bundles it and creates a file called main.js
        .bundle()
        .pipe(source('app.js'))
        // saves it the public/js/ directory
        .pipe(gulp.dest('./dist/js/'))
        .pipe(reload({stream: true}));
});
gulp.task('html', function() {
    return gulp.src(['src/index.html', 'src/userDictionary.html'])
        .pipe(gulp.dest('dist'))
        .pipe(reload({stream: true}))
});
gulp.task('watch', function() {
    gulp.watch('src/js/**/*.js', ['browserify']);
    gulp.watch('src/**/*.html', ['html']);
});
gulp.task('browsersync',['css', 'vendors', 'browserify', 'html'], function () {
    browserSync({
        server: {
            baseDir: './dist'
        },
        notify: false,
        browser: ["google chrome"]
    });
});
gulp.task('default', ['browsersync', 'watch']);

