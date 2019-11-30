'use strict'

class Movie {
  constructor({ name, computedUnique }) {
    this._name = name
    this._computedUnique = computedUnique
  }

  get name() {
    return this._name
  }

  get computedUnique() {
    return this._computedUnique
  }

  set name(value) {
    this._name = value
  }

  set computedUnique(value) {
    this._computedUnique = value
  }

  static get schema() {
    return {
      name: {
        require: true,
        type: String
      },
      computedUnique: {
        required: true,
        type: String
      }
    }
  }
}

module.exports = Movie
