/// <binding BeforeBuild='default' />
var path = require('path'),
    gulp = require('gulp'),
    gp_clean = require('gulp-clean'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require("gulp-uglify"),
    buffer = require('vinyl-buffer'),
    source = require('vinyl-source-stream'),
    rename = require("gulp-rename"),
    browserify = require("browserify"),
    ts = require("gulp-typescript");

const basePath = path.resolve(__dirname, "wwwroot");
const modulePath = path.resolve(__dirname, "node_modules");

var tsProject = ts.createProject('tsconfig.json');

var srcPaths = {
    lib: [
        {
            src: path.resolve(modulePath, 'bootstrap/dist/**/*'),
            dest: path.resolve(basePath, 'lib/bootstrap/')
        },
        {
            src: path.resolve(modulePath, '@fortawesome/fontawesome-free/**/*'),
            dest: path.resolve(basePath, 'lib/fontawesome/')
        }
    ],
    srcJs: path.resolve(basePath, 'src/**/*.js'),
    js: [
        path.resolve(basePath, 'src/dialogexample.js')
    ]
};

var destPaths = {
    js: path.resolve(basePath, 'js')
};

gulp.task('testTask', done => {
    console.log('hello!');
    done();
});

/* Tasks */

/* Copy Libraries to their location */
gulp.task('copy-libraries',
    done => {
        srcPaths.lib.forEach(item => {
            return gulp.src(item.src)
                .pipe(gulp.dest(item.dest));
        });
        done();
    });

gulp.task('clean-libraries',
    done => {
        srcPaths.lib.forEach(item => {
            return gulp.src(item.dest)
                .pipe(gp_clean({ force: true }));
        });
        done();
    });

/* TypeScript */
gulp.task("ts", done => {
    return tsProject.src()
        .pipe(tsProject())
        .pipe(gulp.dest(path.resolve(basePath, 'src')));
});

gulp.task("ts_clean", done => {
    return gulp.src(srcPaths.srcJs)
        .pipe(gp_clean({ force: true }));
});


/* JavaScript */
gulp.task('js', done => {

    srcPaths.js.forEach(file => {

        const b = browserify({
            entries: file, // Only need initial file, browserify finds the deps
            debug: true, // Enable sourcemaps
            transform: [['babelify', { 'presets': ["es2015"] }]]
        });

        b.bundle()
            .pipe(source(path.basename(file)))
            .pipe(rename(path => {
                path.basename += ".min";
                path.extname = ".js";
            }))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(uglify())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest(destPaths.js));

        done();
    });

});

gulp.task('js_clean', done => {
    return gulp.src(path.resolve(destPaths.js, '**/*.js'), { read: false })
        .pipe(gp_clean({ force: true }));
});


/* Defaults */
gulp.task('cleanup', gulp.series(['clean-libraries', 'ts_clean', 'js_clean']));

gulp.task('default', gulp.series(['copy-libraries', 'ts', 'js']));
