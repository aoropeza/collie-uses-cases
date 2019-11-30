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
  .then(
    ({ addSource, bulkBrands, bulkLocations, bulkMovies, bulkSchedules }) => {
      console.log('EXAMPLE: ----> Uses cases gotten correctly')

      return (
        Promise.resolve()
          /*.then(() =>
        addSource({
          sources: [
            {
              ip: '127.0.0.1',
              clientType: 'web',
              clientName: 'chrome',
              clientSo: 'mac',
              clientVersion: '12.2.3'
            },
            {
              ip: '127.0.0.2',
              clientType: 'mobile',
              clientName: 'safari',
              clientSo: 'mac',
              clientVersion: '11.2.3'
            }
          ]
        })
      )  
      .then(() =>
          bulkMovies({
            movies: [
              {
                name: 'Terminator'
              },
              {
                name: 'The current war'
              }
            ]
          })
        )
        .then(() =>
          bulkSchedules({
            movie: { name: 'Terminator' },
            schedules: [
              {
                startTime: new Date(),
                duration: 60,
                typeRoom: 'lux'
              }
            ]
          })
        )
        .then(() =>
          bulkSchedules({
            movie: { name: 'The current war' },
            schedules: [
              {
                startTime: new Date(),
                duration: 120,
                typeRoom: 'kids'
              }
            ]
          })
        )
        */
          .then(() =>
            bulkBrands({
              brands: [
                {
                  name: 'Cinepolis',
                  logo: 'https://www.cinepolis.com/logo2.png'
                },
                {
                  name: 'Cinemex',
                  logo: 'https://www.cinemex.com/logo2.png'
                }
              ]
            })
          )
      )
      /*
      .then(() =>
        bulkLocations({
          brand: {
            name: 'Cinepolis',
            logo: 'https://www.cinepolis.com/logo2.png'
          },
          locations: [
            {
              name: 'Plaza central',
              latitude: 19.4574866,
              longitude: 19.4574877,
              address: 'Esquina calle norte 13 número 56'
            },
            {
              name: 'Plaza sur',
              latitude: 19.4574861,
              longitude: 19.4574877,
              address: 'Esquina calle sur 33 número 34'
            }
          ]
        })
      )
      .then(() =>
        bulkLocations({
          brand: {
            name: 'Cinemex',
            logo: 'https://www.cinemex.com/logo2.png'
          },
          locations: [
            {
              name: 'Plaza oriente',
              latitude: 19.4574855,
              longitude: 19.457455,
              address: 'Esquina calle oriente 66 número 34'
            }
          ]
        })
      )
      */
    }
  )
  .then(() => {
    console.log('EXAMPLE: -----> Uses cases executed correctly')
    process.exit(0)
  })
  .catch(err => {
    console.log('EXAMPLE: ----> Error')
    console.error(err)
    process.exit(1)
  })
