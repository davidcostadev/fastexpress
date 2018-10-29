# fastexpress - Basic example

## using docker to run database

`docker run --name fastexpress-basic-db -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`


## Installation

- `cp config/config.example.json config/config.json`
- `yarn run sequelize db:create`
- `yarn run sequelize db:migrate`
- `yarn run start`


## Running tests

- `yarn run sequelize db:seed:undo:all`
- `yarn run sequelize db:seed:all`
- `yarn run cypress or yarn test`
