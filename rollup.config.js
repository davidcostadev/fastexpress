const uglify = require('rollup-plugin-terser').terser;
const pkg = require('./package.json');

const banner =
  `//  fastexpress v${pkg.version} - (c) ${new Date().getFullYear()} David Costa` +
  ' - may be freely distributed under the MIT license.\n';

const input = './src/index.js';

const config = {
  input,
  output: {
    format: 'umd',
    name: 'fastexpress',
    banner,
  },
  plugins: [],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  );
}

module.exports = config;
