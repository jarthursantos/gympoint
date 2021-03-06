# Gympoint SERVER

This server has been create using [express](https://expressjs.com/pt-br/) in your core and another modules to some features

## Getting started

### Starting the server

You need a working [redis](https://redis.io/) server, if you are using the docker, you can get it by running this command:

`docker run --name redis -p 27017:{some_post} -d redis:alpine`

and, you need a working [postgres](https://www.postgresql.org/) server, again, if you are using the docker, you can get it by running this command:

`docker run --name postgres -e POSTGRES_PASSWORD={same_password} -p 5432:{some_post} postgres:11`

create a .env file in root folder, copy the content of [.env.example](.env.example) from him and replace all required variables based on your system

and after

`yarn sequelize db:migrate && yarn sequelize db:seed:all` or use npm from this

after this your can execute:

`yarn start` or `npm run start`

If your use [Insomnia](https://insomnia.rest/), your can find, download and import this [file](insomnia.json) to execute manual tests in this application and read the routes documentation.

\* note: tests are not finished
