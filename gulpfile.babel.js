import gulp from 'gulp';
import yargs from 'yargs';
import ejs from 'gulp-ejs';
import prettier from 'gulp-prettier';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import postcss from 'gulp-postcss';
import cleanCss from 'gulp-clean-css';
import stylelint from '@ronilaukkarinen/gulp-stylelint';
import jsonSass from 'gulp-json-sass-vars';
import concat from 'gulp-concat';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import imagemin from 'gulp-imagemin';
import del from 'del';
import webpack from 'webpack-stream';
import TerserPlugin from 'terser-webpack-plugin';
import uglify from 'gulp-uglify';
import named from 'vinyl-named';
import browserSync from 'browser-sync';
import zip from 'gulp-zip';
import rename from 'gulp-rename';
import replace from 'gulp-replace';
import revAll from 'gulp-rev-all';
import revdel from 'gulp-rev-delete-original';
import path from 'path';
import cache from 'gulp-cache';
import fs from 'fs-extra';
import info from './package.json';

const sass = gulpSass(dartSass);
const server = browserSync.create();
const PRODUCTION = yargs.argv.prod;

const paths = {
    ejs: {
        src: 'src/ejs/*.ejs',
        dest: 'dist',
    },
    styles: {
        src: 'src/assets/scss/style.scss',
        dest: 'dist/assets/css',
    },
    scripts: {
        src: 'src/assets/js/script.js',
        dest: 'dist/assets/js',
    },
    json: {
        dest: 'src/assets/scss/abstracts/variables',
    },
    images: {
        src: ['src/assets/img/**/*.{jpg,jpeg,png,svg,gif,webp}', '!src/assets/img/favicon/**/*'],
        dest: 'dist/assets/img',
    },
    favicon: {
        src: 'src/assets/img/favicon/**/*',
        dest: 'dist',
    },
    others: {
        src: ['src/assets/**/*', '!src/assets/{img,js,scss}', '!src/assets/{img,js,scss}/**/*'],
        dest: 'dist/assets',
    },
    package: {
        src: ['**/*', '!.vscode', '!node_modules{,/**}', '!packaged{,/**}', '!src{,/**}', '!.babelrc', '!.eslintignore', '!.eslintrc.json', '!.gitignore', '!.htaccess', '!.linthtmlignore', '!.linthtmlrc.json', '.nvmrc', '!.prettierignore', '!.prettierrc.json', '!.stylelintignore', '!.stylelintrc.json', '!gulpfile.babel.js', '!package.json', '!package-lock.json', '!postcss.config.js', '!README.md', '!webpack.config.js'],
        dest: 'packaged',
    },
};

// serve
export const serve = (done) => {
    cache.clearAll();
    server.init({
        server: {
            baseDir: './dist',
            index: 'index.html',
        },
        https: true,
        ghostMode: false, // for Polypane app
        browser: ['google chrome', 'firefox'],
    });
    done();
};

// reload
export const reload = (done) => {
    server.reload();
    done();
};

// watch
export const watch = () => {
    gulp.watch('**/*.php', reload);
    gulp.watch('**/*.ejs', html);
    gulp.watch('src/assets/scss/**/*.scss', styles);
    gulp.watch('src/assets/js/**/*.js', gulp.series(scripts, reload));
    gulp.watch(paths.images.src, gulp.series(images, reload));
    gulp.watch(paths.favicon.src, gulp.series(favicon, reload));
    gulp.watch(paths.others.src, gulp.series(copy, reload));
};

// clean
export const clean = (done) => {
    del(['dist/**', 'packaged']);
    done();
};

// html
export const html = () => {
    const jsonMeta = JSON.parse(fs.readFileSync('src/json/meta.json'));
    const jsonPackage = JSON.parse(fs.readFileSync('package.json'));
    const jsonBreakpoints = JSON.parse(fs.readFileSync('src/json/breakpoints.json'));
    return gulp
        .src(paths.ejs.src)
        .pipe(
            ejs({
                meta: jsonMeta,
                package: jsonPackage,
                bareakpoints: jsonBreakpoints,
            }),
        )
        .pipe(
            rename({
                extname: '.html',
            }),
        )
        .pipe(prettier())
        .pipe(gulp.dest(paths.ejs.dest))
        .pipe(server.stream());
};

