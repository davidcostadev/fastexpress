const sequelize = require('sequelize');
const Controller = require('./src/controllers/Tasks');
const { Tasks } = require('./src/models');
const TaskFactory = require('./factories/Task.Factory');
const { EXCEPTION_NOT_FOUND } = require('../../src/lib/errors');
const truncate = require('./truncate');

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Controller', () => {
  let task;

  beforeEach(async () => {
    await truncate();
    task = await TaskFactory({
      name: 'Task 01',
    });

    task = JSON.parse(JSON.stringify(await Tasks.findByPk(task.id)));
  });

  beforeEach(async () => {
    const status = jest.fn();

    reqMock = {
      query: {},
      params: {},
      body: {},
    };
    resMock = {
      status,
      send: jest.fn(),
      json: jest.fn(),
    };

    status.mockReturnValue(resMock);
  });

  afterAll(() => {
    sequelize.close();
  });

  it('list entities', async () => {
    await Controller.list(reqMock, resMock);
    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toHaveProperty('data');
    expect(response).toHaveProperty('pagination');
    expect(response.data.length).toBeTruthy();
    expect(response.data[0]).toEqual(task);
    expect(response.pagination).toEqual({
      currentPage: 1,
      nextPage: null,
      perPage: 100,
      previousPage: null,
      totalItems: 1,
      totalPages: 1,
    });
  });

  it('Should list task by name using custom filter', async () => {
    let taskTwo = await TaskFactory({
      name: "It's something to do",
      completed: true,
    });

    taskTwo = JSON.parse(JSON.stringify(await Tasks.findByPk(taskTwo.id)));

    reqMock.query = {
      name: 'something',
    };

    await Controller.list(reqMock, resMock);

    expect(resMock.json).toBeCalledWith({
      data: [
        {
          completed: true,
          createdAt: taskTwo.createdAt,
          id: taskTwo.id,
          name: "It's something to do",
          updatedAt: taskTwo.updatedAt,
        },
      ],
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 100,
        previousPage: null,
        totalItems: 1,
        totalPages: 1,
      },
    });
  });

  it('Should list task by completed without custom filter', async () => {
    let taskTwo = await TaskFactory({
      name: "It's something to do",
      completed: true,
    });

    taskTwo = JSON.parse(JSON.stringify(await Tasks.findByPk(taskTwo.id)));

    reqMock.query = {
      completed: 'true',
    };

    await Controller.list(reqMock, resMock);

    expect(resMock.json).toBeCalledWith({
      data: [
        {
          completed: true,
          createdAt: taskTwo.createdAt,
          id: taskTwo.id,
          name: "It's something to do",
          updatedAt: taskTwo.updatedAt,
        },
      ],
      pagination: {
        currentPage: 1,
        nextPage: null,
        perPage: 100,
        previousPage: null,
        totalItems: 1,
        totalPages: 1,
      },
    });
  });

  it('Should list paginate with only one item per page', async () => {
    await TaskFactory({ name: 'Task 02', completed: true });
    let taskThree = await TaskFactory({ name: 'Task 03', completed: true });
    await TaskFactory({ name: 'Task 04', completed: true });

    taskThree = JSON.parse(JSON.stringify(await Tasks.findByPk(taskThree.id)));

    reqMock.query = {
      page: '2',
      limit: '1',
    };

    await Controller.list(reqMock, resMock);

    expect(resMock.json).toBeCalledWith({
      data: [
        {
          completed: true,
          createdAt: taskThree.createdAt,
          id: taskThree.id,
          name: 'Task 03',
          updatedAt: taskThree.updatedAt,
        },
      ],
      pagination: {
        currentPage: 2,
        nextPage: 3,
        perPage: 1,
        previousPage: 1,
        totalItems: 4,
        totalPages: 4,
      },
    });
  });

  it('create an entity', async () => {
    const body = {
      name: 'This is a TODO',
    };

    reqMock.body = body;

    await Controller.create(reqMock, resMock);
    const entity = resMock.json.mock.calls[0][0];

    expect(body.name).toEqual(entity.name);
  });

  it('get entity', async () => {
    reqMock.params.id = task.id;

    await Controller.get(reqMock, resMock);
    expect(resMock.json).toBeCalledWith(task);
  });

  it('get error not found on', async () => {
    reqMock.params.id = 99999999;

    const errorMock = console.error;
    console.error = jest.fn();
    await Controller.get(reqMock, resMock);

    expect(console.error).toBeCalled();

    console.error = errorMock;

    expect(resMock.status).toBeCalledWith(404);
    expect(resMock.send).toBeCalledWith(EXCEPTION_NOT_FOUND);
  });

  it('update entity', async () => {
    reqMock.params.id = task.id;
    const body = {
      name: 'Lanche',
      completed: 'true',
    };
    reqMock.body = body;

    await Controller.update(reqMock, resMock);

    task = await Tasks.findByPk(task.id);

    expect(resMock.json).toBeCalled();

    const response = resMock.json.mock.calls[0][0];

    expect(response).toBeTruthy();
    expect(response.toJSON()).toHaveProperty('name');
    expect(response.toJSON()).toHaveProperty('completed');
    expect(response.name).toEqual(body.name);
    expect(response.completed).toEqual(true);
  });

  it('delete entity', async () => {
    reqMock.params.id = task.id;

    await Controller.destroy(reqMock, resMock);

    expect(resMock.send).toBeCalled();
    expect(resMock.status).toBeCalledWith(204);
  });
});
