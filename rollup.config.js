var uglify = require('rollup-plugin-terser').terser;
var pkg = require('./package.json');

var banner = '//  fastexpress v' + pkg.version + '\n'
  + '//  https://github.com/davidcostadev/fastexpress\n'
  + '//  (c) ' + new Date().getFullYear() + ' David Costa\n'
  + '//  fastexpress may be freely distributed under the MIT license.\n';

var input = 'source/index.js';

var config = {
  input: input,
  output: {
    format: 'umd',
    name: 'R',
    exports: 'named'
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
