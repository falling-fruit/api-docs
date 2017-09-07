# Falling Fruit OpenAPI Specification
[![Build Status](https://travis-ci.org/falling-fruit/api-docs.svg?branch=master)](https://travis-ci.org/falling-fruit/api-docs)

## Links

- Documentation(ReDoc): https://falling-fruit.github.io/api-docs/
- SwaggerUI: https://falling-fruit.github.io/api-docs/swagger-ui/
- Look full spec:
    + JSON https://falling-fruit.github.io/api-docs/swagger.json
    + YAML https://falling-fruit.github.io/api-docs/swagger.yaml
- Preview spec version for branch `[branch]`: `https://falling-fruit.github.io/api-docs/preview/[branch]`

**Warning:** All above links are updated only after Travis CI finishes deployment

## Development

### Installation

1. Install [Node JS](https://nodejs.org/)
2. Clone this repo, `cd` into the directory, and install node modules:

```bash
git clone https://github.com/falling-fruit/api-docs.git
cd api-docs
npm install
```

### Usage

1. Run `npm start`
2. You can use all [links](#links) (except `preview`) by replacing `https://falling-fruit.github.io/api-docs/` with the `url` in the message: `Server started <url>`
3. Make changes with the `swagger-editor` (see url in console output) or your favorite editor
4. Changes are automatically propagated to your local server, and all documentation pages refreshed in a browser after each change
5. Run tests with `npm test`

### Resources

- [OpenAPI Specification](https://swagger.io/specification/)
- [ReDoc vendor extensions](https://github.com/Rebilly/ReDoc/blob/master/docs/redoc-vendor-extensions.md)

## Todos

  - [ ] Setup a [custom domain](https://help.github.com/articles/using-a-custom-domain-with-github-pages/) (`web/CNAME` file)
  - [ ] Add the API to the [APIs.guru](https://APIs.guru) directory using [this form](https://apis.guru/add-api/)

-------

## Alternatives (deprecated)

## [API Blueprint](https://apiblueprint.org/)

`alternatives/api_blueprint.md`

  - Rendered with [Aglio](https://github.com/danielgtaylor/aglio): [alternatives/api_blueprint-aglio.html](alternatives/api_blueprint-aglio.html)
  - Rendered with [Apiary](https://apiary.io/): http://docs.fallingfruit.apiary.io/

## [APIDocjs](http://apidocjs.com/)

`alternatives/apidoc.js`

  - Rendered with APIDoc: [alternatives/apidoc/index.html](/alternatives/apidoc/index.html)
