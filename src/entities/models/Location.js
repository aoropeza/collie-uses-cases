'use strict'

class Location {
  constructor({ brand, name, latitude, longitude, address, computedUnique }) {
    this._brand = brand
    this._name = name
    this._latitude = latitude
    this._longitude = longitude
    this._address = address
    this._computedUnique = computedUnique
  }

  get brand() {
    return this._brand
  }

  get name() {
    return this._name
  }

  get latitude() {
    return this._latitude
  }

  get longitude() {
    return this._longitude
  }

  get address() {
    return this._address
  }

  get computedUnique() {
    return this._computedUnique
  }

  static get persistName() {
    return 'location'
  }

  set brand(value) {
    this._brand = value
  }

  set name(value) {
    this._name = value
  }

  set latitude(value) {
    this._latitude = value
  }

  set longitude(value) {
    this._longitude = value
  }

  set address(value) {
    this._address = value
  }

  set computedUnique(value) {
    this._computedUnique = value
  }

  static get schema() {
    return {
      brand: {
        required: true,
        ref: 'brand'
      },
      name: {
        required: true,
        type: String
      },
      geometry: {
        type: { type: String },
        coordinates: [Number]
      },
      address: {
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

module.exports = { Location }
