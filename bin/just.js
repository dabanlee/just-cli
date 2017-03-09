#!/usr/bin/env node

'use strict'

const commander = require('commander');

commander
    .version(require('../package').version);

commander
    .usage('<command>');

commander
    .command('init')
    .description('Initialize a new project')
    .alias('i')
    .action(require('./init'));

commander
    .command('list')
    .description('List the configuration file')
    .alias('l')
    .action(require('./list'));

commander
    .command('add')
    .description('Add template')
    .alias('a')
    .action(require('./add'));

if (!commander.parse(process.argv).args.length) commander.help();
