# api-docs

Draft documentation for the Falling Fruit API.

## OpenApi ([Swagger](https://swagger.io/))

`swagger.json` & `swagger.yaml`

 - Rendered with Swagger UI: http://petstore.swagger.io/ and enter `https://raw.githubusercontent.com/falling-fruit/falling-fruit-api/master/swagger.json`
 - Rendered with ReDoc: http://rebilly.github.io/ReDoc/?url=https://raw.githubusercontent.com/falling-fruit/falling-fruit-api/master/swagger.json

## [API Blueprint](https://apiblueprint.org/)

`api_blueprint.md`

  - Rendered with [Aglio](https://github.com/danielgtaylor/aglio): [api_blueprint-aglio.html](./api_blueprint-aglio.html)
  - Rendered with [Apiary](https://apiary.io/): http://docs.fallingfruit.apiary.io/

## [APIDocjs](http://apidocjs.com/)

`apidoc.js`

  - Rendered with APIDoc: [apidoc/index.html](./apidoc/index.html)

### Scratch

```
nvm use 6.11.3
npm install apidoc -g
apidoc -i . -o ./apidoc -f "apidoc\\.js$"
npm install aglio -g
aglio -i api_blueprint.md -o api_blueprint-aglio.html
```
