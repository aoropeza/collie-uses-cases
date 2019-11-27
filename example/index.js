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
  .then(({ bulkLocations }) => {
    console.log('EXAMPLE: ----> Uses cases gotten correctly')

    return bulkLocations({
      brand: {
        name: 'Cinepolis2',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      locations: [
        {
          name: 'Plaza central',
          latitude: 19.4574871,
          longitude: 19.4574872,
          address: 'Esquina calle norte 13 número 56'
        },
        {
          name: 'Plaza sur',
          latitude: 19.4574875,
          longitude: 19.4574875,
          address: 'Esquina calle sur 33 número 34'
        }
      ]
    })
  })
  .then(() => {
    console.log('EXAMPLE: -----> Uses cases executed correctly')
    process.exit(0)
  })
  .catch(err => {
    console.log('EXAMPLE: ----> Error')
    console.error(err)
    process.exit(1)
  })
