var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var typescript = require('gulp-typescript');
var systemjsBuilder = require('systemjs-builder');
var uglify = require('gulp-uglify');
var config = require('./app/config.json');

const outputPath = "../../bin/Client";

// Compile TypeScript app to JS
gulp.task('compile:ts', function () {
  var project = typescript.createProject('tsconfig.json');

  return gulp
    .src([
        "app/**/*.ts"
    ])
    .pipe(sourcemaps.init())
    .pipe(project()).js
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(outputPath + '/app'));
});

gulp.task('copy:config', ['compile:ts'], function () {
  config.environment = "prod";
  require('fs').writeFileSync(outputPath + '/app/config.json', JSON.stringify(config));
});

// Generate systemjs-based bundle (app/app.js)
gulp.task('bundle:app', ['copy:config', 'copy:vendor'], function () {
  var builder = new systemjsBuilder(outputPath, './systemjs.config.js');
  return builder.buildStatic(outputPath + '/app', outputPath + '/app/app-bundle.js');
});

// Generate systemjs-based bundle (app/signin.js)
gulp.task('bundle:signin', ['copy:config', 'copy:vendor'], function () {
  var builder = new systemjsBuilder(outputPath, './systemjs.signin.config.js');
  return builder.buildStatic(outputPath + '/app', outputPath + '/app/signin-bundle.js');
});

// Generate systemjs-based bundle (app/signin.js)
gulp.task('bundle:silent-renew', ['copy:config', 'copy:vendor'], function () {
  var builder = new systemjsBuilder(outputPath, './systemjs.silent-renew.config.js');
  return builder.buildStatic(outputPath + '/app', outputPath + '/app/silent-renew-bundle.js');
});

// Copy and bundle dependencies into one file (vendor/vendors.js)
// system.config.js can also bundled for convenience
gulp.task('bundle:vendor', function () {
    return gulp.src([
        'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.src.js'
      ])
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(outputPath + '/vendor'));
});


// Copy dependencies loaded through SystemJS into dir from node_modules
gulp.task('copy:vendor', function () {
  gulp.src(['node_modules/rxjs/**/*'])
    .pipe(gulp.dest(outputPath + '/node_modules/rxjs'));

  gulp.src(['node_modules/angular2-in-memory-web-api/**/*'])
    .pipe(gulp.dest(outputPath + '/node_modules/angular2-in-memory-web-api'));

  gulp.src(['node_modules/systemjs-plugin-json/**/*'])
    .pipe(gulp.dest(outputPath + '/node_modules/systemjs-plugin-json'));

  return gulp.src(['node_modules/@angular/**/*'])
    .pipe(gulp.dest(outputPath + '/node_modules/@angular'));
});

gulp.task('vendor', ['bundle:vendor']);
gulp.task('app', ['compile:ts', 'bundle:app']);

// Bundle dependencies and app into one file (app.bundle.js)
gulp.task('bundle', ['vendor', 'app'], function () {
    return gulp.src([
        outputPath + '/vendor/vendors.js',
        outputPath + '/app/app-bundle.js'
        ])
    .pipe(concat('all.bundle.js'))
    .pipe(uglify())
    .pipe(gulp.dest(outputPath));
});

gulp.task('default', ['bundle']);
