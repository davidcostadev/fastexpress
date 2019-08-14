# fastexpress - Auth example

## Using docker to run database

`docker run --name fastexpress-auth-db -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`


## Installation

- `cp config/database.example.json config/database.json`
- `yarn run sequelize db:create`
- `yarn run sequelize db:migrate`
- `yarn run sequelize db:seed:all`
- `yarn run start`



## Using with CURL

`curl -X POST -d"email=davidcostadev@gmail.com&password=P@ssw0rd" http://localhost:3000/api/v1/login`
