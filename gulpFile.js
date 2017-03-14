var gulp = require("gulp");
var tsc = require("gulp-typescript-compiler");
var ts = require('gulp-typescript');
var nodemon = require("gulp-nodemon");
var tsProject = ts.createProject('tsconfig.json');

gulp.task("default", ["compile", "watch", "nodemon"]);


gulp.task("watch", function () {
    return gulp.watch(["src/**/*.*", 'views/**/*.jade'], ["compile"]);

});

gulp.task("compile", function () {
    return gulp.src('src/**/*.ts')
        .pipe(tsProject())
        .pipe(gulp.dest('build'));

});

gulp.task("nodemon", function () {
    nodemon({
        script: "build/www",
        exec: ' set DEBUG=*,-not_this &node --debug ',
        env: {
            'NODE_ENV': 'production'
        }

    });
});