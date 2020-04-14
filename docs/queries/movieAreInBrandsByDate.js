// Return all movies filter by date. Each movie has an array with the available brand for the filter.
db.locations.aggregate([
  // BRAND
  {
    $lookup: {
      from: 'brands',
      let: { brandId: '$brand' },
      as: 'brandInfo',
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [{ $eq: ['$_id', '$$brandId'] }]
            }
          }
        }
      ]
    }
  },
  {
    $unwind: '$brandInfo'
  },
  // SCHEDULES
  {
    $lookup: {
      from: 'schedules',
      let: { locationId: '$_id' },
      as: 'schedulesInfo',
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [{ $eq: ['$location', '$$locationId'] }]
            }
          }
        },
        {
          $addFields: {
            startTimeZone: {
              $dateToString: {
                format: '%Y-%m-%d %H:%M',
                date: '$startTime'
              }
            }
          }
        }
      ]
    }
  },
  {
    $unwind: '$schedulesInfo'
  },
  // MOVIE
  {
    $lookup: {
      from: 'movies',
      let: { movieId: '$schedulesInfo.movie' },
      as: 'schedulesInfo.movieInfo',
      pipeline: [
        {
          $match: {
            $expr: {
              // _id comes from foreign(movies)
              $and: [{ $eq: ['$_id', '$$movieId'] }]
            }
          }
        }
      ]
    }
  },
  {
    $unwind: '$schedulesInfo.movieInfo'
  },
  {
    $match: {
      'schedulesInfo.startTime': {
        $gt: ISODate('2020-03-20T01:01:00.000Z'),
        $lt: ISODate('2020-03-20T23:59:00.000Z')
      }
    }
  },
  {
    $group: {
      _id: {
        movieInfo: '$schedulesInfo.movieInfo'
      },
      brandInfo: { $addToSet: '$brandInfo' }
    }
  }
])
