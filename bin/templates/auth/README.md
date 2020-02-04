# {{name}}

## Using docker to run database

`docker run --name {{name}}-db -e MYSQL_ROOT_PASSWORD=123 -p 3306:3306 -d mysql:5`

## Installation

- `cp config/example.database.json config/database.json`
- `cp .env.example .env` # **(change the SECRET_KEY)**
- `npm install` or `yarn`
- `npm run sequelize db:create`
- `npm run sequelize db:migrate`
- `npm run sequelize db:seed:all` # **(optional)**
- `npm run dev`