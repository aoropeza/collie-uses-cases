# Collie-uses-cases

Collie is a project which follows [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and rise `separation of concerns`

Layers :

- Application Business Rules(uses cases)
- Enterprise Business Rules(entities)
- Frameworks & Drivers
- Interface Adapters(controllers)

### Debug

Every collie's project use [debug](https://www.npmjs.com/package/debug) to log useful (or not) information in the console.

- To see information related to all modules: **DEBUG=collie:\***
- To see information related just to this module use: **DEBUG=collie:uses-cases**

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
```
