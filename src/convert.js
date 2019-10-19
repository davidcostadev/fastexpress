const orderToFilter = val => {
  let value = val;
  if (typeof val !== 'string') {
    value = val.toString();
  }
  const fields = value.split(',').map(a => a.split('.'));

  return fields;
};

module.exports = {
  orderToFilter,
};
