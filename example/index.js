'use strict'

const util = require('util')

const moment = require('moment')

const { UsesCases } = require('../src')

const config = {
  uriConnection: {
    protocol: `mongodb+srv`,
    database: `movies-dev`,
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    host: process.env.DB_HOST,
    setup: {
      enabled: false,
      zipWithCollections: `https://files.s3.amazonaws.com/collections.zip`
    }
  }
}

const startInserts = async () => {
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
          name: 'Cinépolis - Plaza Telmex',
          latitude: 19.449582,
          longitude: -99.0723182,
          address:
            'Avenida Bordo de Xochiaca, Av. Ciudad Jdn. 3, Bicentenario, 57205 Nezahualcóyotl, Méx'
        },
        {
          name: 'Cinépolis - Forum Buenavista',
          latitude: 19.4512236,
          longitude: -99.1534301,
          address:
            'Av. Insurgentes Nte. 259, Buenavista, Cuauhtémoc, 06350 Hervidero y Plancha, CDMX'
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
          name: 'Cinemex - Parque Lindavista',
          latitude: 19.4864927,
          longitude: -99.134044,
          address:
            'Colector 13 No. 280, Magdalena de las Salinas, Gustavo A. Madero, 07760 Ciudad de México, CDMX'
        }
      ]
    )

    await usesCases.bulkMovies([
      {
        name: 'Terminator',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      },
      {
        name: 'The current war',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      }
    ])

    await usesCases.bulkSchedules(
      {
        name: 'Cinemex',
        logo: 'https://www.cinemex.com/logo2.png'
      },
      {
        name: 'Cinemex - Parque Lindavista',
        latitude: 19.4864927,
        longitude: -99.134044,
        address:
          'Colector 13 No. 280, Magdalena de las Salinas, Gustavo A. Madero, 07760 Ciudad de México, CDMX'
      },
      {
        name: 'Terminator',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      },
      [
        {
          // Mexico to gmt
          startTime: moment('2019-12-04 10:00', 'YYYY-MM-DD h:mm').utcOffset(0),
          duration: 60,
          typeRoom: 'lux'
        }
      ]
    )

    await usesCases.bulkSchedules(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      {
        name: 'Cinépolis - Forum Buenavista',
        latitude: 19.4512236,
        longitude: -99.1534301,
        address:
          'Av. Insurgentes Nte. 259, Buenavista, Cuauhtémoc, 06350 Hervidero y Plancha, CDMX'
      },
      {
        name: 'The current war',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      },
      [
        {
          // Mexico to gmt
          startTime: moment('2019-12-04 16:00', 'YYYY-MM-DD h:mm').utcOffset(0),
          duration: 120,
          typeRoom: 'kids'
        }
      ]
    )

    await usesCases.bulkSchedules(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      {
        name: 'Cinépolis - Plaza Telmex',
        latitude: 19.449582,
        longitude: -99.0723182,
        address:
          'Avenida Bordo de Xochiaca, Av. Ciudad Jdn. 3, Bicentenario, 57205 Nezahualcóyotl, Méx'
      },
      {
        name: 'The current war',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      },
      [
        {
          // Mexico to gmt
          startTime: moment('2019-12-04 16:00', 'YYYY-MM-DD h:mm').utcOffset(0),
          duration: 120,
          typeRoom: 'kids'
        }
      ]
    )

    await usesCases.bulkSchedules(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      {
        name: 'Cinépolis - Plaza Telmex',
        latitude: 19.449582,
        longitude: -99.0723182,
        address:
          'Avenida Bordo de Xochiaca, Av. Ciudad Jdn. 3, Bicentenario, 57205 Nezahualcóyotl, Méx'
      },
      {
        name: 'Terminator',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      },
      [
        {
          // Mexico to gmt
          startTime: moment('2019-12-04 16:00', 'YYYY-MM-DD h:mm').utcOffset(0),
          duration: 120,
          typeRoom: 'kids'
        }
      ]
    )

    await usesCases.bulkSchedules(
      {
        name: 'Cinepolis',
        logo: 'https://www.cinepolis.com/logo2.png'
      },
      {
        name: 'Cinépolis - Plaza Telmex',
        latitude: 19.449582,
        longitude: -99.0723182,
        address:
          'Avenida Bordo de Xochiaca, Av. Ciudad Jdn. 3, Bicentenario, 57205 Nezahualcóyotl, Méx'
      },
      {
        name: 'The current war',
        cover: 'https://static.cinepolis.com/img/peliculas/34490/1/1/34490.jpg'
      },
      [
        {
          // Mexico to gmt
          startTime: moment('2019-12-04 16:00', 'YYYY-MM-DD h:mm').utcOffset(0),
          duration: 120,
          typeRoom: 'kids'
        }
      ]
    )

    console.log('EXAMPLE: -----> Uses cases executed correctly')

    process.exit(0)
  } catch (error) {
    console.log('EXAMPLE: ----> Error')
    console.error(error)
    process.exit(1)
  }
}
startInserts()

const startSearchMoviesInfo = async () => {
  try {
    const usesCases = await UsesCases.buildStatic(config)
    console.log('EXAMPLE: ----> Uses cases gotten correctly')

    const movies = await usesCases.filterLocationsByMovie(
      'Terminator',
      '2019-12-04',
      '12:00-17:59', //morning 00:00-11:59, evening 12:00-17:59, night 18:00-23:59
      'America/Mexico_City',
      19.4499759,
      -99.0704167
    )

    console.log(util.inspect(movies, false, null, true /* enable colors */))
    process.exit(0)
  } catch (error) {
    console.log('EXAMPLE: ----> Error')
    console.error(error)
    process.exit(1)
  }
}
startSearchMoviesInfo()

const startSearchActiveMovies = async () => {
  try {
    const usesCases = await UsesCases.buildStatic(config)
    console.log('EXAMPLE: ----> Uses cases gotten correctly')

    const movies = await usesCases.filterActiveMovies(
      '2019-12-04',
      '12:00-17:59', //morning 00:00-11:59, evening 12:00-17:59, night 18:00-23:59
      'America/Mexico_City'
    )

    console.log(util.inspect(movies, false, null, true /* enable colors */))
    process.exit(0)
  } catch (error) {
    console.log('EXAMPLE: ----> Error')
    console.error(error)
    process.exit(1)
  }
}
startSearchActiveMovies()
