# fastexpress - Basic example

## Using docker to run database

`docker run --name fastexpress-basic-db -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`


## Installation

- `cp config/config.example.json config/config.json`
- `npm run sequelize db:create`
- `npm run sequelize db:migrate`
- `npm run start`
