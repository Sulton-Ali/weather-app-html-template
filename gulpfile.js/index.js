global.$ = {
  // Пакеты
  gulp: require("gulp"),
  gp: require("gulp-load-plugins")(),
  browserSync: require("browser-sync").create(),

  // Конфигурация
  path: require("./config/path.js"),
  app: require("./config/app.js"),
};

// Задачи
const requireDir = require("require-dir");
const task = requireDir("./task", { recurse: true });

// Наблюдение
const watcher = () => {
  $.gulp.watch($.path.html.watch, task.html).on("all", $.browserSync.reload);
  $.gulp.watch($.path.scss.watch, task.scss).on("all", $.browserSync.reload);
  $.gulp.watch($.path.js.watch, task.js).on("all", $.browserSync.reload);
  $.gulp.watch($.path.img.watch, task.img).on("all", $.browserSync.reload);
  $.gulp.watch($.path.font.watch, task.font).on("all", $.browserSync.reload);
};

const build = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.html, task.scss, task.js, task.img, task.font)
);
const dev = $.gulp.series(
  task.clear,
  $.gulp.parallel(task.html, task.scss, task.js, task.img, task.font),
  $.gulp.parallel(watcher, task.server)
);

// Задачи
exports.html = task.html;
exports.scss = task.scss;
exports.js = task.js;
exports.img = task.img;
exports.font = task.font;

// Сборка
exports.default = $.app.isProd ? build : dev;
