'use strict'

class BaseFactory {
  /**
   * Dependency Injection
   * throw an exception if args are invalid
   * @param {Instance} validator Instance with appropriate method 'validate(properties)', function which validate object against schema
   * @param {Object} properties {value1, value2, ...}
   * @param {String} args Model's name
   */
  constructor(properties, validator) {
    this._validator = validator
    this._properties = properties
  }

  async validateEntity() {
    const errors = await this._validator.validate(this._properties)
    if (errors) {
      throw new Error(errors)
    }
  }
}

module.exports = { BaseFactory }
