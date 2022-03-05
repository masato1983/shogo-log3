const { src, dest } = require('gulp');
const RevAll = require('gulp-rev-all');
const revdel = require('gulp-rev-delete-original');
const path = require('path');
const gulpif = require('gulp-if');

// cacheBusting
function cacheBusting(cb) {
    return src('dist/**')
        .pipe(
            gulpif(
                process.env.NODE_ENV === 'development',
                RevAll.revision({
                    transformFilename: function (file, hash) {
                        var ext = path.extname(file.path);
                        return path.basename(file.path, ext) + '-' + hash.substr(0, 8) + ext;
                    },
                    dontRenameFile: ['.html'],
                    dontUpdateReference: ['.html'],
                    includeFilesInManifest: ['.css', '.webp', '.jpg', '.svg', '.png'],
                }),
            ),
        )

        .pipe(
            gulpif(
                process.env.NODE_ENV === 'production',
                RevAll.revision({
                    transformFilename: function (file, hash) {
                        var ext = path.extname(file.path);
                        return path.basename(file.path, ext) + '-' + hash.substr(0, 8) + ext;
                    },
                    prefix: 'https://portfolio.coding11ty.com/',
                    dontRenameFile: ['.html'],
                    dontUpdateReference: ['.html'],
                    includeFilesInManifest: ['.css', '.webp', '.jpg', '.svg', '.png'],
                }),
            ),
        )

        .pipe(revdel())
        .pipe(dest('dist'))
        .pipe(RevAll.manifestFile())
        .pipe(dest('dist/rev'))
        .pipe(RevAll.versionFile())
        .pipe(dest('dist/rev'));
    cb();
}

exports.cacheBusting = cacheBusting;
