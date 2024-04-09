# Notes - Sequelize migrations:

- `$ npx sequelize-cli init`
- Change config file to sqlite
```json
{
  "development": {
    "dialect": "sqlite",
    "storage": "expenses-app.development.sqlite3"
  },
  "test": {
    "dialect": "sqlite",
    "storage": "expenses-app.test.sqlite3"
  },
  "production": {
    "dialect": "sqlite",
    "storage": "expenses-app.production.sqlite3"
  }
}
```
- `$ npx sequelize-cli db:create` does not work with sqlite dialect
- `$ npx sequelize-cli model:generate --name Category --attributes name:string,type:string`
- `$ npx sequelize-cli model:generate --name Record --attributes amount:float,categoryId:integer,date:date,name:string,type:string,deleted:boolean`
- **NOTE:** Replace migration files to `.cjs` CommonJS
- `$ npx sequelize-cli db:migrate`
- `$ npx sequelize-cli db:migrate --config ./src/config/sequelize.js`