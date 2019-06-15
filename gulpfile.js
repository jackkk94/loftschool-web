var gulp = require('gulp');
var rm = require('gulp-rm');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;
var sassGlob = require('gulp-sass-glob');
const autoprefixer = require('gulp-autoprefixer');
var px2rem = require('gulp-smile-px2rem');
//var gcmq = require('gulp-group-css-media-queries');
let cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
var uglify = require('gulp-uglify');
var gulpif = require('gulp-if');
var env = process.env.NODE_ENV;
sass.compiler = require('node-sass');


const styles = [
    'node_modules/normalize.css/normalize.css',
    'src/styles/main.scss',
    'src/styles/*.css'
]


gulp.task('clean', function () {
    return gulp.src("dist/**/*", { read: false }).pipe(rm())
});



gulp.task('copy:html', () => {
    return gulp.src("src/*.html").pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
});




gulp.task('styles', () => {
    return gulp.src(styles)
        .pipe(gulpif(env == "dev", sourcemaps.init()))
        .pipe(concat('main.scss'))
        .pipe(sassGlob())
        .pipe(sass().on('error', sass.logError))
        .pipe( autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(px2rem())
        .pipe(gulpif(env == "prod", cleanCSS()))
        .pipe(gulpif(env == "dev", sourcemaps.write()))
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
});



gulp.task('scripts', () => {
    return gulp.src("src/scripts/*.js")
        .pipe(gulpif(env == "dev",sourcemaps.init()))
        .pipe(concat('main.js', { newLine: ";" }))
        .pipe(gulpif(env == "prod",babel({
            presets: ['@babel/env']
        })))
        .pipe(gulpif(env == "prod",uglify()))
        .pipe(gulpif(env == "dev",sourcemaps.write()))
        .pipe(gulp.dest('dist'))
        .pipe(reload({ stream: true }))
});

gulp.task('fonts', () => {
    return gulp.src("src/fonts/*.{ttf,otf}")
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('images', () => {
    return gulp.src("src/img/**/*.{png,jpg,mp4}")
        .pipe(gulp.dest('dist/img'))
});

gulp.task('sprites', () => {
    return gulp.src("src/*.svg")
        .pipe(gulp.dest('dist'))
});

gulp.task("server", function () {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        open: false
    });
});


gulp.task("watch", () => {
    gulp.watch('src/styles/**/*.scss', gulp.series('styles'))
    gulp.watch('src/*.html', gulp.series('copy:html'))
    gulp.watch('src/**/*.js', gulp.series('scripts'))
})

gulp.task("default", gulp.series('clean', 'fonts','images','sprites','copy:html', 'styles', 'scripts','server', 'watch'));
gulp.task("build", gulp.series('clean', 'copy:html', 'styles', 'scripts'));


