module.exports = {
  extends: ['airbnb-base'],
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
