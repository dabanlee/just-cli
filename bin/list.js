'use strict'

const colors = require('colors')
const templates = require('../configure')

module.exports = async () => {
    console.log(colors.green('\ntemplates: \n'))
    console.log(JSON.stringify(templates, null, '    '))
    console.log('\n')
}
