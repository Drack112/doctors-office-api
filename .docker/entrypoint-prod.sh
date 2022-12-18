#!/bin/sh

node ./node_modules/typeorm/cli.js migration:run -d ./dist/infra/mysql-connection.js
node -r dotenv/config dist/main
