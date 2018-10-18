import bcrypt from 'bcrypt';

export const listDefaultOptions = {
  where: {},
  filter: null,
  fields: [],
  aliasDatabase: {},
};

export const getModelAlias = (aliasDatabase, db) => (model) => {
  const aliasList = Object.keys(aliasDatabase);

  if (aliasList.includes(model)) {
    const alias = aliasList[aliasList.indexOf(model)];

    return {
      model: db[aliasDatabase[alias]],
      as: model,
    };
  }

  return {
    model: db[model],
  };
};

/* eslint no-use-before-define: "off" */
const clearItem = scheme => (item) => {
  const newItem = {};

  scheme.forEach((field) => {
    if (item === null) {
      newItem[field] = null;
    } else if (typeof field === 'string') {
      newItem[field] = item[field];
    } else {
      Object.keys(field).forEach((key) => {
        if (typeof item[key] !== 'undefined') {
          newItem[key] = clearData(item[key], field[key]);
        }
      });
    }
  });

  return newItem;
};

export const clearData = (data, scheme) => {
  if (Array.isArray(data)) {
    return data.map(clearItem(scheme));
  }

  return clearItem(scheme)(data);
};

/* eslint no-param-reassign: "off" */
/* eslint no-underscore-dangle: "off" */
export const cryptPassword = bcryptSalt => (user) => {
  if (user.password !== user._previousDataValues.password) {
    return bcrypt
      .hash(user.password, bcrypt.genSaltSync(bcryptSalt))
      .then((hash) => {
        user.password = hash;
      });
  }

  return null;
};
