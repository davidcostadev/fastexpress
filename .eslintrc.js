module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb-base'],
  env: { 'es6': true },
  rules: {
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
  env: {
    node: true,
    es6: true,
    amd: true,
    jest: true,
  },
};
