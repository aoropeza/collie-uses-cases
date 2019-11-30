'use strict'

const { SourceFactory } = require('../src/entities')

const validator = {
  validate: (properties, schema, persistName) => {
    console.log('validando')
    return undefined
  }
}

const sourceFactory = new SourceFactory(
  {
    ip: '127.0.0.1',
    computedUnique: 'asdasdas'
  },
  validator
)

const entity = sourceFactory.buildEntity()

console.log('entity')
console.log(entity)
