import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings';
import Controller from '../src/Controller.js';

iconv.encodings = encodings;

let reqMock = {
  query: {},
};
let resMock = {
  json: jest.fn(),
};

describe('Accounts Controller should', () => {
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

  it('simulate error on list', async () => {
    const serviceMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.list(reqMock, resMock, serviceMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.json).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(500);
    expect(resMock.json.mock.calls[0][0]).toEqual({
      error: 'Async error',
    });
  });

  it('simulate error on get', async () => {
    const serviceMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.get(reqMock, resMock, serviceMock);

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(500);
    expect(resMock.send.mock.calls[0][0]).toEqual(new Error('Async error'));
  });

  it('simulate error on create', async () => {
    const ModelMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.create(reqMock, resMock, ModelMock, {});

    expect(resMock.status).toBeCalled();
    expect(resMock.json).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(500);
    expect(resMock.json.mock.calls[0][0]).toEqual({
      error: 'Async error',
    });
  });

  it('simulate error on update', async () => {
    const ModelMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.update(reqMock, resMock, ModelMock, {});

    expect(resMock.status).toBeCalled();
    expect(resMock.json).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(500);
    expect(resMock.json.mock.calls[0][0]).toEqual({
      error: 'Async error',
    });
  });

  it('simulate error on destroy', async () => {
    const ModelMock = jest.fn().mockReturnValue(Promise.reject(new Error('Async error')));

    await Controller.destroy(reqMock, resMock, ModelMock, {});

    expect(resMock.status).toBeCalled();
    expect(resMock.send).toBeCalled();
    expect(resMock.status.mock.calls[0][0]).toEqual(500);
    expect(resMock.send.mock.calls[0][0]).toEqual(new Error('Async error'));
  });
});
