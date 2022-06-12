<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ docker-compose up -d recipesdb

# watch mode
$ docker-compose up -d --build nest-recipes

# e2e tests
$ npm run test:e2e
```

To run e2e test, firstly you have to change

```host: 'recipesdb', ```

to
         ```host: 'recipesdb'```

in ```database.provider.ts```


### In case of error:

Building nest-recipes
error checking context: 'can't stat '/xxx/xxxxx/xxxxx/nest-recipes/data''.
ERROR: Service 'nest-recipes' failed to build : Build failed

```
sudo chmod -R a+rwx /xxx/xxx/xxxx/nest-recipes/data
```


