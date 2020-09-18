import chalk from 'chalk'

const { version } = require('../package.json')

export function help() {
    const helpString = chalk`
    {bold VERSION:} {green ${version}}

    {bold USAGE:}
    
      {bold $} {cyan just init}       Initialize a new project
      {bold $} {cyan just add}        Add template
      {bold $} {cyan just list}       List the templates file
      {bold $} {cyan just remove}     Remove template

    {bold OPTIONS:}
      -h, --help                      Show usage message
      -v, --version                   Show the current version number
`
console.log(helpString)
}