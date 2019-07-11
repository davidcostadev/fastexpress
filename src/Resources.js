const { Router } = require('express');
const {
  namespaceCreator,
  namespaceIndexCreator,
  resources,
  resourceList,
} = require('./routers');

class Resources {
  constructor(options = {}) {
    this.namespace = namespaceCreator(options.namespace);
    this.indexCreator = namespaceIndexCreator(this.namespace);
    this.resources = [];
    this.router = Router();

    return this;
  }

  add(endpoint, controller) {
    this.resources.push(endpoint);

    resources(this.namespace(endpoint), {
      router: this.router,
      controller,
    });

    return this;
  }

  setIndexResponse() {
    const indexResponse = this.resources.reduce((acc, cur) => ({
      ...acc,
      [cur]: resourceList('tasks', { namespace: this.namespace }),
    }), {});


    this.router.get(this.namespace(), (req, res) => {
      res.send(this.indexCreator(indexResponse));
    });
  }

  getRouters() {
    this.setIndexResponse();
    return this.router;
  }
}


module.exports = Resources;
