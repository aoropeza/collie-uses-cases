'use strict'

const { addSource: addSourceUsesCase } = require('../../uses-cases/addSource')
const { SourceRepository } = require('../repositories/sourceRepository')

const sourceRepository = new SourceRepository()

const addSource = async ({ sources }) => {
  await addSourceUsesCase({ sources, sourceRepository })
}
module.exports = { addSource }
