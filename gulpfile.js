const gulp          = require('gulp');
const es            = require('event-stream');
const postcss       = require('gulp-postcss');
const stylus        = require('gulp-stylus');
const autoprefixer  = require('autoprefixer');
const pxtorem       = require('postcss-pxtorem');

const vendorFiles = gulp.src([
    'node_modules/normalize.css/normalize.css'
]);

const processors = [
    autoprefixer(),
    pxtorem
];

//  CSS
gulp.task("css", function() {

    let appFiles =  gulp.src(["css/ui-e.styl"])
        .pipe(stylus({
            'include css': true,
            "linenos": true
        }).on('error', function(err) {
            console.log(err);
            this.emit('end');
        }))
        .pipe(postcss(processors));

    return es.concat(vendorFiles, appFiles)
        .pipe(gulp.dest('dist/css/'));
});

gulp.task("default", function() {
    gulp.watch('css/**/*.styl', ['css']);
});