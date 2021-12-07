// Обработка Font
const font = () => {
  return $.gulp.src($.path.font.src)
    .pipe(
      $.gp.plumber({
        errorHandler: $.gp.notify.onError((error) => ({
          title: "Font",
          message: error.message,
        })),
      })
    )
    .pipe($.gp.newer($.path.font.dest))
    .pipe($.gp.fonterUnx($.app.fonter)) // для UNIX подобных систем для Windows использовать gulp-fonter
    .pipe($.gulp.dest($.path.font.dest))
    .pipe($.gp.ttf2woff2())
    .pipe($.gulp.dest($.path.font.dest));
};

module.exports = font;
