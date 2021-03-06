'use strict'

const { Schedule } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class ScheduleFactory extends BaseFactory {
  constructor(properties, validator, md5Repository) {
    super(
      {
        ...properties,
        computedUnique: md5Repository.exec(
          `${properties.location}${properties.movie}${properties.startTime}${properties.duration}${properties.typeRoom}`
        )
      },
      validator
    )
  }

  async createEntity() {
    super.validateEntity(Schedule.schema, Schedule.persistName)
    return new Schedule(this._properties)
  }
}
module.exports = { ScheduleFactory }
