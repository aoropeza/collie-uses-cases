/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */

'use strict'

class DbStrategy {
  async validate(properties, schema, persistName) {}

  async find(query) {}

  async remove(query) {}

  async findOneAndUpdate(ids, properties, options) {}

  async save(entity) {}
}

module.exports = { DbStrategy }
