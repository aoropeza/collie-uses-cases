/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

'use strict'

class Db {
  async validate(properties, schema, persistName) {}

  async find(query) {}

  async remove(query) {}

  async insertOrUpdate(ids, properties) {}

  async save(entity) {}
}

module.exports = { Db }
