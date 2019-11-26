const usesCases = require('../src')

const config = {
  uriConnection: {
    protocol: `mongodb+srv`,
    database: `movies`,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    setup: {
      enabled: false,
      zipWithCollections: `https://files.s3.amazonaws.com/collections.zip`
    }
  }
}

// Bulk Operations: Any parent or child not send will be remove from database
usesCases(config)
  .then(() => {
    console.log('----> Uses cases gotten correctly')
    process.exit(0)
  })
  .catch(err => {
    console.log('----> Error')
    console.error(err)
    process.exit(1)
  })
