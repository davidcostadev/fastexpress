import Controller from '../../src/Controller';

describe('Controller', () => {
  let reqMock;
  let resMock;

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

  it('should simulate error on list', async () => {
    const serviceMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.list(reqMock, resMock, serviceMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.json).toBeCalled();
    expect(resMock.status).toBeCalledWith(500);
    expect(resMock.json).toBeCalledWith({
      error: 'Async error',
    });
  });

  it('should simulate error on get', async () => {
    const serviceMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.get(reqMock, resMock, serviceMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status).toBeCalledWith(500);
    expect(resMock.send).toBeCalledWith(new Error('Async error'));
  });

  it('should simulate error on create', async () => {
    const ModelMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.create(reqMock, resMock, ModelMock, {});

    expect(resMock.status).toBeCalled();
    expect(resMock.json).toBeCalled();
    expect(resMock.status).toBeCalledWith(500);
    expect(resMock.json).toBeCalledWith({
      error: 'Async error',
    });
  });

  it('should simulate error on update', async () => {
    const ModelMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.update(reqMock, resMock, ModelMock, {});

    expect(resMock.status).toBeCalled();
    expect(resMock.json).toBeCalled();
    expect(resMock.status).toBeCalledWith(500);
    expect(resMock.json).toBeCalledWith({
      error: 'Async error',
    });
  });

  it('should simulate error on destroy', async () => {
    const ModelMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.destroy(reqMock, resMock, ModelMock, {});

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status).toBeCalledWith(500);
    expect(resMock.send).toBeCalledWith(new Error('Async error'));
  });
});
