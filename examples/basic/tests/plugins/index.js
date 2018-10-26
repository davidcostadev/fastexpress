// https://docs.cypress.io/guides/guides/plugins-guide.html

module.exports = (on, config) => Object.assign({}, config, {
  fixturesFolder: 'tests/fixtures',
  integrationFolder: 'tests/specs',
  screenshotsFolder: 'tests/screenshots',
  videosFolder: 'tests/videos',
  supportFile: 'tests/support/index.js',
});
