# Notes - Controllers logic

- Configure `express.json()` on `Server`. This allows to parse request body with `Content-Type: application/json`
- Logic of controllers:
  - `Category` model should be updated: `name, type` not null
    - Static method `findByIdOrName` with where OR operator `Op.or`
  - `CategoryController`
  - `Record` model should be updated: `name, type` not null, `deleted` default value `false`
  - `ExpenseController`
  - `IncomeController`
- **Possible Refactor:** `ExpenseController` and `IncomeController` share the same logic. The only difference is `type` 
  column is equal to `expense or income`