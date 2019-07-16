module.exports = {
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': ['error', { allow: ['error'] }],
  },
  env: {
    node: true,
    es6: true,
    amd: true,
    jest: true,
  },
};
