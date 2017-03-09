'use strict'

const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');
const colors = require('colors');
const configure = require('../configure');
const params = process.argv.slice(2);

module.exports = () => {
    co(function* () {
        let templateName = params[1],
            confirm = yield prompt(colors.red(`\n remove template ${templateName}?[y/n]: `));

        if (!(confirm == 'y' || confirm == 'yes')) {
            console.log(colors.green('\n × Cancelled.\n'));
            process.exit();
        }

        if (!templateName) {
            console.log(colors.red('\n × Please enter template name.\n'));
            process.exit();
        }

        if (!!configure.templates[templateName]) {
            delete configure.templates[templateName];

            fs.writeFile(`${__dirname}/../configure.json`, JSON.stringify(configure, null, '  '), 'utf-8', error => {
                if (error) {
                    console.log(colors.red(error));
                    process.exit();
                }
                console.log(colors.green('\n Template removed.\n'));
                console.log(colors.green(' Latest templates:\n'));
                console.log(JSON.stringify(configure.templates, null, '    '));
                console.log('\n');
                process.exit();
            });
        } else {
            console.log(colors.red('\n Template not found!\n'));
            console.log(JSON.stringify(configure.templates, null, '    '));
            process.exit();
        }
    });
};
