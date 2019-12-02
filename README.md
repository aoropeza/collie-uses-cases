# Collie-uses-cases

Collie is a project which follows [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and rise `separation of concerns`

### Layers :

- Application Business Rules(uses cases)
- Enterprise Business Rules(entities)
- Frameworks & Drivers
- Interface Adapters(controllers)

### Oriented object

This project is based on oriented object programing, we are far away for function-arrow style.

### Debug

Every collie's project use [debug](https://www.npmjs.com/package/debug) and [bunyan](https://www.npmjs.com/package/bunyan-format) to log useful (or not) information in the console.

Npm [debug](https://www.npmjs.com/package/debug) library is useful for development purposes, because log messages are grouped by namespaces

- To see information related to all modules: **DEBUG=collie:\***
- To see information related just to this module use: **DEBUG=collie:uses-cases**

If DEBUG variable is not provided during stat time, [bunyan](https://www.npmjs.com/package/bunyan-format) will help us to print log messages with default json format, very useful to integrate our messages in production to any big data tool.

### Usage

```js
const usesCases = require('collie-uses-cases')

const config = {
  uriConnection: {
    protocol: `mongodb+srv`,
    database: `movies`,
    user: `yyyyy`,
    password: `xxxxx`,
    host: `collieclusteryeahdev-quyy0.mongodb.net`,
    setup: {
      enabled: false,
      zipWithCollections: `https://www.aws.s3/file.zip`
    }
  }
}

// Bulk Operations: Any child not send will be remove from database
// Also bulk operation first try to update fallback will be insert a new object
const usesCases = await UsesCases.buildStatic(config)

await usesCases.addSources([
  {
    ip: '127.0.0.1',
    clientType: 'web',
    clientName: 'chrome',
    clientSo: 'mac',
    clientVersion: '12.2.3'
  }
])

await usesCases.bulkBrands([
  {
    name: 'Theater',
    logo: 'https://www.theater.com/logo.png'
  }
])
```
