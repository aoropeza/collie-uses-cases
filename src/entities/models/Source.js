'use strict'

class Source {
  constructor({
    ip,
    clientType,
    clientName,
    clientSo,
    clientVersion,
    insertTime
  }) {
    this._ip = ip
    this._clientType = clientType
    this._clientName = clientName
    this._clientSo = clientSo
    this._clientVersion = clientVersion
    this._insertTime = insertTime
  }

  get ip() {
    return this._ip
  }

  get clientType() {
    return this._clientType
  }

  get clientName() {
    return this._clientName
  }

  get clientSo() {
    return this._clientSo
  }

  get clientVersion() {
    return this._clientVersion
  }

  get insertTime() {
    return this._insertTime
  }

  set ip(value) {
    this._ip = value
  }

  set clientType(value) {
    this._clientType = value
  }

  set clientName(value) {
    this._clientName = value
  }

  set clientSo(value) {
    this._clientSo = value
  }

  set clientVersion(value) {
    this._clientVersion = value
  }

  set insertTime(value) {
    this._insertTime = value
  }

  static get persistName() {
    return 'source'
  }

  static get schema() {
    return {
      ip: {
        required: true,
        type: String
      },
      clientType: {
        required: true,
        type: String
      },
      clientName: {
        required: true,
        type: String
      },
      clientSo: {
        required: true,
        type: String
      },
      clientVersion: {
        required: true,
        type: String
      },
      insertTime: {
        required: true,
        type: Date
      }
    }
  }
}

module.exports = Source
