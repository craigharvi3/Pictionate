var gulp = require('gulp');
var del = require('del');
var watch = require('gulp-watch');
var sass = require('gulp-ruby-sass');
var nano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
var cache = require('gulp-cache');
var webpack = require('gulp-webpack');
var uglify = require('gulp-uglify');
var scsslint = require('gulp-scss-lint');
var connect = require('gulp-connect');
var server = require('gulp-express');


/**
 * Typicons
**/
gulp.task('server', function () {
	// Start the server at the beginning of the task 
	server.run(['app.js']);
})


/**
 * Typicons
**/
gulp.task('typcn', () => {
	gulp
		.src('src/typicons/**/*')
		.pipe( gulp.dest('public/a/typicons') );
})


/**
 * Sass / CSS
**/
gulp.task('clean:css', function() {
	return del([
		'public/a/css'
	]);
});


gulp.task('sass', [ 'clean:css' ], function() {
	return sass('src/scss/main.scss')
		.pipe( autoprefixer( {
			browsers: ['last 2 version']
		} ) )
		.on('error', sass.logError)
		.pipe( rename( { basename: 'imij' } ) )
		.pipe( gulp.dest('public/a/css/') );
});

gulp.task('nanocss', [ 'sass' ], function() {
	gulp.src('public/a/css/imij.css')
		.pipe( nano() )
		.pipe( gulp.dest('public/a/css/') );
});


/**
 * JavaScript
**/
gulp.task('clean:js', function() {
	return del([
		'public/a/js'
	]);
});

gulp.task('webpack', [ 'clean:js' ], function( uglify ) {
	return gulp.src('src/js/**/*')
		.pipe(webpack( require('./configs/webpack.config.js') ))
		.pipe(gulp.dest('public/a/js/'));
});


gulp.task('connect', function() {
	connect.server({
		root: 'public',
		fallback: 'public/index.html'
	});
});



// These are the bundles of tasks we require for development
gulp.task('js', [ 'webpack' ], function() {
	gulp.watch( [ 'src/js/**/*.js' ], [ 'webpack' ] );
});

gulp.task('css', [ 'webpack' ], function() {
	gulp.watch( 'src/scss/**/*.scss', [ 'sass' ] );
});

gulp.task( 'dev', [ 'sass', 'js', 'typcn' ] );

gulp.task( 'deploy', [ 'nanocss', 'uglifyjs' ] );


gulp.task('default', function() {
	console.log('\n\n No Default Task set up, try either: \n * gulp dev \n * gulp css \n * gulp js \n\n');
});
