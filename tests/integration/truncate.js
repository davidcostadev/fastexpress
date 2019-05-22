import models from '../../examples/basic/src/models';

async function truncate() {
  const modelsList = await Promise.all(Object.keys(models).map((key) => {
    if (['sequelize', 'Sequelize'].includes(key)) return null;

    return models[key].destroy({ where: {}, force: true });
  }));

  return modelsList;
}

export default truncate;
