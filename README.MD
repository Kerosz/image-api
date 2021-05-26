# Image Processing API

## Introduction

API that can be used in two different ways. As a simple placeholder API, the first allows you to place images into your frontend with the size set via URL parameters for rapid prototyping. The second use case is as a library to serve properly scaled versions of your images to the front end to reduce page load size.


## Codebase

### Technologies

- **Express**: Back-end framework
- **Typescript**: Javascript superset
- **Jasmine**: Testing framework
- **Sharp**: Image processing
- **Eslint**: Linter
- **Prettier** Code formatter

### Folder structure

```sh
image-api/
├── bucket              # Directory for storing assets
├── src                 # Application directory
├──── config            # Variables and configurations
├──── controllers       # Process incoming requests
├──── loaders           # Startup process modules
├──── middleware        # Intermediary functions
├──── routes            # API route handling
├──── services          # Layer for business logic
├──── spec              # Specs for testing
└──── utils             # Helper functions
```

## Installation

### Setup

1. Clone or download the project.
   - `git clone https://github.com/Kerosz/image-api.git`
   - `gh repo clone Kerosz/image-api`
2. Change to the project directory.
   - `cd image-api`
3. Run `git remote rm origin` to remove the remote reference.
4. Create `.env` file following the `.env.example`
5. Run `yarn` to install dependencies

### Commands
- `yarn dev` - Runs application in development mode _(uses nodemon)_
- `yarn build` - Builds application
- `yarn start` - Starts the production application _(needs build)_
- `yarn test` - Runs Jasmine test suite _(needs build)_
- `yarn lint` - Runs Eslint
- `yarn lint:fix` - Runs Eslint with fix flag

### Endpoint
__GET__  _Process image_
- `{{baseURL}}/api/v1/images?filename=spacex&width=200&height=200`

Param | Value 
--- | --- |
filename | `spacex`
width | `200` 
height | `200` 

