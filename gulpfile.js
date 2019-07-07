/* eslint-disable */
`use strict`;

const gulp = require(`gulp`);
const plumber = require(`gulp-plumber`);
const gulpStylelint = require(`gulp-stylelint`);
const server = require(`browser-sync`).create();

gulp.task(`stylelint`, function () {
    return gulp.src(`css/**/*.css`)
        .pipe(plumber())
        .pipe(gulpStylelint({
            failAfterError: false,
            reporters: [
                {formatter: `string`, console: true},
            ],
        }))
        .pipe(server.stream());
});

gulp.task(`server`, function () {
    server.init({
        server: `./`,
        notify: false,
        open: true,
        cors: true,
        ui: false,
    });

    gulp.watch(`css/**/*.css`, gulp.series(`stylelint`));
    gulp.watch(`img/**/*.{png,jpg,svg}`, gulp.series(`refresh`));
    gulp.watch(`js/**/*.js`, gulp.series(`refresh`));
    gulp.watch(`**/*.html`, gulp.series(`refresh`));
});

gulp.task(`refresh`, function (done) {
    server.reload();
    done();
});

gulp.task(`start`, gulp.series(`server`));
