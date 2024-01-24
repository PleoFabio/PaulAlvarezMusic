const { src, dest, watch, parallel } = require('gulp'); //requiere es una forma de extraer el gulp

// CSS

const sass = require('gulp-sass') (require('sass'));
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
// la funcione src es una funcion que sirve para buscar el archivo y dest es una funcion que sirve para almacenar

// Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

// Javascript

const terser = require('gulp-terser-js');


function css( done ) {
    // Para compilar la hoja de estilo de sass tenemos que realizar tres pasos

    src('src/scss/**/*.scss')   // 1 Identifcar el archivo de sass
        .pipe( sourcemaps.init())
        .pipe( plumber())
        .pipe( sass() ) // 2 Compilarlo (tenemos que ejecutar las funciones de sass)
        .pipe( postcss ([autoprefixer(), cssnano() ]) )
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/css'))   // 3 Almacenar en el disco duro


    done(); // Callback que avisa a gulp cuando llegamos al final
};


function versionWebp( done ) {

    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )

    done ();
}

function versionAvif( done ) {
    const opciones = {
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')
        .pipe( avif(opciones) )
        .pipe( dest ('build/img') )

    done();
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{png,jpg}')
        .pipe( cache( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe( sourcemaps.init() )
        .pipe( terser() )
        .pipe( sourcemaps.write('.') )
        .pipe(dest('build/js'))

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css)
    watch('src/js/**/*.js', javascript)

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev);
