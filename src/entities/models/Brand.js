'use strict'

class Brand {
  constructor({ name, logo, computedUnique }) {
    this._name = name
    this._logo = logo
    this._computedUnique = computedUnique
  }

  get name() {
    return this._name
  }

  get logo() {
    return this._logo
  }

  get computedUnique() {
    return this._computedUnique
  }

  set name(value) {
    this._name = value
  }

  set logo(value) {
    this._logo = value
  }

  set computedUnique(value) {
    this._computedUnique = value
  }

  static get schema() {
    return {
      name: {
        required: true,
        type: String
      },
      logo: {
        required: true,
        type: String
      },
      computedUnique: {
        required: true,
        type: String
      }
    }
  }
}

module.exports = Brand
