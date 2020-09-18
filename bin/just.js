#!/usr/bin/env node
'use strict'

const update = require('update-notifier')
const chalk = require('chalk')
const { commands } = require('../dist/cli')
const { help, hasCommand, getCommandName, checkCommand, getArgv } = require('../dist/cli')
const pkg = require('../package.json')

update({ pkg }).notify()

if (hasCommand() && checkCommand(commands)) {
    commands[getCommandName()]()
} else {
    const { v, version } = getArgv()
    if (v || version) {
        console.log(chalk.green(`v${pkg.version}`))
    } else {
        help()
    }
}
