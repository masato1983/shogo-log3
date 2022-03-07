# shogo-log3

【中級】XD デザインからのコーディング実践演習【JavaScript 導入】https://note.com/samuraibrass/n/nd1748e42934e

## Note

### gulp-imagemin

-   problem: gulp-imagemin is not importable with version 8
-   resolve: Install version 7.1.0
-   resource: https://github.com/sindresorhus/gulp-imagemin/issues/366

### gulp-stylelint

-   problem: gulp-stylelint error on installation
-   resolve: Use @ronilaukkarinen/gulp-stylelint npm package
-   resource: https://github.com/olegskl/gulp-stylelint/issues/132

### json

-   problem: When referring to meta information, if the key contains special characters, it must be enclosed in square brackets, which is time consuming.
-   resolve: The key naming convention is lowerCase.
-   example: img:common(NG), imgCommon(ok)
