/* eslint-disable class-methods-use-this */

'use strict'

const mongoose = require('mongoose')

const { Source } = require('../../entities/models')
const { Db } = require('../interfaces/Db')

class DbSourceRepository extends Db {
  constructor() {
    super()
    this._schema = mongoose.Schema(Source.schema)
    this._model = mongoose.model(Source.persistName, this._schema)
  }

  async validate(properties) {
    const ModelSource = this._model
    const source = new ModelSource(properties)

    return source.validateSync()
  }

  async save(entity) {
    const ModelSource = this._model

    await new ModelSource({
      ip: entity.ip,
      clientType: entity.clientType,
      clientName: entity.clientName,
      clientSo: entity.clientSo,
      clientVersion: entity.clientVersion,
      insertTime: entity.insertTime
    }).save()
  }
}

module.exports = { DbSourceRepository }
