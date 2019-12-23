'use strict'

const colors = require('colors')
const fetch = require('node-fetch')
const { templates: templatesFromLocal } = require('../configure')

module.exports = async () => {
    const { templates: templatesFromGit } = await fetch('https://raw.githubusercontent.com/JustClear/just-cli/master/configure.json').then(response => response.json())
    const templates = Object.assign(templatesFromLocal, templatesFromGit)
    console.log(colors.green('\ntemplates: \n'))
    console.log(JSON.stringify(templates, null, '    '))
    console.log('\n')
}
