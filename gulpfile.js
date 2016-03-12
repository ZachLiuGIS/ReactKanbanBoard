var path = require('path');
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var args = require('yargs').argv;
var webpack = require('webpack');
var webpackStream = require('webpack-stream');
var reload = require('gulp-hot-reload');

var frontendConfig = require('./webpack.config.js');

var production = args.production ? true : false;
var useSourceMaps = args.sourcemaps ? true : false;

const buildDone = (err, stats) => {
    if(err) throw new $.util.PluginError("webpack", err);
    $.util.log('[webpack]', stats.toString({
        colors: true,
        chunkModules: false,
        assets: false,
        version: false,
        hash: false
    }))
};

var source = {
    root: 'src',
    js: 'src/main.js',
    html: 'src/index.html',
    sass: {
        app: ['src/sass/*.scss'],
        watch:  [ 'src/sass/**/*']
    }
};

var dist = {
    root: 'dist',
    js: 'dist/js',
    sass: 'dist/css',
    srcSass: 'src/css',
    html: 'dist/html'
};

// sass
gulp.task('sass', function () {
    return gulp.src(source.sass.app)
        .pipe($.if(useSourceMaps, $.sourcemaps.init()))
        .pipe($.sass())
        .pipe($.autoprefixer('last 2 versions', '> 1%', 'ie 9'))
        .pipe($.if(production, $.minifyCss()))
        .pipe($.if(useSourceMaps, $.sourcemaps.write()))
        .pipe(gulp.dest(dist.sass));
});

gulp.task('html', function () {
    gulp.src(source.html).pipe(gulp.dest(dist.root));
});

gulp.task('watch', function() {
    gulp.watch(source.html, ['html']);
    gulp.watch(source.sass.watch, ['sass']);
    gulp.watch('src/**/*.js', ['dist-frontend']);
});

gulp.task('build-backend', () => {
    gulp
        .src('./src/server.js')
        .pipe(webpackStream(serverConfig, webpack, buildDone))
        .pipe(reload({
            port: 1338,
            react: true,
            config: path.join(__dirname, 'webpack.config.js')
        }))
});

gulp.task('dist-backend', function () {
    process.env.NODE_ENV = 'production';
    gulp.src('./src/server.js')
        .pipe(webpackStream(serverConfig, webpack, buildDone))
        .pipe(gulp.dest(dist.root));
});

gulp.task('dist-frontend', function () {
    process.env.NODE_ENV = 'production';
    gulp.src(source.js)
        .pipe(webpackStream(frontendConfig, webpack, buildDone))
        .pipe(gulp.dest(dist.js));
});

gulp.task('dist', ['dist-backend', 'dist-frontend'], function() {

});

gulp.task('default', ['sass', 'html', 'dist-frontend', 'watch'], function () {
    $.util.log('watch')
});