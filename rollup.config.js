var uglify = require('rollup-plugin-terser').terser;
var pkg = require('./package.json');

var banner = '//  fastexpress v' + pkg.version
  + ' - (c) ' + new Date().getFullYear() + ' David Costa'
  + ' - may be freely distributed under the MIT license.\n';

var input = 'src/index../src

var config = {
  input: input,
  output: {
    format: 'umd',
    name: 'fastexpress',
  },
  banner: banner,
  plugins: []
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

module.exports = config;
