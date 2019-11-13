## Welcome to the Textversation API
Backend for textversation

## Definitions
Algorithms - files that contain algorithm implementations, for example: Match algorithm
Models - files that directly interact with the database
Modules - lumps of business logic that can access models
Routes - http routes with http verbs

## Rules
1. Models are the only files that can directly access database specific functionality. This makes it easier for us to swap/migrate the database later on.
2. Models cannot access modules
3. Modules can be accessed by other modules as well as middleware
4. Middleware can only be accessed by routes
5. Routes cannot access modules directly
6. Routes can only access middleware
7. Routes only contain routing information and middleware functionality
8. Routes cannot contain logic & may only contain routing information. Every middleware must be implemented in a middleware file


## Naming
1. **Algorithms** - `*.algorithm.js` where `*` is the name of the algorithm file
2. **Models** - `*.model.js` where `*` is the name of the model file
3. **Modules** - `*.js` where `*` is the name of the module file
4. **Routes** - `*.route.js` where `*` is the name of the route file
5. **Middleware** - `*.middleware.js` where `*` is the name of the middleware file
6. **Tests** - `*.spec.js` where `*` is the name of the test file


## Running in development
This allows for server hot reload and filewatching. For this we are using [nodemon](https://nodemon.io/)
Run the project in development mode using nodemon by running: `npm run debug`

## Running in production
Run the project in production mode by running `npm run start`

## Running tests
Run unit tests (using [jest](https://jestjs.io/)) in production mode by running `npm run test`



> *🤞 Allan Jeremy*
