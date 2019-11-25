# Collie-uses-cases

Collie is a project which follows [Clean architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html) and rise `separation of concerns`

Layers :

- Application Business Rules(uses cases)
- Enterprise Business Rules(entities)
- <span style="color:gray">Frameworks & Drivers</span>
- <span style="color:gray">Interface Adapters(controllers)</span>

This project covered `Application Business Rules(uses cases)` and `Enterprise Business Rules(entities)` layers from `clean architecture`.

Internally is divided in the two previous layers, there is no reason to create theses layers in a separate repositories.

### Debug

Every collie's project use [debug](https://www.npmjs.com/package/debug) to log useful (or not) information in the console.  
To see information related to all modules: DEBUG=collie:\*  
To see information related just to this module use: DEBUG=collie:uses-cases

### Usage

```js
const usesCases = require("collie-uses-cases");

const config = {
  uriConnection: {
    protocol: `mongodb+srv`,
    database: `movies`
    user: `yyyyy`,
    password: `xxxxx` ,
    host: `collieclusteryeahdev-quyy0.mongodb.net`,
    setup: {
      enabled: false,
      zipWithCollections: `https://www.aws.s3/file.zip`
    }
  }
};

// Bulk Operations: Any parent or child not send will be remove from database
usesCases(config)
  .then(instance => {
    const {
      addOrUpdateSource,
      bulkBrandWithLocation,
      bulkMovieWithSchedules,
      filterActiveMovies,
      filterMoviesInfo,
      filterAddress
    } = instance;

    filterAddress(``, ``, ``).then(results => {
      console.log(results);
    });
  })
  .catch(err => console.error(err));
```
