const { without } = require('ramda');

/**
 * To return just allowed actions list
 *
 * @param {array} except
 * @param {array} only
 * @returns {array}
 */
function getAllowedActions(except, only) {
  return without(except, only);
}

module.exports = getAllowedActions;
