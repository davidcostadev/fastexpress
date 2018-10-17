'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _errors = require('./errors.js');

const defaultResponse = async (req, res, service) => {
  try {
    res.json((await service(req)));
  } catch (e) {
    res.status(500).json({
      error: e.message
    });
  }
};

const list = defaultResponse;
const create = defaultResponse;
const update = defaultResponse;

const get = async (req, res, service) => {
  try {
    res.json((await service(req)));
  } catch (e) {
    if (e.message === _errors.EXCEPTION_NOT_FOUND) {
      res.status(404).send(e.message);
    } else {
      res.status(500).send(e);
    }
  }
};

const destroy = async (req, res, service) => {
  try {
    await service(req);
    res.status(204).send();
  } catch (e) {
    res.status(500).send(e);
  }
};

exports.default = {
  list,
  create,
  get,
  update,
  destroy
};