// json
export const json = () => {
    return gulp.src('src/json/breakpoints.json').pipe(jsonSass()).pipe(concat('_breakpoints.scss')).pipe(gulp.dest(paths.json.dest));
};

// styles
export const styles = () => {
    return gulp
        .src(paths.styles.src)
        .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss())
        .pipe(
            stylelint({
                configFile: '.stylelintrc.json',
                reporters: [{ formatter: 'verbose', console: true }],
                fix: true,
            }),
        )
        .pipe(
            gulpif(
                PRODUCTION,
                cleanCss({ debug: true }, (details) => {
                    console.log(`${details.name}: originalSize ${details.stats.originalSize}`);
                    console.log(`${details.name}: minifiedSize ${details.stats.minifiedSize}`);
                }),
            ),
        )
        .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
        .pipe(
            gulpif(
                PRODUCTION,
                rename(function (path) {
                    if (!path.extname.endsWith('.map')) {
                        path.basename += '.min';
                    }
                }),
            ),
        )
        .pipe(gulp.dest(paths.styles.dest))
        .pipe(server.stream());
};

// scripts
export const scripts = () => {
    return gulp
        .src(paths.scripts.src)
        .pipe(named())
        .pipe(
            webpack({
                mode: !PRODUCTION ? 'development' : 'production',
                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ['@babel/preset-env'],
                                },
                            },
                        },
                    ],
                },
                output: {
                    filename: '[name].js',
                },
                externals: {
                    jquery: 'jQuery',
                },
                devtool: !PRODUCTION ? 'inline-source-map' : false,
                optimization: {
                    minimizer: [
                        new TerserPlugin({
                            extractComments: false,
                        }),
                    ],
                },
            }),
        )
        .pipe(gulpif(PRODUCTION, uglify()))
        .pipe(
            gulpif(
                PRODUCTION,
                rename({
                    suffix: '.min',
                }),
            ),
        )
        .pipe(gulp.dest(paths.scripts.dest));
};

// images
export const images = () => {
    return gulp.src(paths.images.src).pipe(gulpif(false, imagemin())).pipe(gulp.dest(paths.images.dest));
};

// favicon
export const favicon = () => {
    return gulp.src(paths.favicon.src).pipe(gulp.dest(paths.favicon.dest));
};

// copy
export const copy = () => {
    return gulp.src(paths.others.src).pipe(gulp.dest(paths.others.dest));
};

// compress
export const compress = () => {
    return gulp
        .src(paths.package.src)
        .pipe(replace('_themename', info.name))
        .pipe(zip(`${info.name}.zip`))
        .pipe(gulp.dest(paths.package.dest));
};

// cacheClear
export const cacheClear = (done) => {
    cache.clearAll();
    done();
};

// cacheBusting
export const cacheBusting = () => {
    return gulp
        .src('dist/**')
        .pipe(
            revAll.revision({
                transformFilename: function (file, hash) {
                    var ext = path.extname(file.path);
                    return path.basename(file.path, ext) + '-' + hash.substr(0, 8) + ext;
                },
                prefix: !PRODUCTION ? '' : info.homepage,
                dontRenameFile: ['.html'],
                dontUpdateReference: ['.html'],
                includeFilesInManifest: ['.css', '.webp', '.jpg', '.svg', '.png'],
            }),
        )
        .pipe(revdel())
        .pipe(gulp.dest('dist'));
};

// dev, build, bundle
export const dev = gulp.series(clean, json, gulp.parallel(html, styles, scripts), images, favicon, copy, serve, watch);
export const build = gulp.series(clean, json, gulp.parallel(html, styles, scripts), images, favicon, copy, cacheBusting);
export const bundle = gulp.series(build, compress);

// default
export default dev;
