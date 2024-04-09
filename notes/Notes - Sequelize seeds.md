# Notes - Sequelize seeds:

- `$ npx sequelize-cli seed:generate --name demo-categories`
- `$ npx sequelize-cli seed:generate --name demo-expenses`
- `$ npx sequelize-cli seed:generate --name demo-incomes`
- Running Seeds:
  - `$ npx sequelize-cli db:seed:all --config src/config/sequelize.js`
- Debug seed errors:
  - Add a `try/catch` block when calling `await queryInterface.bulkInsert()`