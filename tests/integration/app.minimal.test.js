const request = require('supertest');
const express = require('express');
const routes = require('./minimal/routes');
const { Tasks, sequelize } = require('./minimal/models');
const TaskFactory = require('./factories/Task.Factory');
const truncate = require('./truncate');

describe('app.minimal', () => {
  let task;

  beforeAll(async () => {
    await truncate();
    task = await TaskFactory({
      name: 'Task 01',
    });

    task = await Tasks.findByPk(task.id);
  });

  afterAll(() => {
    sequelize.close();
  });

  it('Should the endpoint / return objects api, v1, and tasks', done => {
    const app = express();

    app.use(routes);

    request(app)
      .get('/')
      .expect(
        200,
        {
          api: {
            v1: {
              tasks: [
                '[get] /api/v1/tasks',
                '[post] /api/v1/tasks',
                '[get] /api/v1/tasks/:id',
                '[delete] /api/v1/tasks/:id',
                '[put] /api/v1/tasks/:id',
              ],
            },
          },
        },
        done,
      );
  });

  it('Should the endpoint /api return objects v1, and tasks', done => {
    const app = express();

    app.use(routes);

    request(app)
      .get('/api')
      .expect(
        200,
        {
          v1: {
            tasks: [
              '[get] /api/v1/tasks',
              '[post] /api/v1/tasks',
              '[get] /api/v1/tasks/:id',
              '[delete] /api/v1/tasks/:id',
              '[put] /api/v1/tasks/:id',
            ],
          },
        },
        done,
      );
  });

  it('Should the endpoint /api/v1 the endpoints tree', done => {
    const app = express();

    app.use(routes);

    request(app)
      .get('/api/v1')
      .expect(
        200,
        {
          tasks: [
            '[get] /api/v1/tasks',
            '[post] /api/v1/tasks',
            '[get] /api/v1/tasks/:id',
            '[delete] /api/v1/tasks/:id',
            '[put] /api/v1/tasks/:id',
          ],
        },
        done,
      );
  });

  it('Should the endpoint /api/v1/tasks the list of tasks', done => {
    const app = express();

    app.use(routes);

    request(app)
      .get('/api/v1/tasks')
      .expect(
        200,
        {
          data: [JSON.parse(JSON.stringify(task))],
          pagination: {
            totalItems: 1,
            currentPage: 1,
            perPage: 100,
            totalPages: 1,
            nextPage: null,
            previousPage: null,
          },
        },
        done,
      );
  });
});
