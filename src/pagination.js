const getTotalPages = (totalItems, perPage) => Math.ceil(totalItems / perPage);

const getNextPageIfExist = (currentPage, totalPages) =>
  currentPage < totalPages ? currentPage + 1 : null;
const getPreviousPageIfExist = currentPage => (currentPage > 1 ? currentPage - 1 : null);

const paginationParse = (totalItems, currentPage, perPage) => {
  const totalPages = getTotalPages(totalItems, perPage);

  return {
    totalItems,
    currentPage,
    perPage,
    totalPages,
    nextPage: getNextPageIfExist(currentPage, totalPages),
    previousPage: getPreviousPageIfExist(currentPage),
  };
};

module.exports = paginationParse;
