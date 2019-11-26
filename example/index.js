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
  .then(({ Brand }) => {
    console.log('----> Uses cases gotten correctly')

    const instance = new Brand({
      name: 'Cinepolis2',
      logo: 'https://www.cinepolis.com/logo.png'
    })
    instance.save(err => {
      console.log('----> Saving')
      console.error(err)
      process.exit(0)
    })
  })
  .catch(err => {
    console.log('----> Error')
    console.error(err)
    process.exit(1)
  })
