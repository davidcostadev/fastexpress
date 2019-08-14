const { EXCEPTION_NOT_FOUND } = require('./lib/errors');

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} service
 */
const defaultResponse = async (req, res, service) => {
  try {
    res.json(await service(req));
  } catch (e) {
    res.status(500).json({
      error: e.message,
    });
  }
};

const list = defaultResponse;
const create = defaultResponse;
const update = defaultResponse;

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} service
 */
const get = async (req, res, service) => {
  try {
    res.json(await service(req));
  } catch (e) {
    if (e.message === EXCEPTION_NOT_FOUND) {
      res.status(404).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }
};

/**
 *
 * @param {object} req
 * @param {object} res
 * @param {function} service
 */
const destroy = async (req, res, service) => {
  try {
    await service(req);
    res.status(204).send();
  } catch (e) {
    res.status(500).send(e);
  }
};

module.exports = {
  list,
  create,
  get,
  update,
  destroy,
};
