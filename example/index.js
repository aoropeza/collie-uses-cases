const { UsesCases } = require('../src')

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

const start = async () => {
  try {
    const usesCases = await UsesCases.buildStatic(config)
    console.log('EXAMPLE: ----> Uses cases gotten correctly')

    await usesCases.addSources([
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
    ])

    await usesCases.bulkBrands([
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      {
        name: 'Cinemex',
        logo: 'https://www.cinemex.com/logo2.png'
      }
    ])

    await usesCases.bulkLocations(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      [
        {
          name: 'Plaza central',
          latitude: 19.4574811,
          longitude: 19.4574811,
          address: 'Esquina calle norte 13 número 56'
        },
        {
          name: 'Plaza sur',
          latitude: 19.4574844,
          longitude: 19.4574844,
          address: 'Esquina calle sur 33 número 34'
        }
      ]
    )

    await usesCases.bulkLocations(
      {
        name: 'Cinemex',
        logo: 'https://www.cinemex.com/logo2.png'
      },
      [
        {
          name: 'Plaza oriente',
          latitude: 19.4574844,
          longitude: 19.457444,
          address: 'Esquina calle oriente 66 número 34'
        }
      ]
    )

    await usesCases.bulkMovies([
      {
        name: 'Terminator'
      },
      {
        name: 'The current war'
      }
    ])
    await usesCases.bulkSchedules({ name: 'Terminator' }, [
      {
        startTime: new Date(),
        duration: 60,
        typeRoom: 'lux'
      }
    ])

    await usesCases.bulkSchedules({ name: 'The current war' }, [
      {
        startTime: new Date(),
        duration: 120,
        typeRoom: 'kids'
      }
    ])

    console.log('EXAMPLE: -----> Uses cases executed correctly')

    process.exit(0)
  } catch (error) {
    console.log('EXAMPLE: ----> Error')
    console.error(error)
    process.exit(1)
  }
}
start()
