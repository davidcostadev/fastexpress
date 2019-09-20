const { Router } = require('express');
const { namespaceCreator, namespaceIndexCreator, resources, resourceList } = require('./routers');
const { ACTIONS } = require('./definitions');

const urlsIndexCreator = path =>
  path
    .split('/')
    .filter(s => s.length)
    .reduce(
      (acc, cur) => {
        const url = [acc[acc.length - 1], `${cur}/`].join('');
        acc.push(url);

        return acc;
      },
      ['/'],
    );

const deepCreator = (path, obj) =>
  path
    .split('/')
    .filter(s => s.length)
    .reduceRight(
      (acc, cur) => ({
        [cur]: acc,
      }),
      obj,
    );

class Resources {
  constructor(options = {}) {
    this.namespace = namespaceCreator(options.namespace);
    this.indexCreator = namespaceIndexCreator(this.namespace);
    this.resources = [];
    this.router = Router();

    return this;
  }

  /**
   * Add new resource
   *
   * @param {string} endpoint
   * @param {function} controller
   * @param {array} [middleware=[]]
   * @returns self
   *
   * @memberOf Resources
   */
  add(endpoint, controller, { middleware = [], only = ACTIONS } = {}) {
    this.resources.push(endpoint);

    resources(this.namespace(endpoint), {
      router: this.router,
      middleware,
      controller,
      only,
    });

    return this;
  }

  setIndexResponse() {
    const indexResponse = this.resources.reduce(
      (acc, cur) => ({
        ...acc,
        [cur]: resourceList('tasks', { namespace: this.namespace }),
      }),
      {},
    );

    urlsIndexCreator(this.namespace()).forEach((url, i, list) => {
      const urlRest = list[list.length - 1].replace(new RegExp(`${url}`), '');
      this.router.get(url, (req, res) => {
        res.send(deepCreator(urlRest, indexResponse));
      });
    });
  }

  /**
   * This function will create the index response and return the routers
   *
   * @returns this.routers
   *
   * @memberOf Resources
   */
  getRouters() {
    this.setIndexResponse();
    return this.router;
  }
}

module.exports = Resources;
