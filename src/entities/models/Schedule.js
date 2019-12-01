'use strict'

class Schedule {
  constructor({ movie, startTime, duration, typeRoom, computedUnique }) {
    this._movie = movie
    this._startTime = startTime
    this._duration = duration
    this._typeRoom = typeRoom
    this._computedUnique = computedUnique
  }

  get movie() {
    return this._movie
  }

  get startTime() {
    return this._startTime
  }

  get duration() {
    return this._duration
  }

  get typeRoom() {
    return this._typeRoom
  }

  get computedUnique() {
    return this._computedUnique
  }

  static get persistName() {
    return 'schedule'
  }

  set movie(value) {
    this._movie = value
  }

  set startTime(value) {
    this._startTime = value
  }

  set duration(value) {
    this._duration = value
  }

  set typeRoom(value) {
    this._typeRoom = value
  }

  set computedUnique(value) {
    this._computedUnique = value
  }

  static get schema() {
    return {
      movie: {
        required: true,
        ref: 'Movie'
      },
      startTime: {
        required: true,
        type: Date
      },
      duration: {
        required: true,
        type: Number
      },
      typeRoom: {
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

module.exports = { Schedule }
