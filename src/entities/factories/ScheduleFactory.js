'use strict'

const { Schedule } = require('../models')

const { BaseFactory } = require('./BaseFactory')

class ScheduleFactory extends BaseFactory {
  async createEntity() {
    super.validateEntity(Schedule.schema, Schedule.persistName)
    return new Schedule(this._properties)
  }
}
module.exports = { ScheduleFactory }
