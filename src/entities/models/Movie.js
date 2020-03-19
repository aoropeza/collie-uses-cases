'use strict'

class Movie {
  constructor({ name, cover, computedUnique }) {
    this._name = name
    this._cover = cover
    this._computedUnique = computedUnique
  }

  get name() {
    return this._name
  }

  get cover() {
    return this._cover
  }

  get computedUnique() {
    return this._computedUnique
  }

  static get persistName() {
    return 'movie'
  }

  set name(value) {
    this._name = value
  }

  set cover(value) {
    this._cover = value
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
      cover: {
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

module.exports = { Movie }
