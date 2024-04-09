# Docker

- `$ docker init`
- `$ docker build -t node-expenses-rest-api:latest .`

## Docker with Sqlite
- `$ NODE_ENV=production npm run db:migrate`
- `$ docker run --name node-expenses-rest-api -p 3000:3000 -d node-expenses-rest-api`