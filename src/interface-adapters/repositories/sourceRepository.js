/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')

const { DbStrategy } = require('../strategies/dbStrategy')
const source = class SourceRepository extends DbStrategy {
  constructor() {
    const schemaMongoose = mongoose.Schema(schema)
    const ModelMongoose = mongoose.model(persistName, schemaMongoose)
  }

  async validate(properties, schema, persistName) {
    const schemaMongoose = mongoose.Schema(schema)
    const ModelMongoose = mongoose.model(persistName, schemaMongoose)
    const model = new ModelMongoose(properties)

    await model.validateSync()
  }

  async save(entity) {
    const schemaMongoose = mongoose.Schema(entity.schema)
    const ModelMongoose = mongoose.model(entity.persistName, schemaMongoose)

    await new ModelMongoose({
      ip: entity.ip,
      clientType: entity.clientType,
      clientName: entity.clientName,
      clientSo: entity.clientSo,
      clientVersion: entity.clientVersion,
      insertTime: entity.insertTime
    }).save()
  }
}

module.exports = { SourceRepository }
