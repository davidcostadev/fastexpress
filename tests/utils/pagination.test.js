import { paginationParse } from '../../src';

it('should the object', () => {
  expect(paginationParse(10, 1, 5)).toEqual({
    currentPage: 1,
    nextPage: 2,
    totalPages: 2,
    perPage: 5,
    previousPage: null,
    totalItems: 10,
  });
  expect(paginationParse(10, 2, 5)).toEqual({
    currentPage: 2,
    nextPage: null,
    totalPages: 2,
    perPage: 5,
    previousPage: 1,
    totalItems: 10,
  });
});
