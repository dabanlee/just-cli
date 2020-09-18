import chalk from 'chalk'

const templates = require('../templates.json')

export function list() {
    console.log(chalk.green('\npackages: \n'))
    console.log(JSON.stringify(templates, null, '    '))
    console.log('\n')
}