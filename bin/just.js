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

if (!commander.parse(process.argv).args.length) commander.help();
