export const ACTIONS = ['list', 'create', 'get', 'destroy', 'update'];

const root = prefix => `${prefix}/`;

const byId = prefix => `${prefix}/:id`;

export const URL_ACTIONS = [
  ['get', 'list', root],
  ['post', 'create', root],
  ['get', 'get', byId],
  ['delete', 'destroy', byId],
  ['put', 'update', byId],
];
