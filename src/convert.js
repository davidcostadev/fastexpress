export const orderToFilter = (val) => {
  const fields = val.split(',').map(a => a.split('.'));

  return fields;
};

export default orderToFilter;