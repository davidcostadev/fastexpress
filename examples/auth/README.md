# fastexpress - Auth example

## Using docker to run database

`docker run --name fastexpress-auth-db -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`

## Installation

- `cp config/database.example.json config/database.json`
- `npm run sequelize db:create`
- `npm run sequelize db:migrate`
- `npm run sequelize db:seed:all`
- `npm run start`

## Using with CURL

`curl -X POST -d "email=username@email.com&password=P@ssw0rd" http://localhost:3000/api/v1/login`

`curl http://localhost:3000/api/v1/tasks?token={token}`
