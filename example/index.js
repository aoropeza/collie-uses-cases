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
  .then(({ Brand, Location }) => {
    console.log('----> Uses cases gotten correctly')

    const brand = new Brand({
      name: 'Cinepolis2',
      logo: 'https://www.cinepolis.com/logo.png'
    })

    const location = new Location({
      name: 'Plaze central',
      latitude: 19.4574873,
      longitude: 19.4574873,
      address: 'Esquina calle norte 13 número 56'
    })

    return brand.save().then(() => {
      location.brand = brand._id
      return location.save()
    })
  })
  .then(() => {
    console.log('----- Collection saved')
    process.exit(0)
  })
  .catch(err => {
    console.log('----> Error')
    console.error(err)
    process.exit(1)
  })
