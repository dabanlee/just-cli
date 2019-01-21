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
    .option('-n, --name <string>', 'template name')
    .option('-b, --branch <string>', 'template branch')
    .option('-g, --git <string>', 'template git')
    .alias('a')
    .action(require('./add'));

commander
    .command('remove')
    .description('Remove template')
    .alias('r')
    .action(require('./remove'));

if (!commander.parse(process.argv).args.length) commander.help();
