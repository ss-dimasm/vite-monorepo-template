# React App Scaffolded With Foundations React Vite Template

## Getting Started

Each package has the following commands that can be run using yarn:

- `yarn start` will start a dev server with typechecking and linting enabled
- `yarn build` will build an app for production
- `yarn test` will run the Jest tests in watch mode
- `yarn lint` will run eslint and prettier accross the project
- `yarn check` will use tsc to type check the project

## CI/CD and Releases

### Development & PRs

When raising a PR, the dedicated Github action workflow will run tests, linting, typechecking and build tasks against all packages that changed since `main`.
