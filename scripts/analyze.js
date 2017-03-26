const fs = require('fs')
const path = require('path')
const plato = require('es6-plato')

const OUTPUT_DIR = 'analysis'
const SOURCE = 'tmp/**/*'
const TITLE = 'immutable-data-structures'

const eslintConfig = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, '..', '.eslintrc'),
    {encoding: 'utf-8'}
  )
)

const platoArgs = {
  eslint: eslintConfig,
  title: TITLE
}

plato.inspect(SOURCE, OUTPUT_DIR, platoArgs)
