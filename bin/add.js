'use strict'

const fs = require('fs');
const co = require('co');
const prompt = require('co-prompt');
const colors = require('colors');
const configure = require('../configure');

module.exports = () => {
    co(function* () {
        let templateName = yield prompt(colors.green('\n template name: ')),
            branchName = yield prompt(colors.green('\n branch(master): ')),
            gitUrl = yield prompt(colors.green('\n git: '));

        if (!templateName) {
            console.log(colors.red('\n × Please enter template name.\n'));
            process.exit();
        }

        if (!gitUrl) {
            console.log(colors.red('\n × Please enter git url.\n'));
            process.exit();
        }

        if (!configure.templates[templateName]) {
            configure.templates[templateName] = {};
            configure.templates[templateName]['branch'] = branchName ? branchName : 'master';
            configure.templates[templateName]['git'] = gitUrl;

            fs.writeFile(`${__dirname}/../configure.json`, JSON.stringify(configure, null, '  '), 'utf-8', error => {
                if (error) {
                    console.log(colors.red(error));
                    process.exit();
                }
                console.log(colors.green('\n Template added:\n'));
                console.log(JSON.stringify(configure.templates, null, '    '));
                console.log('\n');
                process.exit();
            });
        } else {
            console.log(colors.red('\n Template has already existed!\n'));
            console.log(JSON.stringify(configure.templates, null, '    '));
            process.exit();
        }
    });
};
